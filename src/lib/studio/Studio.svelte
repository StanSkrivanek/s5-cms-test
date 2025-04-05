<script lang="ts">
	import { renderStudio } from 'sanity';
	import { onMount } from 'svelte';
	import config from './sanity.config';

	/**
	 * @type {HTMLDivElement}
	 */
	let studioRoot: HTMLDivElement;

	onMount(() => {
		if (studioRoot) {
			// Use renderStudio instead of React's createRoot
			const cleanupFn = renderStudio(studioRoot, config);

			// Return cleanup function for when component is destroyed
			return () => {
				cleanupFn();
			};
		}
	});
</script>

<div bind:this={studioRoot} style="height: 100vh;"></div>
