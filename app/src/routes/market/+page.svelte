<script lang="ts">
	import { onMount } from 'svelte';
	import { rates as liveRates, getStaticRates, fetchExchangeRates, initRatePolling, lastUpdated, isLoading, fetchError } from '$lib/stores/exchangeRates';
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';
	import { defaultFromCurrency, defaultToCurrency } from '$lib/stores/settings';
	import Skeleton from '$lib/components/Skeleton.svelte';
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

	import EGP_Bill_05 from '$lib/assets/bill-notes/EGP/05_Bill.png';
	import EGP_Bill_10 from '$lib/assets/bill-notes/EGP/10_Bill.png';
	import EGP_Bill_20 from '$lib/assets/bill-notes/EGP/20_Bill.png';
	import EGP_Bill_50 from '$lib/assets/bill-notes/EGP/50_Bill.png';
	import EGP_Bill_100 from '$lib/assets/bill-notes/EGP/100_Bill.png';
	import FlagIcon from '$lib/components/FlagIcon.svelte';

	const rates = [
		{ code: 'TZS', nameKey: 'currencies.tzs.name', symbol: 'TSh', flag: '🇹🇿', value: 1, descriptionKey: 'currencies.tzs.description' },
		{ code: 'USD', nameKey: 'currencies.usd.name', symbol: '$', flag: '🇺🇸', value: 2650, descriptionKey: 'currencies.usd.description' },
		{ code: 'EUR', nameKey: 'currencies.eur.name', symbol: '€', flag: '🇪🇺', value: 2890, descriptionKey: 'currencies.eur.description' },
		{ code: 'GBP', nameKey: 'currencies.gbp.name', symbol: '£', flag: '🇬🇧', value: 3350, descriptionKey: 'currencies.gbp.description' },
		{ code: 'KES', nameKey: 'currencies.kes.name', symbol: 'KSh', flag: '🇰🇪', value: 17.5, descriptionKey: 'currencies.kes.description' },
		{ code: 'UGX', nameKey: 'currencies.ugx.name', symbol: 'USh', flag: '🇺🇬', value: 0.697, descriptionKey: 'currencies.ugx.description' },
		{ code: 'RWF', nameKey: 'currencies.rwf.name', symbol: 'FRw', flag: '🇷🇼', value: 2.21, descriptionKey: 'currencies.rwf.description' },
		{ code: 'AED', nameKey: 'currencies.aed.name', symbol: 'د.إ', flag: '🇦🇪', value: 721, descriptionKey: 'currencies.aed.description' },
		{ code: 'CNY', nameKey: 'currencies.cny.name', symbol: '¥', flag: '🇨🇳', value: 368, descriptionKey: 'currencies.cny.description' },
		{ code: 'INR', nameKey: 'currencies.inr.name', symbol: '₹', flag: '🇮🇳', value: 31.9, descriptionKey: 'currencies.inr.description' },
		{ code: 'ETB', nameKey: 'currencies.eth.name', symbol: 'Br', flag: '🇪🇹', value: 46.5, descriptionKey: 'currencies.eth.description' },
		{ code: 'ZAR', nameKey: 'currencies.zar.name', symbol: 'R', flag: '🇿🇦', value: 147, descriptionKey: 'currencies.zar.description' },
		{ code: 'ZMW', nameKey: 'currencies.zmw.name', symbol: 'ZK', flag: '🇿🇲', value: 98, descriptionKey: 'currencies.zmw.description' },
		{ code: 'SAR', nameKey: 'currencies.sar.name', symbol: 'ر.س', flag: '🇸🇦', value: 707, descriptionKey: 'currencies.sar.description' },
		{ code: 'CHF', nameKey: 'currencies.chf.name', symbol: 'Fr', flag: '🇨🇭', value: 3010, descriptionKey: 'currencies.chf.description' },
		{ code: 'CAD', nameKey: 'currencies.cad.name', symbol: 'C$', flag: '🇨🇦', value: 1975, descriptionKey: 'currencies.cad.description' },
		{ code: 'AUD', nameKey: 'currencies.aud.name', symbol: 'A$', flag: '🇦🇺', value: 1750, descriptionKey: 'currencies.aud.description' },
		{ code: 'MWK', nameKey: 'currencies.mwk.name', symbol: 'MK', flag: '🇲🇼', value: 2.04, descriptionKey: 'currencies.mwk.description' },
		{ code: 'MZN', nameKey: 'currencies.mzn.name', symbol: 'MT', flag: '🇲🇿', value: 42.1, descriptionKey: 'currencies.mzn.description' },
		{ code: 'BIF', nameKey: 'currencies.bif.name', symbol: 'Fr', flag: '🇧🇮', value: 0.914, descriptionKey: 'currencies.bif.description' },
		{ code: 'CDF', nameKey: 'currencies.cdf.name', symbol: 'FC', flag: '🇨🇩', value: 0.943, descriptionKey: 'currencies.cdf.description' },
		{ code: 'NGN', nameKey: 'currencies.ngn.name', symbol: '₦', flag: '🇳🇬', value: 1.71, descriptionKey: 'currencies.ngn.description' },
		{ code: 'EGP', nameKey: 'currencies.egp.name', symbol: 'E£', flag: '🇪🇬', value: 88.3, descriptionKey: 'currencies.egp.description' }
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

	const egpBills = [
		{ value: 5, label: 'EGP 5', image: EGP_Bill_05 },
		{ value: 10, label: 'EGP 10', image: EGP_Bill_10 },
		{ value: 20, label: 'EGP 20', image: EGP_Bill_20 },
		{ value: 50, label: 'EGP 50', image: EGP_Bill_50 },
		{ value: 100, label: 'EGP 100', image: EGP_Bill_100 }
	];

	const countryFlag: Record<string, string> = {
		USD: '🇺🇸',
		EUR: '🇪🇺',
		GBP: '🇬🇧',
		TZS: '🇹🇿',
		KES: '🇰🇪',
		UGX: '🇺🇬',
		RWF: '🇷🇼',
		AED: '🇦🇪',
		CNY: '🇨🇳',
		INR: '🇮🇳',
		ETB: '🇪🇹',
		ZAR: '🇿🇦',
		ZMW: '🇿🇲',
		SAR: '🇸🇦',
		CHF: '🇨🇭',
		CAD: '🇨🇦',
		AUD: '🇦🇺',
		MWK: '🇲🇼',
		MZN: '🇲🇿',
		BIF: '🇧🇮',
		CDF: '🇨🇩',
		NGN: '🇳🇬',
		EGP: '🇪🇬'
	};

	// Map of currency codes to their bill arrays
	const billsByCode: Record<string, typeof usdBills> = {
		USD: usdBills,
		EUR: euroBills,
		GBP: gbpBills,
		KES: kesBills,
		TZS: tshBills,
		UGX: ugxBills,
		RWF: rwfBills,
		AED: aedBills,
		CNY: cynBills,
		INR: inrBills,
		ETB: ethBills,
		ZAR: zarBills,
		ZMW: zmwBills,
		SAR: sarBills,
		CHF: chfBills,
		CAD: cadBills,
		AUD: audBills,
		MWK: mwkBills,
		MZN: mznBills,
		BIF: bifBills,
		CDF: cdfBills,
		NGN: ngnBills,
		EGP: egpBills
	};

	let openCode = $state('');
	let selectedBill = $state<typeof usdBills[0] | null>(null);
	let carouselHovered = $state(false);
	let billImageHovered = $state(false);
	let magnifyMouseX = $state(0);
	let magnifyMouseY = $state(0);
	let billImgWidth = $state(0);
	let billImgHeight = $state(0);
	let cachedBillRect: DOMRect | null = null;
	let zoomLevel = $state(1);
	let initialDistance = 0;
	let startZoom = 1;
	let isTouching = $state(false);
	let panX = $state(0);
	let panY = $state(0);
	let initialPanX = 0;
	let initialPanY = 0;
	let swapRotation = $state(0);
	let isSwapping = $state(false);
	let sortMode = $state<'nameAsc' | 'nameDesc' | 'valueAsc' | 'valueDesc'>('nameAsc');
	let sortDropdownOpen = $state(false);
	let headerRef: HTMLElement | undefined;
	let pageRef: HTMLElement | undefined;
	let showStickyHeader = $state(false);
	let mounted = $state(false);
	
	onMount(() => {
		initRatePolling(8 * 60 * 60 * 1000); // 3x/day (90/mo)
		
		// Measure actual navbar height and set CSS variable
		setTimeout(() => {
			const desktopNav = document.querySelector('nav');
			if (desktopNav) {
				const navHeight = desktopNav.getBoundingClientRect().height;
				document.documentElement.style.setProperty('--navbar-height', `${navHeight}px`);
			}
		}, 0);
		
		// Listen to container scroll instead of window scroll
		// The page uses h-full overflow-auto, so scroll events come from the container
		let scrollTicking = false;
		const handleScroll = () => {
			if (!scrollTicking) {
				scrollTicking = true;
				requestAnimationFrame(() => {
					if (headerRef && pageRef) {
						const headerRect = headerRef.getBoundingClientRect();
						showStickyHeader = headerRect.bottom < 0;
					}
					scrollTicking = false;
				});
			}
		};

		if (pageRef) {
			pageRef.addEventListener('scroll', handleScroll, { passive: true });
		}

		mounted = true;

		return () => {
			if (pageRef) {
				pageRef.removeEventListener('scroll', handleScroll);
			}
		};
	});

	let selectedCurrency = $derived(selectedBill ? rates.find(r => r.code === openCode) ?? null : null);

	const getSortLabel = () => {
		switch (sortMode) {
			case 'nameAsc':
				return t('market.sortNameAsc');
			case 'nameDesc':
				return t('market.sortNameDesc');
			case 'valueAsc':
				return t('market.sortValueAsc');
			case 'valueDesc':
				return t('market.sortValueDesc');
			default:
				return t('market.sortNameAsc');
		}
	};

	// Calculate distance between two touch points
	const getDistance = (touch1: Touch, touch2: Touch) => {
		const dx = touch1.clientX - touch2.clientX;
		const dy = touch1.clientY - touch2.clientY;
		return Math.sqrt(dx * dx + dy * dy);
	};

	const handlePinch = (e: TouchEvent) => {
		if (e.touches.length === 2) {
			// Two-finger pinch zoom
			const currentDistance = getDistance(e.touches[0], e.touches[1]);

			if (initialDistance === 0) {
				// First pinch, store initial distance
				initialDistance = currentDistance;
				startZoom = zoomLevel;
			} else {
				// Calculate zoom based on pinch distance
				const scale = currentDistance / initialDistance;
				zoomLevel = Math.max(1, Math.min(3, startZoom * scale));
			}
		} else if (e.touches.length === 1 && zoomLevel > 1) {
			// Single finger pan (only when zoomed in)
			const touch = e.touches[0];
			const deltaX = touch.clientX - initialPanX;
			const deltaY = touch.clientY - initialPanY;
			
			// Apply pan with limits based on zoom level
			const maxPan = 100 * (zoomLevel - 1);
			panX = Math.max(-maxPan, Math.min(maxPan, deltaX));
			panY = Math.max(-maxPan, Math.min(maxPan, deltaY));
		}
	};

	const handlePinchEnd = () => {
		initialDistance = 0;
		startZoom = 1;
		initialPanX = 0;
		initialPanY = 0;
	};

	const navigateToPreviousBill = () => {
		if (!selectedBill || !openCode) return;
		const bills = billsByCode[openCode];
		if (!bills) return;
		
		const currentBill = selectedBill;
		const currentIndex = bills.findIndex(b => b.image === currentBill.image);
		if (currentIndex === -1) return;
		
		const previousIndex = currentIndex === 0 ? bills.length - 1 : currentIndex - 1;
		selectedBill = bills[previousIndex];
	};

	const navigateToNextBill = () => {
		if (!selectedBill || !openCode) return;
		const bills = billsByCode[openCode];
		if (!bills) return;
		
		const currentBill = selectedBill;
		const currentIndex = bills.findIndex(b => b.image === currentBill.image);
		if (currentIndex === -1) return;
		
		const nextIndex = currentIndex === bills.length - 1 ? 0 : currentIndex + 1;
		selectedBill = bills[nextIndex];
	};

	// Reset zoom/pan when bill modal is opened (selectedBill changes)
	$effect(() => {
		selectedBill;
		zoomLevel = 1;
		panX = 0;
		panY = 0;
		initialDistance = 0;
		isTouching = false;
	});

	const formatRate = (value: number) => {
		if (value === 0) return '0';
		// For very small numbers (< 0.001), show more decimal places
		if (Math.abs(value) < 0.001) {
			return value.toLocaleString(undefined, { maximumFractionDigits: 6, minimumFractionDigits: 4 });
		}
		// For normal numbers, show up to 3 decimal places
		return value.toLocaleString(undefined, { maximumFractionDigits: 3 });
	};

	const scrollToTop = () => {
		if (pageRef) {
			pageRef.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const getLiveRate = (code: string) => {
		const dynamicRate = $liveRates[code]?.TZS;
		if (dynamicRate != null) return dynamicRate;
		return getStaticRates()[code]?.TZS ?? 0;
	};

	// Swap FROM and TO currencies
	const swapCurrencies = () => {
		isSwapping = true;
		swapRotation += 180;
		const temp = $defaultFromCurrency;
		defaultFromCurrency.set($defaultToCurrency);
		defaultToCurrency.set(temp);
		setTimeout(() => { isSwapping = false; }, 400);
	};

	let lang = $derived($currentLanguage);
	let t = $derived((key: string) => getTranslation(key, lang));

	// Get the TO currency code
	let selectedToCurrencyCode = $derived($defaultToCurrency);
	let selectedFromCurrencyCode = $derived($defaultFromCurrency);

	let stickyFromFlag = $derived(countryFlag[selectedFromCurrencyCode] || '');
	let stickyToFlag = $derived(countryFlag[selectedToCurrencyCode] || '');

	let stickyFromRate = $derived.by(() => {
		const rate = rates.find(r => r.code === selectedFromCurrencyCode);
		return rate?.value ?? 1;
	});

	let stickyConvertedValue = $derived.by(() => {
		const toRate = rates.find(r => r.code === selectedToCurrencyCode);
		if (!toRate) return stickyFromRate;
		return stickyFromRate / toRate.value;
	});

	// Reorder rates to show user's selected FROM/TO currencies at the top
	let sortedRates = $derived.by(() => {
		const fromCode = $defaultFromCurrency;
		const toCode = $defaultToCurrency;

		const topRates: typeof rates = [];
		let remainingRates: typeof rates = [];

		// Separate top 2 (default FROM/TO) from the rest
		rates.forEach(rate => {
			if (rate.code === fromCode) {
				topRates.unshift(rate); // Add FROM first (leftmost)
			} else if (rate.code === toCode) {
				topRates.push(rate); // Add TO second
			} else {
				remainingRates.push(rate);
			}
		});

		return [...topRates, ...remainingRates];
	});

	// Convert rates relative to the selected TO currency
	let convertedRates = $derived.by(() => {
		const toCode = selectedToCurrencyCode;
		
		// Find the TO currency rate (relative to TZS)
		const toCurrencyRate = rates.find(r => r.code === toCode);
		if (!toCurrencyRate) return sortedRates;

		// Exclude the TO currency itself from conversion
		let result = sortedRates.map(rate => {
			if (rate.code === toCode) {
				// TO currency converts to itself at 1:1
				return { ...rate, value: 1 };
			}
			// Convert: (X / ToCurrency) = (X / TZS) / (ToCurrency / TZS)
			const convertedValue = rate.value / toCurrencyRate.value;
			return { ...rate, value: convertedValue };
		});

		// Separate top 2 FROM/TO from the rest for sorting
		const top2 = result.slice(0, 2);
		const remaining = result.slice(2);

		// Apply sort only to the remaining rates (keep FROM/TO pinned at top)
		const sorted = remaining.sort((a, b) => {
			switch (sortMode) {
				case 'nameAsc':
					return a.code.localeCompare(b.code);
				case 'nameDesc':
					return b.code.localeCompare(a.code);
				case 'valueAsc':
					return a.value - b.value;
				case 'valueDesc':
					return b.value - a.value;
				default:
					return 0;
			}
		});

		return [...top2, ...sorted];
	});
</script>

<svelte:head>
	<title>Market Rates - SimbaFX Currency Exchange</title>
	<meta name="description" content="View all current market exchange rates with SimbaFX. Compare rates for multiple currencies including TZS, USD, EUR, GBP, and KES. Real-time rate updates." />
</svelte:head>

<div bind:this={pageRef} class="h-full bg-white dark:bg-gray-950 transition-colors duration-200 overflow-auto">
	<!-- Sticky Header (Desktop) -->
	{#if showStickyHeader}
		<div class="sticky-rate-bar hidden md:block fixed left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
			<div class="max-w-4xl mx-auto px-8 py-2.5 flex items-center justify-between gap-4">
				<div class="flex items-center justify-center gap-4 flex-1">
					<FlagIcon code={selectedFromCurrencyCode} size="sm" />
					<span class="font-semibold text-gray-600 dark:text-gray-300">{selectedFromCurrencyCode}</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
					</svg>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						1 {selectedFromCurrencyCode} = <span class="font-semibold text-gray-900 dark:text-white">{formatRate(stickyConvertedValue)}</span>
					</span>
					<FlagIcon code={selectedToCurrencyCode} size="sm" />
					<span class="font-semibold text-gray-600 dark:text-gray-300">{selectedToCurrencyCode}</span>
				</div>
				<button onclick={scrollToTop} class="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200" aria-label="Scroll to top">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
					</svg>
				</button>
			</div>
		</div>
	{/if}

	<!-- Sticky Header (Mobile) -->
	{#if showStickyHeader}
		<div class="sticky-rate-bar-mobile md:hidden fixed left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
			<div class="px-4 py-2 flex items-center justify-between gap-2">
				<div class="flex items-center justify-center gap-2 flex-1 min-w-0">
					<FlagIcon code={selectedFromCurrencyCode} size="sm" />
					<span class="text-xs font-semibold text-gray-600 dark:text-gray-300">{selectedFromCurrencyCode}</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
					</svg>
					<span class="text-xs text-gray-500 dark:text-gray-400 truncate">
						1 = <span class="font-semibold text-gray-900 dark:text-white">{formatRate(stickyConvertedValue)}</span>
					</span>
					<FlagIcon code={selectedToCurrencyCode} size="sm" />
					<span class="text-xs font-semibold text-gray-600 dark:text-gray-300">{selectedToCurrencyCode}</span>
				</div>
				<button onclick={scrollToTop} class="flex-shrink-0 p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200" aria-label="Scroll to top">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
					</svg>
				</button>
			</div>
		</div>
	{/if}

	<div class="px-4 md:px-8 pt-8 md:pb-4 max-w-4xl mx-auto">
		<div class="flex items-center justify-between mb-6">
			<div class="flex items-center gap-3">
				<img src="/icons/icon48.png" alt="SimbaFX" class="md:hidden w-8 h-8 rounded-lg" />
				<h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{t('market.title')}</h1>
			</div>
		{#if $isLoading}
			<div class="flex items-center gap-2">
				<div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
				<span class="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('market.updating')}</span>
			</div>
		{/if}
		</div>
	</div>
	
	<div class="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden {$isLoading ? 'opacity-75 pointer-events-none' : ''} transition-colors duration-200">
		<div class="p-4 border-b border-gray-100 dark:border-gray-800 -mx-4 md:-mx-8 px-4 md:px-8" bind:this={headerRef}>
			<div class="flex flex-wrap items-center justify-start gap-3">
				<span class="text-sm text-gray-500 dark:text-gray-400">{t('market.subtitle')}</span>
				<div class="flex items-center gap-2">
					<span class="font-semibold text-gray-600 dark:text-gray-300">{selectedToCurrencyCode}</span>
					<span class="text-xs font-semibold px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded">TO</span>
				</div>
				<button
					onclick={swapCurrencies}
					aria-label="Swap FROM and TO currencies"
					class="p-2 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 transition-all duration-300 ease-out"
					style="transform: rotate({swapRotation}deg) {isSwapping ? 'scale(1.15)' : 'scale(1)'};"
					title="Swap currencies"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
					</svg>
				</button>
				<span class="text-sm text-gray-500 dark:text-gray-400">{t('market.subtitleSuffix')}</span>
				<div class="flex items-center gap-2">
					<span class="font-semibold text-gray-600 dark:text-gray-300">{$defaultFromCurrency}</span>
					<span class="text-xs font-semibold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded">FROM</span>
				</div>
			</div>
			<div class="flex flex-col gap-2 mt-2">
				{#if $lastUpdated}
					<p class="text-xs text-gray-400">
						{t('market.updated')} {new Date($lastUpdated).toLocaleString()}
					</p>
				{/if}
				{#if $fetchError}
					<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded px-3 py-2 flex items-start gap-2">
						<svg class="w-4 h-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
						</svg>
						<p class="text-xs text-yellow-800 dark:text-yellow-200">{$fetchError}</p>
					</div>
				{/if}
			</div>
		</div>
		
		{#if !mounted}
			<!-- Skeleton Loading State -->
			<div class="divide-y divide-gray-100 dark:divide-gray-800">
				{#each Array(8) as _, i (i)}
					<div class="border-b border-gray-100 dark:border-gray-800 last:border-b-0 p-4 md:p-8 space-y-3">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3 flex-1">
								<Skeleton width="w-10" height="h-10" circle={true} />
								<div class="flex-1 space-y-1">
									<Skeleton width="w-20" height="h-4" />
									<Skeleton width="w-32" height="h-3" />
								</div>
							</div>
							<Skeleton width="w-16" height="h-5" />
						</div>
					</div>
				{/each}
			</div>
		{:else}
		<div class="divide-y divide-gray-100 dark:divide-gray-800" role="list">
			{#each convertedRates as rate, index}
				<div
					class="border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-all"
					role="listitem"
				>
					<button
						type="button"
						class="w-full flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 transition-colors p-4 md:p-8"
						aria-expanded={openCode === rate.code}
						aria-controls={openCode === rate.code ? `rate-panel-${rate.code}` : undefined}
						onclick={() => { openCode = openCode === rate.code ? '' : rate.code; }}
					>
						<div class="flex items-center gap-3">
							<FlagIcon code={rate.code} size="md" />
							<div>
								<div class="flex items-center gap-2">
									<p class="font-medium text-gray-900 dark:text-white">{rate.code} → {selectedToCurrencyCode}</p>
									{#if index === 0}
										<span class="text-xs font-semibold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded">FROM</span>
									{:else if index === 1}
										<span class="text-xs font-semibold px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded">TO</span>
									{/if}
								</div>
								<p class="text-sm text-gray-500 dark:text-gray-400">{t(rate.nameKey)} ({rate.symbol})</p>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<p class="text-lg font-semibold text-gray-900 dark:text-white">{formatRate(rate.value)}</p>
							<svg
								class={`w-4 h-4 text-gray-400 dark:text-gray-600 transition-transform ${openCode === rate.code ? 'rotate-180' : ''}`}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
							</svg>
						</div>
					</button>
					{#if openCode === rate.code}
					<div id="rate-panel-{rate.code}" class="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-800/50 accordion-inner-shadow transition-colors">
							<p>1 {rate.code} → {formatRate(rate.value)} {selectedToCurrencyCode}</p>
							<p class="mt-2 text-xs leading-relaxed text-gray-500">{t(rate.descriptionKey)}</p>
							{#if rate.code === 'USD'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="USD bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each usdBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="EURO bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each euroBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="GBP bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each gbpBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="TZS bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each tshBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="UGX bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each ugxBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="RWF bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each rwfBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="AED bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each aedBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CNY bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each cynBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="INR bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each inrBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="ETB bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each ethBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="ZAR bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each zarBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="ZMW bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each zmwBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="SAR bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each sarBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="KES bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each kesBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CAD bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each cadBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="AUD bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each audBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="MWK bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each mwkBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CHF bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each chfBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="MZN bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each mznBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="BIF bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each bifBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="CDF bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each cdfBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="NGN bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each ngnBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
													onclick={() => (selectedBill = bill)}
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
							{:else if rate.code === 'EGP'}
							<div class="mt-4 -mx-4">
								<p class="text-xs uppercase tracking-wide text-gray-400 mb-2 px-4">{t(rate.nameKey)} {t('market.bills')}</p>
									<div class="usd-carousel"
										role="region"
										aria-label="EGP bills carousel"
										onmouseenter={() => (carouselHovered = true)}
										onmouseleave={() => (carouselHovered = false)}>
										<div class="usd-carousel-track {carouselHovered ? 'paused' : ''}">
											{#each egpBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
													aria-label="View {bill.label} bill details"
												>
													<img src={bill.image} alt={bill.label} class="usd-bill-image" />
													<p class="usd-bill-label">{bill.label}</p>
												</button>
											{/each}
											{#each egpBills as bill}
												<button
													type="button"
													class="usd-bill-card"
													onclick={() => (selectedBill = bill)}
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
				{#if index === 1}
					<div class="px-4 py-3 flex justify-center">
						<a
							href="/settings"
							class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors flex items-center gap-1"
						>
							<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
							</svg>
							{t('market.changeDefaultCurrency')}
						</a>
					</div>
					<div class="border-b-2 border-gray-200 dark:border-gray-700"></div>
					<!-- Sort Dropdown -->
					<div class="px-4 py-3 flex justify-end items-center gap-3 relative">
						<span class="text-xs text-gray-600 dark:text-gray-400">{t('market.sortedBy')} <span class="font-semibold text-gray-900 dark:text-white">{getSortLabel()}</span></span>
						<div class="relative inline-block">
							<button
								type="button"
								class="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all flex items-center gap-2 bg-white dark:bg-gray-800"
								onclick={() => { sortDropdownOpen = !sortDropdownOpen; }}
								aria-expanded={sortDropdownOpen}
								aria-haspopup="listbox"
								aria-label={t('market.sort')}
							>
								<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
									<path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v2.586l-.293-.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L15 10.586V8z" />
								</svg>
								{t('market.sort')}
								<svg class={`w-3 h-3 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
							</button>
							
							{#if sortDropdownOpen}
								<div
									class="absolute top-full mt-1 w-44 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10 overflow-hidden"
									role="listbox"
									tabindex="0"
									onkeydown={(e) => {
										if (e.key === 'Escape') sortDropdownOpen = false;
									}}
								>
									<button
										type="button"
										class={`w-full text-left px-3 py-2 text-xs transition-colors ${
											sortMode === 'nameAsc'
												? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
										}`}
										role="option"
										aria-selected={sortMode === 'nameAsc'}
										onclick={() => { sortMode = 'nameAsc'; sortDropdownOpen = false; }}
									>
										{t('market.sortNameAsc')}
										{#if sortMode === 'nameAsc'}<span class="float-right">✓</span>{/if}
									</button>
									<button
										type="button"
										class={`w-full text-left px-3 py-2 text-xs transition-colors ${
											sortMode === 'nameDesc'
												? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
										}`}
										role="option"
										aria-selected={sortMode === 'nameDesc'}
										onclick={() => { sortMode = 'nameDesc'; sortDropdownOpen = false; }}
									>
										{t('market.sortNameDesc')}
										{#if sortMode === 'nameDesc'}<span class="float-right">✓</span>{/if}
									</button>
									<button
										type="button"
										class={`w-full text-left px-3 py-2 text-xs transition-colors ${
											sortMode === 'valueAsc'
												? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
										}`}
										role="option"
										aria-selected={sortMode === 'valueAsc'}
										onclick={() => { sortMode = 'valueAsc'; sortDropdownOpen = false; }}
									>
										{t('market.sortValueAsc')}
										{#if sortMode === 'valueAsc'}<span class="float-right">✓</span>{/if}
									</button>
									<button
										type="button"
										class={`w-full text-left px-3 py-2 text-xs transition-colors ${
											sortMode === 'valueDesc'
												? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
										}`}
										role="option"
										aria-selected={sortMode === 'valueDesc'}
										onclick={() => { sortMode = 'valueDesc'; sortDropdownOpen = false; }}
									>
										{t('market.sortValueDesc')}
										{#if sortMode === 'valueDesc'}<span class="float-right">✓</span>{/if}
									</button>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	</div>

	<!-- Bill Detail Modal -->
	{#if selectedBill}
	<div
		class="bill-modal-backdrop"
		role="presentation"
		onclick={() => (selectedBill = null)}
		onkeydown={(e) => e.key === 'Escape' && (selectedBill = null)}
	>
		<div
			class="bill-modal-content"
			role="dialog"
			aria-modal="true"
			aria-label={selectedBill.label}
			tabindex="0"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<button
				type="button"
				class="bill-modal-close"
				onclick={() => (selectedBill = null)}
				aria-label="Close bill details"
			>
				<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Bill image stage -->
			<div class="bill-modal-stage">
				<!-- Previous button -->
				<button
					type="button"
					class="bill-nav-arrow bill-nav-arrow-prev"
					onclick={navigateToPreviousBill}
					aria-label="Previous bill"
				>
					<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<div
					class="bill-image-container"
					role="img"
					ontouchstart={(e) => { 
						e.preventDefault();
						isTouching = true;
						initialDistance = 0;
						if (e.touches.length === 1) {
							initialPanX = e.touches[0].clientX;
							initialPanY = e.touches[0].clientY;
						}
					}}
					ontouchmove={(e) => {
						e.preventDefault();
						if (e.touches.length === 0) return;
						// Handle pinch zoom or pan
						handlePinch(e);
					}}
					ontouchend={(e) => {
						e.preventDefault();
						isTouching = false;
						handlePinchEnd();
					}}
					onmouseenter={(e) => { billImageHovered = true; cachedBillRect = e.currentTarget.getBoundingClientRect(); billImgWidth = cachedBillRect.width; billImgHeight = cachedBillRect.height; }}
					onmouseleave={() => { billImageHovered = false; cachedBillRect = null; }}
					onmousemove={(e) => {
						if (cachedBillRect) {
							magnifyMouseX = e.clientX - cachedBillRect.left;
							magnifyMouseY = e.clientY - cachedBillRect.top;
						}
					}}
				>
					<img 
						src={selectedBill.image} 
						alt={selectedBill.label} 
						class="bill-modal-image" 
						style="transform: scale({zoomLevel}) translate({panX}px, {panY}px); transition: transform 0.2s ease-out; cursor: {zoomLevel > 1 && isTouching ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'zoom-in'};"
					/>
					<!-- Desktop Magnifying Glass (mouse only - not on touch) -->
					{#if billImageHovered && !isTouching}
						<div
							class="magnifying-glass"
							style="left: {magnifyMouseX}px; top: {magnifyMouseY}px; background-image: url('{selectedBill.image}'); background-size: {billImgWidth * 2.5}px {billImgHeight * 2.5}px; background-position: {-magnifyMouseX * 2.5 + 75}px {-magnifyMouseY * 2.5 + 75}px;"
						></div>
					{/if}
				</div>

				<!-- Next button -->
				<button
					type="button"
					class="bill-nav-arrow bill-nav-arrow-next"
					onclick={navigateToNextBill}
					aria-label="Next bill"
				>
					<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<!-- Info bar -->
			<div class="bill-modal-info-bar">
				{#if selectedCurrency}
					<span class="bill-modal-flag"><FlagIcon code={selectedCurrency.code} size="lg" /></span>
				{/if}
				<div class="bill-modal-info-text">
					<h2 class="bill-modal-denomination">{selectedBill.label}</h2>
					{#if selectedCurrency}
						<p class="bill-modal-currency-name">{t(selectedCurrency.nameKey)}</p>
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
			<p class="bill-modal-hint">{t('market.modalHint')}</p>
		</div>
	</div>
	{/if}
</div>

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

	/* Sticky Rate Bar - position under navbar */
	.sticky-rate-bar {
		top: var(--navbar-height, 57px);
	}

	.sticky-rate-bar-mobile {
		top: 0;
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

	.bill-modal-close:focus-visible,
	.bill-nav-arrow:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px #10b981;
	}

	.bill-modal-stage {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 2rem 1rem;
	}

	.bill-image-container {
		position: relative;
		display: inline-block;
		touch-action: none;
		overflow: hidden;
	}

	.bill-modal-image {
		max-width: 90vw;
		max-height: 65vh;
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
			max-width: 75vw;
			max-height: 75vh;
		}
		.bill-modal-stage {
			padding: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.bill-modal-image {
			max-width: 65vw;
			max-height: 80vh;
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

	/* On touch devices, add visual indicator/label */
	@media (hover: none) and (pointer: coarse) {
		.magnifying-glass::after {
			content: '🔍';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 24px;
			opacity: 0.3;
			pointer-events: none;
		}
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

	.bill-nav-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		padding: 0.625rem;
		color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.bill-nav-arrow:hover {
		background: rgba(255, 255, 255, 0.25);
		border-color: rgba(255, 255, 255, 0.4);
		color: white;
	}

	.bill-nav-arrow:active {
		transform: translateY(-50%) scale(0.95);
	}

	.bill-nav-arrow-prev {
		left: 1rem;
	}

	.bill-nav-arrow-next {
		right: 1rem;
	}

	@media (max-width: 640px) {
		.bill-nav-arrow {
			padding: 0.5rem;
		}

		.bill-nav-arrow svg {
			width: 20px;
			height: 20px;
		}

		.bill-nav-arrow-prev {
			left: 0.5rem;
		}

		.bill-nav-arrow-next {
			right: 0.5rem;
		}
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

	button[aria-label="Swap FROM and TO currencies"] {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
	}
</style>
