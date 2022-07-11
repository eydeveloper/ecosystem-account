import User, {IUser} from './user';

export default class UsersDAL {
  static async create(data: IUser) {
    const user = new User(data);
    await user.save();
    return user;
  }
}
