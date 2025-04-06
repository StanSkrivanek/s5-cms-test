<script lang="ts">
	import { onMount } from 'svelte';
	// import config from './sanity.config';
	
	/**
	 * @type {HTMLDivElement}
	 */
	let studioRoot: HTMLDivElement;
	//  let Studio: any;

	onMount(() => {
		// Dynamically import to avoid SSR issues
		let cleanupFunction: (() => void) | undefined;
		
		Promise.all([
			import('sanity'),
			import('./sanity.config')
		]).then(([{ renderStudio }, { default: config }]) => {
			if (studioRoot) {
				// Use renderStudio instead of React's createRoot
				cleanupFunction = renderStudio(studioRoot, config);
			}
		});

		// Return cleanup function for when component is destroyed
		return () => {
			if (cleanupFunction) cleanupFunction();
		};
	});
</script>

<div bind:this={studioRoot} style="height: 100vh;"></div>
