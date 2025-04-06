// Disable SSR for all Studio routes
export const ssr = false;

export function load({ params }) {
	// You can use params.allroutes if needed
	return {
		path: params.allroutes
	};
}
