import { writable, get } from 'svelte/store';
import en from './locales/en.json';
import sw from './locales/sw.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import zh from './locales/zh.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import de from './locales/de.json';
import es from './locales/es.json';
import af from './locales/af.json';

export type LanguageCode = 'en' | 'sw' | 'fr' | 'ar' | 'zh' | 'hi' | 'pt' | 'de' | 'es' | 'af';

export interface LanguageOption {
	code: LanguageCode;
	name: string;
	nativeName: string;
	flag: string;
}

export const languages: LanguageOption[] = [
	{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
	{ code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
	{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
	{ code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' }
];

const translations: Record<LanguageCode, any> = {
	en,
	sw,
	fr,
	ar,
	zh,
	hi,
	pt,
	de,
	es,
	af
};

const storageKey = 'appLanguage';

function isLanguageCode(value: string | null): value is LanguageCode {
	return !!value && value in translations;
}

function createLanguageStore() {
	const defaultLanguage: LanguageCode =
		typeof localStorage !== 'undefined' && isLanguageCode(localStorage.getItem(storageKey))
			? (localStorage.getItem(storageKey) as LanguageCode)
			: 'en';

	const { subscribe, set } = writable<LanguageCode>(defaultLanguage);

	return {
		subscribe,
		set: (lang: LanguageCode) => {
			if (typeof localStorage !== 'undefined') localStorage.setItem(storageKey, lang);
			set(lang);
		}
	};
}

export const currentLanguage = createLanguageStore();

export function getTranslation(key: string, lang?: LanguageCode): string {
	const translation = translations[lang ?? get(currentLanguage)] ?? translations.en;
	const keys = key.split('.');
	let result: any = translation;

	for (const k of keys) {
		result = result?.[k];
		if (result === undefined) return key;
	}

	return result || key;
}
