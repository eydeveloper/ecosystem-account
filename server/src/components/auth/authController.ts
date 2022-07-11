import {errorHandler} from '../../core/handlers/errorHandler';
import {TypedRequestBody} from '../../core/types/typedRequestBody';
import {TypedResponse} from '../../core/types/typedResponse';
import AuthService from './authService';
import {AuthResponse, LoginBody, SignupBody} from './types';

export default class AuthController {
  static async login(request: TypedRequestBody<LoginBody>, response: TypedResponse<AuthResponse>) {
    try {
      const {token, user} = await AuthService.login(request.body);
      return response.json({token, user});
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async signup(request: TypedRequestBody<SignupBody>, response: TypedResponse<AuthResponse>) {
    try {
      const {token, user} = await AuthService.signup(request.body);
      return response.json({token, user});
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async verify(request: TypedRequestBody<{ id: string }>, response: TypedResponse<AuthResponse>) {
    try {
      const {token, user} = await AuthService.verify(request.body);
      return response.json({token, user});
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
