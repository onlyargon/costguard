import { writable } from 'svelte/store';

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
export const categories = writable([
	{ name: 'Groceries', value: 'groceries' },
	{ name: 'Other', value: 'other' },
	{ name: 'Transfers', value: 'transfers' },
	{ name: 'Salary', value: 'salary' },
	{ name: 'Utility', value: 'utility' },
	{ name: 'Fuel', value: 'fuel' },
	{ name: 'Shopping', value: 'shopping' },
	{ name: 'Eating out', value: 'eating-out' },
	{ name: 'Travel', value: 'travel' },
	{ name: 'General', value: 'general' },
	{ name: 'Entertainment', value: 'entertainment' },
	{ name: 'Exercise', value: 'exercise' },
	{ name: 'Gifts', value: 'gifts' },
	{ name: 'Car payment', value: 'car-payment' },
	{ name: 'Loan repay', value: 'loan-repay' },
	{ name: 'Installment', value: 'installment' },
	{ name: 'Rent', value: 'rent' },
	{ name: 'Tax', value: 'tax' },
	{ name: 'Subscription', value: 'subscription' },
	{ name: 'Freelance', value: 'freelance' },
	{ name: 'Interest', value: 'interest' }
]);

export const accounts = writable([
	{ name: 'Sampath Bank', value: 'sampath-bank' },
	{ name: 'Seylan Bank', value: 'seylan-bank' },
	{ name: 'Frimi', value: 'frimi' },
	{ name: 'NDB Bank', value: 'ndb-bank' },
	{ name: 'NDB CC', value: 'ndb-cc' },
	{ name: 'Amex', value: 'amex' },
	{ name: 'Seylan CC', value: 'seylan-cc' },
	{ name: 'LB CIM', value: 'lb-cim' }
]);
