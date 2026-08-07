<script lang="ts">
	import { onMount } from 'svelte';
	import ConverterCard from '../lib/ConverterCard.svelte';
	import { currentLanguage, languages, getTranslation } from '../lib/i18n';

	let fromCurrency = $state(localStorage.getItem('eax-from') ?? 'USD');
	let toCurrency = $state(localStorage.getItem('eax-to') ?? 'TZS');

	$effect(() => { localStorage.setItem('eax-from', fromCurrency); });
	$effect(() => { localStorage.setItem('eax-to', toCurrency); });
	let amount = $state(localStorage.getItem('eax-amount') ?? '');
	let inputHasValue = $state(localStorage.getItem('eax-input-has-value') === 'true');

	$effect(() => { localStorage.setItem('eax-amount', amount); });
	$effect(() => { localStorage.setItem('eax-input-has-value', String(inputHasValue)); });
	let rates: Record<string, Record<string, number>> = $state({});
	let isLoading = $state(true);
	let fetchError = $state('');
	let lastUpdated = $state<number | undefined>();

	const currencies = ['USD', 'EUR', 'GBP', 'TZS', 'KES', 'UGX', 'RWF', 'AED', 'CNY', 'INR', 'ETB', 'ZAR', 'ZMW', 'SAR', 'CHF', 'CAD', 'AUD'];

	// --- Language selection (mirrors app/src/lib/stores/i18n.ts) ---
	let selectedLanguage = $state($currentLanguage);

	function handleLanguageChange() {
		currentLanguage.set(selectedLanguage);
	}

	let t = $derived((key: string) => getTranslation(key, $currentLanguage));

	// Keep <html lang/dir> in sync (Arabic is RTL)
	$effect(() => {
		const lang = $currentLanguage;
		document.documentElement.lang = lang;
		document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
	});

	// Dark mode: read saved pref or fall back to OS preference
	const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
	const saved = localStorage.getItem('eax-theme');
	let isDark = $state(saved !== null ? saved === 'dark' : osPrefersDark.matches);

	// Keep <html> class and localStorage in sync
	$effect(() => {
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('eax-theme', isDark ? 'dark' : 'light');
	});

	// Follow OS changes only if the user hasn't manually overridden
	onMount(() => {
		const listener = (e: MediaQueryListEvent) => {
			if (localStorage.getItem('eax-theme') === null) isDark = e.matches;
		};
		osPrefersDark.addEventListener('change', listener);
		return () => osPrefersDark.removeEventListener('change', listener);
	});

	onMount(async () => {
		try {
			for (const currency of currencies) {
				const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
				const data = await response.json();
				rates[currency] = data.rates;
			}
			lastUpdated = Date.now();
		} catch (error) {
			console.error('Failed to fetch rates:', error);
			fetchError = getTranslation('messages.error');
		} finally {
			isLoading = false;
		}
	});

	function handleSwap() {
		// Swap is handled by ConverterCard
	}

	function handleClear() {
		amount = '';
		inputHasValue = false;
	}

	function handleFromCurrencyChange(currency: string) {
		fromCurrency = currency;
	}

	function handleToCurrencyChange(currency: string) {
		toCurrency = currency;
	}
</script>

