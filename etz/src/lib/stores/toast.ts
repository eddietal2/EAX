import { writable } from 'svelte/store';

export interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
	duration?: number;
}

function createToastStore() {
	const store = writable<Toast[]>([]);

	function add(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
		const id = Math.random().toString(36);
		const toast: Toast = { id, message, type, duration };

		store.update((toasts) => [...toasts, toast]);

		if (duration) {
			setTimeout(() => remove(id), duration);
		}

		return id;
	}

	function remove(id: string) {
		store.update((toasts) => toasts.filter((t) => t.id !== id));
	}

	function success(message: string, duration = 3000) {
		return add(message, 'success', duration);
	}

	function error(message: string, duration = 3000) {
		return add(message, 'error', duration);
	}

	function info(message: string, duration = 3000) {
		return add(message, 'info', duration);
	}

	return {
		subscribe: store.subscribe,
		add,
		remove,
		success,
		error,
		info
	};
}

export const toastStore = createToastStore();
