<script lang="ts">
	import { onMount } from 'svelte';

	// Add this type declaration at the file top level (not indented)
	declare global {
		interface Window {
			_OriginalWebSocket?: typeof WebSocket;
		}
	}

	// Correct type annotation for studioRoot
	let studioRoot: HTMLDivElement;
	let isLoading = $state(true);
	let loadError = $state<Error | null>(null);
	let connectionAttempts = $state(0);
	let maxAttempts = 3;
	let cleanupFunction: (() => void) | undefined;

	// Add a flag to track successful connections
	let hasSuccessfulConnection = $state(false);

	// Store reference to event handler for proper cleanup
	let handleWSError: (event: ErrorEvent) => void;

	// Monitor WebSocket connections
	function monitorWebSockets() {
		// Store original WebSocket constructor
		const OriginalWebSocket = window.WebSocket;

		// Create a proxy for the WebSocket constructor
		window.WebSocket = function (url: string | URL, protocols?: string | string[]) {
			// Create the actual WebSocket
			const socket = new OriginalWebSocket(url, protocols);

			// Only monitor Sanity WebSockets
			if (typeof url === 'string' && url.includes('sanity.io')) {
				console.log(
					`%c[WebSocket] Connecting to: ${url}`,
					'color: orange; font-size: 8px; background: #fff5e6; padding: 4px; border-radius: 4px'
				);

				// Log connection events
				socket.addEventListener('open', () => {
					console.log(
						`%c[WebSocket] ✅ CONNECTION SUCCESSFUL to ${url}`,
						'color: green; background: #e6ffe6; padding: 4px;  font-size: 8px; border-radius: 4px'
					);

					// Mark as successful and reset attempts counter if needed
					hasSuccessfulConnection = true;
					if (connectionAttempts > 1) {
						console.log(
							`%c[Studio] Connection successful after ${connectionAttempts} attempts, resetting counter`,
							'color: green; background: #e6ffe6; padding: 4px; font-size: 8px; border-radius: 4px'
						);
						// We don't reset connectionAttempts here directly because that would
						// cause a visual flicker in the UI. Instead, we'll ignore it in the error handling.
					}
				});

				socket.addEventListener('error', () => {
					console.log(
						`%c[WebSocket] ❌ CONNECTION ERROR to ${url}`,
						'color: white; background: #ff6666; padding: 4px; font-size: 8px; border-radius: 4px'
					);
				});

				socket.addEventListener('close', (event: CloseEvent) => {
					const reason = event.reason ? ` Reason: ${event.reason}` : '';
					const clean = event.wasClean ? 'clean' : 'unclean';
					console.log(
						`%c[WebSocket] ⚠️ CONNECTION CLOSED (${clean}) Code: ${event.code}${reason}`,
						'color: orange; background: #fff5e6; padding: 4px; font-weight: bold; font-size: 8px; border-radius: 4px'
					);

					// If we get a 1006 error but already had a successful connection, don't trigger reconnect
					if (event.code === 1006 && !event.wasClean && !hasSuccessfulConnection) {
						console.log(
							`%c[WebSocket] Abnormal closure detected, may need reconnect`,
							'color: orange; background: #fff5e6; padding: 4px; font-size: 8px; border-radius: 4px'
						);
					}
				});
			}

			return socket;
		} as any;

		// Preserve the prototype chain
		window.WebSocket.prototype = OriginalWebSocket.prototype;

		// Store original to restore later
		window._OriginalWebSocket = OriginalWebSocket;
	}

	// Function to handle loading the studio with retry capability
	const loadStudio = async () => {
		try {
			isLoading = true;
			loadError = null;
			hasSuccessfulConnection = false; // Reset at the beginning of each attempt
			connectionAttempts++;

			// Set up WebSocket monitoring for better debugging
			if (typeof window !== 'undefined' && !window._OriginalWebSocket) {
				monitorWebSockets();
			}

			// Pre-load both modules before rendering to reduce timing issues
			const [{ renderStudio }, { default: config }] = await Promise.all([
				import('sanity'),
				import('./sanity.config')
			]);

			// Ensure config has proper WebSocket settings
			if (!config.websocketOptions) {
				config.websocketOptions = {
					reconnect: {
						initialDelay: 100,
						maxDelay: 2000,
						maxAttempts: 5
					}
				};
			}

			if (studioRoot) {
				// Small delay before rendering to ensure DOM is fully ready
				await new Promise((resolve) => setTimeout(resolve, 100));

				// Clean up previous instance if it exists
				if (cleanupFunction) {
					cleanupFunction();
				}

				// Add global error handler to suppress original error messages
				const globalErrorHandler = (event: ErrorEvent) => {
					// Check if it's a Sanity-related error
					if (
						event.message?.includes('sanity.io') ||
						event.message?.includes('WebSocket') ||
						event.filename?.includes('sanity')
					) {
						// Prevent the default browser error handling
						event.preventDefault();
						event.stopPropagation();

						// Log to console in a controlled way instead
						console.log(
							`%c[Studio] Intercepted error: ${event.message}`,
							'color: orange; background: #fff5e6; padding: 4px; border-radius: 4px'
						);
						return false;
					}
				};

				// Add the error handler
				window.addEventListener('error', globalErrorHandler, true);

				// Store reference to remove it later
				const errorHandlerRef = globalErrorHandler;

				// Log studio initialization
				console.log(
					`%c[Studio] Rendering Sanity Studio (attempt ${connectionAttempts}/${maxAttempts})`,
					'color: blue; background: #e6f7ff; padding: 4px; border-radius: 4px; font-size: 8px'
				);

				// Render studio and capture cleanup function
				cleanupFunction = renderStudio(studioRoot, config);

				// Define and add event listener for WebSocket errors
				handleWSError = (event: ErrorEvent) => {
					// Check if it's a Sanity WebSocket error AND we haven't already had a successful connection
					if (
						event.message?.includes('WebSocket') &&
						event.message?.includes('sanity.io') &&
						connectionAttempts < maxAttempts &&
						!hasSuccessfulConnection // Don't retry if we already have a successful connection
					) {
						// Prevent default error handling
						event.preventDefault();
						event.stopPropagation();

						console.log(
							`%c[Studio] WebSocket error detected, retrying (${connectionAttempts}/${maxAttempts})`,
							'color: red; font-size: 8px; background: #ffe6e6; padding: 4px; border-radius: 4px'
						);

						// Clean up and retry
						if (cleanupFunction) {
							cleanupFunction();
							cleanupFunction = undefined;
						}

						// Remove the global error handler during retry
						window.removeEventListener('error', errorHandlerRef, true);

						// Retry after a delay
						setTimeout(() => {
							loadStudio();
						}, 800);

						return false;
					}
				};

				window.addEventListener('error', handleWSError, true);

				// Update cleanup function to also remove the global error handler
				const originalCleanup = cleanupFunction;
				cleanupFunction = () => {
					if (originalCleanup) originalCleanup();
					window.removeEventListener('error', errorHandlerRef, true);
					window.removeEventListener('error', handleWSError, true);
				};

				isLoading = false;
			}
		} catch (error) {
			console.error('Error loading Sanity Studio:', error);
			loadError = error instanceof Error ? error : new Error(String(error));
			isLoading = false;

			// Retry on error if we haven't exceeded max attempts
			if (connectionAttempts < maxAttempts) {
				setTimeout(() => {
					loadStudio();
				}, 1000);
			}
		}
	};

	onMount(() => {
		// Start loading the studio
		loadStudio();

		return () => {
			if (cleanupFunction) cleanupFunction();

			// Restore original WebSocket if we patched it
			if (typeof window !== 'undefined' && window._OriginalWebSocket) {
				window.WebSocket = window._OriginalWebSocket;
				delete window._OriginalWebSocket;
			}

			// Properly remove the event listener with a reference to the handler
			if (handleWSError) {
				window.removeEventListener('error', handleWSError, true);
			}
		};
	});
</script>

{#if isLoading}
	<div class="studio-loading">
		<p>Loading Sanity Studio...</p>
		{#if connectionAttempts > 1}
			<p>Connection attempt {connectionAttempts}/3</p>
		{/if}
	</div>
{:else if loadError}
	<div class="studio-error">
		<h2>Error loading Sanity Studio</h2>
		<p>{loadError.message}</p>
		<button onclick={() => loadStudio()}>Retry</button>
	</div>
{/if}

<div bind:this={studioRoot} style="height: 100vh;"></div>

<style>
	.studio-loading,
	.studio-error {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: white;
		z-index: 1000;
	}

	.studio-error {
		color: #e53e3e;
	}

	.studio-error button {
		margin-top: 16px;
		padding: 8px 16px;
		background: #2563eb;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.studio-error button:hover {
		background: #1d4ed8;
	}
</style>
