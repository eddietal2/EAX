<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { rates, getStaticRates, fetchExchangeRates, initRatePolling, lastUpdated, isLoading, fetchError } from '$lib/stores/exchangeRates';
	import { conversionHistory } from '$lib/stores/conversionHistory';
	import { toastStore } from '$lib/stores/toast';
	import { defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';
	import FlagIcon from '$lib/components/FlagIcon.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import ConverterCard from '$lib/components/ConverterCard.svelte';
	import PwaInstall from '$lib/components/PwaInstall.svelte';

	let amount = $state('');
	let fromCurrency = $state('USD');
	let toCurrency = $state('TZS');
	let swapRotation = $state(0);
	let isSwapping = $state(false);
	let amountInput = $state<HTMLInputElement | undefined>();
	let showMobileKeyboard = $state(false);
	let isMobile = $state(false);
	let mounted = $state(false);
	let inputHasValue = $state(false);
	let typedDisplay = $state('');
	let isOnline = $state(typeof window !== 'undefined' ? navigator.onLine : true);

	const currencies = [
		'AED', 'AUD', 'BIF', 'CAD', 'CDF', 'CHF', 'CNY', 'EGP', 'ETB', 'EUR',
		'GBP', 'INR', 'KES', 'MWK', 'MZN', 'NGN', 'RWF', 'SAR', 'TZS', 'UGX', 'USD', 'ZAR', 'ZMW'
	];

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	// Keep the converter in sync with the saved default currencies so the
	// onboarding dialog (and settings page) selections map straight through
	// to the ConverterCard, even on the first visit.
	$effect(() => {
		fromCurrency = $defaultFromCurrency;
		toCurrency = $defaultToCurrency;
	});

	// Keep the full-screen calculator's typed value in sync with the input element.
	$effect(() => {
		if (!amountInput) return;
		const syncTypedDisplay = () => {
			typedDisplay = formatExpressionWithCommas(stripToNumeric(amountInput?.value ?? ''));
		};
		amountInput.addEventListener('input', syncTypedDisplay);
		syncTypedDisplay();
		return () => amountInput?.removeEventListener('input', syncTypedDisplay);
	});

	function formatWithCommas(value: string): string {
		if (!value) return '';
		const parts = value.split('.');
		parts[0] = parts[0].replace(/^0+(?=\d)/, '');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	}

	function stripToNumeric(value: string): string {
		const cleaned = value.replace(/[^0-9.+\-*/]/g, '');
		const [intPart, ...rest] = cleaned.split('.');
		return intPart + (rest.length ? '.' + rest.join('') : '');
	}

	function evaluateExpression(expression: string): string {
		try {
			const cleaned = expression.replace(/,/g, '').trim();
			
			if (!cleaned) return '';
			
			// If it ends with an operator, remove it for evaluation
			let toEvaluate = cleaned;
			if (/[+\-*/]$/.test(toEvaluate)) {
				toEvaluate = toEvaluate.slice(0, -1).trim();
			}
			
			if (!toEvaluate) return '';
			
			// Safely evaluate math expression
			const result = Function('"use strict"; return (' + toEvaluate + ')')();
			
			if (typeof result === 'number' && isFinite(result)) {
				return result.toString();
			}
			return cleaned;
		} catch (e) {
			return '';
		}
	}

	function formatExpressionWithCommas(value: string): string {
		if (!value) return '';
		
		// Split by operators while keeping them
		const parts = value.split(/(?=[+\-*/])|(?<=[+\-*/])/);
		
		return parts.map(part => {
			// If it's a number, format with commas
			if (/^[\d.]+$/.test(part)) {
				return formatWithCommas(part);
			}
			// Keep operators as-is
			return part;
		}).join('');
	}

	// Svelte action: handles formatting + caret preservation imperatively
	function currencyInput(node: HTMLInputElement) {
		async function handleInput() {
			const cursorPos = node.selectionStart ?? node.value.length;
			const rawBefore = node.value;

			// count digits before cursor (ignoring commas)
			const digitsBeforeCursor = rawBefore.slice(0, cursorPos).replace(/[^0-9.+\-*/]/g, '').length;

			// strip to clean expression with operators
			const expression = stripToNumeric(rawBefore.replace(/,/g, ''));
			
			// evaluate to get numeric result for conversion
			const evaluated = evaluateExpression(expression);
			amount = evaluated;

			// wait for Svelte to finish re-rendering
			await tick();

			// format with commas while preserving operators
			const formatted = formatExpressionWithCommas(expression);
			node.value = formatted;
			inputHasValue = formatted.length > 0;

			// restore cursor: count non-comma characters
			let charsSeen = 0;
			let newCursor = 0;
			for (let i = 0; i < formatted.length; i++) {
				if (formatted[i] !== ',') charsSeen++;
				if (charsSeen === digitsBeforeCursor) {
					newCursor = i + 1;
					break;
				}
			}
			if (digitsBeforeCursor === 0) newCursor = 0;
			node.setSelectionRange(newCursor, newCursor);
		}

		node.addEventListener('input', handleInput);
		return {
			destroy() {
				node.removeEventListener('input', handleInput);
			}
		};
	}

	const currencySymbol: Record<string, string> = {
		EUR: '€',
		GBP: '£',
		TZS: 'TSh',
		KES: 'KSh',
		UGX: 'USh',
		RWF: 'Fr',
		AED: 'د.إ',
		CNY: '¥',
		INR: '₹',
		ETB: 'Br',
		ZAR: 'R',
		ZMW: 'ZK',
		SAR: 'ر.س',
		CHF: 'Fr',
		CAD: 'C$',
		AUD: 'A$',
		MWK: 'MK',
		MZN: 'MT',
		BIF: 'Fr',
		CDF: 'Fr',
		NGN: '₦',
		EGP: 'E£'
	};

	const countryFlag: Record<string, string> = {
		USD: '🇺🇸',
		EUR: '🇪🇺',
		GBP: '🇬🇧',
		TZS: '🇹🇿',
		KES: '🇰🇪',
		UGX: '🇺🇬',
		RWF: '🇷🇼',
		AED: '🇦🇪',
		CNY: '🇨🇳',
		INR: '🇮🇳',
		ETB: '🇪🇹',
		ZAR: '🇿🇦',
		ZMW: '🇿🇲',
		SAR: '🇸🇦',
		CHF: '🇨🇭',
		CAD: '🇨🇦',
		AUD: '🇦🇺',
		MWK: '🇲🇼',
		MZN: '🇲🇿',
		BIF: '🇧🇮',
		CDF: '🇨🇩',
		NGN: '🇳🇬',
		EGP: '🇪🇬'
	};

	onMount(() => {
		initRatePolling(8 * 60 * 60 * 1000); // 3x/day (90/mo)
		const mq = window.matchMedia('(max-width: 767px)');
		isMobile = mq.matches;
		mq.addEventListener('change', (e) => { isMobile = e.matches; });
		
		// Track online/offline status
		const handleOnline = () => { isOnline = true; };
		const handleOffline = () => { isOnline = false; };
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);
		
		mounted = true;

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	});

	const convertedAmount = $derived(() => {
		const num = parseFloat(amount);
		if (isNaN(num) || num <= 0) return '';
		if (fromCurrency === toCurrency) return num.toLocaleString();
		const staticFallback = getStaticRates();
		const rate = $rates[fromCurrency]?.[toCurrency] ?? staticFallback[fromCurrency]?.[toCurrency] ?? 1;
		return (num * rate).toLocaleString(undefined, { maximumFractionDigits: 2 });
	});

	function swapCurrencies() {
		// ConverterCard already swaps fromCurrency/toCurrency via $bindable.
		// Intentionally empty to avoid double-swapping.
	}

	// Swap used by the full-screen mobile calculator overlay.
	function swapOverlayCurrencies() {
		const temp = fromCurrency;
		fromCurrency = toCurrency;
		toCurrency = temp;
	}

	function clearAmount() {
		amount = '';
		inputHasValue = false;
		typedDisplay = '';
		if (amountInput) {
			amountInput.value = '';
		}
	}

	function appendToInput(value: string) {
		if (!amountInput) return;
		const start = amountInput.selectionStart ?? amountInput.value.length;
		const end = amountInput.selectionEnd ?? amountInput.value.length;
		const current = amountInput.value;
		// Enforce 120-char limit (excluding commas)
		const afterStripped = (current.slice(0, start) + value + current.slice(end)).replace(/,/g, '');
		if (afterStripped.length > 120) return;
		amountInput.value = current.slice(0, start) + value + current.slice(end);
		amountInput.setSelectionRange(start + value.length, start + value.length);
		amountInput.dispatchEvent(new Event('input', { bubbles: true }));
	}

	function backspace() {
		if (!amountInput) return;
		const start = amountInput.selectionStart ?? amountInput.value.length;
		const end = amountInput.selectionEnd ?? amountInput.value.length;
		const current = amountInput.value;
		if (start !== end) {
			// Delete selection
			amountInput.value = current.slice(0, start) + current.slice(end);
			amountInput.setSelectionRange(start, start);
		} else if (start > 0) {
			// Delete char before cursor
			amountInput.value = current.slice(0, start - 1) + current.slice(start);
			amountInput.setSelectionRange(start - 1, start - 1);
		}
		amountInput.dispatchEvent(new Event('input', { bubbles: true }));
	}

	function moveCursor(direction: 'left' | 'right') {
		if (!amountInput) return;
		const pos = amountInput.selectionStart ?? 0;
		const len = amountInput.value.length;
		const newPos = direction === 'left' ? Math.max(0, pos - 1) : Math.min(len, pos + 1);
		amountInput.setSelectionRange(newPos, newPos);
		amountInput.focus();
	}

	function focusInput() {
		if (amountInput) {
			amountInput.focus();
			showMobileKeyboard = true;
		}
	}

	function saveConversion() {
		const num = parseFloat(amount);
		if (isNaN(num) || num <= 0) return;

		const staticFallback = getStaticRates();
		const rate = $rates[fromCurrency]?.[toCurrency] ?? staticFallback[fromCurrency]?.[toCurrency] ?? 1;
		const toAmount = num * rate;

		conversionHistory.addConversion({
			fromCurrency,
			toCurrency,
			fromAmount: num,
			toAmount,
			rate
		});

		toastStore.success(t('messages.saved'));
	}
