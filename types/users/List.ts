export interface ISubUsers {
    uuid?: any,
    firstName?: any,
    lastName?: any,
    phoneNumber?: any,
    password?: any,
    data?: any,
    role?: any,
    permissions?: any,
}
export interface IPermissionsAll {
    role?: any,
    permissions?: any,
}

export interface IUsersListDefineStore {
    error?: any;
    subUsers?: ISubUsers[] | null,
    permissionsAll?: IPermissionsAll[] | null,
}