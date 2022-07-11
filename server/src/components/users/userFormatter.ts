import {UserResponse} from '../auth/types';
import {IUser} from './user';

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
