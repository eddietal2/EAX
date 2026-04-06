<script lang="ts">
	import { currencyOptions, defaultCurrency } from '$lib/stores/settings';
	import FlagIcon from '$lib/components/FlagIcon.svelte';

	let selectedCurrency = $defaultCurrency;

	function updateDefaultCurrency() {
		defaultCurrency.set(selectedCurrency);
	}
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
	
	<div class="space-y-4">
		<!-- Default Currency -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="font-medium text-gray-900">Default Currency</p>
					<p class="text-sm text-gray-500">Select the currency you want to start with in the converter.</p>
				</div>
				<div class="flex items-center gap-3">
					<FlagIcon code={selectedCurrency} size="md" />
					<select bind:value={selectedCurrency} on:change={updateDefaultCurrency} class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
						{#each currencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		
	</div>
</div>
