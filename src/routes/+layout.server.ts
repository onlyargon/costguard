import { serializeNonPOJOs } from '$lib/utils/helpers.js';

export const load = ({ locals }) => {
	if (locals.user && locals.user.email) {
		return {
			user: serializeNonPOJOs(locals.user)
		};
	}
};
