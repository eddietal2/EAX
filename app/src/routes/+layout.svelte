<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Navigation from '$lib/components/Navigation.svelte';
	import Toast from '$lib/components/Toast.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
</svelte:head>

<div class="h-dvh bg-gray-50 dark:bg-gray-950 flex flex-col">
	<Navigation />
	<main class="flex-1 overflow-hidden pb-20 md:pb-0">
		{@render children()}
	</main>
	<Toast />
</div>

