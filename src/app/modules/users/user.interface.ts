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
        email: string
    ): Promise<Pick<IUser, 'id' | 'password' | 'email' | 'userName'>>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & Model<IUser>; 