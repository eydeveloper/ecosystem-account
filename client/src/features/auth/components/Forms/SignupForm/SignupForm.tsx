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

const SignupForm: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [signup, {isLoading, error}] = authApi.useSignupMutation();

  const handleInputFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleInputLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInputPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup({firstName, lastName, email, password}).unwrap();
  };

  return (
    <Box className={styles['Form']} onSubmit={handleRegister} component="form">
      <Card className={styles['Form-Card']}>
        <Typography className={styles['Form-Title']} variant="h5">
          Создание аккаунта
        </Typography>

        <Box className={styles['Form-Row']}>
          <TextField
            className={styles['Form-TextField']}
            required
            label="Имя"
            value={firstName}
            onInput={handleInputFirstName}
            size="small"
          />

          <TextField
            className={styles['Form-TextField']}
            required
            label="Фамилия"
            value={lastName}
            onInput={handleInputLastName}
            size="small"
          />
        </Box>

        <TextField
          className={styles['Form-TextField']}
          required
          label="Адрес эл. почты"
          value={email}
          onInput={handleInputEmail}
          size="small"
        />

        <TextField
          className={styles['Form-TextField']}
          required
          type="password"
          label="Пароль"
          value={password}
          onInput={handleInputPassword}
          size="small"
        />

        {error &&
          <Alert className={styles['Form-Alert']} severity="error">
            {'data' in error && error.data.message}
          </Alert>
        }

        <Box className={styles['Form-Controls']}>
          <Button onClick={handleLogin}>
            Войти
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Создать аккаунт
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
};

export default SignupForm;
