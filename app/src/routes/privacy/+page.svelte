<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Privacy Policy — SimbaFX Currency Exchange"
	description="Read the SimbaFX privacy policy: what data SimbaFX collects, how it is used, cookie and advertising information (Google AdSense), and your privacy rights."
	path="/privacy"
/>

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 overflow-auto">
	<div class="p-4 md:p-8 max-w-3xl mx-auto">
		<div class="relative">
			<!-- Gemini-style animated green "Spark Gradient" behind the policy card -->
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

			<div class="relative bg-white/85 dark:bg-gray-900/85 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Privacy Policy</h1>
				<p class="text-xs text-gray-500 dark:text-gray-400 mb-6">Last updated: August 30, 2026</p>

				<div class="space-y-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">1. Introduction</h2>
						<p>
							SimbaFX is a free currency converter web app and browser extension. This Privacy Policy explains what information
							is collected, how it is used, and the choices you have. By using SimbaFX, you agree to this policy.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">2. Information We Collect</h2>
						<ul class="list-disc pl-5 space-y-1.5">
							<li><strong>No account required.</strong> You do not need to sign up or provide personal information to convert currencies.</li>
							<li><strong>Conversion activity stays on your device.</strong> The amounts you enter are processed in your browser and are not sent to our servers.</li>
							<li><strong>Contact form (optional).</strong> If you use the Contact page, you voluntarily provide your name, email address, and message, which are emailed to us so we can respond. This information is not used for any other purpose.</li>
							<li><strong>Analytics.</strong> We do not currently run third-party analytics on this site.</li>
						</ul>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">3. Local Storage</h2>
						<p>We store certain data in your browser&rsquo;s local storage to improve your experience:</p>
						<ul class="list-disc pl-5 space-y-1.5">
							<li>Your language, theme, and default currency preferences.</li>
							<li>Your conversion history (saved manually by you).</li>
							<li>Cached exchange rates, so the app works offline and to reduce API calls.</li>
						</ul>
						<p class="mt-2">
							This data stays on your device and is not transmitted to us. You can clear it at any time through your browser settings.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">4. Cookies and Advertising</h2>
						<ul class="list-disc pl-5 space-y-1.5">
							<li>We do not use cookies for essential site functionality beyond local storage.</li>
							<li>
								<strong>Advertising:</strong> We may display ads served by Google AdSense and other advertising partners. These partners
								may use cookies (including the Google DoubleClick cookie) to serve ads based on your prior visits to this and other websites.
							</li>
							<li>
								<strong>Opting out:</strong> You can opt out of personalized advertising via
								<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 hover:underline">Google Ads Settings</a>,
								the <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 hover:underline">Network Advertising Initiative</a>,
								or <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 hover:underline">YourOnlineChoices</a> (for European users).
							</li>
							<li>If you are in the EEA/UK, advertising partners may require your consent before setting such cookies; you will be offered the relevant consent options.</li>
						</ul>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">5. Third-Party Services</h2>
						<p>SimbaFX uses these third parties, which have their own privacy policies:</p>
						<ul class="list-disc pl-5 space-y-1.5">
							<li><strong>Exchange rate APIs</strong> (e.g., exchangerate.host / exchangerate-api.com) — to fetch current rates.</li>
							<li><strong>Hosting</strong> — the app is hosted on Vercel.</li>
							<li><strong>Advertising</strong> — Google AdSense (see Section 4).</li>
							<li><strong>External links</strong> — pages may link to third-party sites (e.g., Nala). We are not responsible for their privacy practices.</li>
						</ul>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">6. How We Use Your Information</h2>
						<p>We use information only to:</p>
						<ul class="list-disc pl-5 space-y-1.5">
							<li>Operate and improve the converter and its features.</li>
							<li>Respond to messages you send through the contact form.</li>
							<li>Show (or serve) advertising.</li>
							<li>Maintain security and prevent abuse.</li>
						</ul>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">7. Sharing and Selling</h2>
						<p>
							We do <strong>not</strong> sell or rent your personal information. We only share data with the third-party service
							providers described above as necessary to operate the service, or where required by law.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">8. Your Privacy Rights</h2>
						<p>Depending on your location (e.g., GDPR in the EU/UK, CCPA in California), you may have the right to:</p>
						<ul class="list-disc pl-5 space-y-1.5">
							<li>Access, correct, or delete your personal information.</li>
							<li>Restrict or object to processing.</li>
							<li>Data portability.</li>
							<li>Opt out of personalized advertising.</li>
						</ul>
						<p class="mt-2">
							To exercise these rights, contact us through the Contact page. We will respond within the timeframe required by applicable law.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">9. Children&rsquo;s Privacy</h2>
						<p>
							SimbaFX is not directed at children under 13, and we do not knowingly collect personal information from children.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">10. Data Retention and Security</h2>
						<p>
							Most data stays in your browser&rsquo;s local storage and is deleted when you clear it. Contact messages are retained
							only as long as needed to respond. We use reasonable measures to protect any information we process.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">11. Changes to This Policy</h2>
						<p>
							We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the latest version.
							Material changes will be noted on this page.
						</p>
					</section>

					<section>
						<h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">12. Contact Us</h2>
						<p>
							If you have questions about this Privacy Policy, contact us via the
							<a href="/contact" class="text-emerald-600 dark:text-emerald-400 hover:underline">Contact page</a>.
						</p>
					</section>
				</div>
			</div>
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
