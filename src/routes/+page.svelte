<script lang="ts">
	import { goto } from '$app/navigation';
	import { Page, Navbar, Button, List, ListItem, Popover, Link, Checkbox } from 'konsta/svelte';
	// @ts-ignore
	import { PageTransition } from 'sveltekit-page-transitions';

	let popoverOpened = false;
	let popoverTargetEl: string | null = null;

	const openPopover = (targetEl: string) => {
		popoverTargetEl = targetEl;
		popoverOpened = true;
	};

	let tasks: {
		id: number;
		checked: boolean;
		text: string;
		created_at: string;
	}[] = JSON.parse(
		localStorage.getItem('tasks') ??
			JSON.stringify([
				{
					id: new Date().getTime(),
					checked: false,
					text: 'To DO',
					created_at: new Date().toLocaleDateString()
				}
			])
	);

	const addTask = () => {
		const id = new Date().getTime();
		tasks[tasks.length] = {
			id,
			checked: false,
			text: 'To DO',
			created_at: new Date().toLocaleDateString()
		};
		setTimeout(() => {
			const spanElement = document.querySelector(`#text-${id}`) as HTMLSpanElement;
			spanElement.focus(); // Focus the element
			// Select all text within the contenteditable element
			const selection = window.getSelection();
			if (selection) {
				selection.selectAllChildren(spanElement);
			}
		}, 100);
	};

	$: if (tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
</script>

<PageTransition>
	<Page>
		<Navbar title="My To Do" centerTitle={false}>
			<Button
				slot="right"
				class="popover-navbar-link active:bg-transparent"
				navbar
				clear
				aria-label="Menu"
				onClick={() => openPopover('.popover-navbar-link')}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Z"
					/></svg
				>
			</Button>
		</Navbar>
		<Popover
			opened={popoverOpened}
			target={popoverTargetEl}
			onBackdropClick={() => (popoverOpened = false)}
		>
			<List nested>
				<ListItem
					title="About App"
					link
					href="/about"
					data-sveltekit-replacestate
					onClick={() => {
						// goto('/about', { replaceState: true });
						popoverOpened = false;
					}}
				/>
				<ListItem
					title="Author"
					link
					href="https://harryhdt.dev"
					onClick={() => {
						// location.href = 'https://harryhdt.dev';
						popoverOpened = false;
					}}
				/>
			</List>
		</Popover>

		<div class="p-4 space-y-3">
			<List strong outline inset margin="!m-0" padding="!p-0">
				{#each tasks.sort( (a, b) => (a.checked === b.checked ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime() : a.checked ? -1 : 1) ) as data (data.id)}
					<ListItem label>
						<Checkbox
							slot="media"
							component="div"
							name={data.id}
							checked={data.checked}
							onChange={() => (data.checked = !data.checked)}
						/>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							contenteditable
							slot="title"
							id="text-{data.id}"
							bind:innerText={data.text}
							on:click|preventDefault|stopPropagation
							class="mr-auto outline-none cursor-text pr-2.5"
						/>
						<Button
							aria-label="RemoveTask"
							onClick={() => (tasks = tasks.filter((x) => x.id !== data.id))}
							slot="after"
							class="bg-red-600 active:bg-red-600/80"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								class="w-4 h-4"
								><path
									fill="currentColor"
									d="M8.5 4h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1h5ZM9 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V8Zm2.5-.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0V8a.5.5 0 0 0-.5-.5Z"
								/></svg
							>
						</Button>
					</ListItem>
				{:else}
					<ListItem>
						<span slot="title" class="opacity-50">No Task, Create one first 🙂</span>
					</ListItem>
				{/each}
			</List>
			<Button large aria-label="Add Task" onClick={addTask}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 12 12"
					class="w-5 h-5 mx-auto"
					><path
						fill="currentColor"
						d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75Z"
					/></svg
				>
			</Button>
		</div>
	</Page>
</PageTransition>
