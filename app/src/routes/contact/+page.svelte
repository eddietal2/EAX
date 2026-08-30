<script lang="ts">
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';
	import Seo from '$lib/components/Seo.svelte';

	// Mirrors the Contact Us form from the browser extension (extensions/src/popup/Popup.svelte).
	// The App hosts the /api/contact endpoint, so the form POSTs to the same origin.
	const contactNameMax = 60;
	const contactEmailMax = 254;
	const contactMessageMax = 1000;

	let contactName = $state('');
	let contactEmail = $state('');
	let contactMessage = $state('');
	let contactStatus = $state<'idle' | 'sending' | 'success' | 'error'>('idle');

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	async function handleSendEmail() {
		const name = contactName.trim();
		const email = contactEmail.trim();
		const message = contactMessage.trim();
		if (!name || !email || !message) return;
		contactStatus = 'sending';
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok || !data.success) {
				throw new Error(data.error || `HTTP ${response.status}`);
			}
			contactStatus = 'success';
			contactName = '';
			contactEmail = '';
			contactMessage = '';
		} catch (error) {
			console.error('Failed to send contact email:', error);
			contactStatus = 'error';
		}
	}
</script>

<Seo
	title="Contact Us — SimbaFX Currency Exchange"
	description="Get in touch with the SimbaFX team. Send us a message and we'll get back to you soon."
	path="/contact"
