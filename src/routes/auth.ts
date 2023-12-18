import { Router } from 'express';
import validateToken from '../middleware/middleware';
import * as authController from '../controllers/authController'

const router = Router();

router.post('/signup', authController.signUp)

router.post('/login', authController.logIn)

router.post('/token/refresh', authController.refreshJWT)

router.post('/profile', validateToken, authController.updateProfile)

export default router;
