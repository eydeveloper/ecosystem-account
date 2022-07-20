import CssBaseline from '@mui/material/CssBaseline';
import {Routing} from 'pages';
import {FC, useEffect} from 'react';
import {useVerify} from 'entities/user/lib/useVerify';
import {PageLoader} from 'shared/ui';
import {Header} from 'widgets/header/ui';
import './index.scss';
import {withProviders} from './providers';

const App: FC = () => {
  const {isLoading, isSuccess, isError, refetch} = useVerify();

  useEffect(() => {
    refetch();
  }, []);

  console.log(isLoading, isSuccess);

  return (
    <>
      <CssBaseline />
      <Header />
      {isLoading && !isSuccess && !isError ? <PageLoader /> : <Routing />}
    </>
  );
};

export default withProviders(App);
