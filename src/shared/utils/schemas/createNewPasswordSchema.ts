import { z } from 'zod';

export const createNewPasswordSchema = z
    .object({
        password: z
            .string()
            .trim()
            .nonempty('Enter password')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password can not be longer than 20 characters'),
        confirmPassword: z.string().trim()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });
