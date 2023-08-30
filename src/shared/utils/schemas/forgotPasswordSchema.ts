import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string().trim().nonempty('Enter email').email('error.invalidEmailAddress')
});
