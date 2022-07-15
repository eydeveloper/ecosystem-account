import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {UserMenu} from 'entities/user/ui';
import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import styles from './styles.module.scss';

export const Header = () => {
  const {isAuthorized} = useAppSelector(state => state.userReducer);

  return (
    <AppBar className={styles.Root}>
      <Container className={styles.Container}>
        <Toolbar className={styles.Toolbar}>
          <Typography className={styles.Logo} variant="h6">
            <Link to="/">Экосистема.Аккаунт</Link>
          </Typography>
          {isAuthorized ? <UserMenu /> :
            <Button variant="contained">
              <Link className={styles.LoginLink} to="/login">
                Войти
              </Link>
            </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
