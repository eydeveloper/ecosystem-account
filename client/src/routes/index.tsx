import Login from '../pages/Login';
import Settings from '../pages/Settings';
import SignUp from '../pages/SignUp';

interface IRoute {
  path: string;
  element: JSX.Element;
}

export enum RouteNames {
  LOGIN = '/login',
  SIGNUP = '/signup',
  SETTINGS = '/settings',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, element: <Login />},
  {path: RouteNames.SIGNUP, element: <SignUp />}
];

export const privateRoutes: IRoute[] = [
  {path: RouteNames.SETTINGS, element: <Settings />}
];
