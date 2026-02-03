export interface ITenent {
  id?: any;
  siteName?: any;
}
export interface IAgent {
  tenentId?: any;
  id?: any;
  phone_number?: any;
  title?: any;
  token?: any;
}
export interface IAgentToken {
  jwt?: any;
}
export interface IListGet {
  phoneNumber?: any;
  tenent_id?: string;
  agent_id?: string;
  queue_id?: string;
  from_date?: string;
  to_date?: string;
}
export interface IList {
  tenentID?: any;
  agentID?: any;
  agentUserID?: any;
  uuid?: any;
  nickName?: any;
  phoneNumber?: any;
  email?: any;
  avatar?: any;
}
export interface IOtoConversation {
  from?: any;
  to?: any;
  mtype?: any;
  creation_time?: any;
  lastmessage?: any;
  lastseenguid?: any;
  lastseentype?: any;
  lastdeliverstatus?: any;
  badge?: any;
  aftermodified?: any;
  beforemodified?: any;
}
export interface IDialog {
  errcode?: any;
  errmsg?: any;
  id?: any;
  otoconversation?: IOtoConversation[];
}
export interface IDialogGet {
  jwt?: string;
  targetuserids?: string[];
}
export interface ILastMessageGet {
  jwt?: string;
  uuid?: string;
  count?: number;
}
export interface ILastMessage {
  errcode?: any;
  errmsg?: any;
  id?: any;
  messages?: IMessage[];
}
export interface IMessage {
  mtype?: any;
  guid?: any;
  to?: any;
  from?: any;
  message?: any;
  title?: any;
  creation_time?: any;
  deliverstatus?: any;
  body?: any;
  /*
    body?: {
        mtype?: any,
        to?: any,
        from?: any,
        message?: any,
        title?: any,
        edit_state?: any,
        modification_time?: any,
        data?: {
            description?: any,
            duration?: any,
            fileId?: any,
            guid?: any,
            id?: any,
            md5?: any,
            name?: any,
            nickname?: any,
            sample?: any,
            size?: any,
            source?: any,
            ts?: any,
            type?: any,
        },
    },
    */
  data?: {
    guid?: any;
    id?: any;
    mtype?: any;
    nickname?: any;
    source?: any;
    to?: any;
    ts?: any;
    description?: any;
    duration?: any;
    fileId?: any;
    md5?: any;
    name?: any;
    sample?: any;
    size?: any;
    type?: any;
  };
}
export interface IMessageSend {
  jwt?: string;
  data?: {
    guid?: any;
    stt?: any;
    nickname?: any;
    source?: any;
    description?: any;
    duration?: any;
    fileId?: any;
    md5?: any;
    name?: any;
    sample?: any;
    size?: any;
    type?: any;
  };
  id?: any;
  message?: any;
  mtype?: any;
  title?: any;
  to?: any;
}
export interface IMessageSeen {
  uuid?: any;
  id?: any;
  guid?: any;
  ts?: any;
}

export interface IWebChatConversationsDefineStore {
  error?: any;
  list?: IList[] | null;
  dialog?: IDialog | null;
  agentToken?: IAgentToken | null;
  lastMessages?: ILastMessage | null;
  cursor: String;
  chatAnswered: boolean;
}
