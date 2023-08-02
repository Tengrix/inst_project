import {z} from 'zod'

export const loginSchema = z
    .object({
        userName: z.string().trim().min(6, 'Username must be at least 6 characters long').max(30, 'Username can\'t be longer than 30 characters'),
        password: z
            .string()
            .trim()
            .nonempty('Enter password')
            .min(8, 'Password must be at least 8 characters'),
    })

// refine(async (username) => {
//             // Проверяем, есть ли пользователь с таким именем
//             const existingUser = await getUserByUsername(username);
//             if (existingUser) {
//                 throw new Error('This username is already taken');
//             }
//             return true;
//         })