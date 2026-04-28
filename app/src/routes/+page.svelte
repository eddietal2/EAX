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

	let amount = $state('');
	let fromCurrency = $state('USD');
	let toCurrency = $state('TZS');
	let swapRotation = $state(0);
	let isSwapping = $state(false);
	let amountInput = $state<HTMLInputElement | undefined>();
	let showMobileKeyboard = $state(false);
	let isMobile = $state(false);
	let mounted = $state(false);
	let swapButtonEl: HTMLDivElement | undefined;
	let keyboardTop = $state(0);
	let inputHasValue = $state(false);
	let isOnline = $state(typeof window !== 'undefined' ? navigator.onLine : true);

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

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
		fromCurrency = $defaultFromCurrency;
		toCurrency = $defaultToCurrency;
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

	function clearAmount() {
		amount = '';
		inputHasValue = false;
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
			if (swapButtonEl) {
				const rect = swapButtonEl.getBoundingClientRect();
				keyboardTop = rect.bottom;
			}
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
	<title>Home - EAX Currency Exchange</title>
	<meta name="description" content="EAX home page. Quick currency conversion calculator for East African currencies. Check real-time exchange rates and convert between TZS, USD, EUR, and more." />
</svelte:head>

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 flex flex-col">
	<div class="flex-1 overflow-hidden p-4 md:p-3 w-full max-w-full mx-auto md:flex md:items-center md:justify-center pb-20 md:pb-0">
		<!-- Header -->
	<div class="text-center mb-3 md:hidden">
		<img src="/icons/icon128.png" alt="EAX" class="w-16 h-16 rounded-2xl mx-auto mb-1" />
		<p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">East African Exchange</p>
		<!-- <p class="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Quick currency conversions</p> -->
	</div>

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
		bind:swapButtonEl
		{inputHasValue}
		{convertedAmount}
		{mounted}
		{isMobile}
		onSwap={swapCurrencies}
		onClear={clearAmount}
		onInputFocus={focusInput}
		{t}
	>
		<svelte:fragment slot="actions">
			<!-- Save to History Button -->
			<div class="space-y-1.5 md:space-y-1.5 mt-2 md:mt-2">
				<button
					onclick={saveConversion}
					disabled={!amount || parseFloat(amount) <= 0}
					class="w-full px-3 md:px-3 py-2.5 md:py-2 text-sm md:text-sm bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					💾 {t('home.saveButton')}
				</button>

				<a
					href="/history"
					class="w-full inline-flex items-center justify-center px-3 md:px-3 py-2.5 md:py-2 text-sm md:text-sm bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
				>
					📜 {t('home.viewHistoryButton')}
				</a>
			</div>
		</svelte:fragment>
	</ConverterCard>

	<!-- Mobile Custom Keyboard -->
	{#if showMobileKeyboard}
		<div transition:fly={{ y: 300, duration: 300, easing: t => 1 - Math.pow(1 - t, 3) }} class="md:hidden fixed left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-50 flex flex-col p-2 gap-1" style="top: {keyboardTop}px; bottom: 5rem;">
			<!-- Header: converted value + Done -->
			<div class="flex items-center justify-between shrink-0 px-2 py-1">
				<span class="text-sm font-semibold text-gray-900 dark:text-white truncate flex items-center gap-1">
					{#if convertedAmount()}
						<FlagIcon code={toCurrency} size="sm" />
						{convertedAmount()} {toCurrency}
					{/if}
				</span>
				<button onclick={() => { showMobileKeyboard = false; }} class="px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 rounded-lg active:scale-95 transition-transform shrink-0">
					Done
				</button>
			</div>

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

			<!-- Row 5: ← + - → -->
			<div class="grid grid-cols-4 gap-1 flex-1 min-h-0">
				<button onclick={() => moveCursor('left')} aria-label="Move cursor left" class="text-xl font-bold bg-gradient-to-br from-gray-200/95 to-gray-300/85 dark:from-gray-600/95 dark:to-gray-700/85 text-gray-700 dark:text-gray-200 rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm flex items-center justify-center">
					←
				</button>
				<button onclick={() => appendToInput('+')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
					+
				</button>
				<button onclick={() => appendToInput('-')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
					−
				</button>
				<button onclick={() => moveCursor('right')} aria-label="Move cursor right" class="text-xl font-bold bg-gradient-to-br from-gray-200/95 to-gray-300/85 dark:from-gray-600/95 dark:to-gray-700/85 text-gray-700 dark:text-gray-200 rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm flex items-center justify-center">
					→
				</button>
			</div>
		</div>
	{/if}
	</div>
</div>

<style>
	button[aria-label="Swap currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}
</style>