"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const book_service_1 = require("./book.service");
const book_model_1 = require("./book.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constants_1 = require("./book.constants");
const pagination_1 = require("../../../constants/pagination");
const jwthelpers_1 = require("../../../helpers/jwthelpers");
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../users/user.model");
//create a new Book
const createBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const result = yield book_service_1.BookService.createBook(bookData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book created successfully',
        data: result
    });
    next();
}));
//get all books
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constants_1.bookFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield book_service_1.BookService.getAllBooks(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//update a book
const updateBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jwthelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const user = decoded.userId;
    const isUserExist = yield user_model_1.User.findById(user);
    const id = req.params.id;
    const data = req.body;
    const isBookExist = yield book_model_1.Book.findOne({ _id: id });
    if (isBookExist && (isBookExist === null || isBookExist === void 0 ? void 0 : isBookExist.admin) == (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id)) {
        const result = yield book_service_1.BookService.updateBook(id, data);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Books Updated successfully',
            data: result
        });
        next();
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Unauthorized user');
    }
}));
//get a single book 
const getBookById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.getBookById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book deleted successfully',
        data: result
    });
    next();
}));
//deleteBook
const deleteBook = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const decoded = jwthelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const user = decoded.userId;
    const isUserExist = yield user_model_1.User.findById(user);
    const id = req.params.id;
    const isBookExist = yield book_model_1.Book.findOne({ _id: id });
    if (isBookExist && (isBookExist === null || isBookExist === void 0 ? void 0 : isBookExist.admin) == (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id)) {
        const result = yield book_service_1.BookService.deleteBook(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Book deleted successfully',
            data: result
        });
        next();
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Unauthorized user');
    }
}));
exports.BookController = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook
};
