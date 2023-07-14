import { Model, ObjectId } from "mongoose";

export type IBook = {
    _id: ObjectId;
    title: string;
    author: string;
    genre: string;
    cover_img: string;
    publicationYear: string;
    reviews: string[];
};

export type IBookFilters = {
    searchTerm?: string;
    genre?: string;
    publicationYear?: string;
}

export type BookModel = Model<IBook, Record<string, unknown>>;