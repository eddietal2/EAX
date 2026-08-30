<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Navigation from '$lib/components/Navigation.svelte';
	import OnboardingDialog from '$lib/components/OnboardingDialog.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';

	let { children } = $props();

	let t = $derived((key: string) => getTranslation(key, $currentLanguage));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/icons/icon128.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="SimbaFX" />

	<!-- Global structured data: Organization + WebSite -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "Organization",
					"@id": "https://simbafx.vercel.app/#organization",
					"name": "SimbaFX",
					"url": "https://simbafx.vercel.app/",
					"logo": "https://simbafx.vercel.app/icons/icon128.png",
					"description": "SimbaFX is a fast, free currency converter for East African currencies."
				},
				{
					"@type": "WebSite",
					"name": "SimbaFX Currency Exchange",
					"url": "https://simbafx.vercel.app/",
					"description": "Real-time exchange rates and currency conversion for TZS, USD, EUR, GBP, KES and more.",
					"inLanguage": "en",
					"publisher": { "@id": "https://simbafx.vercel.app/#organization" }
				}
			]
		})}
	</script>
</svelte:head>

<div class="h-dvh bg-gray-50 dark:bg-gray-950 flex flex-col">
	<Navigation />
	<main class="flex-1 overflow-hidden pb-20 md:pb-0">
		{@render children()}
	</main>
	<!-- Desktop footer (mobile users reach these links via the Contact page) -->
	<footer class="hidden md:flex items-center justify-center gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs text-gray-500 dark:text-gray-400">
		<a href="/privacy" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.privacy')}</a>
	</footer>
	<Toast />
	<OnboardingDialog />
</div>

