import Account from '../../features/users/pages/Account';
import Login from '../../features/auth/pages/Login';
import Signup from '../../features/auth/pages/Signup';
import {IRoute} from './types';

export enum RouteNames {
  LOGIN = '/login',
  SIGNUP = '/signup',
  ACCOUNT = '/account',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, element: <Login />},
  {path: RouteNames.SIGNUP, element: <Signup />}
];

export const privateRoutes: IRoute[] = [
  {path: RouteNames.ACCOUNT, element: <Account />}
];
