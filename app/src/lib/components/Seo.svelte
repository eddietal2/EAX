<script lang="ts">
	// Centralized SEO meta component: title, description, canonical URL, Open
	// Graph, Twitter Card, and optional JSON-LD structured data for a route.
	const SITE_URL = 'https://simbafx.vercel.app';

	interface Props {
		title: string;
		description: string;
		path: string;
		type?: string;
		image?: string;
		robots?: string;
		jsonLd?: object | object[];
	}

	let {
		title,
		description,
		path,
		type = 'website',
		image = '/icons/icon128.png',
		robots = 'index, follow',
		jsonLd
	}: Props = $props();

	const canonical = $derived(`${SITE_URL}${path === '/' ? '' : path}`);
	const absoluteImage = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="SimbaFX" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={absoluteImage} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />

	{#if jsonLd}
		<script type="application/ld+json">
			{JSON.stringify(jsonLd)}
		</script>
	{/if}
</svelte:head>
