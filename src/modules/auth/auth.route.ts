import { Router, type Router as ExpressRouter } from 'express';
import { AuthController } from './auth.controller.js';

const router: ExpressRouter = Router();

router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.get('/admin-info', AuthController.getAdminInfo);

export const AuthRoutes = router;
