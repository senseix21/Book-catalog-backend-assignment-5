import { Model, ObjectId } from "mongoose";

export type IBook = {
    _id: ObjectId;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;