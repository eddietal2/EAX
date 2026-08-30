<script lang="ts">
	import { browser } from '$app/environment';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	// Platform detection: only surface app-store links to visitors on a mobile OS.
	// Computed at init (client-side) so store buttons render without a flash.
	function detectPlatform(): 'android' | 'ios' | 'other' {
		if (!browser) return 'other';
		const ua = navigator.userAgent || navigator.vendor || '';
		if (/android/i.test(ua)) return 'android';
		if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
		return 'other';
	}

	let platform = $state<'android' | 'ios' | 'other'>(detectPlatform());
</script>

<svelte:head>
	<title>Send Money with Nala - SimbaFX Currency Exchange</title>
	<meta name="description" content="Send money fast and affordably with Nala. Use referral code EDDIE-737426 before your first transfer to get $15 back when you send $50." />
</svelte:head>

<div class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 overflow-auto">
	<div class="p-4 md:p-8 max-w-4xl mx-auto">
		<div class="relative max-w-md mx-auto">
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

			<div class="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
				<a
					href="/"
					class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-4"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
					{t('nala.back')}
				</a>

				<div class="text-center flex flex-col items-center gap-3 mb-5">
					<svg
						class="nala-logo-lg"
						viewBox="0 0 73 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path d="M26.2954 7.40207C26.5978 7.40207 26.8427 7.48832 27.0299 7.64642C27.2172 7.80452 27.3468 8.03449 27.4188 8.32195H27.462C27.5484 8.32195 27.6924 8.26446 27.8796 8.16385C28.0669 8.06324 28.1965 7.99137 28.2685 7.96262C28.859 7.74703 29.4495 7.6033 30.04 7.53143C30.6449 7.44519 31.2498 7.40207 31.8836 7.40207C32.4309 7.40207 33.0069 7.44519 33.5975 7.51705C34.188 7.58892 34.7641 7.73265 35.3113 7.91951C35.8587 8.12073 36.3771 8.37945 36.838 8.7244C37.2989 9.06931 37.6877 9.50053 38.0046 10.0323C38.1199 10.2479 38.2351 10.4779 38.3359 10.7654C38.4367 11.0384 38.4944 11.2972 38.4944 11.5415V19.8205C38.4944 20.1079 38.3647 20.3235 38.1199 20.4959C37.875 20.6541 37.6301 20.7403 37.3853 20.7403C37.2845 20.7403 37.1693 20.7115 37.0397 20.6684C36.9101 20.6253 36.7948 20.5534 36.6796 20.4816C36.5644 20.3954 36.4779 20.3091 36.3915 20.2085C36.3195 20.1079 36.2763 20.0073 36.2763 19.8779V11.7571C36.2763 11.7284 36.2475 11.6277 36.1755 11.4696C36.1035 11.3116 36.0603 11.2109 36.0315 11.1678C35.8299 10.8372 35.5706 10.5642 35.2393 10.363C34.9081 10.1474 34.548 10.0036 34.1591 9.88863C33.7703 9.78798 33.367 9.71614 32.9637 9.67302C32.5605 9.6299 32.186 9.6155 31.8403 9.6155C31.4803 9.6155 31.1059 9.6299 30.717 9.65862C30.3281 9.68742 29.9536 9.75926 29.5792 9.8599C29.2191 9.96047 28.859 10.1042 28.5278 10.291C28.1965 10.4779 27.9228 10.7223 27.6924 11.0384C27.6492 11.1104 27.5772 11.2253 27.5052 11.3834C27.4188 11.5415 27.3756 11.6277 27.3756 11.6709V19.7629C27.3756 20.036 27.246 20.266 26.9867 20.4528C26.7274 20.6397 26.4682 20.7403 26.2378 20.7403C26.0218 20.7403 25.8057 20.6684 25.5464 20.5103C25.3016 20.3666 25.1719 20.1653 25.1719 19.921V8.22134C25.1719 7.96262 25.3016 7.77577 25.5464 7.63204C25.8633 7.47394 26.0938 7.40207 26.2954 7.40207Z" fill="#00A2DC"></path>
						<path d="M40.3243 14.0561C40.3243 13.0643 40.4828 12.1732 40.8141 11.3539C41.1453 10.5347 41.6062 9.83041 42.1967 9.2411C42.7872 8.65179 43.493 8.19185 44.3139 7.87564C45.1348 7.55943 46.0278 7.38695 46.9928 7.38695C47.7561 7.38695 48.505 7.45882 49.2107 7.58818C49.9308 7.71753 50.6222 7.96187 51.2991 8.30683H51.3711C51.4575 8.04811 51.6015 7.83251 51.7888 7.66004C51.976 7.48756 52.2065 7.38695 52.4945 7.38695C52.7393 7.38695 52.9842 7.4732 53.2291 7.6313C53.4739 7.7894 53.6035 8.01937 53.6035 8.30683V19.791C53.6035 20.0784 53.4739 20.294 53.2291 20.4664C52.9842 20.6246 52.7393 20.7108 52.4945 20.7108C52.2065 20.7108 51.976 20.6246 51.7888 20.4377C51.6015 20.2652 51.4575 20.0353 51.3711 19.791H51.2991C50.579 20.1359 49.8588 20.3803 49.1531 20.5095C48.4474 20.6389 47.6984 20.7108 46.9207 20.7108C45.9414 20.7108 45.0484 20.5527 44.2418 20.2221C43.4353 19.8915 42.7296 19.4316 42.1535 18.8423C41.563 18.253 41.1165 17.5487 40.7997 16.7295C40.4828 15.9246 40.3243 15.0334 40.3243 14.0561ZM42.5423 14.0417C42.5423 14.7028 42.6575 15.3065 42.8736 15.8527C43.0896 16.3989 43.3921 16.8732 43.7809 17.2613C44.1698 17.6637 44.6307 17.9655 45.178 18.1811C45.7109 18.3967 46.3158 18.5117 46.9783 18.5117C47.3096 18.5117 47.684 18.4973 48.0873 18.4543C48.505 18.4111 48.8938 18.3392 49.2827 18.2387C49.6716 18.138 50.0316 17.9799 50.3629 17.7787C50.6942 17.5774 50.9535 17.3044 51.1551 16.9594C51.1983 16.8876 51.2414 16.7869 51.2991 16.6576C51.3567 16.5283 51.3711 16.4276 51.3711 16.327V11.7995C51.3711 11.7133 51.3423 11.5982 51.2991 11.4689C51.2414 11.3396 51.1983 11.2389 51.1551 11.1671C50.9535 10.8365 50.7086 10.5778 50.3773 10.3766C50.0604 10.1753 49.7004 10.0172 49.326 9.90225C48.9371 9.78729 48.5482 9.71536 48.145 9.67224C47.7416 9.62912 47.3672 9.6148 47.0216 9.6148C46.359 9.6148 45.7541 9.71537 45.2068 9.93097C44.6595 10.1466 44.1842 10.434 43.7953 10.8221C43.4065 11.2102 43.1041 11.6702 42.888 12.2163C42.6575 12.7625 42.5423 13.3661 42.5423 14.0417Z" fill="#00A2DC"></path>
						<path d="M56.4555 5.28821C56.6859 5.28821 56.9164 5.3457 57.1756 5.46069C57.4349 5.57567 57.5645 5.79127 57.5645 6.0931V19.8625C57.5645 20.1212 57.4349 20.3224 57.1756 20.4805C56.9164 20.6387 56.6859 20.7105 56.4555 20.7105C56.3547 20.7105 56.2395 20.6818 56.1098 20.6387C55.9802 20.5956 55.865 20.538 55.7642 20.4662C55.6633 20.3944 55.5769 20.3081 55.5049 20.1931C55.4329 20.0925 55.4041 19.9775 55.4041 19.8625V6.0931C55.4041 5.83439 55.5337 5.64754 55.7786 5.50381C56.0234 5.36008 56.2539 5.28821 56.4555 5.28821Z" fill="#00A2DC"></path>
						<path d="M59.3491 14.0561C59.3491 13.0643 59.5076 12.1732 59.8388 11.3539C60.17 10.5347 60.6309 9.83041 61.2214 9.2411C61.812 8.65179 62.5176 8.19185 63.3386 7.87564C64.1596 7.55943 65.0525 7.38695 66.0175 7.38695C66.7808 7.38695 67.5297 7.45882 68.2355 7.58818C68.9556 7.71753 69.647 7.96187 70.3238 8.30683H70.3959C70.4823 8.04811 70.6263 7.83251 70.8136 7.66004C71.0008 7.48756 71.2312 7.38695 71.5193 7.38695C71.7641 7.38695 72.009 7.4732 72.2538 7.6313C72.4986 7.7894 72.6282 8.01937 72.6282 8.30683V19.791C72.6282 20.0784 72.4986 20.294 72.2538 20.4664C72.009 20.6246 71.7641 20.7108 71.5193 20.7108C71.2312 20.7108 71.0008 20.6246 70.8136 20.4377C70.6263 20.2652 70.4823 20.0353 70.3959 19.791H70.3238C69.6038 20.1359 68.8836 20.3803 68.1779 20.5095C67.4721 20.6389 66.7232 20.7108 65.9455 20.7108C64.9661 20.7108 64.0731 20.5527 63.2666 20.2221C62.46 19.8915 61.7543 19.4316 61.1782 18.8423C60.5877 18.253 60.1412 17.5487 59.8244 16.7295C59.522 15.9246 59.3491 15.0334 59.3491 14.0561ZM61.5815 14.0417C61.5815 14.7028 61.6967 15.3065 61.9128 15.8527C62.1288 16.3989 62.4312 16.8732 62.8201 17.2613C63.209 17.6637 63.6699 17.9655 64.2172 18.1811C64.7501 18.3967 65.355 18.5117 66.0175 18.5117C66.3487 18.5117 66.7232 18.4973 67.1265 18.4543C67.5441 18.4111 67.933 18.3392 68.3219 18.2387C68.7107 18.138 69.0708 17.9799 69.4021 17.7787C69.7333 17.5774 69.9926 17.3044 70.1942 16.9594C70.2374 16.8876 70.2806 16.7869 70.3382 16.6576C70.3959 16.5283 70.4103 16.4276 70.4103 16.327V11.7995C70.4103 11.7133 70.3815 11.5982 70.3382 11.4689C70.2806 11.3396 70.2374 11.2389 70.1942 11.1671C69.9926 10.8365 69.7478 10.5778 69.4165 10.3766C69.0996 10.1753 68.7395 10.0172 68.3651 9.90225C67.9762 9.78729 67.5873 9.71536 67.1841 9.67224C66.7808 9.62912 66.4063 9.6148 66.0607 9.6148C65.3982 9.6148 64.7933 9.71537 64.246 9.93097C63.6986 10.1466 63.2234 10.434 62.8345 10.8221C62.4456 11.2102 62.1432 11.6702 61.9272 12.2163C61.6823 12.7625 61.5815 13.3661 61.5815 14.0417Z" fill="#00A2DC"></path>
						<path d="M6.96825 12.6333C7.01146 12.5615 7.08347 12.5039 7.19869 12.4752C7.40033 12.4321 7.48674 12.2596 7.52995 12.0871C7.58756 11.8141 7.74599 11.5985 7.91882 11.4116C7.91882 11.3973 7.93322 11.3973 7.94762 11.3973C7.08347 9.42815 7.11228 9.85936 6.79542 7.71774C6.6658 6.84098 6.53618 5.9211 6.1185 5.15933C5.05271 3.17585 4.05894 3.26208 3.79969 3.37707C3.61245 3.4633 3.48283 3.96636 3.52604 4.23945C4.20296 9.9312 5.90247 11.0523 6.96825 12.6333Z" fill="#00A2DC"></path>
						<path d="M9.73246 10.3481C9.77566 10.4918 9.80453 10.6355 9.81893 10.7936C10.1357 10.7505 10.4382 10.7649 10.7551 10.7649C10.8559 10.7649 10.8847 10.808 10.8703 10.8943C10.8559 11.0524 10.8415 11.2105 10.8127 11.3685C10.7983 11.4692 10.8559 11.5123 10.9279 11.541C11.1007 11.5841 11.2591 11.6273 11.432 11.6704C11.2879 11.1529 11.1295 10.4343 10.9711 9.48567C10.7839 8.49395 10.7839 6.43859 10.539 4.22514C10.3086 0.143179 6.03104 -2.09902 9.73246 10.3481Z" fill="#00A2DC"></path>
						<path d="M13.1024 11.1239C13.0736 11.2101 13.0016 11.4689 12.9152 11.7563C12.944 11.7707 12.9872 11.7994 13.016 11.8138C13.2176 11.9431 13.448 11.9431 13.6785 11.9431C13.8657 11.9288 14.053 11.9 14.2402 11.9C14.269 11.9 14.3266 11.9431 14.341 11.9863C14.3986 12.1587 14.4418 12.3456 14.4994 12.5324C14.4994 12.5612 14.5282 12.59 14.5138 12.6044C14.4274 12.7049 14.4994 12.7912 14.5426 12.863C14.6434 13.0643 14.7011 13.3086 14.8883 13.4667C14.9459 13.5242 14.9603 13.6392 14.9603 13.7254C14.9603 13.8979 15.0035 14.0416 15.1188 14.1854C15.2052 14.2716 15.2484 14.401 15.3204 14.5016C15.3492 14.5447 15.3636 14.5878 15.3924 14.6166C14.9027 13.3229 14.8739 11.9575 14.9891 10.6208C16.3862 1.53706 12.7135 4.46916 13.2032 7.08506C13.5345 8.83861 13.7073 9.37039 13.1024 11.1239Z" fill="#00A2DC"></path>
						<path d="M22.2201 13.9275C22.1913 12.9933 21.572 12.5765 20.7654 13.022C20.247 13.3095 19.8005 13.7838 19.3972 14.2294C19.0372 14.6462 18.8067 15.3361 18.5186 15.5948C17.9858 16.0691 17.3808 16.2273 16.8336 16.1122C16.7184 16.3278 16.5599 16.5434 16.3583 16.7159C16.3295 16.7303 16.3151 16.759 16.2863 16.7734C15.9262 16.9027 15.739 17.2333 15.4942 17.4777C15.3501 17.6071 15.2925 17.7795 15.2781 17.952C15.2637 18.1676 15.3069 18.3688 15.3357 18.5844C15.3789 18.8431 15.4365 19.0875 15.4653 19.3462C15.4942 19.5187 15.3933 19.648 15.2637 19.7343C15.0908 19.8493 14.918 19.9355 14.7596 20.0505C14.5723 20.1798 14.5435 20.2805 14.6299 20.4961C14.6587 20.5966 14.6875 20.6973 14.7019 20.7978C14.7308 20.9416 14.6587 21.0566 14.5292 21.0997C14.2987 21.1859 14.2411 21.344 14.2555 21.5596C14.2699 21.689 14.1979 21.804 14.0827 21.8759C14.0107 21.9333 13.9531 22.0052 13.8954 22.0771C13.8666 22.1202 13.8378 22.1633 13.7946 22.1921C13.6506 22.3358 13.5209 22.4795 13.3625 22.5945C13.2329 22.6807 13.0889 22.7526 12.9305 22.767C12.7 22.7958 12.4696 22.767 12.2535 22.8676C12.1239 22.9251 11.9943 22.8676 11.9367 22.7238C11.8935 22.6089 11.8647 22.4939 11.8359 22.3789C11.7783 22.2065 11.7351 22.034 11.6631 21.8759C11.5334 21.5596 11.4038 21.2578 11.2598 20.9559C11.2454 20.9272 11.231 20.9129 11.2454 20.8841C11.2598 20.611 11.1013 20.4098 10.9861 20.1798C10.7989 19.8349 10.8133 19.49 11.0293 19.145C11.1301 18.9725 11.1877 18.8 11.1301 18.5988C11.0581 18.3832 11.0149 18.1676 10.9573 17.952C10.9429 17.9089 10.9141 17.8657 10.8853 17.837C10.7413 17.6645 10.6117 17.492 10.4677 17.3196C10.41 17.2477 10.41 17.1759 10.4533 17.0896C10.5109 16.9747 10.5541 16.8453 10.5973 16.7159C10.6261 16.601 10.5685 16.5147 10.4388 16.5003C10.3236 16.4716 10.2084 16.4716 10.0932 16.4716C9.97792 16.4716 9.89153 16.4285 9.86273 16.3134C9.81953 16.1841 9.71873 16.1266 9.60345 16.141C9.40186 16.1553 9.21459 16.2129 9.01299 16.2416C8.85452 16.2703 8.69612 16.2703 8.53772 16.2991C8.42245 16.3134 8.29285 16.3278 8.19205 16.3854C7.9904 16.5003 7.81756 16.4859 7.63034 16.3422C7.4431 16.1841 7.24147 16.0404 7.03982 15.8823C7.02542 15.8679 7.01102 15.8392 7.01102 15.8248C7.03983 15.6954 6.93901 15.6236 6.867 15.5373C6.79498 15.4655 6.75178 15.3648 6.69416 15.2786C6.67976 15.2499 6.65096 15.2211 6.62216 15.2211C6.52134 15.2067 6.47813 15.1349 6.46373 15.0487C6.40611 14.8474 6.34851 14.6462 6.44932 14.4306C6.44932 14.4162 6.46373 14.4018 6.46373 14.4018C6.27649 14.3731 6.08926 14.3012 5.90203 14.1431C5.34033 13.6688 5.1531 13.4388 3.94328 11.1823C2.48862 6.95659 -1.31365 9.38564 1.22119 11.0529C1.94133 11.7429 2.70466 12.3753 3.41039 13.0795C5.48435 15.1636 5.55636 15.6523 7.06863 18.1532C7.96159 19.6336 8.85452 21.1428 9.89153 22.5082C10.4965 23.3131 11.3462 24.0031 12.2103 24.5205C13.881 25.5266 15.7966 24.8942 16.6608 23.1407C16.992 22.4795 17.208 21.7608 17.4096 21.0422C17.9426 19.0875 18.2594 18.4838 19.9157 17.3196C20.463 16.9315 20.9959 16.4859 21.4712 16.0117C22.0473 15.4655 22.2489 14.7181 22.2201 13.9275ZM16.9632 19.5762C16.8048 20.0505 16.6463 20.5248 16.5023 20.9847C16.4447 21.1715 16.3727 21.2291 16.2142 21.2291C16.0702 21.2291 15.9838 21.1572 15.9262 20.9847C15.9118 20.9272 15.8974 20.8698 15.883 20.8266C15.7966 20.6685 15.7534 20.5104 15.9406 20.3667C15.9838 20.3236 15.9838 20.2085 15.9694 20.1367C15.8974 19.8349 15.955 19.6768 16.243 19.5474C16.4015 19.4756 16.5167 19.3749 16.5887 19.2024C16.6175 19.1162 16.704 19.0587 16.7616 18.9869C16.8192 19.0587 16.9056 19.1162 16.9488 19.2024C16.992 19.2887 17.0064 19.3749 17.0352 19.4468C16.9776 19.5187 16.9776 19.5474 16.9632 19.5762Z" fill="#00A2DC"></path>
					</svg>
					<p class="text-sm text-gray-500 dark:text-gray-400">{t('nala.subtitle')}</p>
				</div>

				<div class="nala-offer">
					<h3 class="nala-offer-headline">
						You send <span class="nala-offer-strong">$50</span>, you get <span class="nala-offer-strong">$15</span> back!
					</h3>

					<p class="nala-how-title">How does it work?</p>

					<div class="nala-flow">
						<div class="nala-flow-step">
							<span class="nala-flow-amount">$50</span>
							<span class="nala-flow-caption">You send</span>
						</div>
						<span class="nala-flow-arrow" aria-hidden="true">→</span>
						<div class="nala-flow-step">
							<span class="nala-flow-amount">$15</span>
							<span class="nala-flow-caption">You get back</span>
						</div>
					</div>

					<div class="nala-code">
						<span class="nala-code-label">Referral code</span>
						<code class="nala-code-value">EDDIE-737426</code>
					</div>
					<p class="nala-note">Enter this code <b class="nala-note-strong">before your first transfer</b> — referral codes can only be applied before your first transfer is completed.</p>
				</div>

				<a
					href="https://www.nala.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="nala-cta"
				>
					{t('nala.visit')}
					<svg xmlns="http://www.w3.org/2000/svg" class="nala-cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>

				{#if platform === 'other'}
				<div class="nala-available">
					<svg class="nala-available-icon nala-available-android" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">
						<path d="M420.55 301.93a24 24 0 1 1-24-24 24 24 0 0 1 24 24m-265.1 0a24 24 0 1 1-24-24 24 24 0 0 1 24 24m263.18-63.7l44.7-77.39a8.67 8.67 0 0 0-15.07-8.57L404.9 227.27a243.9 243.9 0 0 0-233.82 0L53.34 152.27a8.67 8.67 0 1 0-15.07 8.57L83 238.23C34.44 269.88 1.5 320.85 1.5 377.14a8.58 8.58 0 0 0 8.58 8.58h555.84a8.58 8.58 0 0 0 8.58-8.58c0-56.29-32.94-107.26-81.47-138.91z"/>
					</svg>
					<span class="nala-available-text">Available on Android & iOS</span>
					<svg class="nala-available-icon nala-available-apple" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
						<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
					</svg>
				</div>
				{/if}

				{#if platform === 'android' || platform === 'ios'}
					<!-- TODO: replace with Nala's real app store URLs -->
					<div class="nala-stores">
						<a
							href="https://play.google.com/store/apps/details?id=money.nala.remit&hl=en&pli=1"
							target="_blank"
							rel="noopener noreferrer"
							class="nala-store-btn"
						>
							<svg class="nala-store-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.2a1.49 1.49 0 0 1 0 2.596zM1.337.924a1.486 1.486 0 0 0-.112.568v21.016c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11.04 10.974c.298.036.612-.016.946-.177l13.518-7.556-3.424-3.241z"/>
							</svg>
							<span class="nala-store-text">
								<span class="nala-store-small">Get it on</span>
								<span class="nala-store-large">Google Play</span>
							</span>
						</a>
						<a
							href="https://apps.apple.com/app/id1549983218"
							target="_blank"
							rel="noopener noreferrer"
							class="nala-store-btn"
						>
							<svg class="nala-store-icon" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
								<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
							</svg>
							<span class="nala-store-text">
								<span class="nala-store-small">Download on the</span>
								<span class="nala-store-large">App Store</span>
							</span>
						</a>
					</div>
				{/if}
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

	/* ── Nala offer content ── */
	.nala-logo-lg {
		height: 30px;
		width: auto;
		display: block;
		margin: 0 auto;
	}

	.nala-offer {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 10px;
		padding: 12px;
		box-sizing: border-box;
	}

	:global(html.dark) .nala-offer {
		background: rgba(255, 255, 255, 0.08);
	}

	.nala-offer-headline {
		margin: 0;
		font-size: 15px;
		font-weight: 700;
		line-height: 1.35;
	}

	:global(html:not(.dark)) .nala-offer-headline {
		color: #064e3b;
	}
	:global(html.dark) .nala-offer-headline {
		color: #e2e8f0;
	}

	.nala-offer-strong {
		color: #00A2DC;
	}

	.nala-how-title {
		margin: 0;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: #6b7280;
	}

	:global(html.dark) .nala-how-title {
		color: #9ca3af;
	}

	.nala-flow {
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 8px;
	}

	.nala-flow-step {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 8px 6px;
		border-radius: 8px;
		background: rgba(0, 162, 220, 0.12);
	}

	.nala-flow-amount {
		font-size: 18px;
		font-weight: 800;
		color: #00A2DC;
	}

	.nala-flow-caption {
		font-size: 9px;
		font-weight: 500;
		color: #6b7280;
		text-align: center;
	}

	:global(html.dark) .nala-flow-caption {
		color: #9ca3af;
	}

	.nala-flow-arrow {
		align-self: center;
		font-size: 18px;
		font-weight: 700;
		color: #00A2DC;
	}

	.nala-code {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.nala-code-label {
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: #6b7280;
	}

	:global(html.dark) .nala-code-label {
		color: #9ca3af;
	}

	.nala-code-value {
		font-size: 14px;
		font-weight: 800;
		letter-spacing: 1px;
		color: #0369a1;
		background: rgba(0, 162, 220, 0.12);
		border-radius: 6px;
		padding: 4px 10px;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	}

	:global(html.dark) .nala-code-value {
		color: #7dd3fc;
	}

	.nala-note {
		margin: 0;
		font-size: 10px;
		line-height: 1.5;
		color: #6b7280;
	}

	:global(html.dark) .nala-note {
		color: #9ca3af;
	}

	.nala-note-strong {
		color: #0369a1;
	}

	:global(html.dark) .nala-note-strong {
		color: #7dd3fc;
	}

	.nala-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 12px;
		border: none;
		border-radius: 8px;
		background: #00A2DC;
		color: #ffffff;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.2s;
		box-sizing: border-box;
	}

	.nala-cta:hover {
		background: #0088b8;
	}

	.nala-cta-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.nala-available {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		width: fit-content;
		margin: 4px auto 0;
		padding: 6px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.55);
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
	}

	:global(html.dark) .nala-available {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.12);
		box-shadow: none;
	}

	.nala-available-icon {
		width: 13px;
		height: 13px;
		flex-shrink: 0;
	}

	.nala-available-android {
		color: #3ddc84;
	}

	.nala-available-apple {
		color: #111827;
	}

	:global(html.dark) .nala-available-apple {
		color: #f3f4f6;
	}

	.nala-available-text {
		font-size: 10.5px;
		font-weight: 600;
		letter-spacing: 0.2px;
		color: #4b5563;
		white-space: nowrap;
	}

	:global(html.dark) .nala-available-text {
		color: #d1d5db;
	}

	.nala-stores {
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 8px;
		margin-top: 16px;
	}

	.nala-store-btn {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 8px 10px;
		border-radius: 8px;
		background: #111827;
		color: #ffffff;
		text-decoration: none;
		transition: background 0.2s;
		box-sizing: border-box;
	}

	.nala-store-btn:hover {
		background: #1f2937;
	}

	:global(html.dark) .nala-store-btn {
		background: #f9fafb;
		color: #111827;
	}

	:global(html.dark) .nala-store-btn:hover {
		background: #e5e7eb;
	}

	.nala-store-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.nala-store-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.1;
	}

	.nala-store-small {
		font-size: 7px;
		font-weight: 500;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		opacity: 0.8;
	}

	.nala-store-large {
		font-size: 13px;
		font-weight: 700;
	}
</style>
