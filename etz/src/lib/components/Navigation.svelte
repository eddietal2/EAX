<script lang="ts">
	import { page } from '$app/stores';

	const navItems = [
		{ href: '/', label: 'Home', icon: 'home' },
		{ href: '/market', label: 'Market', icon: 'chart' },
		{ href: '/history', label: 'History', icon: 'history' },
		{ href: '/settings', label: 'Settings', icon: 'settings' }
	];

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}
</script>

<!-- Desktop Top Navigation -->
<nav class="relative hidden md:flex items-center justify-center px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
	<a href="/" class="absolute left-6 text-xl font-bold text-emerald-600">Exchange.tz</a>
	<div class="flex items-center gap-8">
		{#each navItems as item}
			<a
				href={item.href}
				class="text-sm font-medium transition-colors {isActive(item.href, $page.url.pathname)
					? 'text-emerald-600'
					: 'text-gray-600 hover:text-emerald-600'}"
			>
				{item.label}
			</a>
		{/each}
	</div>
</nav>

<!-- Mobile Bottom Tab Bar -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" style="padding-bottom: max(0.25rem, env(safe-area-inset-bottom));">
	<div class="flex items-center justify-between px-1">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors {isActive(item.href, $page.url.pathname)
					? 'text-emerald-600'
					: 'text-gray-500 hover:text-gray-700'}"
			>
				{#if item.icon === 'home'}
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
				{:else if item.icon === 'chart'}
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
					</svg>
				{:else if item.icon === 'history'}
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				{:else if item.icon === 'settings'}
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				{/if}
				<span class="text-[0.65rem] font-semibold leading-tight">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>

<style>
	nav {
		will-change: transform;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	@media (max-width: 768px) {
		nav {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 50;
		}
	}
</style>

