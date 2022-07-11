import jwt from 'jsonwebtoken';
import {UserResponse} from '../controllers/AuthController';

export const createJwtToken = (payload: UserResponse) => {
  return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {expiresIn: '1h'});
};
