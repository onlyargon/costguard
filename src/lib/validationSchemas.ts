import { zfd } from 'zod-form-data';
import * as z from 'zod';

export const loginSchema = zfd.formData({
	email: zfd.text(z.string().nonempty().email()),
	password: zfd.text(z.string().nonempty().min(8))
});

export const registerSchema = zfd
	.formData({
		email: zfd.text(z.string().nonempty().email()),
		password: zfd.text(z.string().nonempty().min(8)),
		passwordConfirm: zfd.text(z.string().nonempty().min(8))
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['passwordConfirm']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['password']
			});
		}
	});

export const settingsSchema = zfd.formData({
	accounts: zfd.text(z.string().nonempty()),
	categories: zfd.text(z.string().nonempty())
});

export const transactionSchema = zfd.formData({
	date: zfd.text(z.string().nonempty()),
	amount: zfd.text(z.string().nonempty()),
	category: zfd.text(z.string().nonempty()),
	account: zfd.text(z.string().nonempty()),
	transactionType: zfd.text(z.string().nonempty()),
	// toAccount: zfd.text(z.string()),
	remark: zfd.text(z.string().nonempty())
});
