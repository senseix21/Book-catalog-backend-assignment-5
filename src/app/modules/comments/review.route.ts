import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';


const router = express.Router();

router.post('/create-Review/:id',
    validateRequest(ReviewValidation.createReviewZodSchema),
    ReviewController.createReview);

router.get('/:id', ReviewController.getReviews);


export const ReviewRoutes = router;