import type { TAccess } from '~/composables/settings/roles-and-permissions/AccessEntries';

export interface IContactState {
  leftDrawerIsOpen: boolean;
  submitedData: any[];
  states: IState[];
  cities: any[];
  totalPages: number;
  totalItems: number;
  isOpenForm: boolean;
  isOpenFilter: boolean;
  formData: { [key: string]: any };
  searchData: { [key: string]: any };
  searchFromDate: string | null;
  searchToDate: string | null;
  targetItem: { [key: string]: any };
  add_drawer: boolean;
  hasEditPermission: boolean;
  notes: string[];
}

// forms
export interface IFormState {
  isFetchingForm: boolean;
  formsList: IForm[];
  targetForm: IForm | null;
  peopleForm: IForm | null;
  companiesForm: IForm | null;
}

export interface IFormState {
  isFetchingForm: boolean;
  formsList: IForm[];
  targetForm: IForm | null;
  peopleForm: IForm | null;
  companiesForm: IForm | null;
}

export interface IFormState {
  isFetchingForm: boolean;
  formsList: IForm[];
  targetForm: IForm | null;
  peopleForm: IForm | null;
  companiesForm: IForm | null;
}

export interface IForm {
  created_at: string;
  created_by_phone: string;
  description: string;
  org_id: string;
  sections: ISection[];
  fields?: IField[];
  service_type: string;
  title: string;
  type: string;
  ulid: string;
}

export interface ISection {
  name: string;
  title: string;
  fields: IField[];
}

export interface IField {
  additional_info: {
    multiplier?: number;
    url?: string;
  };
  language: string;
  main_field: boolean;
  main_field_position: number;
  max: null;
  min: null;
  name: string;
  options_available_list: string[] | null;
  read_only: boolean;
  required: boolean;
  size: number;
  title: string;
  type: string;
  visible: boolean;
}

export interface IState {
  id: number;
  name: string;
}

export interface IHeader {
  title: string;
  key: string;
  main_field_position?: number;
}

export interface getSubmitedDataParams {
  page?: number;
  count?: number;
  type?: string;
  contains?: string;
  notSetData?: boolean;
}

// tabs
export interface ITabState {
  allTabs: ITab[];
  peopleTabState: ITab[];
  companyTabState: ITab[];
  activeTab: string;
}
interface ITab {
  label: string;
  value: string;
  component?: any;
  permissionKey?: TAccess[];
}

// calls
export interface IContactCallState {
  calls: {
    all: any[];
    outgoing: any[];
    incoming: any[];
    missed: any[];
  };
  callsCount: {
    all: number;
    outgoing: number;
    incoming: number;
    missed: number;
  };
  lastPlayedId: string | null;
  lastPlayedAudio: HTMLAudioElement | null;
  callerInfo: Record<string, any>;
}

// sms
export interface ISmsState {
  numbers: string[];
  messages: IMessages;
  selectedUserNumber: string;
  disableMessageList: boolean;
}
interface IMessages {
  [key: string]: IMessage[];
}
interface IMessage {
  delivered: boolean;
  sender?: string;
  content: string;
  time: string;
  date?: string;
  dateTime?: string;
  isFromMe: boolean;
  showAvatar?: boolean;
}

export type TGroupDelete = {
  commiterPhone: string;
  service_type: string;
  ulid: string[];
};
