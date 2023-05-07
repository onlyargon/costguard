import { currentUser, pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
	if (pb.authStore.isValid) {
		currentUser.set(pb.authStore.model);
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
		throw redirect(303, '/home');
	} else {
		throw redirect(303, '/login');
	}
});
