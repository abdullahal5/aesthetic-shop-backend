import { Router, type Router as ExpressRouter } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { ProductRoutes } from '../modules/product/product.route.js';
const router: ExpressRouter = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

