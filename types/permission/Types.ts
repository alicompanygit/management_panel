import { useCookie } from "@/composables/useCookie";
import { string } from "yup";
const { getCookie } = useCookie();

export enum RoleType {
  None,
  Admin,
  Agent,
  Operator,
}
export interface IJWT {
  adphone?: any;
  adsub?: any;
  aud?: any;
  dtkn?: any;
  email?: any;
  exp?: any;
  iat?: any;
  nickname?: any;
  phone?: any;
  sub?: any;
}
export interface IPermission {
  title: string;
  role: string;
  adminP: string[];
  operatorP: string[];
  agentP: string[];
  visible: boolean;
  order?: number;
}
export interface IRolePermission {
  role: RoleType;
  role2: string;
  permission: Map<string, IPermission>;
}

export interface IVisibilityMenu {
  fax?: boolean;
  callcenter?: boolean;
  webchat?: boolean;
  sms?: boolean;
  ManageRoles?: boolean;
  messageOpt?: boolean;
  callfrwdNumDef?: boolean;
  timeCond?: boolean;
  voiceMan?: boolean;
  hangupStatus?: boolean;
  answeredCalls?: boolean;
  nAnsCal?: boolean;
  optActivity?: boolean;
  recCalLg?: boolean;
  advLgs?: boolean;
  rateLogs?: boolean;
  scatRep?: boolean;
  wallboard?: boolean;
  liveCalMon?: boolean;
  support?: boolean;
  crm?: boolean;
  ci?: boolean;
  qaqc?: boolean;
  videoconf?: boolean;
  SMSParametricAndPointToPoint?: boolean,
  smsotp?: boolean
}

export interface IVisibilityMenuOperator {
  role?: string;
  permissions?: string[];
}

export interface IVisibilityMenuAgent {}

export interface IPermissionDefineStore {
  error?: any;
  rolePermission?: IRolePermission | null;
  rolePermissionPersist?: any | null;
  visibilityMenu?: IVisibilityMenu | null;
  visibilityMenuOperator?: IVisibilityMenuOperator | null;
  visibilityMenuAgent?: IVisibilityMenuAgent | null;
}

export const parseJwtPayload = (token: String | null = ""): IJWT => {
  token = !token || token == "" ? getCookie("accessToken") : token;
  if (!token || token == "") {
    return {};
  }

  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let rawPayload = window.atob(base64);
  let utf8Payload = decodeURIComponent(
    Array.prototype.map
      .call(rawPayload, function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let parsedPayload = JSON.parse(utf8Payload);
  let jwt: IJWT = {
    adphone: parsedPayload["adphone"],
    adsub: parsedPayload["adsub"],
    aud: parsedPayload["aud"],
    dtkn: parsedPayload["dtkn"],
    email: parsedPayload["email"],
    exp: parsedPayload["exp"],
    iat: parsedPayload["iat"],
    nickname: parsedPayload["nickname"],
    phone: parsedPayload["phone"],
    sub: parsedPayload["sub"],
  };
  return jwt;
};

export const adminNumber = (): string => {
  const jwt = parseJwtPayload();
  return jwt.adphone != "" ? jwt.adphone : jwt.phone;
};

export const adminUserEmail = (): string => {
  return `nava-${adminNumber()}@navaphone.ir`;
};

export const getToken = (): string | null => {
  return getCookie("accessToken");
};
