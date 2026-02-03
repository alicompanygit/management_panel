export interface IDialplan {
    app_uuid?: any,
    dialplan_context?: any,
    dialplan_continue?: any,
    dialplan_description?: any,
    dialplan_enabled?: any,
    dialplan_name?: any,
    dialplan_number?: any,
    dialplan_order?: any,
    dialplan_uuid?: any,
    domain_uuid?: any,
    hostname?: any,
}
export interface IDialplans {
    dialplans?: IDialplan[],
}
export interface IDialplanDetail {
    dialplan_detail_break?: any,
    dialplan_detail_data?: any,
    dialplan_detail_data_start?: any,
    dialplan_detail_data_end?: any,
    dialplan_detail_data_value?: any,
    dialplan_detail_group?: any,
    dialplan_detail_inline?: any,
    dialplan_detail_order?: any,
    dialplan_detail_tag?: any,
    dialplan_detail_type?: any,
    dialplan_detail_uuid?: any,
    dialplan_uuid?: any,
    domain_uuid?: any,
}
export interface IExtra {
    dialplan_details?: IDialplanDetail[],
}
export interface IDialplanExtra {
    dialplan?: IDialplan,
    extra?: IExtra,
}
export interface IEmail {
    email?: any,
}
export interface IUser {
    user?: IEmail,
}
export interface ITimeConditionDelete extends IUser {
    timecondition?: any,
}
export interface ITimeConditionGet extends IUser {
    dialplan?: IDialplan
}
export interface ITimeConditionPost {
    user: {
		email: string
    },
    dialplan: {
        dialplan_description: string,
		dialplan_enabled: string,
		dialplan_name: string,
		dialplan_number?: string | any,
		dialplan_order: number | any,
		dialplan_uuid?: string | any,
        [key: string]: string | any,
        dialplan_action: {
            [key: string]: string,
        } | any,
        value: {
            [key: string]: {
                [key: string]: {
                    start: string,
                    stop: string,
                },
            },
        } | any,
        variable: {
            custom: {
                [key: string]: {
                    [key: string]: string,
                },
            },
        } | any,
    },
}

export interface ISettingsTimeConditionDefineStore {
    error?: any;
    dialplans?: IDialplans | null,
    dialplanExtra?: IDialplanExtra | null,
    user?: IUser | null,
    timeConditionDelete?: ITimeConditionDelete | null,
}