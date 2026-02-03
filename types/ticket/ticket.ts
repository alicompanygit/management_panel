import { defRAP } from '~/directives/protect';
import { parseJwtPayload } from '~/types/permission/Types';

export type TTicketData = {
  id: string;
  org_id: string;
  user_id: string;
  userAvatar: string;
  assigned_to: string;
  subject: string;
  description: string;
  ticket_number: string;
  board_id: number;
  priority_id: number;
  priority: string;
  current_flow_step_id: number;
  current_flow_step_name: string;
  communication_port_id: number;
  communication_port: string;
  next_follow_date: string | number;
  sla_id: number;
  type_id: number;
  sense_of_audience: string;
  sense_of_audience_id: number;
  product: string;
  tags: string;
  is_delete: boolean;
  is_close: boolean;
  response_due_at: string;
  creator: string;
  created_at: string;
  modifier: string;
  updated_at: string;
  ticket_type: string;
  is_archived: boolean;
};

export type TTicketCardData = {
  title: {
    current_flow_step_name: string;
    subject: string;
    communication_port: string;
    user_id: string;
    created_at: string;
    userAvatar: string;
  };
  expert: {
    priority: string;
    assigned_to: string;
    updated_at: string;
  };
  description: {
    description: string;
  };
  allItems: TTicketData;
};

type TTicketHeader = {
  title: string;
  key: string;
};
export type TPaginator = {
  page: number;
  itemsPerPage: number;
};

export interface IMailBox {
  tickets: TTicketData[];
  ticketCount: number;
  headers: TTicketHeader[];
  isFetching: boolean;
  paginator: TPaginator;

  setTickets(ticketList: TTicketData[]): void;
  setIsFetching(state: boolean): void;
  setPaginator(paginator: TPaginator): void;
  setTicketCount(count: number): void;
}

export class MailBox implements IMailBox {
  tickets: TTicketData[] = [];
  ticketCount: number = 0;
  headers: TTicketHeader[];
  isFetching: boolean = false;
  paginator: TPaginator = {
    page: 1,
    itemsPerPage: 10,
  };

  constructor() {
    this.headers = [
      { title: 'ردیف', key: 'index' },
      { title: 'عنوان', key: 'subject' },
      { title: 'ایجاد کننده', key: 'creator' },
      { title: 'تاریخ آخرین وظیفه', key: 'updated_at' },
      { title: 'وضعیت', key: 'current_flow_step_name' },
      { title: 'کارشناس پیگیری', key: 'assigned_to' },
      // { title: 'وظیفه بعدی', key: 'next_follow_date' },
      { title: 'مخاطب', key: 'contact_info' },
      { title: 'اولویت', key: 'priority' },
      { title: 'درگاه ارتباطی', key: 'communication_port' },
      { title: 'نوع', key: 'ticket_type' },
      { title: 'توضیحات', key: 'description' },
      { title: 'عملیات', key: 'actions' },
    ];

    const userTaskViewPermission = defRAP('task', 'view');
    if (userTaskViewPermission) {
      this.headers.splice(6, 0, {
        title: 'وظیفه بعدی',
        key: 'upcoming_task',
      });
    }
  }

  setTickets(ticketList: TTicketData[]) {
    this.tickets = ticketList;
  }
  setIsFetching(state: boolean) {
    this.isFetching = state;
  }
  setPaginator(paginator: TPaginator) {
    this.paginator = paginator;
  }
  setTicketCount(count: number) {
    this.ticketCount = count;
  }
}

export type TSelectType = { id: number; name: string };

type TTicketCreateForm = {
  subject: string;
  user_id: string | undefined;
  board_id: TSelectType | null;
  current_flow_step_id: TSelectType | null;
  assigned_to: string | null;
  priority_id: TSelectType | null;
  communication_port_id: TSelectType | null;
  description: string;
  type_id: TSelectType | null;
  sense_of_audience_id: TSelectType | null;
  option_id: string;
  product: {
    currency_id: number;
    id: string;
    name: string;
    option_id: string;
    price: number;
  } | null;
  tags: string;
  attachments_ids: string[];
  user_type: string;
};

