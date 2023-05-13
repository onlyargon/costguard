import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginSchema } from '$lib/validationSchemas';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			loginSchema.parse(formData);
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			return {
				data: formData,
				errors
			};
		}

		throw redirect(303, '/home');
	}
};
