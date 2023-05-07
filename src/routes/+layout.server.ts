import { serializeNonPOJOs } from '$lib/utils/helpers.js';

export const load = ({ locals }) => {
	if (locals.user && locals.user.email) {
		console.log('user', locals.user);
		return {
			user: serializeNonPOJOs(locals.user)
		};
	}
};
