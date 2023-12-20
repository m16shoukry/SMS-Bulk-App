export interface IAuthService {
  login(body: LoginInput): Promise<string>;
}

export interface LoginInput {
  phone: string;
  password: string;
}
