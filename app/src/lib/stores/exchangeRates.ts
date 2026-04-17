import { writable } from 'svelte/store';

const API_KEY = import.meta.env.VITE_EXCHANGERATE_API_KEY;
const BASE = 'USD';

export const currencyCodes = [
	'USD', 'EUR', 'GBP', 'TZS', 'KES', 'UGX', 'RWF', 'AED', 'CNY', 'INR', 'ETB', 'ZAR', 'ZMW', 'SAR', 'CHF', 'CAD', 'AUD', 'MWK', 'MZN', 'BIF', 'CDF', 'NGN', 'EGP'
];

// Initial fallback rates - will be updated with most recent API data
let staticRates: Record<string, Record<string, number>> = {
	USD: { EUR: 0.92, GBP: 0.79, TZS: 2650, KES: 151, UGX: 3800, RWF: 1200, AED: 3.67, CNY: 7.2, INR: 83, ETB: 57, ZAR: 18, ZMW: 27, SAR: 3.75, CHF: 0.88, CAD: 1.34, AUD: 1.52, MWK: 1300, MZN: 63, BIF: 2900, CDF: 2800, NGN: 1550, EGP: 30, USD: 1 },
	EUR: { USD: 1.09, GBP: 0.86, TZS: 2890, KES: 164, UGX: 4130, RWF: 1305, AED: 4.00, CNY: 7.83, INR: 90.4, ETB: 62, ZAR: 19.6, ZMW: 29.4, SAR: 4.08, CHF: 0.96, CAD: 1.46, AUD: 1.65, MWK: 1415, MZN: 68.6, BIF: 3160, CDF: 3045, NGN: 1686, EGP: 32.6, EUR: 1 },
	GBP: { USD: 1.26, EUR: 1.16, TZS: 3350, KES: 191, UGX: 4800, RWF: 1516, AED: 4.65, CNY: 9.10, INR: 105, ETB: 72, ZAR: 22.8, ZMW: 34.2, SAR: 4.74, CHF: 1.11, CAD: 1.70, AUD: 1.92, MWK: 1645, MZN: 79.8, BIF: 3670, CDF: 3540, NGN: 1960, EGP: 37.9, GBP: 1 },
	TZS: { USD: 0.000377, EUR: 0.000346, GBP: 0.000298, KES: 0.057, UGX: 1.43, RWF: 0.453, AED: 0.00139, CNY: 0.00272, INR: 0.0313, ETB: 0.0215, ZAR: 0.00679, ZMW: 0.0102, SAR: 0.00142, CHF: 0.000332, CAD: 0.000506, AUD: 0.000575, MWK: 0.491, MZN: 0.0238, BIF: 1.09, CDF: 1.06, NGN: 0.585, EGP: 0.0113, TZS: 1 },
	KES: { USD: 0.0066, EUR: 0.0061, GBP: 0.0052, TZS: 17.5, UGX: 25.2, RWF: 7.95, AED: 0.0243, CNY: 0.0477, INR: 0.549, ETB: 0.377, ZAR: 0.119, ZMW: 0.179, SAR: 0.0248, CHF: 0.00583, CAD: 0.00887, AUD: 0.0101, MWK: 8.61, MZN: 0.418, BIF: 19.2, CDF: 18.5, NGN: 10.3, EGP: 0.199, KES: 1 },
	UGX: { USD: 0.000263, EUR: 0.000242, GBP: 0.000208, TZS: 0.697, KES: 0.0397, RWF: 0.316, AED: 0.000965, CNY: 0.00189, INR: 0.0218, ETB: 0.015, ZAR: 0.00474, ZMW: 0.0071, SAR: 0.000987, CHF: 0.000232, CAD: 0.000352, AUD: 0.0004, MWK: 0.342, MZN: 0.0166, BIF: 0.763, CDF: 0.737, NGN: 0.409, EGP: 0.0079, UGX: 1 },
	RWF: { USD: 0.000833, EUR: 0.000766, GBP: 0.000659, TZS: 2.21, KES: 0.126, UGX: 3.16, AED: 0.00306, CNY: 0.006, INR: 0.0692, ETB: 0.0475, ZAR: 0.015, ZMW: 0.0225, SAR: 0.003125, CHF: 0.000734, CAD: 0.001116, AUD: 0.00127, MWK: 1.08, MZN: 0.0525, BIF: 2.42, CDF: 2.34, NGN: 1.29, EGP: 0.025, RWF: 1 },
	AED: { USD: 0.272, EUR: 0.25, GBP: 0.214, TZS: 721, KES: 41.1, UGX: 1036, RWF: 327, CNY: 1.96, INR: 22.6, ETB: 15.5, ZAR: 4.91, ZMW: 7.36, SAR: 1.022, CHF: 0.24, CAD: 0.365, AUD: 0.415, MWK: 353, MZN: 17.2, BIF: 792, CDF: 767, NGN: 422, EGP: 8.18, AED: 1 },
	CNY: { USD: 0.139, EUR: 0.118, GBP: 0.109, TZS: 368, KES: 21, UGX: 528, RWF: 167, AED: 0.51, INR: 11.5, ETB: 7.91, ZAR: 2.5, ZMW: 3.75, SAR: 0.521, CHF: 0.122, CAD: 0.186, AUD: 0.211, MWK: 180, MZN: 8.75, BIF: 404, CDF: 391, NGN: 215, EGP: 4.17, CNY: 1 },
	INR: { USD: 0.012, EUR: 0.0102, GBP: 0.0075, TZS: 31.9, KES: 1.82, UGX: 45.8, RWF: 14.5, AED: 0.044, CNY: 0.087, ETB: 0.687, ZAR: 0.216, ZMW: 0.326, SAR: 0.045, CHF: 0.0106, CAD: 0.0162, AUD: 0.0184, MWK: 15.7, MZN: 0.76, BIF: 35.1, CDF: 34, NGN: 18.7, EGP: 0.361, INR: 1 },
	ETB: { USD: 0.0175, EUR: 0.0148, GBP: 0.0139, TZS: 46.5, KES: 2.65, UGX: 66.7, RWF: 21, AED: 0.064, CNY: 0.126, INR: 1.46, ZAR: 0.315, ZMW: 0.474, SAR: 0.0658, CHF: 0.0154, CAD: 0.0235, AUD: 0.0268, MWK: 22.8, MZN: 1.11, BIF: 51, CDF: 49.5, NGN: 27.2, EGP: 0.526, ETB: 1 },
	ZAR: { USD: 0.0556, EUR: 0.051, GBP: 0.0438, TZS: 147, KES: 8.4, UGX: 211, RWF: 67, AED: 0.204, CNY: 0.4, INR: 4.63, ETB: 3.18, ZMW: 1.5, SAR: 0.209, CHF: 0.049, CAD: 0.0745, AUD: 0.085, MWK: 72.2, MZN: 3.5, BIF: 161, CDF: 157, NGN: 86.1, EGP: 1.67, ZAR: 1 },
	ZMW: { USD: 0.037, EUR: 0.034, GBP: 0.029, TZS: 98, KES: 5.6, UGX: 141, RWF: 44.5, AED: 0.136, CNY: 0.267, INR: 3.07, ETB: 2.12, ZAR: 0.667, SAR: 0.139, CHF: 0.0325, CAD: 0.0497, AUD: 0.0567, MWK: 48, MZN: 2.33, BIF: 107, CDF: 104, NGN: 57.4, EGP: 1.11, ZMW: 1 },
	SAR: { USD: 0.267, EUR: 0.245, GBP: 0.211, TZS: 707, KES: 40.3, UGX: 1015, RWF: 321, AED: 0.978, CNY: 1.92, INR: 22.1, ETB: 15.2, ZAR: 4.78, ZMW: 7.18, CHF: 0.235, CAD: 0.358, AUD: 0.408, MWK: 348, MZN: 16.9, BIF: 775, CDF: 750, NGN: 413, EGP: 8.01, SAR: 1 },
	CHF: { USD: 1.136, EUR: 1.042, GBP: 0.901, TZS: 3010, KES: 171, UGX: 4318, RWF: 1364, AED: 4.17, CNY: 8.18, INR: 94.3, ETB: 64.7, ZAR: 20.4, ZMW: 30.7, SAR: 4.26, CAD: 1.525, AUD: 1.74, MWK: 1480, MZN: 72, BIF: 3300, CDF: 3193, NGN: 1762, EGP: 34.1, CHF: 1 },
	CAD: { USD: 0.744, EUR: 0.683, GBP: 0.591, TZS: 1975, KES: 112.5, UGX: 2835, RWF: 894, AED: 2.73, CNY: 5.36, INR: 61.8, ETB: 42.4, ZAR: 13.4, ZMW: 20.1, SAR: 2.79, CHF: 0.656, AUD: 1.14, MWK: 970, MZN: 47.1, BIF: 2163, CDF: 2092, NGN: 1155, EGP: 22.4, CAD: 1 },
	AUD: { USD: 0.658, EUR: 0.603, GBP: 0.521, TZS: 1750, KES: 99.5, UGX: 2500, RWF: 789, AED: 2.41, CNY: 4.73, INR: 54.6, ETB: 37.5, ZAR: 11.8, ZMW: 17.8, SAR: 2.47, CHF: 0.576, CAD: 0.876, MWK: 857, MZN: 41.6, BIF: 1913, CDF: 1851, NGN: 1020, EGP: 19.8, AUD: 1 },
	MWK: { USD: 0.000769, EUR: 0.000707, GBP: 0.000608, TZS: 2.04, KES: 0.116, UGX: 2.92, RWF: 0.926, AED: 0.00283, CNY: 0.00556, INR: 0.0637, ETB: 0.0438, ZAR: 0.0139, ZMW: 0.0208, SAR: 0.00288, CHF: 0.000676, CAD: 0.00103, AUD: 0.00117, MZN: 0.0485, BIF: 2.24, CDF: 2.16, NGN: 1.19, EGP: 0.023, MWK: 1 },
	MZN: { USD: 0.0159, EUR: 0.0146, GBP: 0.0125, TZS: 42.1, KES: 2.4, UGX: 60.3, RWF: 19.1, AED: 0.0583, CNY: 0.114, INR: 1.31, ETB: 0.902, ZAR: 0.286, ZMW: 0.427, SAR: 0.0594, CHF: 0.0139, CAD: 0.0212, AUD: 0.0242, MWK: 20.6, BIF: 46.1, CDF: 44.5, NGN: 24.5, EGP: 0.476, MZN: 1 },
	BIF: { USD: 0.000345, EUR: 0.000316, GBP: 0.000272, TZS: 0.914, KES: 0.052, UGX: 1.31, RWF: 0.414, AED: 0.00126, CNY: 0.00248, INR: 0.0285, ETB: 0.0196, ZAR: 0.00621, ZMW: 0.00933, SAR: 0.00129, CHF: 0.000303, CAD: 0.000462, AUD: 0.000523, MWK: 0.447, MZN: 0.0217, CDF: 0.964, NGN: 0.531, EGP: 0.0103, BIF: 1 },
	CDF: { USD: 0.000357, EUR: 0.000328, GBP: 0.000282, TZS: 0.943, KES: 0.054, UGX: 1.36, RWF: 0.429, AED: 0.00131, CNY: 0.00257, INR: 0.0296, ETB: 0.0203, ZAR: 0.00644, ZMW: 0.00966, SAR: 0.00134, CHF: 0.000314, CAD: 0.000479, AUD: 0.000542, MWK: 0.464, MZN: 0.0225, BIF: 1.04, NGN: 0.551, EGP: 0.0107, CDF: 1 },
	NGN: { USD: 0.000645, EUR: 0.000594, GBP: 0.000510, TZS: 1.71, KES: 0.097, UGX: 2.44, RWF: 0.775, AED: 0.00237, CNY: 0.00467, INR: 0.0535, ETB: 0.0368, ZAR: 0.0116, ZMW: 0.0174, SAR: 0.00243, CHF: 0.000569, CAD: 0.000867, AUD: 0.000981, MWK: 0.840, MZN: 0.0408, BIF: 1.88, CDF: 1.82, EGP: 0.0194, NGN: 1 },
	EGP: { USD: 0.0333, EUR: 0.0307, GBP: 0.0264, TZS: 88.3, KES: 5.03, UGX: 126.5, RWF: 39.95, AED: 0.122, CNY: 0.240, INR: 2.75, ETB: 1.90, ZAR: 0.599, ZMW: 0.900, SAR: 0.125, CHF: 0.0293, CAD: 0.0447, AUD: 0.0506, MWK: 43.3, MZN: 2.10, BIF: 96.8, CDF: 93.8, NGN: 51.5, EGP: 1 }
};

