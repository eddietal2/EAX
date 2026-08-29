<script lang="ts">
	import { onMount } from 'svelte';
	import ConverterCard from '../lib/ConverterCard.svelte';
	import { currentLanguage, languages, getTranslation } from '../lib/i18n';
	import icon48 from '/icons/icon48.png';

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

	const currencies = ['AED', 'AUD', 'BIF', 'CAD', 'CDF', 'CHF', 'CNY', 'EGP', 'ETB', 'EUR',
		'GBP', 'INR', 'KES', 'MWK', 'MZN', 'NGN', 'RWF', 'SAR', 'TZS', 'UGX', 'USD', 'ZAR', 'ZMW'];

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

	// --- Onboarding ---
	// Dev reset: right-click the extension icon → "Inspect Popup", then run:
	//   localStorage.removeItem('simbafx-onboarded');
	// Close and reopen the popup to see the onboarding panel again.
	const onboardedKey = 'simbafx-onboarded';
	let onboarded = $state(false);
	let onboardingError = $state('');

	// Selections for the onboarding panel
	let onboardingLanguage = $state($currentLanguage);
	let onboardingFrom = $state('USD');
	let onboardingTo = $state('TZS');

	// Live translate the onboarding panel as the user changes the language select
	let onboardingT = $derived((key: string) => getTranslation(key, onboardingLanguage));

	onMount(() => {
		// If already onboarded, skip straight to the converter
		if (localStorage.getItem(onboardedKey) === 'true') {
			onboarded = true;
		}
	});

	function handleOnboardGetStarted() {
		if (onboardingFrom === onboardingTo) {
			onboardingError = onboardingT('onboarding.sameCurrencyError');
			return;
		}
		// Apply selections
		fromCurrency = onboardingFrom;
		toCurrency = onboardingTo;
		currentLanguage.set(onboardingLanguage);
		localStorage.setItem(onboardedKey, 'true');
		onboarded = true;
	}

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
	<!-- Gemini-inspired animated "Spark Gradient" background -->
	<div class="spark-gradient" aria-hidden="true">
		<div class="blob blob-1"></div>
		<div class="blob blob-2"></div>
		<div class="blob blob-3"></div>
		<div class="blob blob-4"></div>
		<div class="blob blob-5"></div>
	</div>
	<div class="sparkles" aria-hidden="true">
		<span class="sparkle sparkle-1"></span>
		<span class="sparkle sparkle-2"></span>
		<span class="sparkle sparkle-3"></span>
		<span class="sparkle sparkle-4"></span>
	</div>
	<div class="slide-viewport">
		<div class="slide-track" class:slid={onboarded}>
			<!-- ===== Onboarding Panel ===== -->
			<div class="slide-panel onboarding-panel">
				<div class="onboarding-card">
					<img src={icon48} alt="SimbaFX" class="onboarding-logo" />
					<h2 class="onboarding-title">{onboardingT('onboarding.title')}</h2>
					<p class="onboarding-subtitle">{onboardingT('onboarding.subtitle')}</p>

					<div class="onboarding-field">
						<label for="onb-lang" class="onboarding-label">{onboardingT('settings.language')}</label>
						<select
							id="onb-lang"
							bind:value={onboardingLanguage}
							class="onboarding-select"
						>
							{#each languages as lang}
								<option value={lang.code}>{lang.flag} {lang.nativeName}</option>
							{/each}
						</select>
					</div>

					<div class="onboarding-field">
						<label for="onb-from" class="onboarding-label">{onboardingT('settings.defaultFromCurrency')}</label>
						<select
							id="onb-from"
							bind:value={onboardingFrom}
							class="onboarding-select"
						>
							{#each currencies as currency}
								<option value={currency}>{currency}</option>
							{/each}
						</select>
					</div>

					<div class="onboarding-field">
						<label for="onb-to" class="onboarding-label">{onboardingT('settings.defaultToCurrency')}</label>
						<select
							id="onb-to"
							bind:value={onboardingTo}
							class="onboarding-select"
						>
							{#each currencies as currency}
								<option value={currency}>{currency}</option>
							{/each}
						</select>
					</div>

					{#if onboardingError}
						<div class="onboarding-error" role="alert">
							<svg xmlns="http://www.w3.org/2000/svg" class="onb-error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<span>{onboardingError}</span>
						</div>
					{/if}

					<button
						class="onboarding-cta"
						onclick={handleOnboardGetStarted}
					>
						{onboardingT('onboarding.getStarted')}
					</button>
				</div>
			</div>

			<!-- ===== Converter Panel ===== -->
			<div class="slide-panel converter-panel">
				<div class="header">
					<div class="header-bar">
						<img src={icon48} alt="SimbaFX" class="logo" />
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
		padding: 0;
		box-sizing: border-box;
	}

	/* ── Gemini-inspired "Spark Gradient" animated background ── */
	.spark-gradient {
		/* Light-mode pastel greens (SimbaFX: green & white) */
		--blob-1: #10b981; /* emerald-500 */
		--blob-2: #34d399; /* emerald-400 */
		--blob-3: #14b8a6; /* teal-500 */
		--blob-4: #4ade80; /* green-400 */
		--blob-5: #a3e635; /* lime-400 */
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
		/* One blur pass over the whole mesh → seamless fluid aurora */
		filter: blur(80px);
	}

	:global(html.dark) .spark-gradient {
		/* Dark-mode vivid greens */
		--blob-1: #059669; /* emerald-600 */
		--blob-2: #10b981; /* emerald-500 */
		--blob-3: #14b8a6; /* teal-500 */
		--blob-4: #22c55e; /* green-500 */
		--blob-5: #84cc16; /* lime-500 */
	}

	.spark-gradient .blob {
		position: absolute;
		border-radius: 50%;
		opacity: 0.6;
		will-change: transform, filter;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		animation-direction: alternate;
		/* Smoothly blend overlapping colors into a mesh */
		mix-blend-mode: screen;
	}

	/* On light backgrounds `screen` washes out, so tint with `multiply` instead */
	:global(html:not(.dark)) .spark-gradient .blob {
		mix-blend-mode: multiply;
		opacity: 0.55;
	}

	:global(html.dark) .spark-gradient .blob {
		opacity: 0.75;
	}

	.spark-gradient .blob-1 {
		width: 320px;
		height: 320px;
		top: -70px;
		left: -80px;
		background: radial-gradient(circle at center, var(--blob-1) 0%, transparent 70%);
		animation: drift-1 8s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-2 {
		width: 300px;
		height: 300px;
		top: -40px;
		right: -90px;
		background: radial-gradient(circle at center, var(--blob-2) 0%, transparent 70%);
		animation: drift-2 10s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-3 {
		width: 340px;
		height: 340px;
		bottom: -90px;
		left: -80px;
		background: radial-gradient(circle at center, var(--blob-3) 0%, transparent 70%);
		animation: drift-3 9s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-4 {
		width: 280px;
		height: 280px;
		bottom: -70px;
		right: -70px;
		background: radial-gradient(circle at center, var(--blob-4) 0%, transparent 70%);
		animation: drift-4 11s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-5 {
		width: 300px;
		height: 300px;
		top: 40%;
		left: 30%;
		background: radial-gradient(circle at center, var(--blob-5) 0%, transparent 70%);
		animation: drift-5 12s ease-in-out infinite alternate;
	}

	@keyframes drift-1 {
		0%, 100% { transform: translate(0px, 0px) scale(1); filter: hue-rotate(0deg); }
		50% { transform: translate(80px, -50px) scale(1.15); filter: hue-rotate(60deg); }
	}

	@keyframes drift-2 {
		0%, 100% { transform: translate(0px, 0px) scale(1); filter: hue-rotate(0deg); }
		50% { transform: translate(-70px, 80px) scale(1.1); filter: hue-rotate(-60deg); }
	}

	@keyframes drift-3 {
		0%, 100% { transform: translate(0px, 0px) scale(0.95); filter: hue-rotate(0deg); }
		50% { transform: translate(-60px, -70px) scale(1.2); filter: hue-rotate(40deg); }
	}

	@keyframes drift-4 {
		0%, 100% { transform: translate(0px, 0px) scale(1); filter: hue-rotate(0deg); }
		50% { transform: translate(-50px, -40px) scale(1.2); filter: hue-rotate(-40deg); }
	}

	@keyframes drift-5 {
		0%, 100% { transform: translate(0px, 0px) scale(0.9); filter: hue-rotate(0deg); }
		50% { transform: translate(70px, 40px) scale(1.25); filter: hue-rotate(80deg); }
	}

	/* Twinkling "spark" accents — kept OUTSIDE the blurred mesh so they stay crisp */
	.sparkles {
		--spark-color: rgba(16, 185, 129, 0.9); /* emerald-500 tint in light mode */
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	:global(html.dark) .sparkles {
		--spark-color: rgba(255, 255, 255, 0.9);
	}

	.sparkles .sparkle {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--spark-color);
		box-shadow: 0 0 8px 2px var(--spark-color);
		will-change: opacity, transform;
		animation: twinkle 4.5s ease-in-out infinite;
	}

	.sparkles .sparkle-1 { top: 18%; left: 22%; }
	.sparkles .sparkle-2 { top: 32%; right: 16%; animation-delay: 1.1s; }
	.sparkles .sparkle-3 { bottom: 28%; left: 15%; animation-delay: 2.3s; }
	.sparkles .sparkle-4 { bottom: 18%; right: 26%; animation-delay: 3.4s; }

	@keyframes twinkle {
		0%, 100% { opacity: 0; transform: scale(0.5); }
		50% { opacity: 1; transform: scale(1.15); }
	}

	/* Respect reduced-motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.spark-gradient .blob,
		.sparkles .sparkle {
			animation: none;
		}
		.sparkles .sparkle {
			opacity: 0.7;
		}
	}

	/* ── Slide viewport ── */
	.slide-viewport {
		flex: 1;
		overflow: hidden;
		position: relative;
		z-index: 1;
	}

	.slide-track {
		display: flex;
		width: 200%;
		height: 100%;
		transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform: translateX(0);
	}

	.slide-track.slid {
		transform: translateX(-50%);
	}

	.slide-panel {
		width: 50%;
		flex-shrink: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	/* ── Onboarding panel ── */
	.onboarding-panel {
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	.onboarding-card {
		width: 100%;
		max-width: 300px;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.onboarding-logo {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		margin: 0 auto;
	}

	.onboarding-title {
		font-size: 16px;
		font-weight: 700;
		margin: 0;
	}

	:global(html:not(.dark)) .onboarding-title {
		color: #064e3b;
	}
	:global(html.dark) .onboarding-title {
		color: #e2e8f0;
	}

	.onboarding-subtitle {
		font-size: 12px;
		margin: -4px 0 0 0;
	}

	:global(html:not(.dark)) .onboarding-subtitle {
		color: #6b7280;
	}
	:global(html.dark) .onboarding-subtitle {
		color: #9ca3af;
	}

	.onboarding-field {
		text-align: left;
	}

	.onboarding-label {
		display: block;
		font-size: 11px;
		font-weight: 600;
		margin-bottom: 4px;
	}

	:global(html:not(.dark)) .onboarding-label {
		color: #4b5563;
	}
	:global(html.dark) .onboarding-label {
		color: #d1d5db;
	}

	.onboarding-select {
		width: 100%;
		padding: 10px 12px;
		border-radius: 8px;
		border: none;
		font-size: 13px;
		font-weight: 500;
		background: rgba(255, 255, 255, 0.7);
		color: #1f2937;
		outline: none;
		cursor: pointer;
	}

	:global(html.dark) .onboarding-select {
		background: rgba(255, 255, 255, 0.1);
		color: #e5e7eb;
	}

	.onboarding-select option {
		color: #333;
		background: #fff;
	}

	.onboarding-error {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		border-radius: 8px;
		background: rgba(239, 68, 68, 0.12);
		color: #dc2626;
		font-size: 12px;
		font-weight: 500;
		text-align: left;
	}

	:global(html.dark) .onboarding-error {
		background: rgba(239, 68, 68, 0.18);
		color: #fca5a5;
	}

	.onb-error-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.onboarding-cta {
		width: 100%;
		padding: 12px;
		border-radius: 8px;
		border: none;
		background: #059669;
		color: #ffffff;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.onboarding-cta:hover {
		background: #047857;
	}

	:global(html.dark) .onboarding-cta {
		background: #10b981;
		color: #064e3b;
	}
	:global(html.dark) .onboarding-cta:hover {
		background: #34d399;
	}

	/* ── Converter panel ── */
	.converter-panel {
		padding: 16px;
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
