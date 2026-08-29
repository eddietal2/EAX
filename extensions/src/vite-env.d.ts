/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_EXCHANGERATE_API_KEY: string | undefined;
}

declare module '*.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}
