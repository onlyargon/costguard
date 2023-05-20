<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import { setLoading, toast, transactionTypes } from '$lib/stores';
	import Select from '$lib/components/Select.svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	export let data;
	export let form;

	let selectedTransactionType = '';
	let ownAccount = false;

	let today = new Date().toISOString().split('T')[0];

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

<div class="max-w-3xl mx-auto min-h-screen">
	<div class="mt-10">
		<h1 class="text-2xl">Add Transaction</h1>
		<p class="text-sm text-gray-400">
			If you have transfer money from one account to another your own, select the transaction type
			as
			<code>Transfer</code> and select the toggle to <code>ON</code> to select the account to which you
			have transferred the money.
		</p>
	</div>
	<form class="flex flex-col sm:grid sm:grid-cols-2 gap-4 mt-10" method="post" use:enhance={saveFn}>
		<TextInput
			label="Date"
			name="date"
			type="date"
			placeholder="When did you make this transaction?"
			bind:value={today}
			errors={form?.errors?.date}
		/>
		<Select
			id="transactionType"
			label="Transaction Type"
			name="transactionType"
			options={$transactionTypes}
			bind:selected={selectedTransactionType}
			errors={form?.errors?.transactionType}
		/>
		<Select
			label="Account"
			name="account"
			options={data.configs?.accounts}
			errors={form?.errors?.account}
		/>
		{#if selectedTransactionType === 'transfer'}
			<div class="form-control">
				<label class="label cursor-pointer gap-4">
					<span class="label-text text-sm"
						>Own accounts transaction? (If yes, toggle the button on)</span
					>
					<input type="checkbox" name="ownAccount" class="toggle" bind:checked={ownAccount} />
				</label>
			</div>
			{#if ownAccount}
				<Select
					label="To Account"
					name="toAccount"
					options={data.configs?.accounts}
					errors={form?.errors?.toAccount}
				/>
			{/if}
		{/if}
		<TextInput
			label="Remark"
			name="remark"
			placeholder="Where did you shopped or for what made the payment?"
			errors={form?.errors?.remark}
		/>
		<TextInput
			type="number"
			label="Amount"
			name="amount"
			placeholder="How much?"
			errors={form?.errors?.amount}
		/>
		<Select
			label="Category"
			name="category"
			options={data.configs?.categories}
			errors={form?.errors?.category}
		/>
		<button class="btn btn-primary normal-case w-full"> Save </button>
	</form>
</div>
