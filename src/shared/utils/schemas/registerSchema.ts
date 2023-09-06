import { z } from 'zod';

export const registerSchema = z.object({
    userName: z
        .string({ required_error: 'error.userNameIsRequiredError' })
        .trim()
        .min(6, 'error.userNameMin')
        .max(30, 'error.userNameMax'),
    email: z
        .string({ required_error: 'error.emailIsRequiredError' })
        .trim()
        .email('error.invalidEmailAddress')
        .toLowerCase(),
    password: z
        .object({
            password: z
                .string({ required_error: 'error.passwordIsRequiredError' })
                .min(6, 'error.passwordMin')
                .max(20, 'error.passwordMax'),
            confirmPassword: z.string({ required_error: 'error.passwordIsRequiredError' })
        })
        .refine(({ password, confirmPassword }) => password === confirmPassword, {
            message: 'error.passwordsDontMatch',
            path: ['confirmPassword']
        }),
    serviceAndPrivacy: z.boolean().refine(Boolean)
});
// serviceAndPrivacy: z.literal<boolean>(true, {
//   errorMap: () => ({ message: 'error.privacyConfirmation' })
// })
// })
