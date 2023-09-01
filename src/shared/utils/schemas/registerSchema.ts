import { z } from 'zod';

export const registerSchema = z
    .object({
        userName: z.string().trim().min(6, 'error.userNameMin').max(30, 'error.userNameMax'),
        email: z
            .string()
            .trim()
            .nonempty('error.emailIsRequiredError')
            .email('error.invalidEmailAddress')
            .toLowerCase(),
        password: z
            .string()
            .nonempty('error.passwordIsRequiredError')
            .min(6, 'error.passwordMin')
            .max(20, 'error.passwordMax'),
        confirmPassword: z.string().nonempty('error.passwordIsRequiredError'),
        serviceAndPrivacy: z.literal<boolean>(true, {
            errorMap: () => ({ message: 'error.privacyConfirmation' })
        })
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'error.passwordsDontMatch',
        path: ['confirmPassword']
    });
