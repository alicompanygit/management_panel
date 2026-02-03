export type TDealApiResponse<G> = {
    data: G
    message: string
    status: number
}
export type TOtpForm = {
    title: string,
    otp_length: number | null,
    ttl: number | null,
    rate_limit_per_hour_for_phone: number | null,
    maximum_attempts: number | null,
    website_name: string,
    website_url: string,
    src_phone: string | null,
    message: string,
}
export type TOtpTableHeader = {
    title: string;
    key: string;
    align: 'start' | 'center' | 'end';
}

export type TOtpFiltersItem = {
    website_name_or_title_or_message: string,
}

export type TOtpList = {
    created_at: string,
    id: number,
    maximum_attempts: number,
    message: string,
    otp_length: number,
    rate_limit_per_hour_for_phone: number,
    src_phone: string,
    title: string,
    ttl: number,
    website_name: string
    website_url: string
}

export type TSendTestParameters = {
    parameters: {
            name: string,
            value: string
    }[],
    phone: string,
    template_id: number
}

export type TApiKeyAdd = {
    label: string
}

export type TUpdateList = {
    maximum_attempts: number,
    message: string,
    otp_length: number,
    rate_limit_per_hour_for_phone: number,
    src_phone: string,
    title: string,
    ttl: number,
    website_name: string,
    website_url: string
}