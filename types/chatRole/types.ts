export interface IChatRoleState {
  tableDataSource: ITableDataSource;
  roles: any[];
  subUsers: any[];
  itemSelected: any[];
  isLoadingSelect: boolean;
  editMode: boolean;
  selectedRole: { [key: string]: any };
}

export interface ITableDataSource {
  loading: boolean;
  headers: any[];
  items: any[];
}
