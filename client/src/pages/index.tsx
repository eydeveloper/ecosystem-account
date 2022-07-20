import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useVerify} from '../entities/user/lib/useVerify';
import AccountPage from './account';
import LoginPage from './login';
import SignupPage from './signup';

interface IRoute {
  path: string;
  element: JSX.Element;
}

export enum RouteNames {
  LOGIN = '/login',
  SIGNUP = '/signup',
  ACCOUNT = '/account',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, element: <LoginPage />},
  {path: RouteNames.SIGNUP, element: <SignupPage />}
];

export const privateRoutes: IRoute[] = [
  {path: RouteNames.ACCOUNT, element: <AccountPage />}
];

export const Routing = () => {
  const {isSuccess} = useVerify();

  return (
    isSuccess
      ?
      <Routes>
        {privateRoutes.map(({path, element}) =>
          <Route path={path} element={element} key={path}></Route>
        )}
        <Route path="*" element={<Navigate replace to={RouteNames.ACCOUNT} />}></Route>
      </Routes>
      :
      <Routes>
        {publicRoutes.map(({path, element}) =>
          <Route path={path} element={element} key={path}></Route>
        )}
        <Route path="*" element={<Navigate replace to={RouteNames.LOGIN} />}></Route>
      </Routes>
  );
};
