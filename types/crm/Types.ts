export interface ICrmState {
  loading: boolean;
  error: string | null;
  phones: any[];
  users: any[];
  crms: any[];
  modals: any;
  editMode: boolean;
  currentPhone: string | number;
  crmTypes: any[];
  crmForm: any;
  linkForm: any;
  isLoadingNumbersTable: boolean;
  isLoadingCrmsTable: boolean;
  isLoadingUsersTable: boolean;
  selectedUrl: string;
  selectedCrmType: string;
}
