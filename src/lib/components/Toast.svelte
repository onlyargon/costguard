<script lang="ts">
	import { fade } from 'svelte/transition';
	import { notifications } from '$lib/stores';
</script>

{#if $notifications}
	<div class="notifications">
		{#each $notifications as notification}
			<div class="max-w-lg w-full toast toast-top toast-center">
				<div class="alert" transition:fade>
					<div>
						<span>{notification}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
