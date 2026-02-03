export interface ITaskState {
  tasks: {
    all: any[];
    today: any[];
    past: any[];
    future: any[];
  };
  totalItems: {
    all: number;
    today: number;
    past: number;
    future: number;
  };
  isSearched: boolean;
  numbers: any[];
  taskListCursor: string;
  taskList: any[];
  rawTaskList: any[];
  preventRewriteAssociates: boolean;
  addTaskForm: {
    associates: {
      object_id: string;
      object_type: string;
    }[];
    recurrence_type?: TRecurrence['type'];
    recurrence_count?: TRecurrence['count'];
    recurrence_end_date?: TRecurrence['endDate'];
    task: {
      assignee: string;
      creator: string;
      description: string;
      end_timestamp: number;
      file_id: string;
      file_name: string;
      pinned: boolean;
      priority: number | null;
      remind_timestamp: number;
      start_timestamp: number;
      status: number;
      title: string | null;
      type: number;
    };
  };
  addCommentForm: {
    created: string;
    task_id: number;
    text: string;
    ulid: string;
    user_id: string;
  };
  selectedUserNumber: string;
  disableMessageList: boolean;
  selectedConnections: {
    people: any[];
    companies: any[];
    deal: any[];
    lead: any[];
    ticket: any[];
  };
  toTimestamp: {
    fromDate: string | null;
    toDate: string | null;
  };
  timestampMessage: any;
  remindId: number;
  remindDatePicker: any;
  fileUpload: any;
  taskID: string;
  logs: any[];
  historyCursor: string;
  info: {
    date: string;
    title: string;
  };
  isOpenTaskHistory: boolean;
}

export type TTaskModel = {
  assignee: string | null;
  associates?: TTaskAssociates[];
  completion_timestamp: number;
  created: string;
  creator: string;
  description: string | null;
  end_timestamp: number;
  file_id: string | null;
  file_name: string | null;
  id: number;
  pinned: boolean;
  priority: number;
  remind_timestamp: number;
  start_timestamp: number;
  status: number;
  title: string;
  type: number;
};

export type TTaskAssociates = {
  object_id: string;
  object_type: string;
  task_id: number;
};

export type TRecurrence = {
  type: 'daily' | 'weekly' | 'monthly';
  count: number | null;
  endDate: number | null;
};

// history
export interface ITaskHistoryResponse {
  data: ITaskHistoryData;
  message: string;
  status: number;
}
export interface ITaskHistoryData {
  cursor: string;
  log_history: IHistory[];
}
export interface IHistory {
  column_name: string;
  column_name_farsi: string;
  commit_type: string;
  commiter: string;
  created: string;
  table_name: string;
  task_id: string;
  ulid: string;
}

// status
export enum Status {
  Planned = 0,
  Done = 1,
  Expired = 2,
}
export const StatusLabels: Record<Status, string> = {
  [Status.Planned]: 'برنامه‌ریزی شده',
  [Status.Done]: 'انجام شده',
  [Status.Expired]: 'منقضی شده',
};

// priority
export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
}
export const PriorityLabels: Record<Priority, string> = {
  [Priority.Low]: 'پایین',
  [Priority.Medium]: 'متوسط',
  [Priority.High]: 'بالا',
};
