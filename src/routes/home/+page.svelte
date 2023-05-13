<script lang="ts">
	import { Trash } from 'lucide-svelte';

	export let data;

	let transactions = [
		{
			type: 'income',
			category: 'salary',
			date: '2021-05-04',
			amount: 10000,
			remark: 'After tax salary'
		},
		{
			type: 'income',
			category: 'salary',
			date: '2023-05-06',
			amount: 5000,
			remark: 'After tax peg'
		},
		{
			type: 'expense',
			category: 'groceries',
			date: '2023-05-05',
			amount: 1000,
			remark: 'Keells'
		},
		{
			type: 'transfer',
			category: 'transfer',
			date: '2023-05-05',
			amount: 1000,
			remark: 'Bank'
		},
		{
			type: 'investment',
			category: 'investment',
			date: '2023-05-05',
			amount: 1000,
			remark: 'Sampath bank'
		}
	];

	// order transactions by date
	transactions.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);

		return dateA.getTime() - dateB.getTime();
	});
</script>

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
							class:text-success={item.type === 'income'}
							class:text-warning={item.type === 'transfer'}
							class:text-error={item.type === 'expense'}
							class:text-accent={item.type === 'investment'}>{item.type}</td
						>
						<td>{item.date}</td>
						<td class="capitalize">{item.category}</td>
						<td
							class="text-right"
							class:text-success={item.type === 'income'}
							class:text-warning={item.type === 'transfer'}
							class:text-error={item.type === 'expense'}
							class:text-accent={item.type === 'investment'}
						>
							{#if item.type === 'expense'}
								<span>-</span>
							{/if}
							{#if item.type === 'income'}
								<span>+</span>
							{/if}
							{item.amount.toFixed(2)}</td
						>
						<td class="capitalize">{item.remark}</td>
						<td>
							<button class="btn btn-ghost btn-circle">
								<Trash />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
