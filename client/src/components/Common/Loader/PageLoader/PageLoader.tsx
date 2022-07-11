import {CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import styles from './PageLoader.module.scss';

const PageLoader = () => {
  return (
    <Box className={styles['Page-Index']}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
