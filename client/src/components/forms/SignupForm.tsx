import LoadingButton from '@mui/lab/LoadingButton';
import {FormGroup} from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authApi} from '../../services/AuthService';

const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)'
      }}
    >
      <Card sx={{padding: 5, boxShadow: 3}}>
        <Typography variant="h5" sx={{textAlign: 'center'}}>Создание аккаунта</Typography>

        <FormGroup>
          <Box sx={{display: 'flex', gap: 1}}>
            <TextField
              required
              id="outlined-required"
              label="Имя"
              value={firstName}
              onInput={handleInputFirstName}
              size="small"
              sx={{marginTop: 2}}
            />

            <TextField
              required
              id="outlined-required"
              label="Фамилия"
              value={lastName}
              onInput={handleInputLastName}
              size="small"
              sx={{marginTop: 2}}
            />
          </Box>
        </FormGroup>

        <TextField
          required
          id="outlined-required"
          label="Адрес эл. почты"
          value={email}
          onInput={handleInputEmail}
          fullWidth
          size="small"
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
          size="small"
          sx={{marginTop: 2}}
        />

        {error && <Alert severity="error" sx={{marginTop: 2}}>{'data' in error && error.data.message}</Alert>}

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={handleLogin} sx={{marginTop: 2}}>
            Войти
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{marginTop: 2}}
          >
            Создать аккаунт
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUpForm;
