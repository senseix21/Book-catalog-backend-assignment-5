import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { ILoginResponse } from "./auth.interface";
import { AuthService } from "./auth.service";
// import { User } from "../users/user.model";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    //set refreshToken in cookies
    const cookieOptions = {
        secure: config.env === "production",
        httpOnly: true,
    }
    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse<ILoginResponse>(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: others
    },
    );
});

//Logout user 
const logoutUser = catchAsync(async (req: Request, res: Response) => {
    await AuthService.logoutUser(req, res);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
    });
});

export const AuthController = {
    loginUser,
    logoutUser
}