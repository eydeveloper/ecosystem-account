import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React, {FC, useEffect} from 'react';
import {authApi} from './services/AuthService';
import {setJwtToken} from './utils/jwt';
import Loader from './components/common/Loader';
import Header from './components/header/Header';
import './App.css';
import AppRouter from './components/AppRouter';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

const App: FC = () => {
  const {data, isLoading} = authApi.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      setJwtToken(data.token);
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {isLoading ? <Loader /> : <AppRouter />}
    </ThemeProvider>
  );
};

export default App;