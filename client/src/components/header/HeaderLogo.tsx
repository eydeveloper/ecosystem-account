import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const HeaderLogo: FC = () => {
  return (
    <React.Fragment>
      <LogoDesktop />
      <LogoMobile />
    </React.Fragment>
  );
};

const LogoDesktop = () => (
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
    <Link to="/">Экосистема.Аккаунт</Link>
  </Typography>
);

const LogoMobile = () => (
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
    <Link to="/">Экосистема.Аккаунт</Link>
  </Typography>
);

export default HeaderLogo;
