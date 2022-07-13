import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import {userModel} from 'entities/user';
import {Routing} from 'pages';
import React, {FC, useEffect} from 'react';
import {setJwtToken} from 'shared/lib/utils/jwt';
import {Header, PageLoader} from 'shared/ui';
import './index.scss';
import {withProviders} from './providers';

const App: FC = () => {
  const {data, isLoading} = userModel.api.useVerifyQuery({});

  useEffect(() => {
    if (data?.token) {
      setJwtToken(data.token);
    }
  }, [data]);

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Header />
      {isLoading ? <PageLoader /> : <Routing />}
    </StyledEngineProvider>
  );
};

export default withProviders(App);
