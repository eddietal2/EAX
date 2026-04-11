<script lang="ts">
	import { currencyOptions, defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import { currentLanguage, languages, getTranslation } from '$lib/stores/i18n';
	import { themeStore, type Theme } from '$lib/stores/theme';
	import FlagIcon from '$lib/components/FlagIcon.svelte';

	let selectedFromCurrency = $state($defaultFromCurrency);
	let selectedToCurrency = $state($defaultToCurrency);
	let selectedLanguage = $state($currentLanguage);
	let selectedTheme = $state<Theme>($themeStore);
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

<div class="min-h-screen md:min-h-0 md:h-full bg-white dark:bg-gray-950 transition-colors duration-200 pb-20 md:pb-0">
	<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<div class="flex items-center gap-3 mb-6">
		<h1 class="md:hidden text-xl font-black tracking-wider text-emerald-600 dark:text-emerald-400" style="font-family: var(--font-bebas-neue, 'Bebas Neue', sans-serif);">EAX</h1>
		<h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
	</div>
	
	<div class="space-y-3">
		<!-- Language Selection -->
		<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
				<div class="flex-1">
					<p class="font-medium text-gray-900 dark:text-white text-sm">{t('settings.language')}</p>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('settings.languageDescription')}</p>
				</div>
				<div class="flex items-center gap-3 relative shrink-0">
					<select 
						bind:value={selectedLanguage} 
						onchange={updateLanguage}
						disabled={isChangingLanguage}
						class="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

		<!-- Theme Selection -->
		<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
				<div class="flex-1">
					<p class="font-medium text-gray-900 dark:text-white text-sm">{t('settings.themeLabel')}</p>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('settings.themeDescription')}</p>
				</div>
				<div class="flex items-center gap-3 shrink-0">
					<select 
						bind:value={selectedTheme}
						onchange={() => themeStore.setTheme(selectedTheme)}
						class="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						<option value="light">{t('settings.themeLight')}</option>
						<option value="dark">{t('settings.themeDark')}</option>
						<option value="system">{t('settings.themeSystem')}</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Default FROM Currency -->
		<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
				<div class="flex-1">
					<p class="font-medium text-gray-900 dark:text-white text-sm">{t('settings.defaultFromCurrency')}</p>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('settings.defaultFromDescription')}</p>
				</div>
				<div class="flex items-center gap-2 md:gap-3 shrink-0">
					<FlagIcon code={selectedFromCurrency} size="sm" />
					<select bind:value={selectedFromCurrency} onchange={updateDefaultFromCurrency} class="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
						{#each currencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<!-- Default TO Currency -->
		<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
				<div class="flex-1">
					<p class="font-medium text-gray-900 dark:text-white text-sm">{t('settings.defaultToCurrency')}</p>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('settings.defaultToDescription')}</p>
				</div>
				<div class="flex items-center gap-2 md:gap-3 shrink-0">
					<FlagIcon code={selectedToCurrency} size="sm" />
					<select bind:value={selectedToCurrency} onchange={updateDefaultToCurrency} class="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
						{#each currencyOptions as option}
							<option value={option.code}>{option.code} — {option.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		
	</div>
	</div>
</div>
