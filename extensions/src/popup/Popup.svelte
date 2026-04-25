<script lang="ts">
	import { onMount } from 'svelte';

	let fromCurrency = $state('USD');
	let toCurrency = $state('TZS');
	let amount = $state('');
	let convertedAmount = $state('');
	let rates: Record<string, Record<string, number>> = $state({});
	let loading = $state(true);

	const currencies = ['USD', 'EUR', 'GBP', 'TZS', 'KES', 'UGX', 'RWF', 'AED', 'CNY', 'INR'];

	onMount(async () => {
		try {
			// Fetch from a free exchange rate API
			const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
			const data = await response.json();
			
			// Build rates object for all currencies
			for (const currency of currencies) {
				const currencyResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
				const currencyData = await currencyResponse.json();
				rates[currency] = currencyData.rates;
			}
		} catch (error) {
			console.error('Failed to fetch rates:', error);
		} finally {
			loading = false;
		}
	});

	function convert() {
		const num = parseFloat(amount);
		if (isNaN(num) || num <= 0) {
			convertedAmount = '';
			return;
		}

		const rate = rates[fromCurrency]?.[toCurrency] ?? 1;
		convertedAmount = (num * rate).toLocaleString(undefined, { maximumFractionDigits: 2 });
	}

	function swapCurrencies() {
		const temp = fromCurrency;
		fromCurrency = toCurrency;
		toCurrency = temp;
		if (amount) convert();
	}
</script>

<div class="popup">
	<div class="header">
		<h1>EAX</h1>
		<p>Fast Currency Converter</p>
	</div>

	<div class="converter">
		<!-- From -->
		<div class="row">
			<label>From</label>
			<select bind:value={fromCurrency} onchange={() => convert()}>
				{#each currencies as currency}
					<option value={currency}>{currency}</option>
				{/each}
			</select>
		</div>

		<input
			type="number"
			placeholder="Enter amount"
			bind:value={amount}
			oninput={() => convert()}
		/>

		<!-- Swap Button -->
		<button class="swap" onclick={swapCurrencies}>⇅</button>

		<!-- To -->
		<div class="row">
			<label>To</label>
			<select bind:value={toCurrency} onchange={() => convert()}>
				{#each currencies as currency}
					<option value={currency}>{currency}</option>
				{/each}
			</select>
		</div>

		<div class="result">
			{#if loading}
				<p>Loading rates...</p>
			{:else if convertedAmount}
				<p class="amount">{convertedAmount}</p>
			{:else}
				<p class="placeholder">0.00</p>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(html, body) {
		width: 360px;
		min-height: 480px;
		margin: 0;
		padding: 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.popup {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20px;
		box-sizing: border-box;
		color: white;
	}

	.header {
		text-align: center;
		margin-bottom: 30px;
	}

	.header h1 {
		font-size: 32px;
		font-weight: 900;
		margin: 0;
		letter-spacing: 2px;
	}

	.header p {
		font-size: 12px;
		margin: 5px 0 0 0;
		opacity: 0.9;
	}

	.converter {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	label {
		font-size: 11px;
		font-weight: 500;
		opacity: 0.8;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	select,
	input {
		padding: 12px;
		border: none;
		border-radius: 8px;
		font-size: 14px;
		background: rgba(255, 255, 255, 0.95);
		color: #333;
		font-weight: 500;
	}

	input {
		font-size: 18px;
		font-weight: bold;
	}

	input::placeholder {
		color: #999;
	}

	.swap {
		align-self: center;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		font-size: 20px;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swap:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	.swap:active {
		transform: scale(0.95);
	}

	.result {
		background: rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		padding: 20px;
		text-align: center;
		margin-top: 10px;
		backdrop-filter: blur(10px);
	}

	.amount {
		font-size: 28px;
		font-weight: bold;
		margin: 0;
	}

	.placeholder {
		font-size: 28px;
		opacity: 0.6;
		margin: 0;
	}
</style>
