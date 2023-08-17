import {z} from 'zod'

export const createPostSchema = z
    .object({
        description: z
            .string({required_error: 'error.descriptionIsRequiredError'})
            .trim()
            .min(10, 'error.descriptionValueMin')
            .max(100, 'error.descriptionValueMax')
          
    })

export type CreatePostFormType = z.infer<typeof createPostSchema>
