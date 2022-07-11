import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import styles from './Header.module.scss';
import HeaderMenu from './HeaderMenu';

const Header: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);

  return (
    <AppBar className={styles['Bar']}>
      <Container className={styles['Container']}>
        <Toolbar className={styles['Toolbar']}>
          <Typography className={styles['Logo']} variant="h6">
            <Link to="/">Экосистема.Аккаунт</Link>
          </Typography>
          {isAuthorized ? <HeaderMenu /> :
            <Button variant="contained">
              <Link className={styles['Login-Link']} to="/login">
                Войти
              </Link>
            </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
