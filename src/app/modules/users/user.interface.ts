import { Model } from "mongoose";

export type IUser = {
    userName: string;
    email: string;
    password: string;
}

export type userModel = Model<IUser, Record<string, unknown>>;