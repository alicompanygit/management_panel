export interface ICallForward {
    domain_uuid?: any,
    destination_uuid?: any,
    dialplan_uuid?: any,
    destination_type?: any,
    destination_number?: any,
    destination_number_regex?: any,
    destination_context?: any,
    destination_record?: any,
    destination_app?: any,
    destination_data?: any,
    destination_enabled?: any,
}

export interface ISettingsForwardDefineStore {
    error?: any;
    callForward?: ICallForward[] | null,
}