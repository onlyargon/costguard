import { redirect } from '@sveltejs/kit';

import { makeItValue, serializeNonPOJOs } from '$lib/utils/helpers';
import type { NameValue } from '$lib/models/types';
import { setAccounts, setCategories } from '$lib/stores';

export const load = async ({ locals }) => {
	if (!locals?.user && !locals?.user?.email) {
		throw redirect(303, '/login');
	}

	const userConfig = await locals.pb.collection('userConfig').getList(undefined, undefined, {
		filter: `user ="${locals?.user?.id}"`
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
};
