<script lang="ts">
	import { tick } from 'svelte';

	let amount = $state('');
	let fromCurrency = $state('USD');
	let toCurrency = $state('TZS');
	let swapRotation = $state(0);
	let isSwapping = $state(false);

	function formatWithCommas(value: string): string {
		if (!value) return '';
		const parts = value.split('.');
		parts[0] = parts[0].replace(/^0+(?=\d)/, '');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	}

	function stripToNumeric(value: string): string {
		const cleaned = value.replace(/[^0-9.]/g, '');
		const [intPart, ...rest] = cleaned.split('.');
		return intPart + (rest.length ? '.' + rest.join('') : '');
	}

	// Svelte action: handles formatting + caret preservation imperatively
	function currencyInput(node: HTMLInputElement) {
		async function handleInput() {
			const cursorPos = node.selectionStart ?? node.value.length;
			const rawBefore = node.value;

			// count digits before cursor in the raw (pre-format) value
			const digitsBeforeCursor = rawBefore.slice(0, cursorPos).replace(/[^0-9.]/g, '').length;

			// strip to clean number, update reactive state
			const numeric = stripToNumeric(rawBefore.replace(/,/g, ''));
			amount = numeric;

			// wait for Svelte to finish re-rendering (it may reset node.value)
			await tick();

			// format with commas and set DOM value AFTER Svelte's update
			const formatted = formatWithCommas(numeric);
			node.value = formatted;

			// restore cursor: walk through formatted string counting digits until we match
			let digitsSeen = 0;
			let newCursor = 0;
			for (let i = 0; i < formatted.length; i++) {
				if (formatted[i] !== ',') digitsSeen++;
				if (digitsSeen === digitsBeforeCursor) {
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

	const rates: Record<string, Record<string, number>> = {
		USD: { TZS: 2650, KES: 151, EUR: 0.92, GBP: 0.79 },
		TZS: { USD: 0.000377, KES: 0.057, EUR: 0.000346, GBP: 0.000298 },
		KES: { USD: 0.0066, TZS: 17.5, EUR: 0.0061, GBP: 0.0052 },
		EUR: { USD: 1.09, TZS: 2890, KES: 164, GBP: 0.86 },
		GBP: { USD: 1.26, TZS: 3350, KES: 191, EUR: 1.16 }
	};

	const currencySymbol: Record<string, string> = {
		USD: '$',
		TZS: 'TSh',
		KES: 'KSh',
		EUR: '€',
		GBP: '£'
	};

	const convertedAmount = $derived(() => {
		const num = parseFloat(amount);
		if (isNaN(num) || num <= 0) return '';
		if (fromCurrency === toCurrency) return num.toLocaleString();
		const rate = rates[fromCurrency]?.[toCurrency] ?? 1;
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
</script>

<div class="p-4 md:p-8 w-full max-w-full mx-auto md:min-h-[calc(100vh-6rem)] md:flex md:items-center md:justify-center">
	<!-- Header -->
	<div class="text-center mb-8 md:hidden">
		<h1 class="text-2xl font-bold text-emerald-600">Exchange.tz</h1>
		<p class="text-gray-500 text-sm mt-1">Quick currency conversions</p>
	</div>
	
	<!-- Converter Card + Rate Info wrapper -->
	<div class="md:w-[30%] md:min-w-[320px] md:mx-auto">
		<div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
			<!-- From Currency -->
			<div class="p-4 md:p-6">
				<label for="from-currency" class="block text-sm text-gray-500 mb-3">From</label>
				<div class="flex items-center gap-3">
					<select id="from-currency" bind:value={fromCurrency} class="shrink-0 bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500">
						<option value="USD">🇺🇸 USD</option>
						<option value="TZS">🇹🇿 TZS</option>
						<option value="KES">🇰🇪 KES</option>
						<option value="EUR">🇪🇺 EUR</option>
						<option value="GBP">🇬🇧 GBP</option>
					</select>
					<div class="flex-1 min-w-0 flex items-center justify-end gap-1">
						<span class="shrink-0 text-lg font-medium text-gray-500">{currencySymbol[fromCurrency]}</span>
						<input
							use:currencyInput
							type="text"
							placeholder="0"
							inputmode="decimal"
							class="min-w-0 w-full text-2xl font-semibold text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none text-right placeholder-gray-300 {!amount ? 'animate-pulse md:animate-none' : ''}"
						/>
					</div>
				</div>
			</div>
			
			<!-- Swap Button -->
			<div class="relative py-2">
				<div class="border-t border-gray-100"></div>
				<button
					onclick={swapCurrencies}
					aria-label="Swap currencies"
					class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
					style="transform: translate(-50%, -50%) rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
					</svg>
				</button>
			</div>
			
			<!-- To Currency -->
			<div class="p-4 md:p-6 bg-gray-50">
				<label for="to-currency" class="block text-sm text-gray-500 mb-3">To</label>
				<div class="flex items-center gap-3">
					<select id="to-currency" bind:value={toCurrency} class="shrink-0 bg-white border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500">
						<option value="TZS">🇹🇿 TZS</option>
						<option value="KES">🇰🇪 KES</option>
						<option value="USD">🇺🇸 USD</option>
						<option value="EUR">🇪🇺 EUR</option>
						<option value="GBP">🇬🇧 GBP</option>
					</select>
					<div class="flex-1 min-w-0 flex items-center justify-end gap-1 overflow-hidden">
						<span class="shrink-0 text-lg font-medium text-emerald-500">{currencySymbol[toCurrency]}</span>
						<p class="text-2xl font-semibold text-emerald-600 tabular-nums truncate">
							{convertedAmount() || '0.00'}
						</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Current Rate Info -->
		{#if amount && convertedAmount()}
			<div class="mt-4 text-center text-sm text-gray-500">
				1 {fromCurrency} = {rates[fromCurrency]?.[toCurrency]?.toLocaleString() ?? '1'} {toCurrency}
			</div>
		{/if}
	</div>
</div>

<style>
	button[aria-label="Swap currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}
</style>