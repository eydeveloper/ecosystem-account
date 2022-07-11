import Cookies from 'js-cookie';

export const setJwtToken = (token: string) => {
  return Cookies.set('jwtToken', token, {expires: 7});
};

export const getJwtToken = () => {
  return Cookies.get('jwtToken');
};

export const removeJwtToken = () => {
  return Cookies.remove('jwtToken');
};
