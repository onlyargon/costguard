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
		<ul class="menu menu-horizontal px-1 items-center">
			{#each links as link}
				<li><a href="#/link">{link}</a></li>
			{/each}
			{#if user?.email}
				<div class="flex flex-row gap-4">
					<a class="btn btn-primary" href="/add-transaction"> Add transaction </a>
					<div class="dropdown dropdown-end">
						<button tabindex="0" class="btn btn-circle btn-ghost">
							<User2 />
						</button>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<div tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
							<a href="/settings">
								<button class="btn btn-ghost w-full" type="button"> Settings</button>
							</a>
							<form action="/logout" method="POST">
								<button type="submit" class="btn btn-ghost w-full">Logout</button>
							</form>
						</div>
					</div>
				</div>
			{/if}
		</ul>
	</div>
</div>