// Try to load most recent rates from localStorage on startup
function loadCachedRates() {
	if (typeof window === 'undefined') return; // SSR check
	try {
		const cached = localStorage.getItem('cachedExchangeRates');
		if (cached) {
			const parsed = JSON.parse(cached);
			staticRates = parsed;
		}
	} catch (error) {
		console.error('Failed to load cached rates:', error);
	}
}

function getCachedRates() {
	return staticRates;
}

export function getStaticRates() {
	return getCachedRates();
}

function buildMatrixFromUsd(usdRates: Record<string, number>) {
	const matrix: Record<string, Record<string, number>> = {};
	for (const from of currencyCodes) {
		matrix[from] = {};
		for (const to of currencyCodes) {
			if (from === to) {
				matrix[from][to] = 1;
			} else if (from === BASE) {
				matrix[from][to] = usdRates[to] ?? 1;
			} else if (to === BASE) {
				matrix[from][to] = 1 / (usdRates[from] ?? 1);
			} else {
				matrix[from][to] = (1 / (usdRates[from] ?? 1)) * (usdRates[to] ?? 1);
			}
		}
	}
	return matrix;
}

export const rates = writable<Record<string, Record<string, number>>>(getCachedRates());
export const lastUpdated = writable<string | null>(null);
export const isLoading = writable(false);
export const fetchError = writable<string | null>(null);

