import {check} from 'express-validator';

export const signupValidator = [
  check('firstName', 'Укажите имя').notEmpty(),
  check('lastName', 'Укажите фамилию').notEmpty(),
  check('email', 'Укажите адрес электронной почты').notEmpty(),
  check('email', 'Недопустимый формат адреса электронной почты').isEmail(),
  check('password', 'Введите пароль').notEmpty(),
  check('password', 'Пароль не может быть короче 8 символов').isLength({min: 8})
];
