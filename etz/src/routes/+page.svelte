<script lang="ts">
	let amount = $state('');
	let fromCurrency = $state('USD');
	let toCurrency = $state('TZS');
	let amountInput: HTMLInputElement;
	
	// Sample exchange rates (will be replaced with real API data)
	const rates: Record<string, Record<string, number>> = {
		USD: { TZS: 2650, KES: 151, EUR: 0.92, GBP: 0.79 },
		TZS: { USD: 0.000377, KES: 0.057, EUR: 0.000346, GBP: 0.000298 },
		KES: { USD: 0.0066, TZS: 17.5, EUR: 0.0061, GBP: 0.0052 },
		EUR: { USD: 1.09, TZS: 2890, KES: 164, GBP: 0.86 },
		GBP: { USD: 1.26, TZS: 3350, KES: 191, EUR: 1.16 }
	};
	
	const convertedAmount = $derived(() => {
		const num = parseFloat(amount);
		if (isNaN(num) || num <= 0) return '';
		if (fromCurrency === toCurrency) return num.toLocaleString();
		const rate = rates[fromCurrency]?.[toCurrency] ?? 1;
		return (num * rate).toLocaleString(undefined, { maximumFractionDigits: 2 });
	});
	
	function swapCurrencies() {
		const temp = fromCurrency;
		fromCurrency = toCurrency;
		toCurrency = temp;
	}
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<!-- Header -->
	<div class="text-center mb-8 md:hidden">
		<h1 class="text-2xl font-bold text-emerald-600">Exchange.tz</h1>
		<p class="text-gray-500 text-sm mt-1">Quick currency conversions</p>
	</div>
	
	<!-- Converter Card -->
	<div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
		<!-- From Currency -->
		<div class="p-4 md:p-6">
			<label for="from-currency" class="block text-sm text-gray-500 mb-2">From</label>
			<div class="flex items-center gap-3">
				<select id="from-currency" bind:value={fromCurrency} class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500">
					<option value="USD">🇺🇸 USD</option>
					<option value="TZS">🇹🇿 TZS</option>
					<option value="KES">🇰🇪 KES</option>
					<option value="EUR">🇪🇺 EUR</option>
					<option value="GBP">🇬🇧 GBP</option>
				</select>
				<input
					bind:this={amountInput}
					type="number"
					bind:value={amount}
					placeholder="Tap to enter"
					inputmode="decimal"
					class="flex-1 text-2xl font-semibold text-gray-900 bg-transparent border-0 focus:ring-0 text-right placeholder-gray-400 {!amount ? 'animate-pulse md:animate-none' : ''}"
				/>
			</div>
		</div>
		
		<!-- Swap Button -->
		<div class="relative">
			<div class="border-t border-gray-100"></div>
			<button
				onclick={swapCurrencies}
				aria-label="Swap currencies"
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
				</svg>
			</button>
		</div>
		
		<!-- To Currency -->
		<div class="p-4 md:p-6 bg-gray-50">
			<label for="to-currency" class="block text-sm text-gray-500 mb-2">To</label>
			<div class="flex items-center gap-3">
				<select id="to-currency" bind:value={toCurrency} class="bg-white border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500">
					<option value="TZS">🇹🇿 TZS</option>
					<option value="KES">🇰🇪 KES</option>
					<option value="USD">🇺🇸 USD</option>
					<option value="EUR">🇪🇺 EUR</option>
					<option value="GBP">🇬🇧 GBP</option>
				</select>
				<p class="flex-1 text-2xl font-semibold text-emerald-600 text-right">
					{convertedAmount() || '0.00'}
				</p>
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

