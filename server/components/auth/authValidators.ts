import {check} from 'express-validator';

export const loginValidator = [
  check('email', 'Недопустимый формат адреса эл. почты').isEmail(),
  check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
];
