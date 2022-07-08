import Cookies from 'js-cookie';

export const setJwtToken = (token: string) => Cookies.set('jwtToken', token, {expires: 7});
export const getJwtToken = () => Cookies.get('jwtToken');
export const removeJwtToken = () => Cookies.remove('jwtToken');
