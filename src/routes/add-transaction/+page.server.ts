import { redirect, type Actions } from '@sveltejs/kit';
import { getUserConfig } from '$lib/services/services';

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
			toAccount: string;
			remark: string;
		};

		formData.user = locals?.user?.id ?? '';

		console.log(formData);
	}
};