<div class="popup-container" class:dark-bg={isDark}>
	<div class="header">
		<div class="header-bar">
			<img src="/icons/SimbaGreenLogo48x48.png" alt="SimbaFX" class="logo" />
			<div class="header-actions">
				<div class="lang-select-wrap">
					<span class="lang-globe" aria-hidden="true">🌐</span>
					<select
						class="lang-select"
						bind:value={selectedLanguage}
						onchange={handleLanguageChange}
						aria-label={t('settings.language')}
					>
						{#each languages as lang}
							<option value={lang.code}>{lang.flag} {lang.nativeName}</option>
						{/each}
					</select>
				</div>
				<button
					class="theme-toggle"
					onclick={() => isDark = !isDark}
					aria-label={t(isDark ? 'popup.switchToLight' : 'popup.switchToDark')}
					title={t(isDark ? 'popup.switchToLight' : 'popup.switchToDark')}
				>
					{#if isDark}
						<!-- Sun icon -->
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="5"/>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
						</svg>
					{:else}
						<!-- Moon icon -->
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
		<!-- <p class="subtitle">{t('popup.subtitle')}</p> -->
	</div>

	<div class="converter-wrapper">
		{#if fetchError}
			<div class="fetch-error">{fetchError}</div>
		{:else}
			<ConverterCard
				bind:fromCurrency
				bind:toCurrency
				bind:amount
				bind:inputHasValue
				mounted={true}
				isMobile={false}
				{isLoading}
				{lastUpdated}
				{fetchError}
				{rates}
				onSwap={handleSwap}
				onClear={handleClear}
				onFromCurrencyChange={handleFromCurrencyChange}
				onToCurrencyChange={handleToCurrencyChange}
				{t}
			/>
		{/if}
	</div>


	<div class="footer-actions">
		<a
			class="footer-btn footer-btn-primary"
			href="https://exchange-tz.vercel.app/"
			target="_blank"
			rel="noopener noreferrer"
		>
			{t('popup.viewFullApp')}
		</a>
		<button
			class="footer-btn footer-btn-secondary"
			onclick={() => window.close()}
		>
			{t('popup.close')}
		</button>
	</div>

	<!-- Ad slot: impression-based banner ad hosted in a remote iframe (Manifest V3 compliant).
		    TODO: replace srcdoc with src="https://yourdomain.com/ext-ad-frame" (300x50). -->
	<div class="ad-slot">
		<span class="ad-slot-label">{t('popup.sponsored')}</span>
		<div class="ad-slot-frame">
			<iframe
				class="ad-iframe"
				srcdoc="<div style='display:flex;align-items:center;justify-content:center;height:100%;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;color:#9ca3af;'>Ad space 300 × 50</div>"
				title={t('popup.sponsored')}
				width="300"
				height="50"
				frameborder="0"
				scrolling="no"
				loading="lazy"
			></iframe>
		</div>
	</div>
</div>

<style>
	:global(html, body) {
		width: 360px;
		min-height: 540px;
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		transition: background 0.3s ease;
	}

	/* Light mode body background */
	:global(html body) {
		background: linear-gradient(135deg, #e8f5f0 0%, #d1ede4 100%);
	}

	/* Dark mode body background */
	:global(html.dark body) {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	}

	.popup-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 16px;
		box-sizing: border-box;
	}

	.header {
		text-align: center;
		margin-bottom: 20px;
	}

	/* Header text color */
	:global(html.dark) .header {
		color: white;
	}
	:global(html:not(.dark)) .header {
		color: #064e3b;
	}

	.header-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.lang-select-wrap {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 6px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.5);
		transition: background 0.2s;
	}

	:global(html.dark) .lang-select-wrap {
		background: rgba(255, 255, 255, 0.12);
	}

	.lang-globe {
		font-size: 14px;
		line-height: 1;
		pointer-events: none;
	}

	.lang-select {
		background: transparent;
		border: none;
		color: inherit;
		font-size: 12px;
		font-weight: 600;
		max-width: 120px;
		outline: none;
		cursor: pointer;
	}

	.lang-select option {
		color: #333;
		background: #fff;
	}

	.logo {
		width: 36px;
		height: 36px;
		border-radius: 8px;
		flex-shrink: 0;
	}

	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s, color 0.2s;
	}

	:global(html.dark) .theme-toggle {
		color: #fbbf24;
	}
	:global(html.dark) .theme-toggle:hover {
		background: rgba(255,255,255,0.1);
	}
	:global(html:not(.dark)) .theme-toggle {
		color: #059669;
	}
	:global(html:not(.dark)) .theme-toggle:hover {
		background: rgba(0,0,0,0.06);
	}

	.converter-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.fetch-error {
		padding: 12px;
		border-radius: 8px;
		text-align: center;
		font-size: 13px;
		font-weight: 500;
		background: rgba(239, 68, 68, 0.12);
		color: #dc2626;
	}

	:global(html.dark) .fetch-error {
		background: rgba(239, 68, 68, 0.18);
		color: #fca5a5;
	}

	.footer-actions {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: 8px;
		margin-top: 16px;
		padding-top: 12px;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	:global(html.dark) .footer-actions {
		border-top-color: rgba(255, 255, 255, 0.1);
	}

	.footer-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 10px 12px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		border: none;
		transition: background 0.2s, color 0.2s;
		box-sizing: border-box;
	}

	.footer-btn-primary {
		background: #059669;
		color: #ffffff;
	}
	.footer-btn-primary:hover {
		background: #047857;
	}

	:global(html.dark) .footer-btn-primary {
		background: #10b981;
		color: #064e3b;
	}
	:global(html.dark) .footer-btn-primary:hover {
		background: #34d399;
	}

	.footer-btn-secondary {
		background: rgba(0, 0, 0, 0.06);
		color: #4b5563;
	}
	.footer-btn-secondary:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	:global(html.dark) .footer-btn-secondary {
		background: rgba(255, 255, 255, 0.08);
		color: #e5e7eb;
	}
	:global(html.dark) .footer-btn-secondary:hover {
		background: rgba(255, 255, 255, 0.14);
	}

	.ad-slot {
		margin-top: 10px;
	}

	.ad-slot-label {
		display: block;
		text-align: center;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		color: #6b7280;
		margin-bottom: 4px;
	}

	:global(html.dark) .ad-slot-label {
		color: #9ca3af;
	}

	.ad-slot-frame {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.5);
	}

	:global(html.dark) .ad-slot-frame {
		background: rgba(255, 255, 255, 0.08);
	}

	.ad-iframe {
		width: 100%;
		max-width: 300px;
		height: 50px;
		border: 0;
		display: block;
	}
</style>
