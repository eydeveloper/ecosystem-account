import express from 'express';
import validationMiddleware from '../../core/middlewares/validationMiddleware';
import AuthController from './authController';
import authMiddleware from './authMiddleware';
import {signupValidator} from './authValidators';

const router = express.Router();

router.get('/verify', authMiddleware, AuthController.verify);
router.post('/signup', signupValidator, validationMiddleware, AuthController.signup);
router.post('/login', AuthController.login);

export default router;
