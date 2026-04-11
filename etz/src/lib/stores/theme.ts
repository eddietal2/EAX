import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
	// Detect OS preference
	const getSystemTheme = (): 'light' | 'dark' => {
		if (!browser) return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	// Get initial theme from localStorage or system
	const getInitialTheme = (): Theme => {
		if (!browser) return 'system';
		const stored = localStorage.getItem('appTheme') as Theme;
		if (stored) return stored;
		return 'system';
	};

	const { subscribe, set } = writable<Theme>(getInitialTheme());

	// Apply theme to DOM - must be synchronous and immediate
	const applyTheme = (theme: Theme) => {
		if (!browser) return;

		const htmlElement = document.documentElement;
		const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

		// Remove both classes first to ensure clean state
		htmlElement.classList.remove('dark');
		htmlElement.classList.remove('light');

		// Add the appropriate class
		if (resolvedTheme === 'dark') {
			htmlElement.classList.add('dark');
			document.body.style.backgroundColor = '#030712';
		} else {
			htmlElement.classList.add('light');
			document.body.style.backgroundColor = '#ffffff';
		}

		// Update theme-color meta tags for mobile browser chrome
		const themeColorMetas = document.querySelectorAll('meta[name="theme-color"]');
		themeColorMetas.forEach(meta => meta.remove());
		const metaTheme = document.createElement('meta');
		metaTheme.name = 'theme-color';
		metaTheme.content = resolvedTheme === 'dark' ? '#030712' : '#ffffff';
		document.head.appendChild(metaTheme);

		// Force a DOM repaint
		void htmlElement.offsetHeight;

		localStorage.setItem('appTheme', theme);
	};

	// Initialize theme on store creation
	if (browser) {
		applyTheme(getInitialTheme());
	}

	// Listen for system theme changes
	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			const stored = localStorage.getItem('appTheme') as Theme;
			if (stored === 'system') {
				applyTheme('system');
			}
		});
	}

	return {
		subscribe,
		setTheme: (theme: Theme) => {
			// Must apply theme BEFORE updating store to ensure DOM is ready
			applyTheme(theme);
			set(theme);
		},
		getSystemTheme
	};
}

export const themeStore = createThemeStore();
