import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals?.user && !locals?.user?.email) {
		throw redirect(303, '/login');
	}
};
