import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
    '/create-book', validateRequest(BookValidation.createBookZodSchema), BookController.createBook);


export const BookRoutes = router;