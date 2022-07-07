import {Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

const Header: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);

  return (
    <AppBar position="static" color="transparent" sx={{boxShadow: 1}}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <HeaderLogo />
          <Box sx={{flexGrow: 0}}>
            {isAuthorized
              ?
              <HeaderMenu />
              :
              <Link to="/login" style={{textDecoration: 'none'}}>
                <Button variant="contained">Войти</Button>
              </Link>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
