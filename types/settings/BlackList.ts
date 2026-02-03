export interface IBlock {
    domain_uuid?: any,
    call_block_uuid?: any,
    call_block_name?: any,
    call_block_number?: any,
    call_block_action?: any,
    Date_added?: any,
    call_block_enabled?: any,
}

export interface ISettingsBlockDefineStore {
    error?: any;
    blackList?: IBlock[] | null,
}