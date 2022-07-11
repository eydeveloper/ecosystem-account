import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React, {FC, useEffect} from 'react';
import './App.scss';
import AppRouter from './components/AppRouter';
import PageLoader from './components/Common/Loader/PageLoader/PageLoader';
import Header from './components/Header/Header';
import {authApi} from './services/auth';
import {setJwtToken} from './utils/jwt';

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
