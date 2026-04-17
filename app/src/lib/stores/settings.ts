import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface CurrencyOption {
	code: string;
	name: string;
	symbol: string;
	flag: string;
}

export const currencyOptions: CurrencyOption[] = [
	{ code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
	{ code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
	{ code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
	{ code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
	{ code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
	{ code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
	{ code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼' },
	{ code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
	{ code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
	{ code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
	{ code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
	{ code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
	{ code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲' },
	{ code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
	{ code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
	{ code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
	{ code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
	{ code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼' },
	{ code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿' },
	{ code: 'BIF', name: 'Burundian Franc', symbol: 'Fr', flag: '🇧🇮' },
	{ code: 'CDF', name: 'Congolese Franc', symbol: 'FC', flag: '🇨🇩' },
	{ code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
	{ code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' }
];

const fromStorageKey = 'exchangeDefaultFromCurrency';
const toStorageKey = 'exchangeDefaultToCurrency';

function createDefaultFromCurrencyStore() {
	const defaultCode = browser && localStorage.getItem(fromStorageKey)
		? localStorage.getItem(fromStorageKey)
		: 'USD';

	const store = writable<string>(defaultCode as string);

	store.subscribe((value) => {
		if (!browser) return;
		localStorage.setItem(fromStorageKey, value);
	});

	return store;
}

function createDefaultToCurrencyStore() {
	const defaultCode = browser && localStorage.getItem(toStorageKey)
		? localStorage.getItem(toStorageKey)
		: 'TZS';

	const store = writable<string>(defaultCode as string);

	store.subscribe((value) => {
		if (!browser) return;
		localStorage.setItem(toStorageKey, value);
	});

	return store;
}

export const defaultFromCurrency = createDefaultFromCurrencyStore();
export const defaultToCurrency = createDefaultToCurrencyStore();
