import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status'
import { BookService } from "./book.service";
import { Book } from "./book.model";
import ApiError from "../../../errors/ApiError";


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
    const result = await BookService.getAllBooks();

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Books retrieved successfully',
        data: result
    });

    next();
});

//deleteBook
const deleteBook: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const isBookExist = await Book.findById(id);
    console.log(isBookExist, 'deleteBook');

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