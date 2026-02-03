export interface IFaxState {
    faxes: IFax[];
    loading: boolean;
    error: string | null;
    retrySendFax: string;
    reports: IReport[];
    setting: any;
    initialState: boolean;
    receiveInitialState: boolean
}
export interface IFax {
    FaxUUID: string;
    FaxName: string;
    FaxExtension: string;
    FaxEmail: string;
}
export interface ISetting {
    subcategory: string;
    value: string
}
export interface IDomainSettings {
    domain_settings?: ISetting[];
    default_settings?: ISetting[];
}
export interface IReport {
    id: string;
    status: string;
    date: string;
    time: string;
    number: string;
    extension: string;
    file: string;
    localFile?: string;
    fileName: string
}
export interface IFilterFax {
    direction: string,
    page: number,
    fromDate?: string,
    toDate?: string,
    peerPhoneNumber?: string,
    faxStatus?: string,
}

export interface ISendFax {
    fax_uuid: string | null,
    destination_number: string,
    description: string,
    dtmf: string,
    file: File | null,
}