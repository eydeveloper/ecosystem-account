import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const auth = (request: Request, response: Response, next: any) => {
  if (request.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return response.status(401).json({message: 'Пользователь не авторизован'});
    }

    request.body = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    next();
  } catch (e) {
    return response.status(401);
  }
};

export default auth;
