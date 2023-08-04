import {z} from 'zod'

export const loginSchema = z
    .object({
        userName: z
            .string({required_error: 'error.userNameIsRequiredError'})
            .trim()
            .min(6, 'error.userNameMin')
            .max(30, 'error.userNameMax')
            // Username should contain only letters, numbers, underscores, and dash
            .refine(username => /^[\w\d-]+$/.test(username), 'error.invalidUsername'),
        password: z
            .string({required_error: 'error.passwordIsRequiredError'})
            .trim()
            .min(6, 'error.passwordMin')
            .max(20, 'error.passwordMax'),
    })

// refine(async (username) => {
//             // Проверяем, есть ли пользователь с таким именем
//             const existingUser = await getUserByUsername(username);
//             if (existingUser) {
//                 throw new Error('This username is already taken');
//             }
//             return true;
//         })