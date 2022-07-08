import bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {TokenExpiredError} from 'jsonwebtoken';
import {createJwtToken} from '../../utils/jwt';
import User from '../users/user';
import UsersServices from '../users/usersServices';
import {AuthError} from './authErrors';

export default class AuthController {
  static async verify(request: Request, response: Response) {
    try {
      const user = await UsersServices.findById(request.body.id);

      if (!user) {
        throw new AuthError('Пользователь не авторизован.', 401);
      }

      const token = createJwtToken({id: user.id});
      const {id, firstName, lastName, avatar, email} = user;

      return response.json({
        token,
        user: {id, firstName, lastName, avatar, email}
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        response.status(error.httpCode).send({message: error.message});
      } else if (error instanceof TokenExpiredError) {
        response.status(401).send({message: 'Срок действия токена истек.'})
      } {
        response.status(500).send({message: 'Произошла неизвестная ошибка.'});
      }
    }
  }

  static async signup(request: Request, response: Response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        throw new AuthError(errors.array()[0].msg, 400);
      }

      const {firstName, lastName, email, password} = request.body;
      const candidate = await UsersServices.find({email});

      if (candidate) {
        throw new AuthError('Пользователь с указанным адресом эл. почты уже зарегистрирован.', 400);
      }

      const hashPassword = await bcrypt.hash(password, 8);

      const user = await UsersServices.create({
        firstName, lastName, email, password: hashPassword
      });

      const token = createJwtToken({id: user.id});

      return response.json({
        token,
        user: {id: user.id, firstName, lastName, email}
      });
    } catch (error) {
      if (error instanceof AuthError) {
        response.status(error.httpCode).send({message: error.message});
      } else {
        response.status(500).send({message: 'Произошла неизвестная ошибка.'});
      }
    }
  }

  static async login(request: Request, response: Response) {
    try {
      const {email, password} = request.body;
      const user = await User.findOne({email});

      if (!user) {
        throw new AuthError('Не удалось найти аккаунт.', 404);
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new AuthError('Неверный пароль. Повторите попытку.', 403);
      }

      const token = createJwtToken({id: user.id});

      return response.json({
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          email: user.email
        }
      });
    } catch (error) {
      if (error instanceof AuthError) {
        response.status(error.httpCode).send({message: error.message});
      } else {
        response.status(500).send({message: 'Произошла неизвестная ошибка.'});
      }
    }
  }
}
