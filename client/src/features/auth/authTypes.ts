import User from '../users/user';

export interface AuthState {
  isAuthorized: boolean;
  user: User;
  isLoading: boolean;
  error: string;
}
