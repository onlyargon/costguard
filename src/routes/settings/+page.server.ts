import { redirect, type Actions } from '@sveltejs/kit';
import { makeItValue, serializeNonPOJOs } from '$lib/utils/helpers';
import { settingsSchema } from '$lib/validationSchemas';
import type { NameValue } from '$lib/models/types';
import { setAccounts, setCategories } from '$lib/stores';

export const load = async ({ locals }) => {
	if (!locals?.user && !locals?.user?.email) {
		throw redirect(303, '/login');
	}

	const userConfig = await locals.pb.collection('userConfig').getList(undefined, undefined, {
		filter: `user ="${locals.user.id}"`
	});

	const config = serializeNonPOJOs(userConfig);

	if (config) {
		if (config?.items[0]?.accounts) {
			const prepAccounts: NameValue[] = [];
			const accounts = config.items[0].accounts.split(',');
			for (const account of accounts) {
				prepAccounts.push({
					name: account.trim(),
					value: makeItValue(account)
				});
			}

			setAccounts(prepAccounts);
		}

		if (config?.items[0]?.categories) {
			const prepCategories: NameValue[] = [];
			const categories = config.items[0].categories.split(',');
			for (const category of categories) {
				prepCategories.push({
					name: category.trim(),
					value: makeItValue(category)
				});
			}

			setCategories(prepCategories);
		}
	}

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
				return {
					data: formData,
					errors: []
				};
			} else {
				await locals.pb.collection('userConfig').create(formData);
			}
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			return {
				data: formData,
				errors
			};
		}
	}
};
