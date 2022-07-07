import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const HeaderLogo: FC = () => {
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: {xs: 'none', md: 'flex'},
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'
        }}
      >
        <Link to="/" style={{color: '#000000', textDecoration: 'none'}}>
          Экосистема.Аккаунт
        </Link>
      </Typography>

      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          display: {xs: 'flex', md: 'none'},
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'
        }}
      >
        <Link to="/" style={{color: '#000000', textDecoration: 'none'}}>
          Экосистема
        </Link>
      </Typography>
    </React.Fragment>
  );
};

export default HeaderLogo;
