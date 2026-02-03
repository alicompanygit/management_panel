export interface IChatState {
  currentNumber: number | string;
  numbers: any[];
  showVerifyNumberModal: boolean;
  isOpenAddWebsiteModal: boolean;
  itemSelected: any[];
  isLoadingTable: boolean;
  searchKey: boolean;
  targetNumberId: number | string;
}

export interface ITableDataSource {
  loading: boolean;
  headers: any[];
  items: any[];
}
