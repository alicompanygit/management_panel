export interface IUsersState {
    users: IUser[];
}
export interface IUser {
    id: string,
    phoneNumber: String,
    username: String,
    status: Boolean,
    loading?: Boolean,
    duration: String,
}