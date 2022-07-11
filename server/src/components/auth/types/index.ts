interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface SignupBody extends BaseUser {
  password: string;
}

export interface UserResponse extends BaseUser {
  id: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}