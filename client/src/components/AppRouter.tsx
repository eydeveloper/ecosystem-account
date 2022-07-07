import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';
import {privateRoutes, publicRoutes, RouteNames} from '../routes';

const AppRouter: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);

  return (
    isAuthorized
      ?
      <Routes>
        {privateRoutes.map(({path, element}) =>
          <Route path={path} element={element} key={path}></Route>
        )}
        <Route path="*" element={<Navigate replace to={RouteNames.SETTINGS} />}></Route>
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