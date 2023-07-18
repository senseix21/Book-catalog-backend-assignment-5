/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import { Secret } from "jsonwebtoken";
import { User } from "../users/user.model";
import ApiError from "../../../errors/ApiError";


//create a new Review
const createReview: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    const token: any = req.headers.authorization;
    const decoded = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
    const user = decoded.userId;
    const isUserExist = await User.findById(user)



    if (isUserExist) {
        const result = await ReviewService.createReview(data, id);

        sendResponse(
            res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Review created successfully',
            data: result
        });

        next();

    } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'Unauthorized user');
    }

});

//get reviews
const getReviews: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await ReviewService.getReviews(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review created successfully',
        data: result
    });

    next();
});

export const ReviewController = {
    createReview,
    getReviews
}