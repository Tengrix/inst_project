import { z } from 'zod';

export const createPostSchema = z.object({
    description: z
        .string({ required_error: 'error.descriptionIsRequiredError' })
        .min(10, 'error.descriptionPostValueMin')
        .max(500, 'error.descriptionPostValueMax')
});

export type CreatePostFormType = z.infer<typeof createPostSchema>;
