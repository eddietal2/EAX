<script lang="ts">
	import { onMount } from 'svelte';
	import { conversionHistory } from '$lib/stores/conversionHistory';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';
	import FlagIcon from '$lib/components/FlagIcon.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';

	let editingId = $state<string | null>(null);
	let editingName = $state('');
	let inputElement = $state<HTMLInputElement | undefined>();
	let mounted = $state(false);

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	onMount(() => {
		conversionHistory.loadFromStorage();
		mounted = true;
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

	function formatDate(timestamp: string, currentLang: string): string {
		const date = new Date(timestamp);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		const dateOnly = date.toDateString();
		const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

		const todayText = getTranslation('history.today', currentLang as any);
		const yesterdayText = getTranslation('history.yesterday', currentLang as any);

		if (dateOnly === today.toDateString()) return `${todayText}, ${timeStr}`;
		if (dateOnly === yesterday.toDateString()) return `${yesterdayText}, ${timeStr}`;

		return `${date.toLocaleDateString()}, ${timeStr}`;
	}

	function deleteConversion(id: string) {
		conversionHistory.removeConversion(id);
		if (editingId === id) {
			editingId = null;
		}
	}

	function startEditing(id: string, currentName: string | undefined) {
		editingId = id;
		editingName = currentName || '';
		setTimeout(() => {
			inputElement?.focus();
			inputElement?.select();
		}, 0);
	}

	function saveName(id: string) {
		conversionHistory.updateConversion(id, { name: editingName.trim() || undefined });
		editingId = null;
	}

	function cancelEditing() {
		editingId = null;
		editingName = '';
	}

	function handleKeydown(e: KeyboardEvent, id: string) {
		if (e.key === 'Enter') {
			saveName(id);
		} else if (e.key === 'Escape') {
			cancelEditing();
		}
	}
</script>

<svelte:head>
	<title>History - SimbaFX Currency Exchange</title>
	<meta name="description" content="View your currency conversion history with SimbaFX. Track all your recent exchanges and conversion rates to stay informed about market trends." />
</svelte:head>

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 overflow-auto">
	<div class="p-4 md:p-8 max-w-4xl mx-auto">
		<div class="flex items-center gap-3 mb-6">
			<img src="/icons/icon48.png" alt="SimbaFX" class="md:hidden w-8 h-8 rounded-lg" />
			<h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{t('history.title')}</h1>
		</div>
		<p class="text-gray-600 dark:text-gray-400 mb-6">{t('history.subtitle')}</p>
		
		{#if !mounted}
			<!-- Skeleton Loading State -->
			<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
				<div class="divide-y divide-gray-100 dark:divide-gray-800">
					{#each Array(5) as _, i (i)}
						<div class="p-4 space-y-3">
							<div class="flex items-center justify-between mb-3">
								<Skeleton width="w-32" height="h-3" />
								<Skeleton width="w-24" height="h-4" />
							</div>
							<Skeleton width="w-full" height="h-4" class="mb-2" />
							<div class="flex items-center justify-between gap-3">
								<Skeleton width="w-20" height="h-8" />
								<Skeleton width="flex-1" height="h-4" />
								<Skeleton width="w-20" height="h-8" />
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
		<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-200">
			<div class="divide-y divide-gray-100 dark:divide-gray-800">
			{#if $conversionHistory.length === 0}
				<div class="p-8 text-center">
					<p class="text-gray-500 dark:text-gray-400 mb-2">{t('history.empty')}</p>
					<p class="text-sm text-gray-400 dark:text-gray-500">{t('history.emptySuggestion')}</p>
				</div>
			{:else}
				{#each $conversionHistory as item (item.id)}
					<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
						<div class="flex items-center justify-between mb-3 gap-3">
							<span class="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.timestamp, lang)}</span>
							<div class="flex items-center gap-2">
								<span class="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full transition-colors">{item.fromCurrency} → {item.toCurrency}</span>
								<button
									type="button"
									class="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm"
									onclick={() => deleteConversion(item.id)}
								>
									{t('history.deleteButton')}
								</button>
							</div>
						</div>
						{#if editingId === item.id}
							<input
								bind:this={inputElement}
								bind:value={editingName}
								type="text"
								placeholder={t('history.addName')}
								class="w-full px-3 py-2 border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md text-sm font-semibold mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors"
								onblur={() => saveName(item.id)}
								onkeydown={(e) => handleKeydown(e, item.id)}
							/>
						{:else}
							<button
								type="button"
								class="w-full text-left mb-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
								onclick={() => startEditing(item.id, item.name)}
							>
								<p class="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
									{item.name || t('history.addName')}
								</p>
							</button>
						{/if}
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-2">
								<FlagIcon code={item.fromCurrency} size="sm" />
								<div class="flex flex-col">
									<p class="text-xs text-gray-500 dark:text-gray-400">{item.fromCurrency}</p>
									<p class="font-medium text-gray-900 dark:text-white">{item.fromAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
								</div>
							</div>
							<span class="text-gray-400 dark:text-gray-600">→</span>
							<div class="flex items-center gap-2 ml-auto">
								<div class="flex flex-col text-right">
									<p class="text-xs text-gray-500 dark:text-gray-400">{item.toCurrency}</p>
									<p class="font-semibold text-emerald-600 dark:text-emerald-400">{item.toAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
								</div>
								<FlagIcon code={item.toCurrency} size="sm" />
							</div>
						</div>
					</div>
			{/each}
		{/if}
		</div>
	</div>
	
	<p class="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">Conversions are saved locally on your device</p>	
		{/if}
	</div>
</div>