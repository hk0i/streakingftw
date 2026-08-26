import { strings } from './strings';

const STORAGE_KEY = 'wintracker:locale';
export type Locale = 'en' | 'ja';

let locale = $state<Locale>('en'); // prerender-safe default; no navigator in Node

export function getLocale(): Locale {
	return locale;
}

export function setLocale(l: Locale) {
	locale = l;
	localStorage.setItem(STORAGE_KEY, l);
}

// call from onMount — browser-only, same guard pattern as tally.ts's loadSession()
export function initLocale() {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'en' || saved === 'ja') {
		locale = saved;
		return;
	}
	locale = navigator.language.startsWith('ja') ? 'ja' : 'en';
}

export function getT() {
	return strings[locale];
}
