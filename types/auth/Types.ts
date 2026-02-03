export interface ILoginDataModel {
  username: string;
  password: string;
  remember: boolean;
}

export interface IResetPasswordData {
  token: string;
  password: string;
}

export interface IResetPasswordResponse {
  ok: boolean;
}
