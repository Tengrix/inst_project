import {z} from 'zod'

export const createNewPasswordSchema = z
    .object({
        password: z
            .string()
            .trim()
            .nonempty('Enter password')
            .min(6, 'Password must be at least 6 characters')
            .max(20,'Password can not be longer than 20 characters'),
        confirmPassword: z.string().trim(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

// refine(async (username) => {
//             // Проверяем, есть ли пользователь с таким именем
//             const existingUser = await getUserByUsername(username);
//             if (existingUser) {
//                 throw new Error('This username is already taken');
//             }
//             return true;
//         })