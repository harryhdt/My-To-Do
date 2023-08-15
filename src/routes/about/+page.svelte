<script lang="ts">
	import { goto } from '$app/navigation';
	import { Page, Navbar, Block, NavbarBackLink } from 'konsta/svelte';
	// @ts-ignore
	import { PageTransition } from 'sveltekit-page-transitions';
</script>

<svelte:head>
	<title>About | My To Do</title>
	<meta name="description" content="Simple To Do Application" />
</svelte:head>

<PageTransition>
	<Page>
		<Navbar title="About">
			<NavbarBackLink slot="left" text="Back" onClick={() => goto('/', { replaceState: true })} />
		</Navbar>
		<Block inset outline strong margin="!mt-4">
			Merupakan aplikasi sederhana yang dibuat untuk pembelajaran, menggunakan salah satu framework
			js yaitu "Capacitor".
		</Block>
	</Page>
</PageTransition>
