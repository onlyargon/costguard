<script lang="ts">
	import { loading } from '$lib/stores';
</script>

{#if $loading}
	<div class="loading flex flex-col">
		<div class="indicator" />
		<p>Hang on...</p>
	</div>
{/if}

<style>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.indicator {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 5px solid #fff;
		border-top-color: #000;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
