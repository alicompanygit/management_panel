export interface IDepartmentState {
  allQueuesOfSelectedTenent: any[];
  userTenents: any[];
  loading: boolean;
  error: string | null;
  selectedTenent: { [key: string]: any };
  tableDataSource: ITableDataSource;
  newQueueName: string | null;
  newQueueDescription: string | null;
  isOpenAdd: boolean;
  editMode: boolean;
  selectedRow: { [key: string]: any };
  isOpenAgent: boolean;
  agentsOfSelectedTenent: any[];
  allAgentsOfSelectedTenent: any[];
  isLoadingAgentsOfSelectedTenent: boolean;
  isLoadingAllAgentsOfSelectedTenent: boolean;
  isLoadingUserTenents: boolean;
  isLoadingAllQueuesOfSelectedTenent: boolean;
  isLoadingActiveInactive: boolean;
}

export interface IAgentQueueListByTenent {
  tenent_id: string;
}

export interface userTenents {}

export interface ITableDataSource {
  loading: boolean;
  headers: any[];
  items: any[];
}
