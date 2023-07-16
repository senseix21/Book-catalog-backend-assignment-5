import express from 'express';
import { BookRoutes } from '../modules/books/book.route';
import { UserRoutes } from '../modules/users/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ReviewRoutes } from '../modules/comments/review.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/books',
        route: BookRoutes,
    },
    {
        path: '/reviews',
        route: ReviewRoutes,
    }

];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;