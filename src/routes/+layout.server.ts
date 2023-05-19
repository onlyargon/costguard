import { serializeNonPOJOs } from '$lib/utils/helpers.js';

export const load = ({ locals }) => {
	if (locals.user && locals.user.id) {
		return {
			user: serializeNonPOJOs(locals.user)
		};
	}
};
