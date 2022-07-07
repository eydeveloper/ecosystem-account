import Cookies from 'js-cookie';

export const saveJwtToken = (token: string) => {
  Cookies.set('jwtToken', token, {expires: 7});
};