<script lang="ts">
	import { onMount } from 'svelte';
	import ConverterCard from '../lib/ConverterCard.svelte';

	let fromCurrency = $state('USD');
	let toCurrency = $state('TZS');
	let amount = $state('');
	let inputHasValue = $state(false);
	let rates: Record<string, Record<string, number>> = $state({});
	let isLoading = $state(true);
	let fetchError = $state('');
	let lastUpdated = $state<number | undefined>();

	const currencies = ['USD', 'EUR', 'GBP', 'TZS', 'KES', 'UGX', 'RWF', 'AED', 'CNY', 'INR', 'ETB', 'ZAR', 'ZMW', 'SAR', 'CHF', 'CAD', 'AUD'];

	onMount(async () => {
		try {
			for (const currency of currencies) {
				const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
				const data = await response.json();
				rates[currency] = data.rates;
			}
			lastUpdated = Date.now();
		} catch (error) {
			console.error('Failed to fetch rates:', error);
			fetchError = 'Failed to load exchange rates';
		} finally {
			isLoading = false;
		}
	});

	function handleSwap() {
		// Swap is handled by ConverterCard
	}

	function handleClear() {
		amount = '';
		inputHasValue = false;
	}

	function handleFromCurrencyChange(currency: string) {
		fromCurrency = currency;
	}

	function handleToCurrencyChange(currency: string) {
		toCurrency = currency;
	}

	function t(key: string): string {
		const translations: Record<string, string> = {
			'home.fromLabel': 'From',
			'home.toLabel': 'To',
			'home.exchangeRate': 'Exchange Rate',
			'messages.loading': 'Loading'
		};
		return translations[key] || key;
	}
</script>

<div class="popup-container">
	<div class="header">
		<img src="/icons/icon128.png" alt="EAX" class="logo" />
		<p>Fast Currency Converter</p>
	</div>

	<div class="converter-wrapper">
		<ConverterCard
			bind:fromCurrency
			bind:toCurrency
			bind:amount
			bind:inputHasValue
			mounted={true}
			isMobile={false}
			{isLoading}
			{lastUpdated}
			{fetchError}
			{rates}
			onSwap={handleSwap}
			onClear={handleClear}
			onFromCurrencyChange={handleFromCurrencyChange}
			onToCurrencyChange={handleToCurrencyChange}
			{t}
		/>
	</div>
</div>

<style>
	:global(html, body) {
		width: 360px;
		min-height: 540px;
		margin: 0;
		padding: 0;
		background: linear-gradient(135deg, #222 0%, #111 100%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color-scheme: light dark;
	}

	:global(body.dark) {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	}

	.popup-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 16px;
		box-sizing: border-box;
	}

	.header {
		text-align: center;
		margin-bottom: 24px;
		color: white;
	}

	.logo {
		width: 72px;
		height: 72px;
		border-radius: 16px;
		margin: 0 auto;
		display: block;
	}

	.header p {
		font-size: 12px;
		margin: 5px 0 0 0;
		opacity: 0.9;
	}

	.converter-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Override ConverterCard styles for dark theme in popup */
	:global(.popup-container) {
		--color-emerald-500: #10b981;
		--color-emerald-600: #059669;
		--color-white: #ffffff;
	}
</style>
