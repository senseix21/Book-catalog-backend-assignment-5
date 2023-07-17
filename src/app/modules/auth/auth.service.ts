import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import { ILoginResponse, ILoginUser } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { Request, Response } from "express";


const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
    const { email, password } = payload;

    const isUserExist = await User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User does not exist");
    }

    if (
        isUserExist.password &&
        !(await User.isPasswordMatched(password, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    //create acess and refresh token 
    const { id: userId, email: userEmail, userName: userName } = isUserExist
    const accessToken = jwtHelpers.createToken(
        { userEmail, userId },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )

    const refreshToken = jwtHelpers.createToken(
        { userEmail, userId },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    )

    return {
        userName,
        email,
        accessToken,
        refreshToken
    }
}

const logoutUser = async (req: Request, res: Response): Promise<void> => {
    const refreshTokenCookie = req.cookies;
    console.log(`Refreshing token: ${refreshTokenCookie}`);

    // Clear the refresh token cookie
    res.cookie('refreshToken', '', { expires: new Date(0) });

}

export const AuthService = {
    loginUser,
    logoutUser
}