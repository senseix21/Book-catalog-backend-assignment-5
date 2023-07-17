/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status'
import { BookService } from "./book.service";
import { Book } from "./book.model";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import { paginationFields } from "../../../constants/pagination";
import { IBook } from "./book.interface";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from "../users/user.model";


//create a new Book
const createBook: RequestHandler = catchAsync(async (req, res, next) => {
    const bookData = req.body;
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


//get all books
const getAllBooks: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getAllBooks(
        filters,
        paginationOptions
    );

    sendResponse<IBook[]>(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Books retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

//update a book
const updateBook: RequestHandler = catchAsync(async (req, res, next) => {
    const token: any = req.headers.authorization;
    const decoded = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
    const user = decoded.userId;
    const isUserExist = await User.findById(user)


    const id = req.params.id;
    const data = req.body;
    const isBookExist = await Book.findOne({ _id: id });

    if (isBookExist && isBookExist?.admin == isUserExist?.id) {
        const result = await BookService.updateBook(id, data);

        sendResponse(
            res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Books Updated successfully',
            data: result
        });

        next();

    } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'Unauthorized user');
    }
});


//get a single book 
const getBookById: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await BookService.getBookById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book deleted successfully',
        data: result
    });

    next();
});



//deleteBook
const deleteBook: RequestHandler = catchAsync(async (req, res, next) => {
    const token: any = req.headers.authorization;
    const decoded = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
    const user = decoded.userId;
    const isUserExist = await User.findById(user)


    const id = req.params.id;
    const isBookExist = await Book.findOne({ _id: id });

    if (isBookExist && isBookExist?.admin == isUserExist?.id) {
        const result = await BookService.deleteBook(id);

        sendResponse(
            res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Book deleted successfully',
            data: result
        });

        next();

    } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'Unauthorized user');
    }
});



export const BookController = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook
}