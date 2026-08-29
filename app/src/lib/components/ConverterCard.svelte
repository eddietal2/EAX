<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { rates, getStaticRates, isLoading, fetchError } from '$lib/stores/exchangeRates';
	import FlagIcon from './FlagIcon.svelte';
	import Skeleton from './Skeleton.svelte';

	interface Props {
		fromCurrency: string;
		toCurrency: string;
		amount: string;
		inputHasValue: boolean;
		convertedAmount: () => string;
		mounted: boolean;
		isMobile: boolean;
		swapButtonEl?: HTMLDivElement;
		amountInput?: HTMLInputElement;
		onSwap: () => void;
		onClear: () => void;
		onInputFocus: () => void;
		onInputChange?: () => void;
		onFromCurrencyChange?: (currency: string) => void;
		onToCurrencyChange?: (currency: string) => void;
		t: (key: string) => string;
	}

	let {
		fromCurrency = $bindable('USD'),
		toCurrency = $bindable('TZS'),
		amount = $bindable(''),
		inputHasValue = false,
		convertedAmount,
		mounted,
		isMobile,
		swapButtonEl = $bindable(),
		amountInput = $bindable(),
		onSwap,
		onClear,
		onInputFocus,
		onInputChange,
		onFromCurrencyChange,
		onToCurrencyChange,
		t
	}: Props = $props();

	const currencies = [
		'AED', 'AUD', 'BIF', 'CAD', 'CDF', 'CHF', 'CNY', 'EGP', 'ETB', 'EUR',
		'GBP', 'INR', 'KES', 'MWK', 'MZN', 'NGN', 'RWF', 'SAR', 'TZS', 'UGX', 'USD', 'ZAR', 'ZMW'
	];

	let swapRotation = $state(0);
	let isSwapping = $state(false);

	// Auto-dismiss the rate error notice after 5 seconds.
	let showRateError = $state(false);
	$effect(() => {
		const err = $fetchError;
		if (err) {
			showRateError = true;
			const timer = setTimeout(() => {
				showRateError = false;
			}, 5000);
			return () => clearTimeout(timer);
		}
		showRateError = false;
	});

	function stripToNumeric(value: string): string {
		const cleaned = value.replace(/[^0-9.+\-*/]/g, '');
		const [intPart, ...rest] = cleaned.split('.');
		return intPart + (rest.length ? '.' + rest.join('') : '');
	}

	function evaluateExpression(expression: string): string {
		try {
			const cleaned = expression.replace(/,/g, '').trim();
			
			if (!cleaned) return '';
			
			let toEvaluate = cleaned;
			if (/[+\-*/]$/.test(toEvaluate)) {
				toEvaluate = toEvaluate.slice(0, -1).trim();
			}
			
			if (!toEvaluate) return '';
			
			const result = Function('"use strict"; return (' + toEvaluate + ')')();
			
			if (typeof result === 'number' && isFinite(result)) {
				return result.toString();
			}
			return cleaned;
		} catch (e) {
			return '';
		}
	}

	function formatWithCommas(value: string): string {
		if (!value) return '';
		const parts = value.split('.');
		parts[0] = parts[0].replace(/^0+(?=\d)/, '');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	}

	function formatExpressionWithCommas(value: string): string {
		if (!value) return '';
		
		const parts = value.split(/(?=[+\-*/])|(?<=[+\-*/])/);
		
		return parts.map(part => {
			if (/^[\d.]+$/.test(part)) {
				return formatWithCommas(part);
			}
			return part;
		}).join('');
	}

	function currencyInput(node: HTMLInputElement) {
		async function handleInput() {
			const cursorPos = node.selectionStart ?? node.value.length;
			const rawBefore = node.value;

			const digitsBeforeCursor = rawBefore.slice(0, cursorPos).replace(/[^0-9.+\-*/]/g, '').length;

			const expression = stripToNumeric(rawBefore.replace(/,/g, ''));
			
			const evaluated = evaluateExpression(expression);
			amount = evaluated;

			await tick();

			const formatted = formatExpressionWithCommas(expression);
			node.value = formatted;
			inputHasValue = formatted.length > 0;

			let charsSeen = 0;
			let newCursor = 0;
			for (let i = 0; i < formatted.length; i++) {
				if (formatted[i] !== ',') charsSeen++;
				if (charsSeen === digitsBeforeCursor) {
					newCursor = i + 1;
					break;
				}
			}
			if (digitsBeforeCursor === 0) newCursor = 0;
			node.setSelectionRange(newCursor, newCursor);
		}

		node.addEventListener('input', handleInput);
		return {
			destroy() {
				node.removeEventListener('input', handleInput);
			}
		};
	}

	function handleSwap() {
		isSwapping = true;
		swapRotation += 180;
		const temp = fromCurrency;
		fromCurrency = toCurrency;
		toCurrency = temp;
		setTimeout(() => { isSwapping = false; }, 400);
		onSwap();
	}

</script>

