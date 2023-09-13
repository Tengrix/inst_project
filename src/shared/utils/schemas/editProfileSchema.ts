import { z } from 'zod';

export const editProfileSchema = z.object({
    firstName: z
        .string({ required_error: 'Enter your first name' })
        .trim()
        .min(1, 'error.firstNameMin')
        .max(50, 'error.firstNameMax')
        .refine(firstname => /^[\p{L}]+$/u.test(firstname), 'error.invalidUsername'),
    lastName: z
        .string({ required_error: 'Enter your last name' })
        .trim()
        .min(1, 'error.lastNameMin')
        .max(50, 'error.lastNameMax')
        .refine(lastname => /^[\p{L}]+$/u.test(lastname), 'error.invalidUsername'),
    birthdayDate: z.date().nullish(),
    city: z.string().trim().optional(),
    aboutMe: z.string().trim().max(200, 'error.aboutMeValueMax').optional()
});
