/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IUser = {
    id: string;
    userName: string;
    email: string;
    password: string;
}

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<Pick<IUser, 'id' | 'password'>>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & Model<IUser>; 