import {Request, Response} from 'express';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import {AuthError} from '../components/auth/authErrors';

const authMiddleware = (request: Request, response: Response, next: any) => {
  if (request.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthError('Пользователь не авторизован.', 401);
    }

    request.body = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      response.status(error.httpCode).send({message: error.message});
    } else if (error instanceof TokenExpiredError) {
      response.status(401).send({message: 'Срок действия токена истек.'});
    } else {
      response.status(500).send({message: 'Произошла неизвестная ошибка.'});
    }
  }
};

export default authMiddleware;
