import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {AppError} from '../../core/errors/appError';
import {errorHandler} from '../../core/handlers/errorHandler';

const authMiddleware = (request: Request, response: Response, next: any) => {
  if (request.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError('Пользователь не авторизован.', 401);
    }

    request.body = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    next();
  } catch (error) {
    errorHandler.handleError(error, response);
  }
};

export default authMiddleware;
