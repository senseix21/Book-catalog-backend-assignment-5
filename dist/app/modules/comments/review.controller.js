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
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const review_service_1 = require("./review.service");
const config_1 = __importDefault(require("../../../config"));
const jwthelpers_1 = require("../../../helpers/jwthelpers");
const user_model_1 = require("../users/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
//create a new Review
const createReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const token = req.headers.authorization;
    const decoded = jwthelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const user = decoded.userId;
    const isUserExist = yield user_model_1.User.findById(user);
    if (isUserExist) {
        const result = yield review_service_1.ReviewService.createReview(data, id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Review created successfully',
            data: result
        });
        next();
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Unauthorized user');
    }
}));
//get reviews
const getReviews = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield review_service_1.ReviewService.getReviews(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Review created successfully',
        data: result
    });
    next();
}));
exports.ReviewController = {
    createReview,
    getReviews
};
