import { Model, Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: String, required: true },
    cover_img: { type: String, required: true },
    reviews: [{ type: String }],
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

export const Book: Model<IBook> = model<IBook, BookModel>("Book", bookSchema);