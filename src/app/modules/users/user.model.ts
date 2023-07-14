import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
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

// hashing user password
UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bycrypt_salt_rounds)
    );
    next();
});

export const User = model<IUser>("User", UserSchema);