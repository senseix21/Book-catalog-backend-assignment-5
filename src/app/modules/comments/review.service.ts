import { IBook } from "../books/book.interface";
import { Book } from "../books/book.model";
import { IReview } from "./review.interface";

//Create a new Review
const createReview = async (data: Partial<IReview>, id: string): Promise<IBook | null> => {
    await Book.updateOne(
        { _id: (id) },
        { $push: { reviews: data.review } }, { new: true }
    )
    const updatedData = await Book.findById(id);
    return updatedData;
};

//get all Reviews
const getReviews = async (id: string): Promise<IBook | null> => {
    const result = await Book.findById(id, { reviews: 1, _id: 0, });
    return result;
};

export const ReviewService = {
    createReview,
    getReviews
}