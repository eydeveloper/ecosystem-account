import {errorHandler} from '../handlers/ErrorHandler';
import AuthServices from '../services/AuthServices';
import {TypedRequestBody} from '../types/typedRequestBody';
import {TypedResponse} from '../types/typedResponse';

interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface SignupBody extends BaseUser {
  password: string;
}

export interface UserResponse extends BaseUser {
  id: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export default class AuthController {
  static async login(request: TypedRequestBody<LoginBody>, response: TypedResponse<AuthResponse>) {
    try {
      const {token, user} = await AuthServices.login(request.body);
      return response.json({token, user});
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async signup(request: TypedRequestBody<SignupBody>, response: TypedResponse<AuthResponse>) {
    try {
      const {token, user} = await AuthServices.signup(request.body);
      return response.json({token, user});
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async verify(request: TypedRequestBody<{ id: string }>, response: TypedResponse<AuthResponse>) {
    try {
      const {token, user} = await AuthServices.verify(request.body);
      return response.json({token, user});
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