/>

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 overflow-auto">
	<h1 class="sr-only">SimbaFX Contact Us</h1>
	<div class="p-4 md:p-8 max-w-4xl mx-auto">
		<div class="relative max-w-md mx-auto">
			<!-- Gemini-style animated green "Spark Gradient" behind the contact card -->
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
			<div class="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
				<div class="text-center mb-6">
					<img
						src="/icons/icon48.png"
						alt="SimbaFX"
						class="w-12 h-12 rounded-xl mx-auto mb-3"
					/>
					<p class="text-sm text-gray-500 dark:text-gray-400">{t('contact.subtitle')}</p>
				</div>

				<form
					class="flex flex-col gap-4 text-left"
					onsubmit={(e) => { e.preventDefault(); handleSendEmail(); }}
				>
					<div class="flex flex-col gap-1">
						<div class="flex items-center justify-between gap-2">
							<label for="contact-name" class="text-xs font-semibold text-gray-700 dark:text-gray-300">
								{t('contact.nameLabel')}
							</label>
							<span class="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
								{contactName.length}/{contactNameMax}
							</span>
						</div>
						<input
							id="contact-name"
							type="text"
							maxlength={contactNameMax}
							required
							bind:value={contactName}
							placeholder={t('contact.nameLabel')}
							class="w-full box-border px-3.5 py-2.5 border-0 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
						/>
					</div>

					<div class="flex flex-col gap-1">
						<div class="flex items-center justify-between gap-2">
							<label for="contact-email" class="text-xs font-semibold text-gray-700 dark:text-gray-300">
								{t('contact.emailLabel')}
							</label>
							<span class="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
								{contactEmail.length}/{contactEmailMax}
							</span>
						</div>
						<input
							id="contact-email"
							type="email"
							inputmode="email"
							maxlength={contactEmailMax}
							required
							bind:value={contactEmail}
							placeholder={t('contact.emailLabel')}
							class="w-full box-border px-3.5 py-2.5 border-0 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
						/>
					</div>

					<div class="flex flex-col gap-1">
						<div class="flex items-center justify-between gap-2">
							<label for="contact-message" class="text-xs font-semibold text-gray-700 dark:text-gray-300">
								{t('contact.messageLabel')}
							</label>
							<span class="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
								{contactMessage.length}/{contactMessageMax}
							</span>
						</div>
						<textarea
							id="contact-message"
							maxlength={contactMessageMax}
							rows="5"
							required
							bind:value={contactMessage}
							placeholder={t('contact.messageLabel')}
							class="w-full box-border px-3.5 py-2.5 border-0 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 resize-y min-h-24"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={contactStatus === 'sending'}
						class="flex items-center justify-center gap-2 w-full px-4 py-3 border-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{#if contactStatus === 'sending'}
							<span class="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0" aria-hidden="true"></span>
							{t('contact.sending')}
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							{t('contact.send')}
						{/if}
					</button>

					{#if contactStatus === 'success'}
						<p class="text-xs font-medium text-center text-emerald-600 dark:text-emerald-400 m-0">{t('contact.success')}</p>
					{:else if contactStatus === 'error'}
						<p class="text-xs font-medium text-center text-red-600 dark:text-red-400 m-0">{t('contact.error')}</p>
					{/if}
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	/* ── Gemini-style animated green "Spark Gradient" behind the contact card ──
				Mirrored from ConverterCard.svelte (used on the Home page). A contained
				glow layer sits behind the card so it peeks around the rounded edges.
				Heavy container blur merges the blobs into a seamless aurora. */
	.spark-gradient {
		/* Light-mode pastel greens (SimbaFX: green & white) */
		--blob-1: #10b981; /* emerald-500 */
		--blob-2: #34d399; /* emerald-400 */
		--blob-3: #14b8a6; /* teal-500 */
		--blob-4: #4ade80; /* green-400 */
		--blob-5: #a3e635; /* lime-400 */
		position: absolute;
		inset: -48px;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
		/* One blur pass over the whole mesh → seamless fluid glow */
		filter: blur(60px);
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
		opacity: 0.7;
		will-change: transform, filter;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		animation-direction: alternate;
		/* Smoothly blend overlapping colors into a mesh */
		mix-blend-mode: screen;
	}

	/* `screen` washes out on light backgrounds → use `multiply` tint instead */
	:global(html:not(.dark)) .spark-gradient .blob {
		mix-blend-mode: multiply;
		opacity: 0.65;
	}

	:global(html.dark) .spark-gradient .blob {
		opacity: 0.85;
	}

	.spark-gradient .blob-1 {
		width: 264px;
		height: 264px;
		top: 12%;
		left: 12%;
		background: radial-gradient(circle at center, var(--blob-1) 0%, transparent 70%);
		animation: drift-1 8s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-2 {
		width: 288px;
		height: 288px;
		top: 6%;
		right: 8%;
		background: radial-gradient(circle at center, var(--blob-2) 0%, transparent 70%);
		animation: drift-2 10s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-3 {
		width: 312px;
		height: 312px;
		bottom: -10%;
		left: 18%;
		background: radial-gradient(circle at center, var(--blob-3) 0%, transparent 70%);
		animation: drift-3 9s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-4 {
		width: 264px;
		height: 264px;
		bottom: 0%;
		right: 12%;
		background: radial-gradient(circle at center, var(--blob-4) 0%, transparent 70%);
		animation: drift-4 11s ease-in-out infinite alternate;
	}

	.spark-gradient .blob-5 {
		width: 240px;
		height: 240px;
		top: 36%;
		left: 32%;
		background: radial-gradient(circle at center, var(--blob-5) 0%, transparent 70%);
		animation: drift-5 12s ease-in-out infinite alternate;
	}

	@keyframes drift-1 {
		0%, 100% { transform: translate(0px, 0px) scale(1); filter: hue-rotate(0deg); }
		50% { transform: translate(40px, -30px) scale(1.15); filter: hue-rotate(60deg); }
	}

	@keyframes drift-2 {
		0%, 100% { transform: translate(0px, 0px) scale(1); filter: hue-rotate(0deg); }
		50% { transform: translate(-40px, 35px) scale(1.1); filter: hue-rotate(-60deg); }
	}

	@keyframes drift-3 {
		0%, 100% { transform: translate(0px, 0px) scale(0.95); filter: hue-rotate(0deg); }
		50% { transform: translate(-35px, -40px) scale(1.2); filter: hue-rotate(40deg); }
	}

	@keyframes drift-4 {
		0%, 100% { transform: translate(0px, 0px) scale(1); filter: hue-rotate(0deg); }
		50% { transform: translate(-30px, -25px) scale(1.2); filter: hue-rotate(-40deg); }
	}

	@keyframes drift-5 {
		0%, 100% { transform: translate(0px, 0px) scale(0.9); filter: hue-rotate(0deg); }
		50% { transform: translate(35px, 25px) scale(1.25); filter: hue-rotate(80deg); }
	}

	/* Twinkling "spark" accents — outside the blurred mesh so they stay crisp */
	.sparkles {
		--spark-color: rgba(16, 185, 129, 0.9); /* emerald-500 tint in light mode */
		position: absolute;
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

	.sparkles .sparkle-1 { top: 16%; left: 18%; }
	.sparkles .sparkle-2 { top: 30%; right: 14%; animation-delay: 1.1s; }
	.sparkles .sparkle-3 { bottom: 26%; left: 14%; animation-delay: 2.3s; }
	.sparkles .sparkle-4 { bottom: 16%; right: 22%; animation-delay: 3.4s; }

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
</style>
