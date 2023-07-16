import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';


const router = express.Router();

router.post('/create-user',
    // validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser);

router.get('/', UserController.getAllUser)

export const UserRoutes = router;