export interface ITicketCreateForm {
  form: TTicketCreateForm;

  isFetching: boolean;
  isFormValid: boolean;

  userList: TSelectType[];
  boardList: TSelectType[];
  stepList: TSelectType[];
  assignedToList: TSelectType[];
  priorityList: TSelectType[];
  communicationPortList: TSelectType[];
  typeList: TSelectType[];
  customerSense: TSelectType[];

  clearForm(): void;
}

export class TicketCreateForm implements ITicketCreateForm {
  form: TTicketCreateForm = {
    subject: '',
    user_id: undefined,
    board_id: null,
    current_flow_step_id: null,
    assigned_to: null,
    priority_id: null,
    communication_port_id: null,
    description: '',
    type_id: null,
    sense_of_audience_id: null,
    option_id: '',
    product: null,
    tags: '',
    attachments_ids: [],
  };

  isFetching: boolean = false;
  isFormValid: boolean = false;

  // for populating select inputs by id
  userList: TSelectType[] = [];
  boardList: TSelectType[] = [];
  assignedToList: TSelectType[] = [];
  stepList: TSelectType[] = [];
  priorityList: TSelectType[] = [];
  communicationPortList: TSelectType[] = [];
  typeList: TSelectType[] = [];
  customerSense: TSelectType[] = [];

  constructor() {}

  clearForm() {
    this.form = {
      subject: '',
      user_id: '',
      board_id: null,
      current_flow_step_id: null,
      assigned_to: null,
      priority_id: null,
      communication_port_id: null,
      description: '',
      type_id: null,
      sense_of_audience_id: null,
      option_id: '',
      product: null,
      tags: '',
      attachments_ids: [],
    };
  }
}

type TReplyBase = {
  ticket_id: string | null;
  parent_reply_id: number | null;
  sender_id: string;
  message: string;
  attachments_ids: string[];
  current_step_id: number | null;
};

export type TReplyForm = TReplyBase & {
  file: File | null;
};

export type TReplyData = TReplyBase & {
  created_at: string;
  id: string;
  sender_name: string;
  file: string;
  fileName: string;
};

export interface IReplyForm {
  form: TReplyForm;
  isFetching: boolean;
  isFormValid: boolean;
  clearForm(): void;
  setFetching(isFetching: boolean): void;
  setInitial(ticketData: TTicketData | null): void;
  finalizeStepIdBeforeSubmit(): void;
}

export class ReplyForm implements IReplyForm {
  form: TReplyForm = {
    ticket_id: null,
    parent_reply_id: null,
    sender_id: '',
    message: '',
    attachments_ids: [],
    current_step_id: null,
    file: null,
  };

  private initial_step_id: number | null = null;

  isFetching: boolean = false;
  isFormValid: boolean = false;

  constructor() {}

  clearForm() {
    this.form = {
      ticket_id: null,
      parent_reply_id: null,
      sender_id: '',
      message: '',
      attachments_ids: [],
      current_step_id: null,
      file: null,
    };
  }

  setFetching(isFetching: boolean) {
    this.isFetching = isFetching;
  }

  setInitial(ticketData: TTicketData | null) {
    if (!ticketData) return;
    const jwt = parseJwtPayload();
    this.initial_step_id = ticketData.current_flow_step_id;
    this.form.current_step_id = ticketData.current_flow_step_id;
    this.form.ticket_id = ticketData.id;
    this.form.sender_id = jwt.sub;
  }

  finalizeStepIdBeforeSubmit() {
    if (this.form.current_step_id === this.initial_step_id) {
      this.form.current_step_id = 0;
    }
  }
}

export type TFormSelectType = {
  id: number;
  type: string;
  value: string;
};

