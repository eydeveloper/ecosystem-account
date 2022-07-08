import express from 'express';
import AuthController from './authController';
import authMiddleware from '../../middleware/authMiddleware';
import {loginValidator} from './authValidators';

const router = express.Router();

router.get('/verify', authMiddleware, AuthController.verify);
router.post('/signup', loginValidator, AuthController.signup);
router.post('/login', AuthController.login);

export default router;
