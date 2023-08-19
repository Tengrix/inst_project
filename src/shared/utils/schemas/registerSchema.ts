import {z} from 'zod'

export const registerSchema = z
    .object({
        userName: z.string().trim().min(6, 'Username must be at least 6 characters long').max(30, 'Username can\'t be longer than 30 characters'),
        email: z.string().trim().nonempty('Enter email').email('Invalid email address'),
        password: z
            .string()
            .nonempty('Enter password')
            .min(6, 'Password must be at least 6 characters')
            .max(20,'Password can not be longer than 20 characters'),
        confirmPassword: z.string(),
        serviceAndPrivacy: z.boolean().optional(),
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