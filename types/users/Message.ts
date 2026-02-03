export interface INumber {
    number?: string,
    checked?: boolean,
}
export interface IMessage {
    agents?: string[],
    channelName?: string,
    message?: string,
}

export interface IUsersMessageDefineStore {
    error?: any;
    message?: IMessage | null,
}