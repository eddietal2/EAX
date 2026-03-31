import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { VITE_EXCHANGERATE_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const API_KEY = VITE_EXCHANGERATE_API_KEY;
		
		if (!API_KEY) {
			console.error('API_KEY is not defined');
			return json(
				{ success: false, error: { type: 'missing_key', info: 'API key not configured' } },
				{ status: 500 }
			);
		}

		const base = url.searchParams.get('base') || 'USD';
		const symbols = url.searchParams.get('symbols') || '';

		console.log('Fetching rates from exchangerate.host:', { base, symbols });

		const apiUrl = `https://api.exchangerate.host/live?access_key=${API_KEY}&symbols=${symbols}`;
		console.log('API URL:', apiUrl);

		const response = await fetch(apiUrl);
		const text = await response.text();
		
		console.log('Response status:', response.status, 'Content-Type:', response.headers.get('content-type'));
		console.log('Response text (first 200 chars):', text.substring(0, 200));

		let data;
		try {
			data = JSON.parse(text);
		} catch {
			console.error('Failed to parse JSON:', text.substring(0, 500));
			return json(
				{ success: false, error: { type: 'parse_error', info: 'API returned non-JSON response' } },
				{ status: 500 }
			);
		}

		if (!response.ok || !data.success) {
			throw new Error(data.error?.type || `API error: ${response.status}`);
		}

		// Transform quotes response to rates format
		// /live endpoint returns quotes like { USDEUR: 0.92, USDGBP: 0.79, ... }
		// We need to convert to { EUR: 0.92, GBP: 0.79, ... }
		if (data.quotes) {
			const rates: Record<string, number> = {};
			for (const [key, value] of Object.entries(data.quotes)) {
				const currency = key.substring(3); // Remove 'USD' prefix
				rates[currency] = value as number;
			}
			data.rates = rates;
		}

		return json(data);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		console.error('Server error fetching rates:', message);
		return json(
			{ success: false, error: { type: 'fetch_error', info: message } },
			{ status: 500 }
		);
	}
};
