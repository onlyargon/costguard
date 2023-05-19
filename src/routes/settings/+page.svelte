<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import { setLoading, toast } from '$lib/stores.js';

	export let data;

	let accounts = '';
	let categories = '';
	let id = '';

	if (data?.config?.items.length > 0) {
		accounts = data.config.items[0].accounts;
		categories = data.config.items[0].categories;
		id = data.config.items[0].id;
	}

	const saveFn: SubmitFunction = async () => {
		setLoading(true);
		return async ({ result }) => {
			if (result.status !== 200 && result.status !== 303) {
				setLoading(false);
				toast('Something went wrong! Please try again later.');
				return;
			}
			setLoading(false);
			toast('Settings saved successfully!');
			await applyAction(result);
		};
	};
</script>

<section class="min-h-screen max-w-3xl mx-auto">
	<h1 class="text-2xl mt-10">Set up your accounts and categories</h1>
	<p class="text-sm text-gray-400">
		Enter your accounts and categories in respective field with comma (,) separated
	</p>

	<form class="mt-10 gap-4" method="post" use:enhance={saveFn}>
		<input hidden type="text" name="id" bind:value={id} />
		<TextInput
			label="Accounts"
			name="accounts"
			type="text"
			placeholder="Your accounts"
			bind:value={accounts}
		/>
		<TextArea
			label="Categories"
			name="categories"
			type="text"
			placeholder="Your categories"
			bind:value={categories}
		/>
		<button class="btn btn-primary normal-case w-1/4"> Save </button>
	</form>
</section>
