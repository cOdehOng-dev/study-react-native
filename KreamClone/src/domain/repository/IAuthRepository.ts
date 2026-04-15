import { UserModel } from '../model/UserModel';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<UserModel>;
  register(credentials: RegisterCredentials): Promise<UserModel>;
}
