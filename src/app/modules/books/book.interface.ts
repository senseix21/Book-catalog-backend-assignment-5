import { Model } from "mongoose";

type IBook = {
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    reviews: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;