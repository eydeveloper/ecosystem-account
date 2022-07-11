import IUser from './IUser';

export default interface IAuth {
  token: string;
  user: IUser;
}
