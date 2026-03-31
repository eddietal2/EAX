<script lang="ts">
	export let code: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	// Map currency codes to flag SVG file codes
	const currencyToFlagCode: Record<string, string> = {
		USD: 'us',
		EUR: 'eu',
		GBP: 'gb',
		TZS: 'tz',
		KES: 'ke',
		UGX: 'ug',
		RWF: 'rw',
		AED: 'ae',
		CNY: 'cn',
		INR: 'in',
		ETB: 'et',
		ZAR: 'za',
		ZMW: 'zm',
		SAR: 'sa',
		CHF: 'ch',
		CAD: 'ca',
		AUD: 'au',
		MWK: 'mw',
		MZN: 'mz',
		BIF: 'bi',
		CDF: 'cd',
		NGN: 'ng',
		EGP: 'eg'
	};

	const sizeClass = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8'
	};

	const flagCode = currencyToFlagCode[code] || code.toLowerCase();
	const flagPath = `/flags/${flagCode}.svg`;
</script>

<img src={flagPath} alt="{code} flag" class={`${sizeClass[size]} inline-block rounded-sm`} loading="lazy" />

<style>
	img {
		display: inline-block;
		vertical-align: middle;
	}
</style>
