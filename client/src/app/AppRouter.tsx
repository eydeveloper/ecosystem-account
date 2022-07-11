import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {privateRoutes, publicRoutes, RouteNames} from '../common/routes';

const AppRouter: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.authReducer);

  return (
    isAuthorized
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

export default AppRouter;