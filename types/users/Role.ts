export interface IRolePermissions {
    role?: string;
    permissions?: string[];
}

export interface IUsersRoleDefineStore {
    error?: any;
    rolePermissionsAll?: IRolePermissions[] | null,
    rolePermissions?: IRolePermissions | null,
}