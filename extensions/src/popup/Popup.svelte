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

	// Dark mode: read saved pref or fall back to OS preference
	const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
	const saved = localStorage.getItem('eax-theme');
	let isDark = $state(saved !== null ? saved === 'dark' : osPrefersDark.matches);

	// Keep <html> class and localStorage in sync
	$effect(() => {
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('eax-theme', isDark ? 'dark' : 'light');
	});

	// Follow OS changes only if the user hasn't manually overridden
	onMount(() => {
		const listener = (e: MediaQueryListEvent) => {
			if (localStorage.getItem('eax-theme') === null) isDark = e.matches;
		};
		osPrefersDark.addEventListener('change', listener);
		return () => osPrefersDark.removeEventListener('change', listener);
	});

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

<div class="popup-container" class:dark-bg={isDark}>
	<div class="header">
		<button
			class="theme-toggle"
			onclick={() => isDark = !isDark}
			aria-label="Toggle {isDark ? 'light' : 'dark'} mode"
			title="{isDark ? 'Switch to light mode' : 'Switch to dark mode'}"
		>
			{#if isDark}
				<!-- Sun icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="5"/>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
				</svg>
			{:else}
				<!-- Moon icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			{/if}
		</button>
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
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		transition: background 0.3s ease;
	}

	/* Light mode body background */
	:global(html body) {
		background: linear-gradient(135deg, #e8f5f0 0%, #d1ede4 100%);
	}

	/* Dark mode body background */
	:global(html.dark body) {
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
		position: relative;
		text-align: center;
		margin-bottom: 24px;
	}

	/* Header text color */
	:global(html.dark) .header {
		color: white;
	}
	:global(html:not(.dark)) .header {
		color: #064e3b;
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
		opacity: 0.75;
	}

	.theme-toggle {
		position: absolute;
		top: 0;
		right: 0;
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s, color 0.2s;
	}

	:global(html.dark) .theme-toggle {
		color: #fbbf24;
	}
	:global(html.dark) .theme-toggle:hover {
		background: rgba(255,255,255,0.1);
	}
	:global(html:not(.dark)) .theme-toggle {
		color: #059669;
	}
	:global(html:not(.dark)) .theme-toggle:hover {
		background: rgba(0,0,0,0.06);
	}

	.converter-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
