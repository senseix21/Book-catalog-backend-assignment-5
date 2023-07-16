import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";


//create a new Review
const createReview: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await ReviewService.createReview(data, id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review created successfully',
        data: result
    });

    next();
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