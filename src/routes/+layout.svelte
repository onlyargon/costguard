<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Toast from '$lib/components/Toast.svelte';

	export let data;

	let links: string[] = [];
</script>

<Toast />

<div class="max-w-7xl mx-auto p-4 sm:px-0 sm:py-0 ">
	<Navbar {links} user={data.user} />
	<slot />
</div>
<Loading />
