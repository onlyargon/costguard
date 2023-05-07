<script lang="ts">
	import { User2 } from 'lucide-svelte';

	import CostGuard from '$lib/images/CostGuard.png';
	import Logo from '$lib/images/Logo.png';

	export let links: string[] = [];
	export let user: any;
</script>

<div class="navbar sm:py-4">
	<div class="flex-1">
		<a class="flex flex-row items-center gap-2" href="/home">
			<img class="h-10" src={Logo} alt="logo" srcset={Logo} />
			<img class="h-5" src={CostGuard} alt="name" srcset={CostGuard} />
		</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#each links as link}
				<li><a href="#/link">{link}</a></li>
			{/each}
			{#if user?.email}
				<div class="dropdown dropdown-end">
					<button tabindex="0" class="btn btn-circle btn-ghost">
						<User2 />
					</button>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
						<li><a href="/home">Settings</a></li>
						<form action="/logout" method="POST">
							<button type="submit" class="btn btn-ghost">Logout</button>
						</form>
					</ul>
				</div>
			{/if}
		</ul>
	</div>
</div>
