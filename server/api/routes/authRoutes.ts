import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';
import AuthController from '../controllers/AuthController';
import {signupValidator} from '../validators/authValidators';

const router = express.Router();

router.get('/verify', authMiddleware, AuthController.verify);
router.post('/signup', signupValidator, validationMiddleware, AuthController.signup);
router.post('/login', AuthController.login);

export default router;
