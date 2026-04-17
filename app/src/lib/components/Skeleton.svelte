<script lang="ts">
	interface Props {
		class?: string;
		width?: string;
		height?: string;
		circle?: boolean;
	}

	let { class: className = '', width = 'w-full', height = 'h-4', circle = false }: Props = $props();
</script>

<div
	class="{className} {width} {height} {circle ? 'rounded-full' : 'rounded-lg'} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
></div>

<style>
	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}

	:global(.dark) .dark\:from-gray-800 {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	:global(.light) div,
	div {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
