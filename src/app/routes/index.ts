import express from 'express';


const router = express.Router();

const moduleRoutes = [
    // {
    //     path: '/auth',
    //     route: AuthRoutes
    // },
    // {
    //     path: '/users',
    //     route: UserRoutes,
    // },
    {
        path: 'books',
        route: BookRoutes,
    }

];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;