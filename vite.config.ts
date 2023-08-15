import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA, type SvelteKitPWAOptions } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

const PWAOptions: SvelteKitPWAOptions = {
	manifest: {
		theme_color: '#0e0e0e',
		icons: [
			{
				src: 'pwa-64x64.png',
				sizes: '64x64',
				type: 'image/png'
			},
			{
				src: 'pwa-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: 'pwa-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: 'maskable-icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	}
};

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA(PWAOptions)]
});
