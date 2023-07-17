"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required"
        }).nonempty("Please enter your email"),
        password: zod_1.z.string({
            required_error: "Password is required"
        }).nonempty("Please enter your password"),
    }),
});
exports.AuthValidation = {
    loginUserZodSchema
};
