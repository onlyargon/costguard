<script lang="ts">
	export let id: string = '';
	export let label: string = '';
	export let name: string = '';
	export let type: 'text' | 'password' | 'number' | 'checkbox' | 'date' = 'text';
	export let placeholder: string = '';
	export let errors: string = '';
	export let required: boolean = false;
	export let readonly: boolean = false;
	export let value = '';
</script>

<div class="form-control w-full">
	<label for={id} class="label">
		<span class="label-text">{label}</span>
	</label>
	<textarea
		{id}
		{name}
		{type}
		{placeholder}
		{required}
		{readonly}
		{value}
		rows="3"
		class="input {errors ? 'input-error' : 'input-bordered'} w-full p-2"
	/>
	<label for={id} class="label">
		<span class="label-text-alt text-error">{errors ?? ''}</span>
	</label>
</div>
