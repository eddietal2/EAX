<script lang="ts">
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
				<div class="p-4 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="text-2xl">{rate.flag}</span>
						<div>
							<p class="font-medium text-gray-900">{rate.code} / TZS</p>
							<p class="text-sm text-gray-500">{rate.name}</p>
						</div>
					</div>
					<p class="text-lg font-semibold text-gray-900">{formatRate(rate.value)}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