{#if !mounted}
	<!-- Skeleton Loading State -->
	<div class="md:w-[32%] md:min-w-[240px] md:mx-auto md:bg-gray-50 md:dark:bg-gray-800/30 md:rounded-2xl md:p-4">
		<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
			<!-- Currency Selectors Skeleton -->
			<div class="p-3 space-y-3">
				<div class="flex items-center gap-2">
					<Skeleton width="w-16" height="h-3" />
					<Skeleton width="w-10" height="h-10" circle={true} />
					<Skeleton width="w-20" height="h-10" />
					<Skeleton width="w-7" height="h-7" circle={true} />
					<Skeleton width="w-12" height="h-3" />
					<Skeleton width="w-10" height="h-10" circle={true} />
					<Skeleton width="w-20" height="h-10" />
				</div>
				<Skeleton width="w-full" height="h-10" />
			</div>
		</div>

		<!-- Exchange Rate Skeleton -->
		<div class="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
			<Skeleton width="w-32" height="h-3" class="mb-2" />
			<Skeleton width="w-full" height="h-4" />
		</div>

		<!-- Buttons Skeleton -->
		<div class="space-y-1.5 mt-2">
			<Skeleton width="w-full" height="h-10" />
			<Skeleton width="w-full" height="h-10" />
		</div>
	</div>
{/if}

{#if mounted}
	<div class="relative md:w-[32%] md:min-w-[240px] md:mx-auto md:bg-gray-50 md:dark:bg-gray-800/30 md:rounded-2xl md:p-4">
		<!-- Gemini-style animated green "Spark Gradient" behind the converter card -->
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
		<div class="relative bg-white/75 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-200">
			<!-- Currency Selectors Row -->
			<div class="p-3 md:p-3 dark:text-gray-300">
				<div class="flex items-center gap-2 md:gap-1.5 mb-2 md:mb-1 flex-wrap">
					<label for="from-currency" class="text-xs md:text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.fromLabel')}</label>
					<FlagIcon code={fromCurrency} size="md" />
					<select
						id="from-currency"
						bind:value={fromCurrency}
						onchange={() => onFromCurrencyChange?.(fromCurrency)}
						class="shrink-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 md:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>

					<!-- Swap Button (horizontal ↔) -->
					<div bind:this={swapButtonEl} class="shrink-0 flex items-center justify-center">
						<button
							onclick={handleSwap}
							aria-label="Swap currencies"
							class="w-7 h-7 md:w-7 md:h-7 bg-emerald-500 text-white rounded-full shadow flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-300 ease-out"
							style="transform: rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
							</svg>
						</button>
					</div>

					<label for="to-currency" class="text-xs md:text-xs text-gray-500 dark:text-gray-400 shrink-0">{t('home.toLabel')}</label>
					<FlagIcon code={toCurrency} size="md" />
					<select
						id="to-currency"
						bind:value={toCurrency}
						onchange={() => onToCurrencyChange?.(toCurrency)}
						class="shrink-0 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 md:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
					<span class="text-lg md:text-base font-semibold text-emerald-700 dark:text-emerald-300 tabular-nums truncate ml-auto bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-2.5 py-1">
						{convertedAmount() || '0.00'}
					</span>
				</div>
				<div class="relative">
					<slot name="input">
						<!-- Mobile: entered value + subtle tap affordance -->
						<button
							type="button"
							onclick={onInputFocus}
							aria-label="Open calculator"
							class="md:hidden w-full flex items-center justify-end gap-1.5 py-1 cursor-pointer group"
						>
							<span class="text-2xl font-semibold tabular-nums text-gray-900 dark:text-white {!inputHasValue ? 'text-gray-300 dark:text-gray-600' : ''}">
								{formatExpressionWithCommas(stripToNumeric(amount)) || '0'}
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 text-emerald-600/60 dark:text-emerald-400/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</button>
						<!-- Desktop: currency input -->
						<input
							bind:this={amountInput}
							use:currencyInput
							type="text"
							placeholder="0"
							inputmode={isMobile ? 'none' : 'decimal'}
							onfocus={onInputFocus}
							style="font-size: 16px;"
							class="hidden md:block w-full text-2xl md:text-xl font-semibold text-gray-900 dark:text-white bg-transparent border-0 focus:ring-0 focus:outline-none text-right placeholder-gray-300 dark:placeholder-gray-600 cursor-pointer md:cursor-default {inputHasValue ? 'pr-12' : ''} {!inputHasValue ? 'animate-pulse md:animate-none' : ''}"
						/>
					</slot>
					{#if inputHasValue}
						<button
							onclick={onClear}
							aria-label="Clear input"
							class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>
			</div>
		</div>

		<!-- Current Exchange Rate Label -->
		<div class="mt-2 md:mt-2 p-2 md:p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 relative transition-colors duration-200">
			<div class="flex items-center justify-between">
				<p class="text-xs md:text-xs font-medium text-emerald-900 dark:text-emerald-200">{t('home.exchangeRate')}</p>
				{#if $isLoading}
					<div class="flex items-center gap-1.5">
						<div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
						<span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('messages.loading')}</span>
					</div>
				{/if}
			</div>
			<p class="text-sm md:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 md:gap-1.5 {$isLoading ? 'opacity-70' : ''}">
				<FlagIcon code={fromCurrency} size="sm" />
				<span class="text-xs md:text-xs">1 {fromCurrency} = {( $rates[fromCurrency]?.[toCurrency] ?? getStaticRates()[fromCurrency]?.[toCurrency] ?? 1 ).toLocaleString(undefined, { maximumFractionDigits: 4 })} {toCurrency}</span>
				<FlagIcon code={toCurrency} size="sm" />
			</p>
			{#if $fetchError && showRateError}
				<div transition:fade={{ duration: 300 }} class="mt-2 flex items-start gap-1.5 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-2 py-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
					</svg>
					<p class="text-[11px] leading-snug text-amber-800 dark:text-amber-200">{$fetchError}</p>
				</div>
			{/if}
		</div>

		<div class="relative">
			<slot name="actions" />
		</div>
	</div>
{/if}

<style>
	button[aria-label="Swap currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}

	/* ── Gemini-style animated green "Spark Gradient" behind the converter ──
	   A contained glow layer sits behind the card (slightly oversized so it
	   peeks around the rounded edges, like Gemini's "New Chat" input glow).
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
