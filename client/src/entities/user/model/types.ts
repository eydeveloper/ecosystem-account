export interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  password: string;
}

export interface UserState {
  user: User;
  isAuthorized: boolean;
  isLoading: boolean;
  error: string;
}

export interface UserError {
  data: {
    message: string;
    types: []
  },
  status: number;
}
