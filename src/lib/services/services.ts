import type { NameValue } from '../models/types';
import { pb } from '../pocketbase';
import { serializeNonPOJOs, makeItValue } from '../utils/helpers';

export const getUserConfig = async (userId: string) => {
	const userConfig = await pb.collection('userConfig').getList(undefined, undefined, {
		filter: `user ="${userId}"`
	});

	const config = serializeNonPOJOs(userConfig);
	const prepAccounts: NameValue[] = [];
	const prepCategories: NameValue[] = [];

	if (config) {
		if (config?.items[0]?.accounts) {
			const accounts = config.items[0].accounts.split(',');
			for (const account of accounts) {
				prepAccounts.push({
					name: account.trim(),
					value: makeItValue(account)
				});
			}
		}

		if (config?.items[0]?.categories) {
			const categories = config.items[0].categories.split(',');
			for (const category of categories) {
				prepCategories.push({
					name: category.trim(),
					value: makeItValue(category)
				});
			}
		}

		return {
			accounts: prepAccounts,
			categories: prepCategories
		};
	}

	return null;
};

export const deleteTransaction = async (id: string) => {
	return await pb.collection('transactions').delete(id);
};
