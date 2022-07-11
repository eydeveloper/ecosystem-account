import User from '../users/user';

export default interface Auth {
  token: string;
  user: User;
}
