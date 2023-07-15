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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../users/user.model");
const jwthelpers_1 = require("../../../helpers/jwthelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create acess and refresh token 
    const { id: userId, email: userEmail } = isUserExist;
    const accessToken = jwthelpers_1.jwtHelpers.createToken({ userEmail, userId }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwthelpers_1.jwtHelpers.createToken({ userEmail, userId }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken
    };
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenCookie = req.cookies;
    console.log(`Refreshing token: ${refreshTokenCookie}`);
    // Clear the refresh token cookie
    res.cookie('refreshToken', '', { expires: new Date(0) });
});
exports.AuthService = {
    loginUser,
    logoutUser
};
