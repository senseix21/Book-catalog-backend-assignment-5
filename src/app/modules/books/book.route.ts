import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', validateRequest(BookValidation.createBookZodSchema), BookController.createBook);

router.get('/:id', BookController.getBookById);
router.get('/', BookController.getAllBooks);

router.patch('/:id', validateRequest(BookValidation.updateBookZodSchema), BookController.updateBook);
router.delete('/:id', BookController.deleteBook);


export const BookRoutes = router;