import {z} from 'zod'

export const createPostSchema = z
    .object({
        title:z
        .string({required_error: 'error.descriptionIsRequiredError'})
            .trim()
            .min(8, 'error.titleValueMin')
            .max(30, 'error.titleValueMax'),
        description: z
            .string({required_error: 'error.descriptionIsRequiredError'})
            .trim()
            .min(10, 'error.descriptionValueMin')
            .max(500, 'error.descriptionValueMax')
          
    })

export type CreatePostFormType = z.infer<typeof createPostSchema>
