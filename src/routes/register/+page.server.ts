import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { registerSchema } from '../../lib/validationSchemas';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
			passwordConfirm: string;
		};

		try {
			registerSchema.parse(formData);
			await locals.pb.collection('users').create(formData);
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			const { password, passwordConfirm, ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		throw redirect(303, '/login');
	}
};
