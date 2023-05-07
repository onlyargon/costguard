<script lang="ts">
	export let id: string = '';
	export let label: string = '';
	export let name: string = '';
	export let errors: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let options: any[] = [];
	export let selected: string = '';
</script>

<div class="form-control w-full">
	<label for={id} class="label">
		<span class="label-text">{label}</span>
	</label>
	<select bind:value={selected} {id} {name} class="select select-bordered" {required} {disabled}>
		<option value="" disabled selected>Select your option</option>
		{#each options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
	<label for={id} class="label">
		<span class="label-text-alt">{errors}</span>
	</label>
</div>
