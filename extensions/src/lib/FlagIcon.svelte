<script lang="ts">
	let { code = '', size = 'md' }: { code: string; size: 'sm' | 'md' | 'lg' } = $props();

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
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};

	const flagCode = $derived(currencyToFlagCode[code] || code.toLowerCase().slice(0, 2));
	const flagPath = $derived(`/flags/${flagCode}.svg`);
</script>

<img src={flagPath} alt="{code} flag" class="{sizeClass[size]} inline-block rounded-sm object-cover" loading="lazy" />
