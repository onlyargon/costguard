import { redirect, type Actions, fail } from '@sveltejs/kit';
import { getUserConfig } from '$lib/services/services';
import { transactionSchema } from '$lib/validationSchemas';

export const load = async ({ locals }) => {
	if (!locals?.user && !locals?.user?.email) {
		throw redirect(303, '/login');
	}

	const configs = await getUserConfig(locals.user.id);

	return {
		configs
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			date: string;
			amount: string;
			category: string;
			account: string;
			user: string;
			transactionType: string;
			toAccount?: string;
			remark: string;
		};

		formData.user = locals?.user?.id ?? '';

		try {
			transactionSchema.parse(formData);
			await locals.pb.collection('transactions').create(formData);

			return {
				status: 200,
				errors: []
			};
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			return fail(400, {
				success: false,
				data: formData,
				errors
			});
		}
	}
};
