import { z } from 'zod';

export const editProfileSchema = z.object({
    userName: z
        .string()
        .trim()
        .min(6, 'Username must be at least 6 characters long')
        .max(30, "Username can't be longer than 30 characters"),
    firstName: z.string().trim().nonempty('Enter your first name'),
    lastName: z.string().trim().nonempty('Enter your last name'),
    birthdayDate: z.date({ required_error: 'Please select your birthday' }),
    city: z.string().trim().nonempty('Enter your city'),
    aboutMe: z.string().trim().max(500, 'error.descriptionValueMax')
});
