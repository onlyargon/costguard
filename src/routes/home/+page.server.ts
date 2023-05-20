import { fail, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '../../lib/utils/helpers.js';
import { pb } from '../../lib/pocketbase.js';

export const load = async ({ locals }) => {
	if (!locals?.user && !locals?.user?.email) {
		throw redirect(303, '/login');
	}

	return {
		transactions: await deleteTransaction()
	};
};

export const actions = {
	async delete({ locals, request }) {
		const formData = Object.fromEntries(await request.formData()) as {
			id: string;
		};

		console.log(`Here the formData`, formData);
		try {
			await locals.pb.collection('transactions').delete(formData.id);
			return {
				status: 200,
				data: { transactions: await deleteTransaction() },
				errors: []
			};
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			return fail(400, {
				success: false,
				data: {},
				errors
			});
		}
	}
};

const deleteTransaction = async () => {
	const transactions = await pb.collection('transactions').getFullList({
		sort: '-created'
	});

	const result = serializeNonPOJOs(transactions);
	return result;
};
