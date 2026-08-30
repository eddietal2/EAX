<script lang="ts">
	import { onMount } from 'svelte';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';

	interface BeforeInstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	}

	// Remember a dismissal for the rest of the session so we don't re-nag on
	// every navigation. Resets on the next visit.
	const DISMISS_KEY = 'simbafx-pwa-dismissed';

	// `persistent` keeps the button visible permanently (never dismisses). Used by
	// the Settings page, where the install prompt should not disappear.
	let { persistent = false }: { persistent?: boolean } = $props();

	let deferredPrompt = $state<BeforeInstallPromptEvent | null>(null);
	let canInstall = $state(false);
	let isIOS = $state(false);
	let isStandalone = $state(false);
	let dismissed = $state(false);
	let showIosHelp = $state(false);

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	onMount(() => {
		// Already running as an installed PWA → hide the button entirely.
		const standaloneQuery = window.matchMedia('(display-mode: standalone)');
		isStandalone =
			standaloneQuery.matches || (navigator as unknown as { standalone?: boolean }).standalone === true;

		// iOS Safari detection (iPhone/iPad/iPod, or desktop Safari in touch mode).
		const ua = navigator.userAgent;
		const platform = (navigator as unknown as { platform?: string }).platform;
		isIOS =
			/iphone|ipad|ipod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);

		// Don't re-nag within the same session after the user dismisses (only
		// relevant for the non-persistent variant).
		if (!persistent) {
			try {
				dismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
			} catch {
				/* ignore storage errors */
			}
		}

		// Chrome / Android / desktop install prompt.
		const onBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			deferredPrompt = e as BeforeInstallPromptEvent;
			canInstall = true;
		};
		const onAppInstalled = () => {
			canInstall = false;
			deferredPrompt = null;
		};
		window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
		window.addEventListener('appinstalled', onAppInstalled);
		return () => {
			window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
			window.removeEventListener('appinstalled', onAppInstalled);
		};
	});

	// Show only when the PWA can actually be installed on this device/browser and
	// the user hasn't already installed it or dismissed the prompt. The persistent
	// variant ignores dismissals entirely.
	const showButton = $derived(!isStandalone && (persistent || !dismissed) && (canInstall || isIOS));

	async function handleInstall() {
		if (deferredPrompt) {
			await deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				canInstall = false;
				deferredPrompt = null;
			} else {
				markDismissed();
			}
		} else if (isIOS) {
			// No install API on iOS — guide the user through "Add to Home Screen".
			showIosHelp = true;
		}
	}

	function markDismissed() {
		// The persistent variant never hides, so dismissals are ignored.
		if (persistent) return;
		dismissed = true;
		try {
			sessionStorage.setItem(DISMISS_KEY, '1');
		} catch {
			/* ignore storage errors */
		}
	}

	function closeIosHelp() {
		showIosHelp = false;
		markDismissed();
	}
</script>

{#if showButton}
	<!-- Mobile-only "Download Now" PWA install button -->
	<div class="mt-2 md:hidden">
		<button
			type="button"
			onclick={handleInstall}
			class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-500 text-white shadow-md hover:bg-emerald-600 active:scale-[0.98] transition-all"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
			</svg>
			{t('pwa.downloadNow')}
		</button>
	</div>
{/if}

{#if showIosHelp}
	<!-- iOS "Add to Home Screen" instructions -->
	<div
		class="md:hidden fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm"
		onclick={(e) => { if (e.target === e.currentTarget) closeIosHelp(); }}
		onkeydown={(e) => { if (e.key === 'Escape') closeIosHelp(); }}
		role="dialog"
		aria-modal="true"
		aria-label={t('pwa.iosTitle')}
		tabindex="-1"
	>
		<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 w-full max-w-sm">
			<div class="flex items-start justify-between gap-3">
				<div class="flex items-center gap-2">
					<img src="/icons/icon48.png" alt="SimbaFX" class="w-8 h-8 rounded-lg" />
					<h3 class="text-base font-bold text-gray-900 dark:text-white">{t('pwa.iosTitle')}</h3>
				</div>
				<button
					type="button"
					onclick={closeIosHelp}
					aria-label={t('pwa.close')}
					class="shrink-0 p-1 -mr-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Plain-language explanation of what will happen (for non-technical users) -->
			<p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('pwa.iosIntro')}</p>
			<!-- For users familiar with Progressive Web Apps -->
			<p class="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/60 rounded-lg px-3 py-2">
				{t('pwa.iosPwaNote')}
			</p>

			<ol class="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300 list-none">
				<li class="flex items-start gap-3">
					<span class="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold shrink-0">1</span>
					<span>{t('pwa.iosStep1')}</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold shrink-0">2</span>
					<span>{t('pwa.iosStep2')}</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold shrink-0">3</span>
					<span>{t('pwa.iosStep3')}</span>
				</li>
			</ol>

			<!-- iOS can only install web apps from Safari -->
			<p class="mt-4 flex items-start gap-2 text-xs leading-relaxed text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>{t('pwa.iosSafariNote')}</span>
			</p>

			<button
				type="button"
				onclick={closeIosHelp}
				class="mt-5 w-full py-3 text-sm font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] transition-all"
			>
				{t('pwa.gotIt')}
			</button>
		</div>
	</div>
{/if}
