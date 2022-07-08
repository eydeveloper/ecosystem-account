import {CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const Loader = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 'calc(100vh - 64px)'
    }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;