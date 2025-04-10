// Disable SSR for all Studio routes
export const ssr = false; // Disable SSR

export function load({ params }: { params: { allroutes: string } }) {
	return {
		path: params.allroutes
	};
}