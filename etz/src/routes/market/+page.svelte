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

	import CAD_Bill_05 from '$lib/assets/bill-notes/CAD/05_Bill.png';
	import CAD_Bill_10 from '$lib/assets/bill-notes/CAD/10_Bill.png';
	import CAD_Bill_20 from '$lib/assets/bill-notes/CAD/20_Bill.png';
	import CAD_Bill_50 from '$lib/assets/bill-notes/CAD/50_Bill.png';
	import CAD_Bill_100 from '$lib/assets/bill-notes/CAD/100_Bill.png';

	import AUD_Bill_05 from '$lib/assets/bill-notes/AUD/05_Bill.png';
	import AUD_Bill_10 from '$lib/assets/bill-notes/AUD/10_Bill.png';
	import AUD_Bill_20 from '$lib/assets/bill-notes/AUD/20_Bill.png';
	import AUD_Bill_50 from '$lib/assets/bill-notes/AUD/50_Bill.png';
	import AUD_Bill_100 from '$lib/assets/bill-notes/AUD/100_Bill.png';

	import MWK_Bill_20 from '$lib/assets/bill-notes/MWK/20_Bill.png';
	import MWK_Bill_50 from '$lib/assets/bill-notes/MWK/50_Bill.png';
	import MWK_Bill_100 from '$lib/assets/bill-notes/MWK/100_Bill.png';
	import MWK_Bill_200 from '$lib/assets/bill-notes/MWK/200_Bill.png';
	import MWK_Bill_500 from '$lib/assets/bill-notes/MWK/500_Bill.png';
	import MWK_Bill_1000 from '$lib/assets/bill-notes/MWK/1000_Bill.png';

	import CHF_Bill_10 from '$lib/assets/bill-notes/CHF/10_Bill.png';
	import CHF_Bill_20 from '$lib/assets/bill-notes/CHF/20_Bill.png';
	import CHF_Bill_50 from '$lib/assets/bill-notes/CHF/50_Bill.png';
	import CHF_Bill_100 from '$lib/assets/bill-notes/CHF/100_Bill.png';
	import CHF_Bill_200 from '$lib/assets/bill-notes/CHF/200_Bill.png';
	import CHF_Bill_1000 from '$lib/assets/bill-notes/CHF/1000_Bill.png';

	import MZN_Bill_20 from '$lib/assets/bill-notes/MZN/20_Bill.png';
	import MZN_Bill_50 from '$lib/assets/bill-notes/MZN/50_Bill.png';
	import MZN_Bill_100 from '$lib/assets/bill-notes/MZN/100_Bill.png';
	import MZN_Bill_200 from '$lib/assets/bill-notes/MZN/200_Bill.png';

	import BIF_Bill_10 from '$lib/assets/bill-notes/BIF/10_Bill.png';
	import BIF_Bill_20 from '$lib/assets/bill-notes/BIF/20_Bill.png';
	import BIF_Bill_50 from '$lib/assets/bill-notes/BIF/50_Bill.png';
	import BIF_Bill_100 from '$lib/assets/bill-notes/BIF/100_Bill.png';
	import BIF_Bill_500 from '$lib/assets/bill-notes/BIF/500_Bill.png';
	import BIF_Bill_1000 from '$lib/assets/bill-notes/BIF/1000_Bill.png';

	import CDF_Bill_50 from '$lib/assets/bill-notes/CDF/50_Bill.png';
	import CDF_Bill_100 from '$lib/assets/bill-notes/CDF/100_Bill.png';
	import CDF_Bill_200 from '$lib/assets/bill-notes/CDF/200_Bill.png';
	import CDF_Bill_1000 from '$lib/assets/bill-notes/CDF/1000_Bill.png';
	import CDF_Bill_5000 from '$lib/assets/bill-notes/CDF/5000_Bill.png';

	import NGN_Bill_05 from '$lib/assets/bill-notes/NGN/05_Bill.png';
	import NGN_Bill_10 from '$lib/assets/bill-notes/NGN/10_Bill.png';
	import NGN_Bill_20 from '$lib/assets/bill-notes/NGN/20_Bill.png';
	import NGN_Bill_50 from '$lib/assets/bill-notes/NGN/50_Bill.png';
	import NGN_Bill_100 from '$lib/assets/bill-notes/NGN/100_Bill.png';
	import NGN_Bill_200 from '$lib/assets/bill-notes/NGN/200_Bill.png';
	import NGN_Bill_500 from '$lib/assets/bill-notes/NGN/500_Bill.png';
	import NGN_Bill_1000 from '$lib/assets/bill-notes/NGN/1000_Bill.png';

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

	const cadBills = [
		{ value: 5, label: 'C$5', image: CAD_Bill_05 },
		{ value: 10, label: 'C$10', image: CAD_Bill_10 },
		{ value: 20, label: 'C$20', image: CAD_Bill_20 },
		{ value: 50, label: 'C$50', image: CAD_Bill_50 },
		{ value: 100, label: 'C$100', image: CAD_Bill_100 }
	];

	const audBills = [
		{ value: 5, label: 'A$5', image: AUD_Bill_05 },
		{ value: 10, label: 'A$10', image: AUD_Bill_10 },
		{ value: 20, label: 'A$20', image: AUD_Bill_20 },
		{ value: 50, label: 'A$50', image: AUD_Bill_50 },
		{ value: 100, label: 'A$100', image: AUD_Bill_100 }
	];

	const mwkBills = [
		{ value: 20, label: 'MK 20', image: MWK_Bill_20 },
		{ value: 50, label: 'MK 50', image: MWK_Bill_50 },
		{ value: 100, label: 'MK 100', image: MWK_Bill_100 },
		{ value: 200, label: 'MK 200', image: MWK_Bill_200 },
		{ value: 500, label: 'MK 500', image: MWK_Bill_500 },
		{ value: 1000, label: 'MK 1K', image: MWK_Bill_1000 }
	];

	const chfBills = [
		{ value: 10, label: 'Fr 10', image: CHF_Bill_10 },
		{ value: 20, label: 'Fr 20', image: CHF_Bill_20 },
		{ value: 50, label: 'Fr 50', image: CHF_Bill_50 },
		{ value: 100, label: 'Fr 100', image: CHF_Bill_100 },
		{ value: 200, label: 'Fr 200', image: CHF_Bill_200 },
		{ value: 1000, label: 'Fr 1K', image: CHF_Bill_1000 }
	];

	const mznBills = [
		{ value: 20, label: 'MT 20', image: MZN_Bill_20 },
		{ value: 50, label: 'MT 50', image: MZN_Bill_50 },
		{ value: 100, label: 'MT 100', image: MZN_Bill_100 },
		{ value: 200, label: 'MT 200', image: MZN_Bill_200 }
	];

	const bifBills = [
		{ value: 10, label: 'BIF 10', image: BIF_Bill_10 },
		{ value: 20, label: 'BIF 20', image: BIF_Bill_20 },
		{ value: 50, label: 'BIF 50', image: BIF_Bill_50 },
		{ value: 100, label: 'BIF 100', image: BIF_Bill_100 },
		{ value: 500, label: 'BIF 500', image: BIF_Bill_500 },
		{ value: 1000, label: 'BIF 1K', image: BIF_Bill_1000 }
	];

	const cdfBills = [
		{ value: 50, label: 'CDF 50', image: CDF_Bill_50 },
		{ value: 100, label: 'CDF 100', image: CDF_Bill_100 },
		{ value: 200, label: 'CDF 200', image: CDF_Bill_200 },
		{ value: 1000, label: 'CDF 1K', image: CDF_Bill_1000 },
		{ value: 5000, label: 'CDF 5K', image: CDF_Bill_5000 }
	];

	const ngnBills = [
		{ value: 5, label: '₦5', image: NGN_Bill_05 },
		{ value: 10, label: '₦10', image: NGN_Bill_10 },
		{ value: 20, label: '₦20', image: NGN_Bill_20 },
		{ value: 50, label: '₦50', image: NGN_Bill_50 },
		{ value: 100, label: '₦100', image: NGN_Bill_100 },
		{ value: 200, label: '₦200', image: NGN_Bill_200 },
		{ value: 500, label: '₦500', image: NGN_Bill_500 },
		{ value: 1000, label: '₦1K', image: NGN_Bill_1000 }
	];

	let openCode = '';
	let selectedBill: typeof usdBills[0] | null = null;
	let carouselHovered = false;
	let billImageHovered = false;
	let magnifyMouseX = 0;
	let magnifyMouseY = 0;
	let billImgWidth = 0;
	let billImgHeight = 0;

	$: selectedCurrency = selectedBill ? rates.find(r => r.code === openCode) ?? null : null;

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
							{:else if rate.code === 'CAD'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Canadian Dollar Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CAD bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each cadBills as bill}
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
											{#each cadBills as bill}
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
							{:else if rate.code === 'AUD'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Australian Dollar Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="AUD bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each audBills as bill}
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
											{#each audBills as bill}
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
							{:else if rate.code === 'MWK'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Malawian Kwacha Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="MWK bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each mwkBills as bill}
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
											{#each mwkBills as bill}
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
							{:else if rate.code === 'CHF'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Swiss Franc Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CHF bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each chfBills as bill}
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
											{#each chfBills as bill}
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
							{:else if rate.code === 'MZN'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Mozambican Metical Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="MZN bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each mznBills as bill}
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
											{#each mznBills as bill}
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
							{:else if rate.code === 'BIF'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Burundian Franc Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="BIF bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each bifBills as bill}
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
											{#each bifBills as bill}
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
							{:else if rate.code === 'CDF'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Congolese Franc Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CDF bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each cdfBills as bill}
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
											{#each cdfBills as bill}
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
							{:else if rate.code === 'NGN'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">Nigerian Naira Bills</p>
									<div class="usd-carousel"
										role="region"
										aria-label="NGN bills carousel"
										on:mouseenter={() => (carouselHovered = true)}
										on:mouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each ngnBills as bill}
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
											{#each ngnBills as bill}
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
			<!-- Close button -->
			<button
				type="button"
				class="bill-modal-close"
				on:click={() => (selectedBill = null)}
				aria-label="Close bill details"
			>
				<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Bill image stage -->
			<div class="bill-modal-stage">
				<div
					class="bill-image-container"
					role="img"
					on:mouseenter={() => (billImageHovered = true)}
					on:mouseleave={() => (billImageHovered = false)}
					on:mousemove={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						magnifyMouseX = e.clientX - rect.left;
						magnifyMouseY = e.clientY - rect.top;
						billImgWidth = rect.width;
						billImgHeight = rect.height;
					}}
				>
					<img src={selectedBill.image} alt={selectedBill.label} class="bill-modal-image" />
					{#if billImageHovered}
						<div
							class="magnifying-glass"
							style="left: {magnifyMouseX}px; top: {magnifyMouseY}px; background-image: url('{selectedBill.image}'); background-size: {billImgWidth * 2.5}px {billImgHeight * 2.5}px; background-position: {-magnifyMouseX * 2.5 + 75}px {-magnifyMouseY * 2.5 + 75}px;"
						></div>
					{/if}
				</div>
			</div>

			<!-- Info bar -->
			<div class="bill-modal-info-bar">
				{#if selectedCurrency}
					<span class="bill-modal-flag">{selectedCurrency.flag}</span>
				{/if}
				<div class="bill-modal-info-text">
					<h2 class="bill-modal-denomination">{selectedBill.label}</h2>
					{#if selectedCurrency}
						<p class="bill-modal-currency-name">{selectedCurrency.name}</p>
					{/if}
				</div>
				{#if selectedCurrency && selectedCurrency.code !== 'TZS'}
					<div class="bill-modal-conversion">
						<span class="bill-modal-conversion-value">
							= TSh {formatRate(selectedBill.value * selectedCurrency.value)}
						</span>
					</div>
				{/if}
			</div>

			<!-- Hint -->
			<p class="bill-modal-hint">Hover over the bill to magnify</p>
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
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		animation: fadeIn 0.3s ease-out;
	}

	.bill-modal-content {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		animation: modalZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.bill-modal-close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 50%;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.6);
		transition: all 0.25s ease;
		z-index: 10;
	}

	.bill-modal-close:hover {
		background: rgba(255, 255, 255, 0.18);
		color: white;
		transform: rotate(90deg);
	}

	.bill-modal-stage {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 3rem 2rem 1rem;
	}

	.bill-image-container {
		position: relative;
		display: inline-block;
	}

	.bill-modal-image {
		max-width: 85vw;
		max-height: 50vh;
		border-radius: 0.75rem;
		box-shadow:
			0 30px 80px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 255, 255, 0.05);
		display: block;
		cursor: zoom-in;
		object-fit: contain;
	}

	@media (min-width: 768px) {
		.bill-modal-image {
			max-width: 65vw;
			max-height: 62vh;
		}
		.bill-modal-stage {
			padding: 4rem 3rem 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.bill-modal-image {
			max-width: 55vw;
			max-height: 68vh;
		}
	}

	.magnifying-glass {
		position: absolute;
		width: 150px;
		height: 150px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		overflow: hidden;
		pointer-events: none;
		transform: translate(-50%, -50%);
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.3),
			0 8px 32px rgba(0, 0, 0, 0.5),
			inset 0 0 30px rgba(255, 255, 255, 0.03);
		z-index: 20;
		background-repeat: no-repeat;
	}

	.bill-modal-info-bar {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 0.875rem 1.5rem;
		background: rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		margin-bottom: 2.5rem;
		animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.bill-modal-flag {
		font-size: 2rem;
		line-height: 1;
	}

	.bill-modal-info-text {
		display: flex;
		flex-direction: column;
	}

	.bill-modal-denomination {
		font-size: 1.375rem;
		font-weight: 700;
		color: white;
		line-height: 1.2;
		margin: 0;
	}

	.bill-modal-currency-name {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.45);
		margin: 0;
		line-height: 1.4;
	}

	.bill-modal-conversion {
		margin-left: 0.5rem;
		padding-left: 1rem;
		border-left: 1px solid rgba(255, 255, 255, 0.12);
	}

	.bill-modal-conversion-value {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #34d399;
	}

	.bill-modal-hint {
		position: absolute;
		bottom: 0.875rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.6875rem;
		color: rgba(255, 255, 255, 0.2);
		pointer-events: none;
		letter-spacing: 0.025em;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideUp {
		from {
			transform: translateY(1rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes modalZoomIn {
		from {
			transform: scale(0.92);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	.accordion-inner-shadow {
		box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
	}
</style>