export type TBoard = {
  created_at: string;
  creator: string;
  description: string;
  id: number;
  name: string;
  orgId: string;
  is_default: boolean;
};
export type TBoardState = {
  id: number;
  creator: string;
  board_id: number;
  orders: number;
  name: string;
  description: string;
  created_at: string;
  tickets: TTicketData[];
  disabled: boolean;
};
export interface ITicketBoard {
  list: TBoard[];
  selectedBoard: TBoard | null;
  states: TBoardState[];
  selectedState: TBoardState | null;
}

export class TicketBoard implements ITicketBoard {
  list: TBoard[] = [];
  selectedBoard: TBoard | null = null;
  states: TBoardState[] = [];
  selectedState: TBoardState | null = null;

  constructor() {}
}

type TTicketCardHeader = {
  key: string;
  align: string;
  width: string;
};

export interface ICardBox {
  tickets: TTicketCardData[];
  ticketCount: number;
  headers: TTicketCardHeader[];
  isFetching: boolean;

  setTickets(ticketList: TTicketCardData[]): void;
}
export class CardBox implements ICardBox {
  tickets: TTicketCardData[] = [];
  ticketCount: number = 0;
  headers: TTicketCardHeader[];
  isFetching: boolean = false;

  constructor() {
    this.headers = [
      { key: 'index', align: 'start', width: '1%' },
      { key: 'title', align: 'start', width: '' },
      { key: 'expert', align: 'center', width: '' },
      { key: 'description', align: 'end', width: '' },
    ];
  }

  setTickets(ticketList: TTicketCardData[]) {
    this.tickets = ticketList;
  }
}

// ----------------------------------------------------------------------------- Ticket By Id
export interface ITicket {
  detail: TTicketData | null;
  isFetching: boolean;

  setIsFetching(state: boolean): void;
  setDetail(ticket: TTicketData): void;
}

export class Ticket {
  detail: TTicketData | null = null;
  isFetching: boolean = false;
  constructor() {}

  setIsFetching(state: boolean) {
    this.isFetching = state;
  }
  setDetail(ticket: TTicketData) {
    this.detail = ticket;
  }
}

export interface ITicketUser {
  Avatar: string;
  avatarUrl: string;
  created_at: string;
  email: string;
  name: string;
  phone_number: string;
  submitter_operator: string;
  telegram_phone: string;
  ulid: string;
  whatsApp_phone: string;

  // created_at: string
  // created_by_phone: string
  // form_type: string
  // form_ulid: string
  // org_id: string
  // service_type: string
  // ulid: string
  // updated_at: string
  // values: {
  //     Avatar: string
  //     email: string
  //     name: string
  //     phone_number: string
  //     submitter_operator: string
  //     telegram_phone: string
  //     whatsApp_phone: string
  // }
}

// ----------------------------------------------------------------------------- Filters
export interface IFilter {
  // allParams: string
  priority_id: number;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  ticket_number: string;
  from_next_followup_task_date: string | null;
  to_next_followup_task_date: string | null;

  isFilterOn: boolean;
  calcIsFilter(): void;
}

export class Filter implements IFilter {
  // allParams: string = ""
  priority_id: number = 0;
  assigned_to: string | null = null;
  created_at: string = '';
  updated_at: string = '';
  ticket_number: string = '';
  from_next_followup_task_date: string | null = null;
  to_next_followup_task_date: string | null = null;

  isFilterOn: boolean = false;

  constructor() {}

  calcIsFilter() {
    if (
      this.priority_id === 0 &&
      this.assigned_to === null &&
      this.created_at === '' &&
      this.updated_at === '' &&
      this.ticket_number === ''
    )
      this.isFilterOn = false;
    else this.isFilterOn = true;
  }
}

// ----------------------------------------------------------------------------- Components
export type TTicketAction = {
  id: number;
  icon: string;
  title: string;
  action: () => void;
  hasPermission: boolean;
};

export type TTicketActionTypes = 'call' | 'note' | 'task' | 'assign' | 'reply';
