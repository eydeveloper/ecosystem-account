import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React, {FC, useEffect} from 'react';
import './App.scss';
import AppRouter from './AppRouter';
import PageLoader from '../common/components/Loader/PageLoader/PageLoader';
import Header from '../common/components/Header/Header';
import {authApi} from '../features/auth/authService';
import {setJwtToken} from '../common/utils/jwt';

const App: FC = () => {
  const {data, isLoading} = authApi.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      setJwtToken(data.token);
    }
  }, [data]);

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Header />
      {isLoading ? <PageLoader /> : <AppRouter />}
    </StyledEngineProvider>
  );
};

export default App;
