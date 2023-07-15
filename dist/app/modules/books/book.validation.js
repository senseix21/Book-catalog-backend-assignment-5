"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }),
        author: zod_1.z.string({
            required_error: "Author is required"
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required"
        }),
        publicationYear: zod_1.z.string({
            required_error: "Publication date is required"
        }),
        cover_img: zod_1.z.string({
            required_error: "Cover image is required"
        })
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }).nonempty("Title is required").optional(),
        author: zod_1.z.string({
            required_error: "Author is required"
        }).nonempty("Author is required").optional(),
        genre: zod_1.z.string({
            required_error: "Genre is required"
        }).nonempty("Genre is required").optional(),
        publicationYear: zod_1.z.string({
            required_error: "Publication date is required"
        }).nonempty("Date is required").optional(),
        cover_img: zod_1.z.string({
            required_error: "Cover image is required"
        }).nonempty("Cover image is required").optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema
};