let pollingTimer: number | null = null;
const RATE_LIMIT_MS = 24 * 60 * 60 * 1000; // 24 hours

function canFetchRates(): boolean {
	if (typeof window === 'undefined') return true; // SSR bypass
	const lastFetchStr = localStorage.getItem('lastRateFetch');
	if (!lastFetchStr) return true; // First fetch always allowed
	const lastFetch = parseInt(lastFetchStr, 10);
	return Date.now() - lastFetch >= RATE_LIMIT_MS;
}

function setLastFetch() {
	if (typeof window !== 'undefined') {
		localStorage.setItem('lastRateFetch', Date.now().toString());
	}
}

function saveRatesToCache(ratesData: Record<string, Record<string, number>>) {
	if (typeof window === 'undefined') return; // SSR check
	try {
		localStorage.setItem('cachedExchangeRates', JSON.stringify(ratesData));
	} catch (error) {
		console.error('Failed to save rates to cache:', error);
	}
}

export async function fetchExchangeRates() {
	// Check rate limit
	if (!canFetchRates()) {
		const lastFetchStr = localStorage.getItem('lastRateFetch');
		const lastFetch = lastFetchStr ? parseInt(lastFetchStr, 10) : 0;
		const hoursUntil = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastFetch)) / (60 * 60 * 1000));
		fetchError.set(`Rate limit: check rates again in ${hoursUntil} hour${hoursUntil !== 1 ? 's' : ''}`);
		return staticRates;
	}

	isLoading.set(true);
	fetchError.set(null);

	try {
		const symbols = currencyCodes.join(',');
		const url = `/api/rates?base=${BASE}&symbols=${symbols}`;
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = await res.json();

		if (!data || !data.rates || typeof data.rates !== 'object' || Object.keys(data.rates).length === 0) {
			if (data.error) {
				const errorMsg = typeof data.error === 'object' && data.error.type
					? data.error.type
					: String(data.error);
				throw new Error(`API error: ${errorMsg}`);
			}
			throw new Error('Missing rate data');
		}

		const usdRates: Record<string, number> = { USD: 1, ...data.rates };
		const dynamic = buildMatrixFromUsd(usdRates);
		rates.set(dynamic);
		staticRates = dynamic; // Update fallback with freshest rates
		saveRatesToCache(dynamic); // Persist to localStorage
		setLastFetch(); // Update rate limit timestamp
		lastUpdated.set(new Date().toISOString());
		return dynamic;
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown fetch error';
		fetchError.set(message);
		// Fall back to most recent rates (which started as initial rates, then updated with each successful fetch)
		return staticRates;
	} finally {
		isLoading.set(false);
	}
}

export function initRatePolling(intervalMs = 8 * 60 * 60 * 1000) {
	loadCachedRates(); // Load most recent rates from storage on startup
	rates.set(getCachedRates()); // Update store with cached rates
	if (pollingTimer) clearInterval(pollingTimer);
	pollingTimer = window.setInterval(fetchExchangeRates, intervalMs);
	fetchExchangeRates();
}

export function stopRatePolling() {
	if (pollingTimer) {
		clearInterval(pollingTimer);
		pollingTimer = null;
	}
}

export function resetRateLimit() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('lastRateFetch');
		fetchError.set(null);
		console.log('Rate limit reset. You can now fetch fresh rates.');
	}
}
