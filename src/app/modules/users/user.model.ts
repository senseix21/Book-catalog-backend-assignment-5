/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../../config";

const UserSchema = new Schema<IUser>({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        }
    },

);


UserSchema.statics.isUserExist = async function (email: string):
    Promise<Pick<IUser, 'id' | 'email' | 'password' | 'userName'>> {
    return await this.findOne(
        { email },
        { email: 1, password: 1, id: 1, userName: 1 }
    )
};


UserSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing user password
UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bycrypt_salt_rounds)
    );
    next();
});

export const User = model<IUser, UserModel>("User", UserSchema);