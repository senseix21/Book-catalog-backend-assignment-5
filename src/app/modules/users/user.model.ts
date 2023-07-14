import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt'

const UserSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        }
    },

);


UserSchema.statics.isUserExist = async function (
    id: string
): Promise<IUser | null> {
    return await User.findOne(
        { id },
        { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
    );
};

UserSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<IUser>("User", UserSchema);