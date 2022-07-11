import {Response} from 'express';
import {TokenExpiredError} from 'jsonwebtoken';
import {AppError} from '../errors/AppError';

class ErrorHandler {
  public handleError(error: any, response: Response) {
    if (error instanceof AppError) {
      response.status(error.httpCode).json({message: error.message});
    } else if (error instanceof TokenExpiredError) {
      response.status(401).json({message: 'Срок действия токена истек.'});
    } else {
      response.status(500).json({message: String(error)});
    }
  };
}

export const errorHandler = new ErrorHandler();
