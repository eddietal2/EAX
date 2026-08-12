<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { rates, getStaticRates, isLoading, fetchError } from '$lib/stores/exchangeRates';
	import FlagIcon from './FlagIcon.svelte';
	import Skeleton from './Skeleton.svelte';

	interface Props {
		fromCurrency: string;
		toCurrency: string;
		amount: string;
		inputHasValue: boolean;
		convertedAmount: () => string;
		mounted: boolean;
		isMobile: boolean;
		swapButtonEl?: HTMLDivElement;
		amountInput?: HTMLInputElement;
		onSwap: () => void;
		onClear: () => void;
		onInputFocus: () => void;
		onInputChange?: () => void;
		onFromCurrencyChange?: (currency: string) => void;
		onToCurrencyChange?: (currency: string) => void;
		t: (key: string) => string;
	}

	let {
		fromCurrency = $bindable('USD'),
		toCurrency = $bindable('TZS'),
		amount = $bindable(''),
		inputHasValue = false,
		convertedAmount,
		mounted,
		isMobile,
		swapButtonEl = $bindable(),
		amountInput = $bindable(),
		onSwap,
		onClear,
		onInputFocus,
		onInputChange,
		onFromCurrencyChange,
		onToCurrencyChange,
		t
	}: Props = $props();

	const currencies = [
		'AED', 'AUD', 'BIF', 'CAD', 'CDF', 'CHF', 'CNY', 'EGP', 'ETB', 'EUR',
		'GBP', 'INR', 'KES', 'MWK', 'MZN', 'NGN', 'RWF', 'SAR', 'TZS', 'UGX', 'USD', 'ZAR', 'ZMW'
	];

	let swapRotation = $state(0);
	let isSwapping = $state(false);

	function stripToNumeric(value: string): string {
		const cleaned = value.replace(/[^0-9.+\-*/]/g, '');
		const [intPart, ...rest] = cleaned.split('.');
		return intPart + (rest.length ? '.' + rest.join('') : '');
	}

	function evaluateExpression(expression: string): string {
		try {
			const cleaned = expression.replace(/,/g, '').trim();
			
			if (!cleaned) return '';
			
			let toEvaluate = cleaned;
			if (/[+\-*/]$/.test(toEvaluate)) {
				toEvaluate = toEvaluate.slice(0, -1).trim();
			}
			
			if (!toEvaluate) return '';
			
			const result = Function('"use strict"; return (' + toEvaluate + ')')();
			
			if (typeof result === 'number' && isFinite(result)) {
				return result.toString();
			}
			return cleaned;
		} catch (e) {
			return '';
		}
	}

	function formatWithCommas(value: string): string {
		if (!value) return '';
		const parts = value.split('.');
		parts[0] = parts[0].replace(/^0+(?=\d)/, '');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	}

	function formatExpressionWithCommas(value: string): string {
		if (!value) return '';
		
		const parts = value.split(/(?=[+\-*/])|(?<=[+\-*/])/);
		
		return parts.map(part => {
			if (/^[\d.]+$/.test(part)) {
				return formatWithCommas(part);
			}
			return part;
		}).join('');
	}

	function currencyInput(node: HTMLInputElement) {
		async function handleInput() {
			const cursorPos = node.selectionStart ?? node.value.length;
			const rawBefore = node.value;

			const digitsBeforeCursor = rawBefore.slice(0, cursorPos).replace(/[^0-9.+\-*/]/g, '').length;

			const expression = stripToNumeric(rawBefore.replace(/,/g, ''));
			
			const evaluated = evaluateExpression(expression);
			amount = evaluated;

			await tick();

			const formatted = formatExpressionWithCommas(expression);
			node.value = formatted;
			inputHasValue = formatted.length > 0;

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

	function handleSwap() {
		isSwapping = true;
		swapRotation += 180;
		const temp = fromCurrency;
		fromCurrency = toCurrency;
		toCurrency = temp;
		setTimeout(() => { isSwapping = false; }, 400);
		onSwap();
	}

</script>

{#if !mounted}
	<!-- Skeleton Loading State -->
	<div class="md:w-[32%] md:min-w-[240px] md:mx-auto md:bg-gray-50 md:dark:bg-gray-800/30 md:rounded-2xl md:p-4">
		<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
			<!-- Currency Selectors Skeleton -->
			<div class="p-3 space-y-3">
				<div class="flex items-center gap-2">
					<Skeleton width="w-16" height="h-3" />
					<Skeleton width="w-10" height="h-10" circle={true} />
					<Skeleton width="w-20" height="h-10" />
					<Skeleton width="w-7" height="h-7" circle={true} />
					<Skeleton width="w-12" height="h-3" />
					<Skeleton width="w-10" height="h-10" circle={true} />
					<Skeleton width="w-20" height="h-10" />
				</div>
				<Skeleton width="w-full" height="h-10" />
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
	<div class="md:w-[32%] md:min-w-[240px] md:mx-auto md:bg-gray-50 md:dark:bg-gray-800/30 md:rounded-2xl md:p-4">
		<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-200">
			<!-- Currency Selectors Row -->
			<div class="p-3 md:p-3 dark:text-gray-300">
				<div class="flex items-center gap-2 md:gap-1.5 mb-2 md:mb-1 flex-wrap">
					<label for="from-currency" class="text-xs md:text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.fromLabel')}</label>
					<FlagIcon code={fromCurrency} size="md" />
					<select
						id="from-currency"
						bind:value={fromCurrency}
						onchange={() => onFromCurrencyChange?.(fromCurrency)}
						class="shrink-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 md:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>

					<!-- Swap Button (horizontal ↔) -->
					<div bind:this={swapButtonEl} class="shrink-0 flex items-center justify-center">
						<button
							onclick={handleSwap}
							aria-label="Swap currencies"
							class="w-7 h-7 md:w-7 md:h-7 bg-emerald-500 text-white rounded-full shadow flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
							style="transform: rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
							</svg>
						</button>
					</div>

					<label for="to-currency" class="text-xs md:text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.toLabel')}</label>
					<FlagIcon code={toCurrency} size="md" />
					<select
						id="to-currency"
						bind:value={toCurrency}
						onchange={() => onToCurrencyChange?.(toCurrency)}
						class="shrink-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 md:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
					<span class="text-lg md:text-base font-semibold text-emerald-700 dark:text-emerald-300 tabular-nums truncate ml-auto bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-2.5 py-1">
						{convertedAmount() || '0.00'}
					</span>
				</div>
				<div class="relative">
					<slot name="input">
						<input
							bind:this={amountInput}
							use:currencyInput
							type="text"
							placeholder="0"
							inputmode={isMobile ? 'none' : 'decimal'}
							onfocus={onInputFocus}
							style="font-size: 16px;"
							class="w-full text-2xl md:text-xl font-semibold text-gray-900 dark:text-white bg-transparent border-0 focus:ring-0 focus:outline-none text-right placeholder-gray-300 dark:placeholder-gray-600 pr-12 cursor-pointer md:cursor-default {!inputHasValue ? 'animate-pulse md:animate-none' : ''}"
						/>
					</slot>
					{#if inputHasValue}
						<button
							onclick={onClear}
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
			{#if $fetchError}
				<div class="mt-2 flex items-start gap-1.5 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-2 py-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
					</svg>
					<p class="text-[11px] leading-snug text-amber-800 dark:text-amber-200">{$fetchError}</p>
				</div>
			{/if}
		</div>

		<slot name="actions" />
	</div>
{/if}

<style>
	button[aria-label="Swap currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}
</style>
