import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {AppError} from '../errors/AppError';
import {errorHandler} from '../handlers/ErrorHandler';

const validationMiddleware = (request: Request, response: Response, next: any) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const error = errors.array().find(Boolean)?.msg;
      throw new AppError(error, 400);
    }
    next();
  } catch (error) {
    errorHandler.handleError(error, response);
  }
};

export default validationMiddleware;
