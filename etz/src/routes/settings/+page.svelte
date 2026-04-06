<script lang="ts">
	import { currencyOptions, defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import { currentLanguage, languages, getTranslation } from '$lib/stores/i18n';
	import FlagIcon from '$lib/components/FlagIcon.svelte';

	let selectedFromCurrency = $state($defaultFromCurrency);
	let selectedToCurrency = $state($defaultToCurrency);
	let selectedLanguage = $state($currentLanguage);
	let isChangingLanguage = $state(false);

	function updateDefaultFromCurrency() {
		defaultFromCurrency.set(selectedFromCurrency);
	}

	function updateDefaultToCurrency() {
		defaultToCurrency.set(selectedToCurrency);
	}

	async function updateLanguage() {
		isChangingLanguage = true;
		currentLanguage.set(selectedLanguage);
		// Simulate a brief loading state for UX feedback
		await new Promise(resolve => setTimeout(resolve, 300));
		isChangingLanguage = false;
	}

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">{t('settings.title')}</h1>
	
	<div class="space-y-4">
		<!-- Language Selection -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="font-medium text-gray-900">{t('settings.language')}</p>
					<p class="text-sm text-gray-500">{t('settings.languageDescription')}</p>
				</div>
				<div class="flex items-center gap-3 relative">
					<select 
						bind:value={selectedLanguage} 
						onchange={updateLanguage}
						disabled={isChangingLanguage}
						class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#each languages as lang}
							<option value={lang.code}>{lang.nativeName}</option>
						{/each}
					</select>
					{#if isChangingLanguage}
						<div class="absolute right-2 flex items-center">
							<svg class="animate-spin h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Default FROM Currency -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="font-medium text-gray-900">{t('settings.defaultFromCurrency')}</p>
					<p class="text-sm text-gray-500">{t('settings.defaultFromDescription')}</p>
				</div>
				<div class="flex items-center gap-3">
					<FlagIcon code={selectedFromCurrency} size="md" />
					<select bind:value={selectedFromCurrency} onchange={updateDefaultFromCurrency} class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
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
					<p class="font-medium text-gray-900">{t('settings.defaultToCurrency')}</p>
					<p class="text-sm text-gray-500">{t('settings.defaultToDescription')}</p>
				</div>
				<div class="flex items-center gap-3">
					<FlagIcon code={selectedToCurrency} size="md" />
					<select bind:value={selectedToCurrency} onchange={updateDefaultToCurrency} class="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
						{#each currencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		
	</div>
</div>
