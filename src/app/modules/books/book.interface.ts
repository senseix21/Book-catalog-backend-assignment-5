import { Model } from "mongoose";

export type IBook = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;