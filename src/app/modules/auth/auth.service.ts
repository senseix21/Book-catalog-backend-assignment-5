import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import { ILoginResponse, ILoginUser } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";


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
    const { id } = isUserExist
    const accessToken = jwtHelpers.createToken(
        { id },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    )

    const refreshToken = jwtHelpers.createToken(
        { id },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    )

    return {
        accessToken,
        refreshToken
    }
}

export const AuthService = {
    loginUser
}