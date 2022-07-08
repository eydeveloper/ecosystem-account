import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import {HasChildren} from '../types/HasChildren';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

const Header: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);

  return (
    <HeaderAppBar>
      <HeaderContainer>
        <HeaderToolbar>
          <HeaderLogo />
          <Box>
            {isAuthorized ? <HeaderMenu /> : <HeaderLinkLogin />}
          </Box>
        </HeaderToolbar>
      </HeaderContainer>
    </HeaderAppBar>
  );
};

const HeaderAppBar: FC<HasChildren> = ({children}) => (
  <AppBar color="transparent" sx={{position: 'static', boxShadow: 1}}>
    {children}
  </AppBar>
);

const HeaderContainer: FC<HasChildren> = ({children}) => (
  <Container maxWidth={false}>
    {children}
  </Container>
);

const HeaderToolbar: FC<HasChildren> = ({children}) => (
  <Toolbar disableGutters>
    {children}
  </Toolbar>
);

const HeaderLinkLogin = () => (
  <Link to="/login" style={{textDecoration: 'none'}}>
    <Button variant="contained">Войти</Button>
  </Link>
);

export default Header;
