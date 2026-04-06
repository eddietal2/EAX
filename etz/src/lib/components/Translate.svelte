<script lang="ts">
	import { currentLanguage, getTranslation } from '$lib/stores/i18n';

	interface Props {
		key: string;
	}

	let { key }: Props = $props();

	let text = $derived(getTranslation(key, $currentLanguage));
</script>

{text}
