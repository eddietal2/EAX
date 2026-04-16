<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { rates, getStaticRates, fetchExchangeRates, initRatePolling, lastUpdated, isLoading, fetchError } from '$lib/stores/exchangeRates';
	import { conversionHistory } from '$lib/stores/conversionHistory';
	import { toastStore } from '$lib/stores/toast';
	import { defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';
	import FlagIcon from '$lib/components/FlagIcon.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';

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
		mounted = true;
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
		isSwapping = true;
		swapRotation += 180;
		const temp = fromCurrency;
		fromCurrency = toCurrency;
		toCurrency = temp;
		setTimeout(() => { isSwapping = false; }, 400);
	}

	function clearAmount() {
		amount = '';
		if (amountInput) {
			amountInput.value = '';
		}
	}

	function appendToInput(value: string) {
		if (!amountInput) return;
		const current = amountInput.value;
		const newValue = current + value;
		amountInput.value = newValue;
		// Trigger the input event to format with commas
		amountInput.dispatchEvent(new Event('input', { bubbles: true }));
	}

	function backspace() {
		if (!amountInput) return;
		const current = amountInput.value;
		if (current.length > 0) {
			amountInput.value = current.slice(0, -1);
			amountInput.dispatchEvent(new Event('input', { bubbles: true }));
		}
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

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 flex flex-col">
	<div class="flex-1 overflow-hidden p-4 md:p-3 w-full max-w-full mx-auto md:flex md:items-center md:justify-center pb-20 md:pb-0">
		<!-- Header -->
	<div class="text-center mb-3 md:hidden">
		<h1 class="text-3xl font-black tracking-wider text-emerald-600 dark:text-emerald-400" style="font-family: var(--font-bebas-neue, 'Bebas Neue', sans-serif);">EAX</h1>
		<p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">East African Exchange</p>
		<p class="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Quick currency conversions</p>
	</div>

	<!-- Converter Card + Rate Info wrapper -->
	{#if !mounted}
		<!-- Skeleton Loading State -->
		<div class="md:w-[32%] md:min-w-[240px] md:mx-auto">
			<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
				<!-- From Currency Skeleton -->
				<div class="p-3 space-y-3">
					<Skeleton width="w-20" height="h-3" />
					<div class="flex items-center gap-3">
						<Skeleton width="w-10" height="h-10" circle={true} />
						<Skeleton width="w-24" height="h-10" />
						<Skeleton width="flex-1" height="h-10" />
					</div>
				</div>

				<!-- Swap Button Skeleton -->
				<div class="flex items-center justify-center py-2">
					<Skeleton width="w-10" height="h-10" circle={true} />
				</div>

				<!-- To Currency Skeleton -->
				<div class="p-3 space-y-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
					<Skeleton width="w-20" height="h-3" />
					<div class="flex items-center gap-3">
						<Skeleton width="w-10" height="h-10" circle={true} />
						<Skeleton width="w-24" height="h-10" />
						<Skeleton width="flex-1" height="h-10" />
					</div>
				</div>
			</div>

			<!-- Exchange Rate Skeleton -->
			<div class="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
				<Skeleton width="w-32" height="h-3" class="mb-2" />
				<Skeleton width="w-full" height="h-4" />
			</div>

			<!-- Buttons Skeleton -->
			<div class="space-y-1.5 mt-2">
				<Skeleton width="w-full" height="h-10" />
				<Skeleton width="w-full" height="h-10" />
			</div>
		</div>
	{/if}

	{#if mounted}
		<div class="md:w-[32%] md:min-w-[240px] md:mx-auto" in:fly={{ y: 60, duration: 600, easing: t => 1 - Math.pow(1 - t, 3) }}>
		<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-200">
			<!-- From Currency -->
			<div class="p-3 md:p-3 dark:text-gray-300">
				<label for="from-currency" class="block text-xs md:text-xs text-gray-500 dark:text-gray-400 mb-2 md:mb-1">{t('home.fromLabel')}</label>
			<div class="flex items-center gap-3 md:gap-2">
					<FlagIcon code={fromCurrency} size="md" />
					<select id="from-currency" bind:value={fromCurrency} class="shrink-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500">
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
						<option value="TZS">TZS</option>
						<option value="KES">KES</option>
						<option value="UGX">UGX</option>
						<option value="RWF">RWF</option>
						<option value="AED">AED</option>
						<option value="CNY">CNY</option>
						<option value="INR">INR</option>
						<option value="ETB">ETB</option>
						<option value="ZAR">ZAR</option>
						<option value="ZMW">ZMW</option>
						<option value="SAR">SAR</option>
						<option value="CHF">CHF</option>
						<option value="CAD">CAD</option>
						<option value="AUD">AUD</option>
						<option value="MWK">MWK</option>
						<option value="MZN">MZN</option>
						<option value="BIF">BIF</option>
						<option value="CDF">CDF</option>
						<option value="NGN">NGN</option>
						<option value="EGP">EGP</option>
					</select>
					<div class="flex-1 min-w-0 relative">
						<input
							bind:this={amountInput}
							use:currencyInput
							type="text"
							placeholder="0"
							inputmode={isMobile ? 'none' : 'decimal'}
							readonly={isMobile}
							onfocus={() => { if (isMobile) { setTimeout(() => { if (swapButtonEl) keyboardTop = swapButtonEl.getBoundingClientRect().bottom; }, 0); showMobileKeyboard = true; } }}
							style="font-size: 16px;"
							class="min-w-0 w-full text-xl md:text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-0 focus:ring-0 focus:outline-none text-right placeholder-gray-300 dark:placeholder-gray-600 pr-12 cursor-pointer md:cursor-default {!amount ? 'animate-pulse md:animate-none' : ''}"
						/>
						{#if amount}
							<button
								onclick={clearAmount}
								aria-label="Clear input"
								class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						{/if}
					</div>
				</div>
			</div>
			
			<!-- Swap Button -->
			<div bind:this={swapButtonEl} class="flex items-center justify-center relative py-1 md:py-1">
				<div class="absolute inset-x-0 top-1/2 border-t border-gray-100"></div>
				<button
					onclick={swapCurrencies}
					aria-label="Swap currencies"
					class="relative w-8 h-8 md:w-8 md:h-8 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
					style="transform: rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
					</svg>
				</button>
			</div>
			
			<!-- To Currency -->
			<div class="p-3 md:p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
				<label for="to-currency" class="block text-xs md:text-xs text-gray-500 dark:text-gray-400 mb-2 md:mb-1">{t('home.toLabel')}</label>
			<div class="flex items-center gap-3 md:gap-2">
					<FlagIcon code={toCurrency} size="md" />
					<select id="to-currency" bind:value={toCurrency} class="shrink-0 bg-white dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500">
						<option value="TZS">TZS</option>
						<option value="KES">KES</option>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
						<option value="UGX">UGX</option>
						<option value="RWF">RWF</option>
						<option value="AED">AED</option>
						<option value="CNY">CNY</option>
						<option value="INR">INR</option>
						<option value="ETB">ETB</option>
						<option value="ZAR">ZAR</option>
						<option value="ZMW">ZMW</option>
						<option value="SAR">SAR</option>
						<option value="CHF">CHF</option>
						<option value="CAD">CAD</option>
						<option value="AUD">AUD</option>
						<option value="MWK">MWK</option>
						<option value="MZN">MZN</option>
						<option value="BIF">BIF</option>
						<option value="CDF">CDF</option>
						<option value="NGN">NGN</option>
						<option value="EGP">EGP</option>
					</select>
					<div class="flex-1 min-w-0">
						<p class="text-xl md:text-lg font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums truncate">
							{convertedAmount() || '0.00'}
						</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Current Exchange Rate Label -->
		<div class="mt-2 md:mt-2 p-2 md:p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 relative transition-colors duration-200">
			<div class="flex items-center justify-between">
				<p class="text-xs md:text-xs font-medium text-emerald-900 dark:text-emerald-200">{t('home.exchangeRate')}</p>
				{#if $isLoading}
					<div class="flex items-center gap-1.5">
						<div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
						<span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('messages.loading')}</span>
					</div>
				{/if}
			</div>
			<p class="text-sm md:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 md:gap-1.5 {$isLoading ? 'opacity-70' : ''}">
				<FlagIcon code={fromCurrency} size="sm" />
				<span class="text-xs md:text-xs">1 {fromCurrency} = {( $rates[fromCurrency]?.[toCurrency] ?? getStaticRates()[fromCurrency]?.[toCurrency] ?? 1 ).toLocaleString(undefined, { maximumFractionDigits: 4 })} {toCurrency}</span>
				<FlagIcon code={toCurrency} size="sm" />
			</p>
		</div>

		<div class="mt-1 md:mt-1 text-center text-xs md:text-xs text-gray-500 dark:text-gray-400">
			{#if $lastUpdated}
				Updated {new Date($lastUpdated).toLocaleString()}
			{/if}
			{#if $fetchError}
				• Failed to refresh: {$fetchError}
			{/if}
		</div>

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

		</div>
	{/if}

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

			<!-- Row 5: + - operators -->
			<div class="grid grid-cols-2 gap-1 flex-1 min-h-0">
				<button onclick={() => appendToInput('+')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
					+
				</button>
				<button onclick={() => appendToInput('-')} class="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg active:scale-95 active:shadow-inner transition-all duration-150 shadow-sm hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-emerald-500/30">
					−
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