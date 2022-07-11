import bcrypt from 'bcryptjs';
import {AuthResponse, LoginBody, SignupBody, UserResponse} from '../controllers/AuthController';
import {AppError} from '../errors/AppError';
import {UserFormatter} from '../formatters/UserFormatter';
import User, {IUser} from '../models/User';
import UserRepository from '../repositories/UserRepository';
import {createJwtToken} from '../utils/jwt';

export default class AuthServices {
  static async login(data: LoginBody): Promise<AuthResponse> {
    const {email, password} = data;
    const user = await User.findOne({email});

    if (!user) {
      throw new AppError('Не удалось найти аккаунт.', 404);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AppError('Неверный пароль. Повторите попытку.', 403);
    }

    const userResponse = UserFormatter.formatToUserResponse(user);

    return {
      token: createJwtToken(userResponse),
      user: userResponse
    };
  }

  static async signup(data: SignupBody): Promise<AuthResponse> {
    const {firstName, lastName, email, password} = data;
    const candidate = await User.findOne({email});

    if (candidate) {
      throw new AppError('Пользователь с указанным адресом эл. почты уже зарегистрирован.', 400);
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = await UserRepository.create({
      firstName, lastName, email, password: hashPassword
    } as IUser);

    const userResponse = UserFormatter.formatToUserResponse(user);

    return {
      token: createJwtToken(userResponse),
      user: userResponse
    };
  }

  static async verify(data: { id: string }): Promise<AuthResponse> {
    const {id} = data;
    const user = await User.findById(id);

    if (!user) {
      throw new AppError('Пользователь не авторизован.', 401);
    }

    const userResponse = UserFormatter.formatToUserResponse(user);

    return {
      token: createJwtToken(userResponse),
      user: userResponse
    };
  }
}
