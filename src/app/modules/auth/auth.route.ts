import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login',
    validateRequest(AuthValidation.loginUserZodSchema),
    AuthController.loginUser
);

router.post('/logout', AuthController.logoutUser);

export const AuthRoutes = router;
