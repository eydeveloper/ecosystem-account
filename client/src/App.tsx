import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React, {FC, useEffect} from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/header/Header';
import Loader from './components/UI/Loader';
import {authApi} from './services/AuthService';
import {saveJwtToken} from './utils/jwt';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

const App: FC = () => {
  const {data, isLoading} = authApi.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      saveJwtToken(data.token);
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