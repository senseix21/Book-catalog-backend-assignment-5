import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { ILoginResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

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

export const AuthController = {
    loginUser
}