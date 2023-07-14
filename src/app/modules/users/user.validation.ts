import { z } from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        userName: z.string({
            required_error: 'Username is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        }),
    }),
});

export const UserValidation = {
    createUserZodSchema
}