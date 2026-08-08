<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { currentLanguage, languages, getTranslation } from '$lib/stores/i18n';
	import { currencyOptions, defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import FlagIcon from './FlagIcon.svelte';

	// Dev reset: to re-trigger the onboarding dialog, run this in the browser console:
	//   localStorage.removeItem('simbafx-onboarded'); location.reload();
	const onboardedKey = 'simbafx-onboarded';

	// Currencies displayed alphabetically by code
	const sortedCurrencyOptions = [...currencyOptions].sort((a, b) => a.code.localeCompare(b.code));

	let mounted = $state(false);
	let open = $state(false);
	let errorMessage = $state('');

	let selectedLanguage = $state($currentLanguage);
	let selectedFromCurrency = $state($defaultFromCurrency);
	let selectedToCurrency = $state($defaultToCurrency);

	// Translate live using the selection so labels update as the user picks a language
	let t = $derived((key: string) => getTranslation(key, selectedLanguage));

	onMount(() => {
		mounted = true;
		// Show the onboarding dialog only on the first visit
		if (localStorage.getItem(onboardedKey) === null) {
			open = true;
		}
	});

	function handleGetStarted() {
		if (selectedFromCurrency === selectedToCurrency) {
			errorMessage = t('onboarding.sameCurrencyError');
			return;
		}
		currentLanguage.set(selectedLanguage);
		defaultFromCurrency.set(selectedFromCurrency);
		defaultToCurrency.set(selectedToCurrency);
		localStorage.setItem(onboardedKey, 'true');
		open = false;
	}
</script>

{#if mounted && open}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-label={t('onboarding.title')}
	>
		<div
			transition:fly={{ y: 20, duration: 250 }}
			class="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto"
		>
			<!-- Header -->
			<div class="text-center">
				<img src="/icons/icon128.png" alt="SimbaFX" class="w-16 h-16 rounded-2xl mx-auto mb-3" />
				<h2 class="text-xl font-bold text-gray-900 dark:text-white">{t('onboarding.title')}</h2>
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('onboarding.subtitle')}</p>
			</div>

			<!-- Language -->
			<div>
				<label for="onboarding-language" class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
					{t('settings.language')}
				</label>
				<select
					id="onboarding-language"
					bind:value={selectedLanguage}
					class="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
				>
					{#each languages as langOption}
						<option value={langOption.code}>{langOption.flag} {langOption.nativeName}</option>
					{/each}
				</select>
			</div>

			<!-- Default FROM Currency -->
			<div>
				<label for="onboarding-from" class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
					{t('settings.defaultFromCurrency')}
				</label>
				<div class="flex items-center gap-2">
					<FlagIcon code={selectedFromCurrency} size="sm" />
					<select
						id="onboarding-from"
						bind:value={selectedFromCurrency}
						class="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each sortedCurrencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Default TO Currency -->
			<div>
				<label for="onboarding-to" class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
					{t('settings.defaultToCurrency')}
				</label>
				<div class="flex items-center gap-2">
					<FlagIcon code={selectedToCurrency} size="sm" />
					<select
						id="onboarding-to"
						bind:value={selectedToCurrency}
						class="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each sortedCurrencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Error Message -->
			{#if errorMessage}
				<div class="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-medium" role="alert">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<span>{errorMessage}</span>
				</div>
			{/if}

			<!-- Actions -->
			<div class="pt-1">
				<button
					onclick={handleGetStarted}
					class="w-full px-4 py-3 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 active:scale-95 transition-all"
				>
					{t('onboarding.getStarted')}
				</button>
			</div>
		</div>
	</div>
{/if}
