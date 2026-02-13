<script lang="ts">
	import USD_Bill_01 from '$lib/assets/bill-notes/USD/01_Bill.jpg';
	import USD_Bill_02 from '$lib/assets/bill-notes/USD/02_Bill.jpeg';
	import USD_Bill_05 from '$lib/assets/bill-notes/USD/05_Bill.jpg';
	import USD_Bill_10 from '$lib/assets/bill-notes/USD/10_Bill.jpg';
	import USD_Bill_20 from '$lib/assets/bill-notes/USD/20_Bill.jpg';
	import USD_Bill_50 from '$lib/assets/bill-notes/USD/50_Bill.jpg';
	import USD_Bill_100 from '$lib/assets/bill-notes/USD/100_Bill.jpg';

	const rates = [
		{ code: 'USD', name: 'US Dollar', flag: '🇺🇸', value: 2650 },
		{ code: 'EUR', name: 'Euro', flag: '🇪🇺', value: 2890 },
		{ code: 'GBP', name: 'British Pound', flag: '🇬🇧', value: 3350 },
		{ code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', value: 17.5 },
		{ code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬', value: 0.697 },
		{ code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼', value: 2.21 },
		{ code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', value: 721 },
		{ code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', value: 368 },
		{ code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', value: 31.9 },
		{ code: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹', value: 46.5 },
		{ code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', value: 147 },
		{ code: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲', value: 98 },
		{ code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', value: 707 },
		{ code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', value: 3010 },
		{ code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', value: 1975 },
		{ code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', value: 1750 },
		{ code: 'MWK', name: 'Malawian Kwacha', flag: '🇲🇼', value: 2.04 },
		{ code: 'MZN', name: 'Mozambican Metical', flag: '🇲🇿', value: 42.1 },
		{ code: 'BIF', name: 'Burundian Franc', flag: '🇧🇮', value: 0.914 },
		{ code: 'CDF', name: 'Congolese Franc', flag: '🇨🇩', value: 0.943 },
		{ code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', value: 1.71 },
		{ code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬', value: 88.3 }
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

	let openCode = '';
	let selectedBill: typeof usdBills[0] | null = null;

	const formatRate = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 3 });
</script>

<div class="p-4 md:p-8 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Market Rates</h1>
	
	<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
		<div class="p-4 border-b border-gray-100">
			<p class="text-sm text-gray-500">Live exchange rates for TZS & KES</p>
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
								<p class="text-sm text-gray-500">{rate.name}</p>
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
						<div class="px-4 pb-4 text-sm text-gray-600">
							<p>1 {rate.code} = {formatRate(rate.value)} TZS</p>
							{#if rate.code === 'USD'}
								<div class="mt-4">
									<p class="text-xs uppercase tracking-wide text-gray-400 mb-2">US Dollar Bills</p>
									<div class="usd-carousel">
										<div class="usd-carousel-track">
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
	<div class="bill-modal-backdrop" on:click={() => (selectedBill = null)}>
		<div class="bill-modal-content" on:click|stopPropagation>
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
</style>
