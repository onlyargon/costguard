<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { Trash } from 'lucide-svelte';
	import moment from 'moment';
	import { setLoading, toast } from '../../lib/stores.js';

	export let data;

	let transactions = data.transactions;

	// order transactions by date
	// transactions.sort((a: any, b: any) => {
	// 	const dateA = new Date(a.date);
	// 	const dateB = new Date(b.date);

	// 	return dateA.getTime() - dateB.getTime();
	// });

	const deleteFn: SubmitFunction = async () => {
		setLoading(true);
		return async ({ result }) => {
			if (result.status !== 200 && result.status !== 303) {
				setLoading(false);
				toast('Something went wrong! Please try again later.');
				return;
			}
			setLoading(false);
			toast('Record deleted!');
			await applyAction(result);
		};
	};
</script>

<div class="min-h-screen">
	<div class="flex flex-row items-center my-10">
		<div class="flex-1">
			<p>Hello! 👋🏻, {data?.user?.email}</p>
		</div>
	</div>

	<div>
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<!-- head -->
				<thead>
					<tr>
						<th />
						<th>Type</th>
						<th>Date</th>
						<th>Category</th>
						<th class="text-right">Amount</th>
						<th>Remakr</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each transactions as item, i}
						<tr>
							<th>{i + 1}</th>
							<td
								class="capitalize"
								class:text-success={item.transactionType === 'income'}
								class:text-warning={item.transactionType === 'transfer'}
								class:text-error={item.transactionType === 'expense'}
								class:text-accent={item.transactionType === 'investment'}>{item.transactionType}</td
							>
							<td>{moment(item.date).format('DD MMM YYYY')}</td>
							<td class="capitalize">{item.category}</td>
							<td
								class="text-right"
								class:text-success={item.transactionType === 'income'}
								class:text-warning={item.transactionType === 'transfer'}
								class:text-error={item.transactionType === 'expense'}
								class:text-accent={item.transactionType === 'investment'}
							>
								{#if item.transactionType === 'expense'}
									<span>-</span>
								{/if}
								{#if item.transactionType === 'income'}
									<span>+</span>
								{/if}
								{item.amount.toFixed(2)}</td
							>
							<td class="capitalize">{item.remark}</td>
							<td>
								<form action="?/delete" method="post" use:enhance={deleteFn}>
									<input type="text" name="id" bind:value={item.id} hidden />
									<button class="btn btn-ghost btn-circle">
										<Trash />
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
