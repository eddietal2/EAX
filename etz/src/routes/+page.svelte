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
		USD: { EUR: 0.92, GBP: 0.79, TZS: 2650, KES: 151, UGX: 3800, RWF: 1200, AED: 3.67, CNY: 7.2, INR: 83, ETB: 57, ZAR: 18, ZMW: 27, SAR: 3.75, CHF: 0.88, CAD: 1.34, AUD: 1.52, MWK: 1300, MZN: 63, BIF: 2900, CDF: 2800, NGN: 1550, EGP: 30 },
		EUR: { USD: 1.09, GBP: 0.86, TZS: 2890, KES: 164, UGX: 4130, RWF: 1305, AED: 4.00, CNY: 7.83, INR: 90.4, ETB: 62, ZAR: 19.6, ZMW: 29.4, SAR: 4.08, CHF: 0.96, CAD: 1.46, AUD: 1.65, MWK: 1415, MZN: 68.6, BIF: 3160, CDF: 3045, NGN: 1686, EGP: 32.6 },
		GBP: { USD: 1.26, EUR: 1.16, TZS: 3350, KES: 191, UGX: 4800, RWF: 1516, AED: 4.65, CNY: 9.10, INR: 105, ETB: 72, ZAR: 22.8, ZMW: 34.2, SAR: 4.74, CHF: 1.11, CAD: 1.70, AUD: 1.92, MWK: 1645, MZN: 79.8, BIF: 3670, CDF: 3540, NGN: 1960, EGP: 37.9 },
		TZS: { USD: 0.000377, EUR: 0.000346, GBP: 0.000298, KES: 0.057, UGX: 1.43, RWF: 0.453, AED: 0.00139, CNY: 0.00272, INR: 0.0313, ETB: 0.0215, ZAR: 0.00679, ZMW: 0.0102, SAR: 0.00142, CHF: 0.000332, CAD: 0.000506, AUD: 0.000575, MWK: 0.491, MZN: 0.0238, BIF: 1.09, CDF: 1.06, NGN: 0.585, EGP: 0.0113 },
		KES: { USD: 0.0066, EUR: 0.0061, GBP: 0.0052, TZS: 17.5, UGX: 25.2, RWF: 7.95, AED: 0.0243, CNY: 0.0477, INR: 0.549, ETB: 0.377, ZAR: 0.119, ZMW: 0.179, SAR: 0.0248, CHF: 0.00583, CAD: 0.00887, AUD: 0.0101, MWK: 8.61, MZN: 0.418, BIF: 19.2, CDF: 18.5, NGN: 10.3, EGP: 0.199 },
		UGX: { USD: 0.000263, EUR: 0.000242, GBP: 0.000208, TZS: 0.697, KES: 0.0397, RWF: 0.316, AED: 0.000965, CNY: 0.00189, INR: 0.0218, ETB: 0.015, ZAR: 0.00474, ZMW: 0.0071, SAR: 0.000987, CHF: 0.000232, CAD: 0.000352, AUD: 0.0004, MWK: 0.342, MZN: 0.0166, BIF: 0.763, CDF: 0.737, NGN: 0.409, EGP: 0.0079 },
		RWF: { USD: 0.000833, EUR: 0.000766, GBP: 0.000659, TZS: 2.21, KES: 0.126, UGX: 3.16, AED: 0.00306, CNY: 0.006, INR: 0.0692, ETB: 0.0475, ZAR: 0.015, ZMW: 0.0225, SAR: 0.003125, CHF: 0.000734, CAD: 0.001116, AUD: 0.00127, MWK: 1.08, MZN: 0.0525, BIF: 2.42, CDF: 2.34, NGN: 1.29, EGP: 0.025 },
		AED: { USD: 0.272, EUR: 0.25, GBP: 0.214, TZS: 721, KES: 41.1, UGX: 1036, RWF: 327, CNY: 1.96, INR: 22.6, ETB: 15.5, ZAR: 4.91, ZMW: 7.36, SAR: 1.022, CHF: 0.24, CAD: 0.365, AUD: 0.415, MWK: 353, MZN: 17.2, BIF: 792, CDF: 767, NGN: 422, EGP: 8.18 },
		CNY: { USD: 0.139, EUR: 0.118, GBP: 0.109, TZS: 368, KES: 21, UGX: 528, RWF: 167, AED: 0.51, INR: 11.5, ETB: 7.91, ZAR: 2.5, ZMW: 3.75, SAR: 0.521, CHF: 0.122, CAD: 0.186, AUD: 0.211, MWK: 180, MZN: 8.75, BIF: 404, CDF: 391, NGN: 215, EGP: 4.17 },
		INR: { USD: 0.012, EUR: 0.0102, GBP: 0.0075, TZS: 31.9, KES: 1.82, UGX: 45.8, RWF: 14.5, AED: 0.044, CNY: 0.087, ETB: 0.687, ZAR: 0.216, ZMW: 0.326, SAR: 0.045, CHF: 0.0106, CAD: 0.0162, AUD: 0.0184, MWK: 15.7, MZN: 0.76, BIF: 35.1, CDF: 34, NGN: 18.7, EGP: 0.361 },
		ETB: { USD: 0.0175, EUR: 0.0148, GBP: 0.0139, TZS: 46.5, KES: 2.65, UGX: 66.7, RWF: 21, AED: 0.064, CNY: 0.126, INR: 1.46, ZAR: 0.315, ZMW: 0.474, SAR: 0.0658, CHF: 0.0154, CAD: 0.0235, AUD: 0.0268, MWK: 22.8, MZN: 1.11, BIF: 51, CDF: 49.5, NGN: 27.2, EGP: 0.526 },
		ZAR: { USD: 0.0556, EUR: 0.051, GBP: 0.0438, TZS: 147, KES: 8.4, UGX: 211, RWF: 67, AED: 0.204, CNY: 0.4, INR: 4.63, ETB: 3.18, ZMW: 1.5, SAR: 0.209, CHF: 0.049, CAD: 0.0745, AUD: 0.085, MWK: 72.2, MZN: 3.5, BIF: 161, CDF: 157, NGN: 86.1, EGP: 1.67 },
		ZMW: { USD: 0.037, EUR: 0.034, GBP: 0.029, TZS: 98, KES: 5.6, UGX: 141, RWF: 44.5, AED: 0.136, CNY: 0.267, INR: 3.07, ETB: 2.12, ZAR: 0.667, SAR: 0.139, CHF: 0.0325, CAD: 0.0497, AUD: 0.0567, MWK: 48, MZN: 2.33, BIF: 107, CDF: 104, NGN: 57.4, EGP: 1.11 },
		SAR: { USD: 0.267, EUR: 0.245, GBP: 0.211, TZS: 707, KES: 40.3, UGX: 1015, RWF: 321, AED: 0.978, CNY: 1.92, INR: 22.1, ETB: 15.2, ZAR: 4.78, ZMW: 7.18, CHF: 0.235, CAD: 0.358, AUD: 0.408, MWK: 348, MZN: 16.9, BIF: 775, CDF: 750, NGN: 413, EGP: 8.01 },
		CHF: { USD: 1.136, EUR: 1.042, GBP: 0.901, TZS: 3010, KES: 171, UGX: 4318, RWF: 1364, AED: 4.17, CNY: 8.18, INR: 94.3, ETB: 64.7, ZAR: 20.4, ZMW: 30.7, SAR: 4.26, CAD: 1.525, AUD: 1.74, MWK: 1480, MZN: 72, BIF: 3300, CDF: 3193, NGN: 1762, EGP: 34.1 },
		CAD: { USD: 0.744, EUR: 0.683, GBP: 0.591, TZS: 1975, KES: 112.5, UGX: 2835, RWF: 894, AED: 2.73, CNY: 5.36, INR: 61.8, ETB: 42.4, ZAR: 13.4, ZMW: 20.1, SAR: 2.79, CHF: 0.656, AUD: 1.14, MWK: 970, MZN: 47.1, BIF: 2163, CDF: 2092, NGN: 1155, EGP: 22.4 },
		AUD: { USD: 0.658, EUR: 0.603, GBP: 0.521, TZS: 1750, KES: 99.5, UGX: 2500, RWF: 789, AED: 2.41, CNY: 4.73, INR: 54.6, ETB: 37.5, ZAR: 11.8, ZMW: 17.8, SAR: 2.47, CHF: 0.576, CAD: 0.876, MWK: 857, MZN: 41.6, BIF: 1913, CDF: 1851, NGN: 1020, EGP: 19.8 },
		MWK: { USD: 0.000769, EUR: 0.000707, GBP: 0.000608, TZS: 2.04, KES: 0.116, UGX: 2.92, RWF: 0.926, AED: 0.00283, CNY: 0.00556, INR: 0.0637, ETB: 0.0438, ZAR: 0.0139, ZMW: 0.0208, SAR: 0.00288, CHF: 0.000676, CAD: 0.00103, AUD: 0.00117, MZN: 0.0485, BIF: 2.24, CDF: 2.16, NGN: 1.19, EGP: 0.023 },
		MZN: { USD: 0.0159, EUR: 0.0146, GBP: 0.0125, TZS: 42.1, KES: 2.4, UGX: 60.3, RWF: 19.1, AED: 0.0583, CNY: 0.114, INR: 1.31, ETB: 0.902, ZAR: 0.286, ZMW: 0.427, SAR: 0.0594, CHF: 0.0139, CAD: 0.0212, AUD: 0.0242, MWK: 20.6, BIF: 46.1, CDF: 44.5, NGN: 24.5, EGP: 0.476 },
		BIF: { USD: 0.000345, EUR: 0.000316, GBP: 0.000272, TZS: 0.914, KES: 0.052, UGX: 1.31, RWF: 0.414, AED: 0.00126, CNY: 0.00248, INR: 0.0285, ETB: 0.0196, ZAR: 0.00621, ZMW: 0.00933, SAR: 0.00129, CHF: 0.000303, CAD: 0.000462, AUD: 0.000523, MWK: 0.447, MZN: 0.0217, CDF: 0.964, NGN: 0.531, EGP: 0.0103 },
		CDF: { USD: 0.000357, EUR: 0.000328, GBP: 0.000282, TZS: 0.943, KES: 0.054, UGX: 1.36, RWF: 0.429, AED: 0.00131, CNY: 0.00257, INR: 0.0296, ETB: 0.0203, ZAR: 0.00644, ZMW: 0.00966, SAR: 0.00134, CHF: 0.000314, CAD: 0.000479, AUD: 0.000542, MWK: 0.464, MZN: 0.0225, BIF: 1.04, NGN: 0.551, EGP: 0.0107 },
		NGN: { USD: 0.000645, EUR: 0.000594, GBP: 0.000510, TZS: 1.71, KES: 0.097, UGX: 2.44, RWF: 0.775, AED: 0.00237, CNY: 0.00467, INR: 0.0535, ETB: 0.0368, ZAR: 0.0116, ZMW: 0.0174, SAR: 0.00243, CHF: 0.000569, CAD: 0.000867, AUD: 0.000981, MWK: 0.840, MZN: 0.0408, BIF: 1.88, CDF: 1.82, EGP: 0.0194 },
		EGP: { USD: 0.0333, EUR: 0.0307, GBP: 0.0264, TZS: 88.3, KES: 5.03, UGX: 126.5, RWF: 39.95, AED: 0.122, CNY: 0.240, INR: 2.75, ETB: 1.90, ZAR: 0.599, ZMW: 0.900, SAR: 0.125, CHF: 0.0293, CAD: 0.0447, AUD: 0.0506, MWK: 43.3, MZN: 2.10, BIF: 96.8, CDF: 93.8, NGN: 51.5 }
	};

	const currencySymbol: Record<string, string> = {
		USD: '$',
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
	<div class="md:w-[40%] md:min-w-[320px] md:mx-auto">
		<div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
			<!-- From Currency -->
			<div class="p-4 md:p-6">
				<label for="from-currency" class="block text-sm text-gray-500 mb-3">From</label>
				<div class="flex items-center gap-3">
					<select id="from-currency" bind:value={fromCurrency} class="shrink-0 bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500">
						<option value="USD">🇺🇸 USD</option>
					<option value="EUR">🇪🇺 EUR</option>
					<option value="GBP">🇬🇧 GBP</option>
					<option value="TZS">🇹🇿 TZS</option>
					<option value="KES">🇰🇪 KES</option>
					<option value="UGX">🇺🇬 UGX</option>
					<option value="RWF">🇷🇼 RWF</option>
					<option value="AED">🇦🇪 AED</option>
					<option value="CNY">🇨🇳 CNY</option>
					<option value="INR">🇮🇳 INR</option>
					<option value="ETB">🇪🇹 ETB</option>
					<option value="ZAR">🇿🇦 ZAR</option>
					<option value="ZMW">🇿🇲 ZMW</option>
					<option value="SAR">🇸🇦 SAR</option>
					<option value="CHF">🇨🇭 CHF</option>
					<option value="CAD">🇨🇦 CAD</option>
					<option value="AUD">🇦🇺 AUD</option>
					<option value="MWK">🇲🇼 MWK</option>
					<option value="MZN">🇲🇿 MZN</option>
					<option value="BIF">🇧🇮 BIF</option>
					<option value="CDF">🇨🇩 CDF</option>
					<option value="NGN">🇳🇬 NGN</option>
					<option value="EGP">🇪🇬 EGP</option>
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
			<div class="flex items-center justify-center relative py-2">
				<div class="absolute inset-x-0 top-1/2 border-t border-gray-100"></div>
				<button
					onclick={swapCurrencies}
					aria-label="Swap currencies"
					class="relative w-10 h-10 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
					style="transform: rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
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
						<option value="GBP">🇬🇧 GBP</option>					<option value="UGX">🇺🇬 UGX</option>
					<option value="RWF">🇷🇼 RWF</option>
					<option value="AED">🇦🇪 AED</option>
					<option value="CNY">🇨🇳 CNY</option>
					<option value="INR">🇮🇳 INR</option>
					<option value="ETB">🇪🇹 ETB</option>
					<option value="ZAR">🇿🇦 ZAR</option>
					<option value="ZMW">🇿🇲 ZMW</option>
					<option value="SAR">🇸🇦 SAR</option>
					<option value="CHF">🇨🇭 CHF</option>
					<option value="CAD">🇨🇦 CAD</option>
					<option value="AUD">🇦🇺 AUD</option>
					<option value="MWK">🇲🇼 MWK</option>
					<option value="MZN">🇲🇿 MZN</option>
					<option value="BIF">🇧🇮 BIF</option>
					<option value="CDF">🇨🇩 CDF</option>
					<option value="NGN">🇳🇬 NGN</option>
					<option value="EGP">🇪🇬 EGP</option>					</select>
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