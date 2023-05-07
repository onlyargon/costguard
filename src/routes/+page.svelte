<script lang="ts">
	import CostGuard from '$lib/images/CostGuard.png';
</script>

<section class="flex flex-col items-center justify-center gap-4">
	<h1 class="text-4xl font-bold text-center">
		Welcome to <span>
			<img src={CostGuard} alt="" />
		</span>
	</h1>
	<a href="/login" class="link link-accent">Log into continue</a>
</section>

<style>
	section {
		min-height: calc(100vh - 5rem);
	}
</style>
