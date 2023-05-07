<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { setLoading, toast } from '$lib/stores';
	import TextInput from '../../lib/components/TextInput.svelte';

	export let form;

	const registerFn: SubmitFunction = async () => {
		setLoading(true);
		return async ({ result }) => {
			if (result.status !== 200 && result.status !== 303) {
				setLoading(false);
				toast('Registration failed! Please try again later.');
				return;
			}
			setLoading(false);
			await applyAction(result);
		};
	};
</script>

<div class="max-w-xl mx-auto h-screen grid place-content-center">
	<form method="post" class="flex flex-col gap-2 w-full sm:w-96" use:enhance={registerFn}>
		<TextInput
			id="email"
			type="text"
			placeholder="john@example.com"
			name="email"
			label="Email"
			errors={form?.errors.email}
		/>

		<TextInput
			label="Password"
			type="password"
			name="password"
			id="password"
			placeholder="••••••••••••••"
			errors={form?.errors.password}
		/>
		<TextInput
			label="Confirm Password"
			type="password"
			name="passwordConfirm"
			id="confirmPassword"
			placeholder="••••••••••••••"
			errors={form?.errors.passwordConfirm}
		/>
		<button class="btn btn-primary" type="submit">Register</button>

		<p class="text-center">
			Don you have an account? <span><a class="link link-accent" href="/login">Login</a></span>
		</p>
	</form>
</div>
