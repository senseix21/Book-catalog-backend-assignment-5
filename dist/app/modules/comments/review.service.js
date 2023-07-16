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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const book_model_1 = require("../books/book.model");
//Create a new Review
const createReview = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.Book.updateOne({ _id: (id) }, { $push: { reviews: data.review } }, { new: true });
    const updatedData = yield book_model_1.Book.findById(id);
    return updatedData;
});
//get all Reviews
const getReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id, { reviews: 1, _id: 0, });
    return result;
});
exports.ReviewService = {
    createReview,
    getReviews
};
