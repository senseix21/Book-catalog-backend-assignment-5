import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";


//create a new User
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    const data = req.body;
    const result = await UserService.createUser(data);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User created successfully',
        data: result
    });

    next();
});

export const UserController = {
    createUser
}