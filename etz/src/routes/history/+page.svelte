<script lang="ts">
	import { onMount } from 'svelte';
	import { conversionHistory } from '$lib/stores/conversionHistory';

	onMount(() => {
		conversionHistory.loadFromStorage();
	});

	function getCurrencyColor(currency: string): string {
		const colors: Record<string, string> = {
			USD: 'emerald',
			EUR: 'blue',
			GBP: 'purple',
			TZS: 'emerald',
			KES: 'cyan',
			UGX: 'orange',
			RWF: 'pink',
			AED: 'yellow',
			CNY: 'red',
			INR: 'rose',
			ETB: 'lime',
			ZAR: 'indigo',
			ZMW: 'amber',
			SAR: 'fuchsia',
			CHF: 'slate',
			CAD: 'lime',
			AUD: 'sky',
			MWK: 'violet',
			MZN: 'teal',
			BIF: 'green',
			CDF: 'olive',
			NGN: 'orange',
			EGP: 'blue'
		};
		return colors[currency] || 'gray';
	}

	function formatDate(timestamp: string): string {
		const date = new Date(timestamp);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		const dateOnly = date.toDateString();
		const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

		if (dateOnly === today.toDateString()) return `Today, ${timeStr}`;
		if (dateOnly === yesterday.toDateString()) return `Yesterday, ${timeStr}`;

		return `${date.toLocaleDateString()}, ${timeStr}`;
	}

	function deleteConversion(id: string) {
		conversionHistory.removeConversion(id);
	}
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">History</h1>
	<p class="text-gray-600 mb-6">Your conversion history</p>
	
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
		<div class="divide-y divide-gray-100">
			{#if $conversionHistory.length === 0}
				<div class="p-8 text-center">
					<p class="text-gray-500 mb-2">No conversions saved yet</p>
					<p class="text-sm text-gray-400">Go to Home and save a conversion to get started</p>
				</div>
			{:else}
				{#each $conversionHistory as item (item.id)}
					<div class="p-4 hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between mb-2 gap-3">
								<span class="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
								<div class="flex items-center gap-2">
									<span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{item.fromCurrency} → {item.toCurrency}</span>
									<button
										type="button"
										class="text-gray-400 hover:text-red-600 transition-colors text-sm"
										on:click={() => deleteConversion(item.id)}
									>
										Delete
									</button>
								</div>
						</div>
						<div class="flex items-center justify-between">
							<p class="font-medium text-gray-900">{item.fromAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {item.fromCurrency}</p>
							<span class="text-gray-400">→</span>
							<p class="font-semibold text-emerald-600">{item.toAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {item.toCurrency}</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
	
	<p class="text-center text-sm text-gray-400 mt-6">Conversions are saved locally on your device</p>
</div>
