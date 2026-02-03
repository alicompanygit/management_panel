export interface INNavaNumber {
  type?: number;
  operator?: any;
  id?: any;
  number?: any;
  name?: any;
  family?: any;
  fullname?: any;
  uuid?: any;
  firstName?: any;
  department?: any;
  lastName?: any;
  phoneNumber?: any;
  data?: {
    internal?: any;
    role?: any;
    nickname?: any;
  };
  custoemr_uuid: string;
  Origin: boolean;
}
export interface INNavaNumberPosted {
  guid?: any;
  navanumber?: INNavaNumber;
}
export interface INNavaNumberVerify {
  Guid?: any;
  OTP?: any;
}
export interface INavaAccount {
  type?: number;
  operator?: any;
  id?: any;
  user?: any;
  pass?: any;
  uuid?: any;
  internal?: any;
  department?: any;
  role?: any;
  nickname?: any;
  prefix?: any;
}
export interface IAccount {
  type?: number;
  operator?: any;
  id?: any;
  user?: any;
  pass?: any;
  uuid?: any;
  internal?: any;
  department?: any;
  role?: any;
  nickname?: any;
  precode?: string;
  prefix?: any;
  firstname?: any;
  lastname?: any;
  fullname?: any;
}

export interface IMaxNumber {
  max_number?: any;
}

export interface IUsersOperatorDefineStore {
  error?: any;
  nnavaNumber?: INNavaNumber[] | null;
  nnavaNumberPosted?: INNavaNumberPosted | null;
  nnavaNumberVerify?: INNavaNumberVerify | null;
  navaAccount?: INavaAccount[] | null;
  account?: IAccount[] | null;
  maxNumber?: IMaxNumber | null;
}
