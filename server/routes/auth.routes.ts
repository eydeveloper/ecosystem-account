import bcrypt from 'bcryptjs';
import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import auth from '../middleware/auth.middleware';
import User from '../models/User';
import {createJwtToken} from '../utils/jwt';

const router = express.Router();

const authMiddleware = auth;

router.get('/verify', authMiddleware,
  async (request: Request, response: Response) => {
    try {
      const user = await User.findOne({_id: request.body.id});

      if (!user) {
        return response.status(401).json({message: 'Пользователь не найден'});
      }

      const token = createJwtToken({id: user.id});

      return response.json({
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          email: user.email
        }
      });
    } catch (e) {
      console.log(e);
      response.send({message: 'Server error'});
    }
  });

router.post(
  '/signup',
  [
    check('email', 'Недопустимый формат адреса эл. почты').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
  ],
  async (request: Request, response: Response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({message: errors.array()[0].msg});
      }

      const {firstName, lastName, email, password} = request.body;
      const candidate = await User.findOne({email});

      if (candidate) {
        return response.status(400)
          .json({
            message: `Пользователь с указанным адресом эл. почты уже зарегистрирован`
          });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword
      });

      await user.save();

      const token = createJwtToken({id: user.id});

      return response.json({
        token,
        user: {
          id: user.id,
          firstName,
          lastName,
          email
        }
      });
    } catch (e) {
      console.log(e);
      response.send({message: 'Произошла ошибка на сервере'});
    }
  }
);

router.post('/login', async (request: Request, response: Response) => {
  try {
    const {email, password} = request.body;
    const user = await User.findOne({email});

    if (!user) {
      return response.status(404).json({message: 'Не удалось найти аккаунт.'});
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return response.status(404).json({message: 'Неверный пароль. Повторите попытку.'});
    }

    const token = createJwtToken({id: user.id});

    return response.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email
      }
    });
  } catch (e) {
    console.log(e);
    response.send({message: 'Произошла ошибка на сервере'});
  }
});

export default router;
