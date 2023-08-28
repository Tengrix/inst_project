/* import { z } from 'zod';

export const registerSchema = z
    .object({
        userName: z
            .string()
            .trim()
            .min(6, 'Username must be at least 6 characters long')
            .max(30, "Username can't be longer than 30 characters"),
        email: z.string().trim().nonempty('Enter email').email('Invalid email address'),
        password: z
            .string()
            .nonempty('Enter password')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password can not be longer than 20 characters'),
        confirmPassword: z.string(),
        serviceAndPrivacy: z.boolean().optional()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    }); */

import { z } from 'zod';

export const registerSchema = z
    .object({
        userName: z.string().trim().min(6, 'error.userNameMin').max(30, 'error.userNameMax'),
        email: z.string().trim().nonempty('error.emaileIsRequiredError').email('error.invalidEmailAddress'),
        password: z
            .string()
            .nonempty('error.passwordIsRequiredError')
            .min(6, 'error.passwordMin')
            .max(20, 'error.passwordMax'),
        confirmPassword: z.string(),
        serviceAndPrivacy: z.boolean().optional()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'error.passwordsDontMatch',
        path: ['confirmPassword']
    });
