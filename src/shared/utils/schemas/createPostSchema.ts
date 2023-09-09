import { z } from 'zod';

export const createPostSchema = z.object({
    title: z
        .string({ required_error: 'error.descriptionIsRequiredError' })
        .trim()
        .min(8, 'error.titlePostValueMin')
        .max(30, 'error.titlePostValueMax'),
    description: z
        .string({ required_error: 'error.descriptionIsRequiredError' })
        .trim()
        .min(10, 'error.descriptionPostValueMin')
        .max(500, 'error.descriptionPostValueMax')
});

export type CreatePostFormType = z.infer<typeof createPostSchema>;
