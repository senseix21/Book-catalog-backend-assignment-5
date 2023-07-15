import { Model, ObjectId, Types } from "mongoose";
import { IUser } from "../users/user.interface";

export type IBook = {
    _id: ObjectId;
    title: string;
    author: string;
    genre: string;
    cover_img: string;
    publicationYear: string;
    reviews: string[];
    admin: Types.ObjectId | IUser;
};

export type IBookFilters = {
    searchTerm?: string;
    genre?: string;
    publicationYear?: string;
}

export type BookModel = Model<IBook, Record<string, unknown>>;