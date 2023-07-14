import { RequestHandler } from "express";
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

//update a book
const updateBook: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const isBookExist = await Book.findById(id);

    if (isBookExist) {
        const result = await BookService.updateBook(id, data);

        sendResponse(
            res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Books retrieved successfully',
            data: result
        });

        next();

    } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
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
        message: 'Book retrieved successfully',
        data: result
    });

    next();
});

//get all books
const getAllBooks: RequestHandler = catchAsync(async (req, res, next) => {
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

    next();
});

//deleteBook
const deleteBook: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const isBookExist = await Book.findById(id);

    if (isBookExist) {
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
        throw new ApiError(httpStatus.NOT_FOUND, "Book not found")
    }
});



export const BookController = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook
}