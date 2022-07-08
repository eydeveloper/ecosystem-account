import User, {IUser} from './user';

export default class UsersServices {
  static async create(fields: {}) {
    const user = new User(fields);
    await user.save();
    return user;
  }

  static async find(filterQuery: {} = {}) {
    return User.find(filterQuery);
  }

  static async findById(id: number): Promise<IUser | null> {
    return User.findOne({_id: id});
  }
}
