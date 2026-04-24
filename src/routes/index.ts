import { Router, type Router as ExpressRouter } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
const router: ExpressRouter = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

