import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const createJwtToken = (payload: JwtPayload) => {
  const secretKey = process.env.JWT_SECRET_KEY || 'secret';
  return jwt.sign(payload, secretKey, {expiresIn: '1h'});
};
