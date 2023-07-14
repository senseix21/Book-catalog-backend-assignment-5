import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
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

export const UserModel = model<IUser>("User", userSchema);