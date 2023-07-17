import { z } from "zod";

const loginUserZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).nonempty("Please enter your email"),
        password: z.string({
            required_error: "Password is required"
        }).nonempty("Please enter your password"),
    }),
});

export const AuthValidation = {
    loginUserZodSchema
}