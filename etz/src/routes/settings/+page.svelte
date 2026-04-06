<script lang="ts">
	import { currencyOptions, defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import FlagIcon from '$lib/components/FlagIcon.svelte';

	let selectedFromCurrency = $defaultFromCurrency;
	let selectedToCurrency = $defaultToCurrency;

	function updateDefaultFromCurrency() {
		defaultFromCurrency.set(selectedFromCurrency);
	}

	function updateDefaultToCurrency() {
		defaultToCurrency.set(selectedToCurrency);
	}
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
	
	<div class="space-y-4">
		<!-- Default FROM Currency -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="font-medium text-gray-900">Default FROM Currency</p>
					<p class="text-sm text-gray-500">Select the currency you want to convert from.</p>
				</div>
				<div class="flex items-center gap-3">
					<FlagIcon code={selectedFromCurrency} size="md" />
					<select bind:value={selectedFromCurrency} on:change={updateDefaultFromCurrency} class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
						{#each currencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<!-- Default TO Currency -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="font-medium text-gray-900">Default TO Currency</p>
					<p class="text-sm text-gray-500">Select the currency you want to convert to.</p>
				</div>
				<div class="flex items-center gap-3">
					<FlagIcon code={selectedToCurrency} size="md" />
					<select bind:value={selectedToCurrency} on:change={updateDefaultToCurrency} class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
						{#each currencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		
	</div>
</div>
