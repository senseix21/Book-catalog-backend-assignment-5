import { z } from "zod";

const createReviewZodSchema = z.object({
    body: z.object({
        review: z.string({
            required_error: "Review is required"
        })
    })
})

export const ReviewValidation = {
    createReviewZodSchema
}