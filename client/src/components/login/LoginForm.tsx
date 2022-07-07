import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authApi} from '../../services/AuthService';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)'
      }}
    >
      <Card sx={{padding: 5, boxShadow: 3}}>
        <Typography variant="h5" sx={{textAlign: 'center'}}>Вход</Typography>

        <TextField
          required
          id="outlined-required"
          label="Адрес эл. почты"
          value={email}
          onInput={handleInputEmail}
          fullWidth
          sx={{marginTop: 2}}
        />

        <TextField
          required
          id="outlined-required"
          type="password"
          label="Пароль"
          value={password}
          onInput={handleInputPassword}
          fullWidth
          sx={{marginTop: 2}}
        />

        {error && <Alert severity="error" sx={{marginTop: 2}}>{'data' in error && error.data.message}</Alert>}

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={handleCreateUser} sx={{marginTop: 2}}>
            Создать аккаунт
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{marginTop: 2}}
          >
            Войти
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginForm;