import { writable } from 'svelte/store';
import type { NameValue } from './models/types';

export const loading = writable<boolean>(false);
export function setLoading(state: boolean) {
	loading.set(state);
}

export const notifications = writable<string[]>([]);

export function toast(message: string) {
	notifications.update((state) => [message, ...state]);
	setTimeout(removeToast, 3000);
}

export function removeToast() {
	notifications.update((notifs) => {
		notifs.shift();
		return notifs;
	});
}

export const transactionTypes = writable([
	{ name: 'Income', value: 'income' },
	{ name: 'Expense', value: 'expense' },
	{ name: 'Transfer', value: 'transfer' },
	{ name: 'Investment', value: 'investment' },
	{ name: 'Savings', value: 'savings' }
]);

export const categories = writable<NameValue[]>([]);
export function setCategories(data: NameValue[]) {
	categories.set(data);
}

export const accounts = writable<NameValue[]>([]);
export function setAccounts(data: NameValue[]) {
	accounts.set(data);
}
