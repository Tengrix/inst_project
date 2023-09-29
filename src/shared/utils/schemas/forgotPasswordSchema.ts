import { z } from 'zod';

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
export const forgotPasswordSchema = z.object({
    email: z.string().trim().nonempty('Enter email').email('error.invalidEmailAddress').toLowerCase()
});
