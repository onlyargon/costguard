<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import { setLoading, toast } from '$lib/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { loginSchema } from '../../lib/validationSchemas.js';

	export let form;

	const loginFn: SubmitFunction = async () => {
		setLoading(true);
		return async ({ result }) => {
			if (result.status !== 200 && result.status !== 303) {
				setLoading(false);
				toast('Login failed! Please check your email and password.');
				return;
			}
			setLoading(false);
			await applyAction(result);
		};
	};
</script>

<div class="max-w-xl mx-auto h-screen grid place-content-center">
	<form class="flex flex-col gap-4 w-96" method="post" use:enhance={loginFn}>
		<TextInput
			label="Email"
			name="email"
			placeholder="someone@example.com"
			errors={form?.errors?.email}
		/>
		<TextInput
			label="Password"
			name="password"
			type="password"
			placeholder="•••••••••"
			errors={form?.errors?.password}
		/>
		<button class="btn btn-primary" type="submit">Login</button>

		<p class="text-center">
			Don't you have an account? <span
				><a class="link link-accent" href="/register">Register</a></span
			>
		</p>
	</form>
</div>
