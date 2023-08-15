<script lang="ts">
	// @ts-ignore
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';
	import { App } from 'konsta/svelte';
	import { App as KonstaApp } from '@capacitor/app';
	import { TextZoom } from '@capacitor/text-zoom';
	import { StatusBar, Style } from '@capacitor/status-bar';
	import { Toast } from '@capacitor/toast';
	// @ts-ignore
	import { PageTransitionController, ios } from 'sveltekit-page-transitions';
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	if (Capacitor.isNativePlatform()) {
		let backButtonClicked = 0;
		let setTimeoutBackButton: any;
		KonstaApp.addListener('backButton', async ({ canGoBack }) => {
			// if (!canGoBack) {
			clearTimeout(setTimeoutBackButton);
			backButtonClicked += 1;
			setTimeoutBackButton = setTimeout(() => {
				backButtonClicked = 0;
			}, 2000);
			if (backButtonClicked < 2) {
				await Toast.show({
					text: 'Press back again for close app',
					duration: 'short'
				});
			}
			if (backButtonClicked === 2) {
				clearTimeout(setTimeoutBackButton);
				KonstaApp.exitApp();
			}
			// } else {
			// window.history.back();
			// }
		});

		TextZoom.set({
			value: 1
		});

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			StatusBar.setBackgroundColor({
				color: event.matches ? '#0e0e0e' : '#f7f7f8'
			});
			StatusBar.setStyle({
				style: window.matchMedia('(prefers-color-scheme: dark)').matches ? Style.Dark : Style.Light
			});
		});
		StatusBar.setBackgroundColor({
			color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0e0e0e' : '#f7f7f8'
		});
		StatusBar.setStyle({
			style: window.matchMedia('(prefers-color-scheme: dark)').matches ? Style.Dark : Style.Light
		});
	}

	onMount(async () => {
		if (pwaInfo) {
			// @ts-ignore
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r: any) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error: any) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	$: themeColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0e0e0e' : '#f7f7f8';
</script>

<svelte:head>
	{#if !Capacitor.isNativePlatform()}
		{@html webManifest}
		<meta name="theme-color" content={themeColor} />
	{/if}
</svelte:head>

<App theme="ios" safeAreas>
	<PageTransitionController transition={ios}>
		<slot />
	</PageTransitionController>
</App>

{#if !Capacitor.isNativePlatform()}
	{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt }}
		<ReloadPrompt />
	{/await}
{/if}
