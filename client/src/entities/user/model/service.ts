import axios from 'axios';
import {QueryClient} from 'react-query';
import {getJwtToken, removeJwtToken} from '../../../shared/lib/utils/jwt';
import {User} from './types';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/auth`;

const token = getJwtToken();

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const UserService = {
  async verify() {
    return axios.get<{ token: string, user: User }>('/verify');
  },

  async login(credentials: User) {
    return axios.post<{ token: string, user: User }>('login', credentials);
  },

  logout(queryClient: QueryClient) {
    removeJwtToken();
    return queryClient.invalidateQueries(['user']);
  }
};
