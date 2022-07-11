import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authApi} from '../../../authService';
import styles from '../Form.module.scss';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [login, {isLoading, error}] = authApi.useLoginMutation();

  const handleInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInputPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCreateUser = async () => {
    navigate('/signup');
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({email, password}).unwrap();
  };

  return (
    <Box className={styles['Form']} onSubmit={handleLogin} component="form">
      <Card className={styles['Form-Card']}>
        <Typography className={styles['Form-Title']} variant="h5">
          Вход
        </Typography>

        <TextField
          className={styles['Form-TextField']}
          required
          label="Адрес эл. почты"
          value={email}
          onInput={handleInputEmail}
        />

        <TextField
          className={styles['Form-TextField']}
          required
          type="password"
          label="Пароль"
          value={password}
          onInput={handleInputPassword}
        />

        {error &&
          <Alert className={styles['Form-Alert']} severity="error">
            {'data' in error && error.data.message}
          </Alert>
        }

        <Box className={styles['Form-Controls']}>
          <Button onClick={handleCreateUser}>
            Создать аккаунт
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Войти
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginForm;
