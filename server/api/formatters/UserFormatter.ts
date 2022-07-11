import {UserResponse} from '../controllers/AuthController';
import {IUser} from '../models/User';

export class UserFormatter {
  static formatToUserResponse(user: IUser): UserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar
    };
  }
}
