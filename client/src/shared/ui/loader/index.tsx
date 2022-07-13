import {CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <Box className={styles.Loader}>
      <CircularProgress />
    </Box>
  );
};
