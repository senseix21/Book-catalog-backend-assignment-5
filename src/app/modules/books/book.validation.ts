import { z } from "zod";

const createBookZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        author: z.string({
            required_error: "Author is required"
        }),
        genre: z.string({
            required_error: "Genre is required"
        }),
        publicationYear: z.string({
            required_error: "Publication date is required"
        }),
        cover_img: z.string({
            required_error: "Cover image is required"
        })
    }),
});

const updateBookZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }).nonempty("Title is required").optional(),
        author: z.string({
            required_error: "Author is required"
        }).nonempty("Author is required").optional(),
        genre: z.string({
            required_error: "Genre is required"
        }).nonempty("Genre is required").optional(),
        publicationYear: z.string({
            required_error: "Publication date is required"
        }).nonempty("Date is required").optional(),
        cover_img: z.string({
            required_error: "Cover image is required"
        }).nonempty("Cover image is required").optional(),
    }),
});

export const BookValidation = {
    createBookZodSchema,
    updateBookZodSchema
};