</script>

<svelte:head>
	<title>Home - SimbaFX Currency Exchange</title>
	<meta name="description" content="SimbaFX home page. Quick currency conversion calculator for East African currencies. Check real-time exchange rates and convert between TZS, USD, EUR, and more." />
</svelte:head>

{#snippet adsBlock()}
		<!-- Nala referral ad → links to the in-app Nala offer page -->
		<a
			href="/nala"
			aria-label={t('popup.nalaCta')}
			class="flex items-center justify-center gap-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 px-3 py-2 opacity-80 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
		>
			<svg class="nala-logo" viewBox="0 0 73 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M6.96825 12.6333C7.01146 12.5615 7.08347 12.5039 7.19869 12.4752C7.40033 12.4321 7.48674 12.2596 7.52995 12.0871C7.58756 11.8141 7.74599 11.5985 7.91882 11.4116C7.91882 11.3973 7.93322 11.3973 7.94762 11.3973C7.08347 9.42815 7.11228 9.85936 6.79542 7.71774C6.6658 6.84098 6.53618 5.9211 6.1185 5.15933C5.05271 3.17585 4.05894 3.26208 3.79969 3.37707C3.61245 3.4633 3.48283 3.96636 3.52604 4.23945C4.20296 9.9312 5.90247 11.0523 6.96825 12.6333Z" fill="#00A2DC"/>
				<path d="M9.73246 10.3481C9.77566 10.4918 9.80453 10.6355 9.81893 10.7936C10.1357 10.7505 10.4382 10.7649 10.7551 10.7649C10.8559 10.7649 10.8847 10.808 10.8703 10.8943C10.8559 11.0524 10.8415 11.2105 10.8127 11.3685C10.7983 11.4692 10.8559 11.5123 10.9279 11.541C11.1007 11.5841 11.2591 11.6273 11.432 11.6704C11.2879 11.1529 11.1295 10.4343 10.9711 9.48567C10.7839 8.49395 10.7839 6.43859 10.539 4.22514C10.3086 0.143179 6.03104 -2.09902 9.73246 10.3481Z" fill="#00A2DC"/>
				<path d="M13.1024 11.1239C13.0736 11.2101 13.0016 11.4689 12.9152 11.7563C12.944 11.7707 12.9872 11.7994 13.016 11.8138C13.2176 11.9431 13.448 11.9431 13.6785 11.9431C13.8657 11.9288 14.053 11.9 14.2402 11.9C14.269 11.9 14.3266 11.9431 14.341 11.9863C14.3986 12.1587 14.4418 12.3456 14.4994 12.5324C14.4994 12.5612 14.5282 12.59 14.5138 12.6044C14.4274 12.7049 14.4994 12.7912 14.5426 12.863C14.6434 13.0643 14.7011 13.3086 14.8883 13.4667C14.9459 13.5242 14.9603 13.6392 14.9603 13.7254C14.9603 13.8979 15.0035 14.0416 15.1188 14.1854C15.2052 14.2716 15.2484 14.401 15.3204 14.5016C15.3492 14.5447 15.3636 14.5878 15.3924 14.6166C14.9027 13.3229 14.8739 11.9575 14.9891 10.6208C16.3862 1.53706 12.7135 4.46916 13.2032 7.08506C13.5345 8.83861 13.7073 9.37039 13.1024 11.1239Z" fill="#00A2DC"/>
				<path d="M22.2201 13.9275C22.1913 12.9933 21.572 12.5765 20.7654 13.022C20.247 13.3095 19.8005 13.7838 19.3972 14.2294C19.0372 14.6462 18.8067 15.3361 18.5186 15.5948C17.9858 16.0691 17.3808 16.2273 16.8336 16.1122C16.7184 16.3278 16.5599 16.5434 16.3583 16.7159C16.3295 16.7303 16.3151 16.759 16.2863 16.7734C15.9262 16.9027 15.739 17.2333 15.4942 17.4777C15.3501 17.6071 15.2925 17.7795 15.2781 17.952C15.2637 18.1676 15.3069 18.3688 15.3357 18.5844C15.3789 18.8431 15.4365 19.0875 15.4653 19.3462C15.4942 19.5187 15.3933 19.648 15.2637 19.7343C15.0908 19.8493 14.918 19.9355 14.7596 20.0505C14.5723 20.1798 14.5435 20.2805 14.6299 20.4961C14.6587 20.5966 14.6875 20.6973 14.7019 20.7978C14.7308 20.9416 14.6587 21.0566 14.5292 21.0997C14.2987 21.1859 14.2411 21.344 14.2555 21.5596C14.2699 21.689 14.1979 21.804 14.0827 21.8759C14.0107 21.9333 13.9531 22.0052 13.8954 22.0771C13.8666 22.1202 13.8378 22.1633 13.7946 22.1921C13.6506 22.3358 13.5209 22.4795 13.3625 22.5945C13.2329 22.6807 13.0889 22.7526 12.9305 22.767C12.7 22.7958 12.4696 22.767 12.2535 22.8676C12.1239 22.9251 11.9943 22.8676 11.9367 22.7238C11.8935 22.6089 11.8647 22.4939 11.8359 22.3789C11.7783 22.2065 11.7351 22.034 11.6631 21.8759C11.5334 21.5596 11.4038 21.2578 11.2598 20.9559C11.2454 20.9272 11.231 20.9129 11.2454 20.8841C11.2598 20.611 11.1013 20.4098 10.9861 20.1798C10.7989 19.8349 10.8133 19.49 11.0293 19.145C11.1301 18.9725 11.1877 18.8 11.1301 18.5988C11.0581 18.3832 11.0149 18.1676 10.9573 17.952C10.9429 17.9089 10.9141 17.8657 10.8853 17.837C10.7413 17.6645 10.6117 17.492 10.4677 17.3196C10.41 17.2477 10.41 17.1759 10.4533 17.0896C10.5109 16.9747 10.5541 16.8453 10.5973 16.7159C10.6261 16.601 10.5685 16.5147 10.4388 16.5003C10.3236 16.4716 10.2084 16.4716 10.0932 16.4716C9.97792 16.4716 9.89153 16.4285 9.86273 16.3134C9.81953 16.1841 9.71873 16.1266 9.60345 16.141C9.40186 16.1553 9.21459 16.2129 9.01299 16.2416C8.85452 16.2703 8.69612 16.2703 8.53772 16.2991C8.42245 16.3134 8.29285 16.3278 8.19205 16.3854C7.9904 16.5003 7.81756 16.4859 7.63034 16.3422C7.4431 16.1841 7.24147 16.0404 7.03982 15.8823C7.02542 15.8679 7.01102 15.8392 7.01102 15.8248C7.03983 15.6954 6.93901 15.6236 6.867 15.5373C6.79498 15.4655 6.75178 15.3648 6.69416 15.2786C6.67976 15.2499 6.65096 15.2211 6.62216 15.2211C6.52134 15.2067 6.47813 15.1349 6.46373 15.0487C6.40611 14.8474 6.34851 14.6462 6.44932 14.4306C6.44932 14.4162 6.46373 14.4018 6.46373 14.4018C6.27649 14.3731 6.08926 14.3012 5.90203 14.1431C5.34033 13.6688 5.1531 13.4388 3.94328 11.1823C2.48862 6.95659 -1.31365 9.38564 1.22119 11.0529C1.94133 11.7429 2.70466 12.3753 3.41039 13.0795C5.48435 15.1636 5.55636 15.6523 7.06863 18.1532C7.96159 19.6336 8.85452 21.1428 9.89153 22.5082C10.4965 23.3131 11.3462 24.0031 12.2103 24.5205C13.881 25.5266 15.7966 24.8942 16.6608 23.1407C16.992 22.4795 17.208 21.7608 17.4096 21.0422C17.9426 19.0875 18.2594 18.4838 19.9157 17.3196C20.463 16.9315 20.9959 16.4859 21.4712 16.0117C22.0473 15.4655 22.2489 14.7181 22.2201 13.9275ZM16.9632 19.5762C16.8048 20.0505 16.6463 20.5248 16.5023 20.9847C16.4447 21.1715 16.3727 21.2291 16.2142 21.2291C16.0702 21.2291 15.9838 21.1572 15.9262 20.9847C15.9118 20.9272 15.8974 20.8698 15.883 20.8266C15.7966 20.6685 15.7534 20.5104 15.9406 20.3667C15.9838 20.3236 15.9838 20.2085 15.9694 20.1367C15.8974 19.8349 15.955 19.6768 16.243 19.5474C16.4015 19.4756 16.5167 19.3749 16.5887 19.2024C16.6175 19.1162 16.704 19.0587 16.7616 18.9869C16.8192 19.0587 16.9056 19.1162 16.9488 19.2024C16.992 19.2887 17.0064 19.3749 17.0352 19.4468C16.9776 19.5187 16.9776 19.5474 16.9632 19.5762Z" fill="#00A2DC"/>
			</svg>
			<span class="text-[11px] font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{t('popup.nalaCta')}</span>
			<span class="text-[9px] font-bold tracking-wider rounded px-1.5 py-0.5 text-gray-500 dark:text-gray-400 bg-black/10 dark:bg-white/15">AD</span>
		</a>

		<!-- Ad slot: impression-based banner ad hosted in a remote iframe (same as extension popup).
			 TODO: replace srcdoc with src="https://yourdomain.com/ext-ad-frame" (300x50). -->
		<div class="mt-2.5 md:mt-2.5">
			<div class="flex items-center justify-center p-1 rounded-lg bg-white/50 dark:bg-white/10">
				<iframe
					class="w-full max-w-[300px] h-[50px] border-0 block"
					srcdoc="<div style='display:flex;align-items:center;justify-content:center;height:100%;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;color:#9ca3af;'>Ad space 300 × 50</div>"
					title={t('popup.sponsored')}
					width="300"
					height="50"
					frameborder="0"
					scrolling="no"
					loading="lazy"
				></iframe>
			</div>
			<span class="block text-center text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{t('popup.sponsored')}</span>
		</div>
{/snippet}

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 flex flex-col">
	<div class="flex-1 overflow-hidden p-4 md:p-3 w-full max-w-full mx-auto md:flex md:items-center md:justify-center pb-[calc(12.5rem+env(safe-area-inset-bottom))] md:pb-0">
		<!-- Offline Indicator -->
	{#if !isOnline}
		<div class="mb-3 px-3 py-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg text-sm text-amber-800 dark:text-amber-200 text-center font-medium">
			Offline — using cached rates
		</div>
	{/if}

	<!-- Converter Card + Rate Info wrapper -->
	<ConverterCard
		bind:fromCurrency
		bind:toCurrency
		bind:amount
		bind:amountInput
		{inputHasValue}
		{convertedAmount}
		{mounted}
		{isMobile}
		onSwap={swapCurrencies}
		onClear={clearAmount}
		onInputFocus={focusInput}
		{t}
	>
		{#snippet actions()}
			<!-- Save to History Button -->
			<div class="grid grid-cols-2 gap-1.5 md:gap-1.5 mt-2 md:mt-2">
				<button
					onclick={saveConversion}
					disabled={!amount || parseFloat(amount) <= 0}
					class="w-full inline-flex items-center justify-center px-3 py-2.5 text-[13px] font-semibold rounded-lg bg-black/[0.06] hover:bg-black/10 text-gray-600 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					💾 {t('home.saveButton')}
				</button>

				<a
					href="/history"
					class="w-full inline-flex items-center justify-center px-3 py-2.5 text-[13px] font-semibold rounded-lg bg-black/[0.06] hover:bg-black/10 text-gray-600 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:text-gray-200 transition-colors"
				>
					📜 {t('home.viewHistoryButton')}
				</a>
			</div>
			
			<!-- Ads (desktop: inside the card; mobile: pinned to the bottom of the page) -->
			<div class="hidden md:block mt-12">
				{@render adsBlock()}
			</div>
		{/snippet}
	</ConverterCard>

	<!-- Mobile-only PWA install prompt (Android/iOS) -->
	<PwaInstall />

	<!-- Mobile Full-Screen Calculator -->
	{#if showMobileKeyboard}
		<div
			in:fly={{ y: '100%', duration: 300, easing: t => 1 - Math.pow(1 - t, 3) }}
			out:fly={{ y: '100%', duration: 350, easing: t => 1 - Math.pow(1 - t, 3) }}
			class="md:hidden fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-950 overflow-hidden"
		>
			<!-- Header: title + Done -->
			<div class="flex items-center justify-between shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
				<span class="text-sm font-semibold text-gray-900 dark:text-white">{t('home.calculatorTitle')}</span>
				<button
					onclick={() => { showMobileKeyboard = false; }}
					class="px-3 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 rounded-lg active:scale-95 transition-transform shrink-0"
				>
					{t('home.done')}
				</button>
			</div>

			<!-- Currency selectors -->
			<div class="shrink-0 px-4 pt-3 flex items-center gap-2">
				<div class="flex items-center gap-1.5 flex-1 min-w-0">
					<label for="calc-from-currency" class="text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.fromLabel')}</label>
					<FlagIcon code={fromCurrency} size="md" />
					<select
						id="calc-from-currency"
						bind:value={fromCurrency}
						class="flex-1 min-w-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>

				<div class="shrink-0 flex items-center justify-center">
					<button
						onclick={swapOverlayCurrencies}
						aria-label="Swap currencies"
						class="w-7 h-7 bg-emerald-500 text-white rounded-full shadow flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
						</svg>
					</button>
				</div>

				<div class="flex items-center gap-1.5 flex-1 min-w-0">
					<label for="calc-to-currency" class="text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.toLabel')}</label>
					<FlagIcon code={toCurrency} size="md" />
					<select
						id="calc-to-currency"
						bind:value={toCurrency}
						class="flex-1 min-w-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Converted value -->
			<div class="shrink-0 px-4 pt-4 text-right">
				<p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{t('home.convertedLabel')}</p>
				<span class="inline-flex items-center gap-1.5 text-2xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums break-all leading-tight">
					<FlagIcon code={toCurrency} size="sm" />
					{convertedAmount() || '0.00'} {toCurrency}
				</span>
			</div>

			<!-- Typed value -->
			<div class="shrink-0 px-4 pt-2 pb-3 text-right border-b border-gray-200 dark:border-gray-800">
				<p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{t('home.typedLabel')}</p>
				<span class="block text-3xl font-bold text-gray-900 dark:text-white tabular-nums break-all leading-tight">{typedDisplay || '0'}</span>
			</div>

			<!-- Keypad -->
			<div class="flex-1 min-h-0 flex flex-col gap-1 p-2">
				<!-- Row 1: 1 2 3 -->
				<div class="grid grid-cols-3 gap-1 flex-1 min-h-0">
					{#each [1, 2, 3] as num}
						<button onclick={() => appendToInput(num.toString())} class="text-3xl font-bold bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-700/95 dark:to-gray-700/85 text-gray-900 dark:text-white rounded-lg active:scale-95 active:shadow-inner hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-150 shadow-sm hover:from-white hover:to-white/90 dark:hover:from-gray-600/95 dark:hover:to-gray-700/85">
							{num}
						</button>
					{/each}
				</div>

				<!-- Row 2: 4 5 6 -->
				<div class="grid grid-cols-3 gap-1 flex-1 min-h-0">
					{#each [4, 5, 6] as num}
						<button onclick={() => appendToInput(num.toString())} class="text-3xl font-bold bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-700/95 dark:to-gray-700/85 text-gray-900 dark:text-white rounded-lg active:scale-95 active:shadow-inner hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-150 shadow-sm hover:from-white hover:to-white/90 dark:hover:from-gray-600/95 dark:hover:to-gray-700/85">
							{num}
						</button>
					{/each}
				</div>

				<!-- Row 3: 7 8 9 -->
				<div class="grid grid-cols-3 gap-1 flex-1 min-h-0">
					{#each [7, 8, 9] as num}
						<button onclick={() => appendToInput(num.toString())} class="text-3xl font-bold bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-700/95 dark:to-gray-700/85 text-gray-900 dark:text-white rounded-lg active:scale-95 active:shadow-inner hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-150 shadow-sm hover:from-white hover:to-white/90 dark:hover:from-gray-600/95 dark:hover:to-gray-700/85">
							{num}
						</button>
					{/each}
				</div>

				<!-- Row 4: . 0 ⌫ -->
				<div class="grid grid-cols-3 gap-1 flex-1 min-h-0">
					<button onclick={() => appendToInput('.')} class="text-3xl font-bold bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-700/95 dark:to-gray-700/85 text-gray-900 dark:text-white rounded-lg active:scale-95 active:shadow-inner hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-150 shadow-sm hover:from-white hover:to-white/90 dark:hover:from-gray-600/95 dark:hover:to-gray-700/85">
						.
					</button>
					<button onclick={() => appendToInput('0')} class="text-3xl font-bold bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-700/95 dark:to-gray-700/85 text-gray-900 dark:text-white rounded-lg active:scale-95 active:shadow-inner hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-150 shadow-sm hover:from-white hover:to-white/90 dark:hover:from-gray-600/95 dark:hover:to-gray-700/85">
						0
					</button>
					<button onclick={backspace} class="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-2xl rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-red-500/50 dark:hover:shadow-red-500/30 flex items-center justify-center leading-none">
						×
					</button>
				</div>

				<!-- Row 5: ← + * - → -->
				<div class="grid grid-cols-5 gap-1 flex-1 min-h-0">
					<button onclick={() => moveCursor('left')} aria-label="Move cursor left" class="text-xl font-bold bg-gradient-to-br from-gray-200/95 to-gray-300/85 dark:from-gray-600/95 dark:to-gray-700/85 text-gray-700 dark:text-gray-200 rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm flex items-center justify-center">
						←
					</button>
					<button onclick={() => appendToInput('+')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
						+
					</button>
					<button onclick={() => appendToInput('*')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
						×
					</button>
					<button onclick={() => appendToInput('-')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
						−
					</button>
					<button onclick={() => moveCursor('right')} aria-label="Move cursor right" class="text-xl font-bold bg-gradient-to-br from-gray-200/95 to-gray-300/85 dark:from-gray-600/95 dark:to-gray-700/85 text-gray-700 dark:text-gray-200 rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm flex items-center justify-center">
						→
					</button>
				</div>
			</div>

			<!-- Close button -->
			<div class="shrink-0 p-3 border-t border-gray-200 dark:border-gray-800">
				<button
					onclick={() => { showMobileKeyboard = false; }}
					class="w-full py-3 text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
				>
					{t('home.close')}
				</button>
			</div>
		</div>
	{/if}
	</div>
</div>

	<!-- Mobile: Nala + iframe ads pinned to the bottom of the page (above the tab bar) -->
	<div
		class="md:hidden fixed left-0 right-0 z-30 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 pt-2"
		style="bottom: calc(4.5rem + env(safe-area-inset-bottom));"
	>
		<div class="max-w-md mx-auto">
			{@render adsBlock()}
		</div>
	</div>
<style>
	button[aria-label="Swap currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}

	.nala-logo {
		height: 14px;
		width: auto;
		display: block;
		flex-shrink: 0;
	}

</style>