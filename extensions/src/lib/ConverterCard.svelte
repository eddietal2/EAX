<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import FlagIcon from './FlagIcon.svelte';

	interface Props {
		fromCurrency: string;
		toCurrency: string;
		amount: string;
		inputHasValue: boolean;
		convertedAmount?: () => string;
		mounted: boolean;
		isMobile?: boolean;
		onSwap: () => void;
		onClear: () => void;
		onInputFocus?: () => void;
		onFromCurrencyChange?: (currency: string) => void;
		onToCurrencyChange?: (currency: string) => void;
		t?: (key: string) => string;
		rates?: Record<string, Record<string, number>>;
		isLoading?: boolean;
		lastUpdated?: number;
		fetchError?: string;
		actions?: Snippet;
	}

	let {
		fromCurrency = $bindable('USD'),
		toCurrency = $bindable('TZS'),
		amount = $bindable(''),
		inputHasValue = $bindable(false),
		convertedAmount,
		mounted = true,
		isMobile = false,
		onSwap,
		onClear,
		onInputFocus,
		onFromCurrencyChange,
		onToCurrencyChange,
		t = (key: string) => key,
		rates = {},
		isLoading = false,
		lastUpdated,
		fetchError,
		actions
	}: Props = $props();

	const currencies = [
		'USD', 'EUR', 'GBP', 'TZS', 'KES', 'UGX', 'RWF', 'AED', 'CNY', 'INR',
		'ETB', 'ZAR', 'ZMW', 'SAR', 'CHF', 'CAD', 'AUD', 'MWK', 'MZN', 'BIF', 'CDF', 'NGN', 'EGP'
	];

	let internalConvertedAmount = $derived.by(() => {
		if (!amount || amount.trim() === '') return '0.00';
		const num = parseFloat(amount.replace(/,/g, ''));
		if (isNaN(num) || num <= 0) return '0.00';
		const rate = rates[fromCurrency]?.[toCurrency] ?? 1;
		return (num * rate).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
	});

	let swapRotation = $state(0);
	let isSwapping = $state(false);
	let amountInput = $state<HTMLInputElement | undefined>();
	let swapButtonEl = $state<HTMLDivElement | undefined>();

	function stripToNumeric(value: string): string {
		const cleaned = value.replace(/[^0-9.+\-*/]/g, '');
		const [intPart, ...rest] = cleaned.split('.');
		return intPart + (rest.length ? '.' + rest.join('') : '');
	}

	// Safe arithmetic parser — no eval/Function (blocked by extension CSP)
	function safeCalc(expr: string): number {
		let pos = 0;
		const skip = () => { while (pos < expr.length && expr[pos] === ' ') pos++; };
		function parseNum(): number {
			skip();
			let s = '';
			while (pos < expr.length && /[\d.]/.test(expr[pos])) s += expr[pos++];
			return s ? parseFloat(s) : NaN;
		}
		function parseTerm(): number {
			let left = parseNum(); skip();
			while (pos < expr.length && (expr[pos] === '*' || expr[pos] === '/')) {
				const op = expr[pos++]; skip();
				const right = parseNum();
				left = op === '*' ? left * right : left / right; skip();
			}
			return left;
		}
		function parseExpr(): number {
			skip();
			let negate = false;
			if (pos < expr.length && expr[pos] === '-') { negate = true; pos++; }
			let left = parseTerm(); if (negate) left = -left; skip();
			while (pos < expr.length && (expr[pos] === '+' || expr[pos] === '-')) {
				const op = expr[pos++]; skip();
				left = op === '+' ? left + parseTerm() : left - parseTerm(); skip();
			}
			return left;
		}
		return parseExpr();
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
			
			const result = safeCalc(toEvaluate);
			
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

	// Restore the displayed input value when reopening the popup with a saved amount
	onMount(() => {
		if (amount && amountInput) {
			amountInput.value = formatExpressionWithCommas(amount);
		}
	});

	// Keep the visible input in sync with `amount` when it changes outside of
	// typing (e.g. the Clear Input button sets amount to ''). The currencyInput
	// action owns the DOM value + cursor while the field is being edited, so
	// skip syncing while it has focus to avoid stomping the caret.
	$effect(() => {
		const el = amountInput;
		if (!el || document.activeElement === el) return;
		const desired = formatExpressionWithCommas(amount);
		if (el.value !== desired) el.value = desired;
	});

	// Clear handler: onClear only updates Svelte state (which removes the X
	// button via inputHasValue), so also clear the input's DOM value directly
	// here. This runs deterministically on click, independent of effect timing
	// or which element currently has focus.
	function handleClearClick() {
		if (amountInput) amountInput.value = '';
		onClear();
	}
</script>

<div class="converter-card">
	<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-200">
		<!-- From Currency -->
		<div class="p-3 dark:text-gray-300">
			<div class="flex items-center gap-3">
				<label for="from-currency" class="text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.fromLabel')}</label>
				<div class="flex items-center gap-2 shrink-0">
					<FlagIcon code={fromCurrency} size="md" />
					<select
						id="from-currency"
						bind:value={fromCurrency}
						onchange={() => onFromCurrencyChange?.(fromCurrency)}
						class="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="flex-1 min-w-0 relative mt-2">
				<input
					bind:this={amountInput}
					use:currencyInput
					type="text"
					placeholder="0"
					inputmode={isMobile ? 'none' : 'decimal'}
					onfocus={onInputFocus}
					style="font-size: 16px;"
					class="min-w-0 w-full text-xl font-semibold text-gray-900 dark:text-white bg-transparent border-0 focus:ring-0 focus:outline-none text-right placeholder-gray-300 dark:placeholder-gray-600 pr-12 cursor-pointer md:cursor-default {!inputHasValue ? 'animate-pulse' : ''}"
				/>
				{#if inputHasValue}
					<button
						onclick={handleClearClick}
						aria-label={t('popup.clearInput')}
						class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				{/if}
			</div>
		</div>

		<!-- Swap Button -->
		<div bind:this={swapButtonEl} class="flex items-center justify-center relative py-1">
			<div class="absolute inset-x-0 top-1/2 border-t border-gray-100"></div>
			<button
				onclick={handleSwap}
				aria-label={t('popup.swapCurrencies')}
				class="relative w-8 h-8 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
				style="transform: rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
				</svg>
			</button>
		</div>

		<!-- To Currency -->
		<div class="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
			<label for="to-currency" class="block text-xs text-gray-500 dark:text-gray-400 mb-2">{t('home.toLabel')}</label>
			<div class="flex items-center gap-3">
				<div class="flex items-center gap-2 shrink-0">
					<FlagIcon code={toCurrency} size="md" />
					<select
						id="to-currency"
						bind:value={toCurrency}
						onchange={() => onToCurrencyChange?.(toCurrency)}
						class="bg-white dark:bg-gray-700 border-0 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>
				<div class="flex-1 min-w-0">
					<p class="text-xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums truncate">
					{convertedAmount?.() ?? internalConvertedAmount}
					</p>
				</div>
			</div>
		</div>
	</div>


	<!-- Current Exchange Rate Label -->
	<div class="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 relative transition-colors duration-200">
		<div class="flex items-center justify-between">
			<p class="text-xs font-medium text-emerald-900 dark:text-emerald-200">{t('home.exchangeRate')}</p>
			{#if isLoading}
				<div class="flex items-center gap-1.5">
					<div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
					<span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('messages.loading')}</span>
				</div>
			{/if}
		</div>
		<p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 {isLoading ? 'opacity-70' : ''}">
			<span class="text-xs">1 {fromCurrency} = {( rates[fromCurrency]?.[toCurrency] ?? 1 ).toLocaleString(undefined, { maximumFractionDigits: 4 })} {toCurrency}</span>
		</p>
	</div>

	<!-- {#if lastUpdated}
		<div class="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">
			{t('popup.updated')} {new Date(lastUpdated).toLocaleString()}
		</div>
	{/if} -->

	{#if actions}
		{@render actions()}
	{/if}
</div>

<style>
	.converter-card {
		width: 100%;
	}

	button[aria-label="Swap currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}
</style>
