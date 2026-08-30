<script lang="ts">
	import { page } from '$app/stores';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	let status = $derived($page.status);

	let title = $derived(
		status === 404 ? t('error.notFoundTitle') :
		status === 500 ? t('error.serverErrorTitle') :
		t('error.genericTitle')
	);
	let message = $derived(
		status === 404 ? t('error.notFoundMessage') :
		status === 500 ? t('error.serverErrorMessage') :
		t('error.genericMessage')
	);
</script>

<svelte:head>
	<title>{status} - SimbaFX Currency Exchange</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 flex items-center justify-center overflow-auto">
	<div class="relative max-w-md w-full mx-4 my-8">
		<!-- Gemini-style animated green "Spark Gradient" behind the card -->
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

		<div class="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
			<p class="text-6xl font-extrabold text-emerald-600 dark:text-emerald-400 m-0">{status}</p>
			<h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-2">{title}</h1>
			<p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{message}</p>
			<a
				href="/"
				class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
			>
				{t('error.backHome')}
			</a>
		</div>
	</div>
</div>

<style>
	/* ── Gemini-style animated green "Spark Gradient" behind the card ── */
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
		filter: blur(60px);
	}

	:global(html.dark) .spark-gradient {
		--blob-1: #059669;
		--blob-2: #10b981;
		--blob-3: #14b8a6;
		--blob-4: #22c55e;
		--blob-5: #84cc16;
	}

	.spark-gradient .blob {
		position: absolute;
		border-radius: 50%;
		opacity: 0.7;
		will-change: transform, filter;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		animation-direction: alternate;
		mix-blend-mode: screen;
	}

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

	.sparkles {
		--spark-color: rgba(16, 185, 129, 0.9);
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
