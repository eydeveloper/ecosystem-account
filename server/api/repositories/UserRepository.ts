import User, {IUser} from '../models/User';

export default class UserRepository {
  static async create(data: IUser) {
    const user = new User(data);
    await user.save();
    return user;
  }
}
