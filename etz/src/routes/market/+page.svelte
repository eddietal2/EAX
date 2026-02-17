<script lang="ts">
	import USD_Bill_01 from '$lib/assets/bill-notes/USD/01_Bill.jpg';
	import USD_Bill_02 from '$lib/assets/bill-notes/USD/02_Bill.jpeg';
	import USD_Bill_05 from '$lib/assets/bill-notes/USD/05_Bill.jpg';
	import USD_Bill_10 from '$lib/assets/bill-notes/USD/10_Bill.jpg';
	import USD_Bill_20 from '$lib/assets/bill-notes/USD/20_Bill.jpg';
	import USD_Bill_50 from '$lib/assets/bill-notes/USD/50_Bill.jpg';
	import USD_Bill_100 from '$lib/assets/bill-notes/USD/100_Bill.jpg';

	import EURO_Bill_05 from '$lib/assets/bill-notes/EURO/05_Bill.png';
	import EURO_Bill_10 from '$lib/assets/bill-notes/EURO/10_Bill.png';
	import EURO_Bill_20 from '$lib/assets/bill-notes/EURO/20_Bill.png';
	import EURO_Bill_50 from '$lib/assets/bill-notes/EURO/50_Bill.png';
	import EURO_Bill_100 from '$lib/assets/bill-notes/EURO/100_Bill.png';

	import GBP_Bill_05 from '$lib/assets/bill-notes/GPB/05_Bill.png';
	import GBP_Bill_10 from '$lib/assets/bill-notes/GPB/10_Bill.png';
	import GBP_Bill_20 from '$lib/assets/bill-notes/GPB/20_Bill.png';
	import GBP_Bill_50 from '$lib/assets/bill-notes/GPB/50_Bill.png';

	import KES_Bill_50 from '$lib/assets/bill-notes/KES/50_Bill.png';
	import KES_Bill_100 from '$lib/assets/bill-notes/KES/100_Bill.png';
	import KES_Bill_200 from '$lib/assets/bill-notes/KES/200_Bill.png';
	import KES_Bill_500 from '$lib/assets/bill-notes/KES/500_Bill.png';
	import KES_Bill_1000 from '$lib/assets/bill-notes/KES/1000_Bill.png';

	import TSH_Bill_1K from '$lib/assets/bill-notes/TSh/1K_Bill.png';
	import TSH_Bill_2K from '$lib/assets/bill-notes/TSh/2K_Bill.png';
	import TSH_Bill_5K from '$lib/assets/bill-notes/TSh/5K_Bill.png';
	import TSH_Bill_10K from '$lib/assets/bill-notes/TSh/10K_Bill.png';

	import UGX_Bill_1K from '$lib/assets/bill-notes/UGX/1K_Bill.png';
	import UGX_Bill_2K from '$lib/assets/bill-notes/UGX/2K_Bill.png';
	import UGX_Bill_5K from '$lib/assets/bill-notes/UGX/5K_Bill.png';
	import UGX_Bill_10K from '$lib/assets/bill-notes/UGX/10K_Bill.png';
	import UGX_Bill_20K from '$lib/assets/bill-notes/UGX/20K_Bill.png';
	import UGX_Bill_50K from '$lib/assets/bill-notes/UGX/50K_Bill.png';

	import RWF_Bill_500 from '$lib/assets/bill-notes/RWF/500_Bill.png';
	import RWF_Bill_1K from '$lib/assets/bill-notes/RWF/1K_Bill.png';
	import RWF_Bill_2K from '$lib/assets/bill-notes/RWF/2K_Bill.png';
	import RWF_Bill_5K from '$lib/assets/bill-notes/RWF/5K_Bill.png';

	import AED_Bill_05 from '$lib/assets/bill-notes/AED/05_Bill.png';
	import AED_Bill_10 from '$lib/assets/bill-notes/AED/10_Bill.png';
	import AED_Bill_50 from '$lib/assets/bill-notes/AED/50_Bill.png';
	import AED_Bill_100 from '$lib/assets/bill-notes/AED/100)=Bill.png';

	import CYN_Bill_01 from '$lib/assets/bill-notes/CYN/01_Bill.png';
	import CYN_Bill_05 from '$lib/assets/bill-notes/CYN/05_Bill.png';
	import CYN_Bill_10 from '$lib/assets/bill-notes/CYN/10_Bill.png';
	import CYN_Bill_20 from '$lib/assets/bill-notes/CYN/20_Bill.png';
	import CYN_Bill_50 from '$lib/assets/bill-notes/CYN/50_Bill.png';
	import CYN_Bill_100 from '$lib/assets/bill-notes/CYN/100_Bill.png';

	import INR_Bill_05 from '$lib/assets/bill-notes/INR/05_Bill.jpeg';
	import INR_Bill_10 from '$lib/assets/bill-notes/INR/10_BILL.png';
	import INR_Bill_20 from '$lib/assets/bill-notes/INR/20_Bill.png';
	import INR_Bill_50 from '$lib/assets/bill-notes/INR/50_Bill.png';
	import INR_Bill_500 from '$lib/assets/bill-notes/INR/500_Bill.png';

	import ETH_Bill_10 from '$lib/assets/bill-notes/ETH/10_Bill.png';
	import ETH_Bill_50 from '$lib/assets/bill-notes/ETH/50_Bill.png';
	import ETH_Bill_100 from '$lib/assets/bill-notes/ETH/100_Bill.png';
	import ETH_Bill_200 from '$lib/assets/bill-notes/ETH/200_Bill.png';

	import ZAR_Bill_10 from '$lib/assets/bill-notes/ZAR/10_Bill.png';
	import ZAR_Bill_20 from '$lib/assets/bill-notes/ZAR/20_Bill.png';
	import ZAR_Bill_50 from '$lib/assets/bill-notes/ZAR/50_Bill.png';
	import ZAR_Bill_100 from '$lib/assets/bill-notes/ZAR/100_Bill.png';
	import ZAR_Bill_200 from '$lib/assets/bill-notes/ZAR/200_Bill.png';

	import ZMW_Bill_10 from '$lib/assets/bill-notes/ZMW/10_Bill.png';
	import ZMW_Bill_20 from '$lib/assets/bill-notes/ZMW/20_Bill.png';
	import ZMW_Bill_50 from '$lib/assets/bill-notes/ZMW/50_Bill.png';
	import ZMW_Bill_100 from '$lib/assets/bill-notes/ZMW/100_Bill.png';
	import ZMW_Bill_200 from '$lib/assets/bill-notes/ZMW/200_Bill.png';
	import ZMW_Bill_500 from '$lib/assets/bill-notes/ZMW/500_Bill.png';

	import SAR_Bill_05 from '$lib/assets/bill-notes/SAR/05_Bill.png';
	import SAR_Bill_10 from '$lib/assets/bill-notes/SAR/10_Bill.png';
	import SAR_Bill_50 from '$lib/assets/bill-notes/SAR/50_Bill.png';
	import SAR_Bill_100 from '$lib/assets/bill-notes/SAR/100_Bill.png';
	import SAR_Bill_500 from '$lib/assets/bill-notes/SAR/500_Bill.png';

	const rates = [
		{ code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', value: 1 },
		{ code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', value: 2650 },
		{ code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', value: 2890 },
		{ code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', value: 3350 },
		{ code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', value: 17.5 },
		{ code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', value: 0.697 },
		{ code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼', value: 2.21 },
		{ code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', value: 721 },
		{ code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', value: 368 },
		{ code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', value: 31.9 },
		{ code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹', value: 46.5 },
		{ code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', value: 147 },
		{ code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲', value: 98 },
		{ code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦', value: 707 },
		{ code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', value: 3010 },
		{ code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', value: 1975 },
		{ code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', value: 1750 },
		{ code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼', value: 2.04 },
		{ code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿', value: 42.1 },
		{ code: 'BIF', name: 'Burundian Franc', symbol: 'Fr', flag: '🇧🇮', value: 0.914 },
		{ code: 'CDF', name: 'Congolese Franc', symbol: 'FC', flag: '🇨🇩', value: 0.943 },
		{ code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', value: 1.71 },
		{ code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', value: 88.3 }
	];

	const usdBills = [
		{ value: 1, label: '$1', image: USD_Bill_01 },
		{ value: 2, label: '$2', image: USD_Bill_02 },
		{ value: 5, label: '$5', image: USD_Bill_05 },
		{ value: 10, label: '$10', image: USD_Bill_10 },
		{ value: 20, label: '$20', image: USD_Bill_20 },
		{ value: 50, label: '$50', image: USD_Bill_50 },
		{ value: 100, label: '$100', image: USD_Bill_100 }
	];

	const euroBills = [
		{ value: 5, label: '€5', image: EURO_Bill_05 },
		{ value: 10, label: '€10', image: EURO_Bill_10 },
		{ value: 20, label: '€20', image: EURO_Bill_20 },
		{ value: 50, label: '€50', image: EURO_Bill_50 },
		{ value: 100, label: '€100', image: EURO_Bill_100 }
	];

	const gbpBills = [
		{ value: 5, label: '£5', image: GBP_Bill_05 },
		{ value: 10, label: '£10', image: GBP_Bill_10 },
		{ value: 20, label: '£20', image: GBP_Bill_20 },
		{ value: 50, label: '£50', image: GBP_Bill_50 }
	];

	const kesBills = [
		{ value: 50, label: 'KES 50', image: KES_Bill_50 },
		{ value: 100, label: 'KES 100', image: KES_Bill_100 },
		{ value: 200, label: 'KES 200', image: KES_Bill_200 },
		{ value: 500, label: 'KES 500', image: KES_Bill_500 },
		{ value: 1000, label: 'KES 1000', image: KES_Bill_1000 }
	];

	const tshBills = [
		{ value: 1000, label: 'TSh 1K', image: TSH_Bill_1K },
		{ value: 2000, label: 'TSh 2K', image: TSH_Bill_2K },
		{ value: 5000, label: 'TSh 5K', image: TSH_Bill_5K },
		{ value: 10000, label: 'TSh 10K', image: TSH_Bill_10K }
	];

	const ugxBills = [
		{ value: 1000, label: 'USh 1K', image: UGX_Bill_1K },
		{ value: 2000, label: 'USh 2K', image: UGX_Bill_2K },
		{ value: 5000, label: 'USh 5K', image: UGX_Bill_5K },
		{ value: 10000, label: 'USh 10K', image: UGX_Bill_10K },
		{ value: 20000, label: 'USh 20K', image: UGX_Bill_20K },
		{ value: 50000, label: 'USh 50K', image: UGX_Bill_50K }
	];

	const rwfBills = [
		{ value: 500, label: 'RWF 500', image: RWF_Bill_500 },
		{ value: 1000, label: 'RWF 1K', image: RWF_Bill_1K },
		{ value: 2000, label: 'RWF 2K', image: RWF_Bill_2K },
		{ value: 5000, label: 'RWF 5K', image: RWF_Bill_5K }
	];

	const aedBills = [
		{ value: 5, label: 'AED 5', image: AED_Bill_05 },
		{ value: 10, label: 'AED 10', image: AED_Bill_10 },
		{ value: 50, label: 'AED 50', image: AED_Bill_50 },
		{ value: 100, label: 'AED 100', image: AED_Bill_100 }
	];

	const cynBills = [
		{ value: 1, label: '¥1', image: CYN_Bill_01 },
		{ value: 5, label: '¥5', image: CYN_Bill_05 },
		{ value: 10, label: '¥10', image: CYN_Bill_10 },
		{ value: 20, label: '¥20', image: CYN_Bill_20 },
		{ value: 50, label: '¥50', image: CYN_Bill_50 },
		{ value: 100, label: '¥100', image: CYN_Bill_100 }
	];

	const inrBills = [
		{ value: 5, label: '₹5', image: INR_Bill_05 },
		{ value: 10, label: '₹10', image: INR_Bill_10 },
		{ value: 20, label: '₹20', image: INR_Bill_20 },
		{ value: 50, label: '₹50', image: INR_Bill_50 },
		{ value: 500, label: '₹500', image: INR_Bill_500 }
	];

	const ethBills = [
		{ value: 10, label: 'ETB 10', image: ETH_Bill_10 },
		{ value: 50, label: 'ETB 50', image: ETH_Bill_50 },
		{ value: 100, label: 'ETB 100', image: ETH_Bill_100 },
		{ value: 200, label: 'ETB 200', image: ETH_Bill_200 }
	];

	const zarBills = [
		{ value: 10, label: 'ZAR 10', image: ZAR_Bill_10 },
		{ value: 20, label: 'ZAR 20', image: ZAR_Bill_20 },
		{ value: 50, label: 'ZAR 50', image: ZAR_Bill_50 },
		{ value: 100, label: 'ZAR 100', image: ZAR_Bill_100 },
		{ value: 200, label: 'ZAR 200', image: ZAR_Bill_200 }
	];

	const zmwBills = [
		{ value: 10, label: 'ZMW 10', image: ZMW_Bill_10 },
		{ value: 20, label: 'ZMW 20', image: ZMW_Bill_20 },
		{ value: 50, label: 'ZMW 50', image: ZMW_Bill_50 },
		{ value: 100, label: 'ZMW 100', image: ZMW_Bill_100 },
		{ value: 200, label: 'ZMW 200', image: ZMW_Bill_200 },
		{ value: 500, label: 'ZMW 500', image: ZMW_Bill_500 }
	];

	const sarBills = [
		{ value: 5, label: 'SAR 5', image: SAR_Bill_05 },
		{ value: 10, label: 'SAR 10', image: SAR_Bill_10 },
		{ value: 50, label: 'SAR 50', image: SAR_Bill_50 },
		{ value: 100, label: 'SAR 100', image: SAR_Bill_100 },
		{ value: 500, label: 'SAR 500', image: SAR_Bill_500 }
	];

	let openCode = '';
	let selectedBill: typeof usdBills[0] | null = null;
	let carouselHovered = false;

	const formatRate = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 3 });
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Market Rates</h1>
	
	<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
		<div class="p-4 border-b border-gray-100">
			<p class="text-sm text-gray-500">Live exchange rates to TZS</p>
		</div>
		
		<div class="divide-y divide-gray-100">
			{#each rates as rate}
				<div class="border-b border-gray-100 last:border-b-0">
					<button
						type="button"
						class="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
						aria-expanded={openCode === rate.code}
						on:click={() => (openCode = openCode === rate.code ? '' : rate.code)}
					>
						<div class="flex items-center gap-3">
							<span class="text-2xl">{rate.flag}</span>
							<div>
								<p class="font-medium text-gray-900">{rate.code} / TZS</p>
								<p class="text-sm text-gray-500">{rate.name} ({rate.symbol})</p>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<p class="text-lg font-semibold text-gray-900">{formatRate(rate.value)}</p>
							<svg
								class={`w-4 h-4 text-gray-400 transition-transform ${openCode === rate.code ? 'rotate-180' : ''}`}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
							</svg>
						</div>
					</button>
					{#if openCode === rate.code}
					<div class="px-4 py-4 text-sm text-gray-600 bg-slate-50 accordion-inner-shadow">
							<p>1 {rate.code} = {formatRate(rate.value)} TZS</p>
							{#if rate.code === 'USD'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">US Dollar Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="USD bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each usdBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each usdBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'EUR'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Euro Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="EURO bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each euroBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each euroBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'GBP'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">British Pound Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="GBP bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each gbpBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each gbpBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'TZS'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Tanzanian Shilling Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="TZS bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each tshBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each tshBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'UGX'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Ugandan Shilling Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="UGX bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each ugxBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each ugxBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'RWF'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Rwandan Franc Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="RWF bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each rwfBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each rwfBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'AED'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">UAE Dirham Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="AED bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each aedBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each aedBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'CNY'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Chinese Yuan Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CNY bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each cynBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each cynBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'INR'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Indian Rupee Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="INR bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each inrBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each inrBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'ETB'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Ethiopian Birr Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="ETB bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each ethBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each ethBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'ZAR'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">South African Rand Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="ZAR bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each zarBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each zarBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'ZMW'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Zambian Kwacha Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="ZMW bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each zmwBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each zmwBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'SAR'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Saudi Riyal Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="SAR bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each sarBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each sarBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else if rate.code === 'KES'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Kenyan Shilling Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="KES bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each kesBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each kesBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													on:click={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
													aria-hidden="true"
													tabindex="-1"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Bill Detail Modal -->
{#if selectedBill}
	<div
		class="bill-modal-backdrop"
		role="presentation"
		on:click={() => (selectedBill = null)}
		on:keydown={(e) => e.key === 'Escape' && (selectedBill = null)}
	>
		<div
			class="bill-modal-content"
			role="dialog"
			aria-modal="true"
			tabindex="0"
			on:click|stopPropagation
			on:keydown|stopPropagation
		>
			<button
				type="button"
				class="bill-modal-close"
				on:click={() => (selectedBill = null)}
				aria-label="Close bill details"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="bill-modal-body">
				<img src={selectedBill.image} alt={selectedBill.label} class="bill-modal-image" />
				<div class="bill-modal-info">
					<h2 class="bill-modal-title">{selectedBill.label}</h2>
					<p class="bill-modal-value">{selectedBill.label} Bill</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.usd-carousel {
		overflow: hidden;
		width: 100%;
		padding: 0 1rem;
	}

	.usd-carousel-track {
		display: flex;
		gap: 1rem;
		width: max-content;
		animation: usd-scroll 18s linear infinite;
	}

	.usd-bill-card {
		min-width: 140px;
		text-align: center;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.usd-bill-card:hover {
		transform: scale(1.05);
	}

	.usd-bill-card:active {
		transform: scale(0.95);
	}

	.usd-bill-image {
		width: 140px;
		height: 70px;
		object-fit: cover;
		border-radius: 0.75rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		display: block;
	}

	.usd-bill-label {
		margin-top: 0.4rem;
		font-size: 0.75rem;
		color: #6b7280;
	}

	@keyframes usd-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.usd-carousel-track.paused {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: reduce) {
		.usd-carousel-track {
			animation: none;
		}
	}

	/* Bill Modal Styles */
	.bill-modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		padding: 1rem;
		animation: fadeIn 0.2s ease-out;
	}

	.bill-modal-content {
		position: relative;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
		max-width: 90vw;
		max-height: 90vh;
		overflow: auto;
		animation: slideUp 0.3s ease-out;
	}

	@media (min-width: 768px) {
		.bill-modal-content {
			max-width: 600px;
		}
	}

	.bill-modal-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem;
		cursor: pointer;
		color: #6b7280;
		transition: all 0.2s;
		z-index: 10;
	}

	.bill-modal-close:hover {
		background: white;
		color: #1f2937;
	}

	.bill-modal-body {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
	}

	.bill-modal-image {
		width: 100%;
		max-width: 400px;
		border-radius: 0.75rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.bill-modal-info {
		flex: 1;
	}

	.bill-modal-title {
		font-size: 1.875rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 0.5rem;
	}

	.bill-modal-value {
		font-size: 1rem;
		color: #6b7280;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(2rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.accordion-inner-shadow {
		box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
	}
</style>
