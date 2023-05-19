import { redirect, type Actions } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import { settingsSchema } from '$lib/validationSchemas';

export const load = async ({ locals }) => {
	if (!locals?.user && !locals?.user?.email) {
		throw redirect(303, '/login');
	}

	const userConfig = await locals.pb.collection('userConfig').getList(undefined, undefined, {
		filter: `user ="${locals.user.id}"`
	});

	const config = serializeNonPOJOs(userConfig);

	return {
		config
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			accounts: string;
			categories: string;
			id: string;
			user: string;
		};

		formData.user = locals?.user?.id ?? '';

		try {
			settingsSchema.parse(formData);
			if (formData.id) {
				await locals.pb.collection('userConfig').update(formData.id, formData);
			} else {
				await locals.pb.collection('userConfig').create(formData);
			}

			return {
				data: formData,
				errors: []
			};
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			return {
				data: formData,
				errors
			};
		}
	}
};
