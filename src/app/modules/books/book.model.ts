import { Model, Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: String, required: true },
    reviews: [{ type: String }],
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

export const Book: Model<IBook> = model<IBook, BookModel>("Book", bookSchema);