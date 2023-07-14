import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status'
import { BookService } from "./book.service";


//create a new Book
const createBook: RequestHandler = catchAsync(async (req, res, next) => {
    const bookData = req.body;
    console.log(bookData);
    const result = await BookService.createBook(bookData);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book created successfully',
        data: result
    });

    next();
});

export const BookController = {
    createBook
}