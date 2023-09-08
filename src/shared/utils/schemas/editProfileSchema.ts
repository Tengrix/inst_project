import { z } from 'zod';

export const editProfileSchema = z.object({
    firstName: z.string({ required_error: 'Enter your first name' }).trim(),
    lastName: z.string({ required_error: 'Enter your last name' }).trim(),
    birthdayDate: z.date().nullish(),
    city: z.string().trim(),
    aboutMe: z.string().trim().max(500, 'error.descriptionValueMax').optional()
});
