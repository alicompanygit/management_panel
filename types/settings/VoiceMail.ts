export interface IVoiceMail {
    domain_uuid?: any,
    voicemail_uuid?: any,
    voicemail_id?: any,
    greeting_id?: any,
    voicemail_mail_to?: any,
    voicemail_file?: any,
    voicemail_enabled?: any,
}
export interface IVoiceMailUploadFilePosted {
    id?: any,
    md5?: any,
}
export interface IVoiceMailToGreeting {
    fileId?: any,
    name?: any,
    type?: any,
    voicemail_id?: any,
    greeting_id?: any,
}
export interface IVoiceMailMessage {
    domain_uuid?: any,
    voicemail_uuid?: any,
    voicemail_message_uuid?: any,
    created_epoch?: any,
    caller_id_name?: any,
    caller_id_number?: any,
    message_length?: any,
}

export interface ISettingsVoiceMailDefineStore {
    error?: any;
    voiceMail?: IVoiceMail[] | null,
    voiceMailUploadFilePosted?: IVoiceMailUploadFilePosted | null,
    voiceMailMessage?: IVoiceMailMessage[] | null,
}