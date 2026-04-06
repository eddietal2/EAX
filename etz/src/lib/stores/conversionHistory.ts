import { writable } from 'svelte/store';

export interface Conversion {
	id: string;
	name?: string;
	fromCurrency: string;
	toCurrency: string;
	fromAmount: number;
	toAmount: number;
	rate: number;
	timestamp: string;
}

function createConversionHistoryStore() {
	const storageName = 'conversionHistory';
	const store = writable<Conversion[]>([]);

	// Load from localStorage on startup
	function loadFromStorage() {
		if (typeof window === 'undefined') return;
		try {
			const cached = localStorage.getItem(storageName);
			if (cached) {
				const parsed = JSON.parse(cached) as Conversion[];
				store.set(parsed);
			}
		} catch (error) {
			console.error('Failed to load conversion history:', error);
		}
	}

	// Save to localStorage
	function saveToStorage(conversions: Conversion[]) {
		if (typeof window === 'undefined') return;
		try {
			localStorage.setItem(storageName, JSON.stringify(conversions));
		} catch (error) {
			console.error('Failed to save conversion history:', error);
		}
	}

	// Add conversion
	function addConversion(conversion: Omit<Conversion, 'id' | 'timestamp'>) {
		const newConversion: Conversion = {
			...conversion,
			id: crypto.randomUUID?.() || Math.random().toString(36),
			timestamp: new Date().toISOString()
		};

		store.update((conversions) => {
			const updated = [newConversion, ...conversions];
			saveToStorage(updated);
			return updated;
		});

		return newConversion;
	}

	// Clear history
	function clearHistory() {
		store.set([]);
		if (typeof window !== 'undefined') {
			localStorage.removeItem(storageName);
		}
	}

	// Remove one conversion by id
	function removeConversion(id: string) {
		store.update((conversions) => {
			const updated = conversions.filter((item) => item.id !== id);
			saveToStorage(updated);
			return updated;
		});
	}

	// Update conversion (e.g., change name)
	function updateConversion(id: string, updates: Partial<Conversion>) {
		store.update((conversions) => {
			const updated = conversions.map((item) =>
				item.id === id ? { ...item, ...updates } : item
			);
			saveToStorage(updated);
			return updated;
		});
	}

	return {
		subscribe: store.subscribe,
		addConversion,
		clearHistory,
		removeConversion,
		updateConversion,
		loadFromStorage
	};
}

export const conversionHistory = createConversionHistoryStore();
