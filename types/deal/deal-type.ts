import { type Component } from 'vue';
import type { TAccess } from '~/composables/settings/roles-and-permissions/AccessEntries';
import { type INNavaNumber } from '~/types/users/Operator';
import { type TProduct } from '../select/select-product-type';

export type TDealApiResponse<G> = {
  data: G;
  message: string;
  status: number;
};

// =======================================> Form <=======================================

export type TDealForm = {
  ci_data: {
    title: string;
    formType: 'حقیقی' | 'حقوقی';
    buyer:
      | {
          ulid: string;
          fullname: string;
          phone_number: string;
        }
      | undefined;
    followUpOperator: { id: string; name: string } | null;
    priority: 'بدون اولویت' | 'متوسط' | 'بالا' | 'پایین' | null;
    remainingTimestamp: string;
    currency: { id: number; name: string } | null;
    price: string;
  };
  deal_data: {
    board: TDealBoard | null;
    step: TDealStep | null;
    creator_phone: string;
    selected_connections: {
      [key: string]: {
        ulid: string;
        name: string;
      }[];
    };
    productList: {
      product: TProduct | null;
      stock: string;
    }[];
  };
  front_end_fields: {
    payment_type: 'ورود مبلغ' | 'بر اساس محصول';
    currencyList: TCurrency[];
    deal_id: number | null;
  };
};
export type TAssociation = {
  object_id: string;
  object_type: string;
};

export type TCurrency = {
  id: number;
  currencyName: string;
  currencyCode: string;
  symbol: string;
};
// export type TDealApiBody = {
//     associates: TAssociation[],
//     board_id: number,
//     created_by_phone: string,
//     step_id: number,
//     product_list?: {
//         product_id: string
//         stock: number
//     }[]
//     values: {
//         title: string
//         form_type: ('حقیقی' | 'حقوقی')[],
//         buyer_ulid: string
//         follow_up_operator: string
//         priority: ("بدون اولویت" | "متوسط" | "بالا" | "پایین")[]
//         remaining_timestamp: number
//         currency: ("پوند" | "یورو" | "دلار" | "ریال")[]
//         price: number
//     }

// }
export type TDealUpsertApiBody = {
  associates: TAssociation[] | null;
  board_id: number;
  created_by_phone: string;
  step_id: number;
  products?: {
    count: number;
    product_id: string;
  }[];

  buyer_form_type: 'حقیقی' | 'حقوقی';
  buyer_name: string;
  buyer_phone: string;
  buyer_ulid: string;
  currency: string;
  followup_operator: string;
  remaining_timestamp: number | undefined | null;
  priority: 'بدون اولویت' | 'متوسط' | 'بالا' | 'پایین' | null;
  result: 'در حال انجام' | 'موفق' | 'ناموفق';
  price: number;
  title: string;
  invoices?: string[];
};

// =======================================> Lists, Boards, Steps and Paginator  <=======================================

export type TDealGetDealListApiBody = {
  board_id?: number;
  buyer_ulid?: string;
  buyer_name?: string;
  buyer_phone?: string;
  create_time_period?: number[];
  next_followup_timestamp_period?: number[];
  descending?: boolean;
  followup_operator?: string;
  order_by_create_time?: boolean;
  order_by_next_followup?: boolean;
  order_by_price?: boolean;
  order_by_remaining_timestamp?: boolean;
  order_by_update_at?: boolean;
  page?: number;
  page_size?: number;
  priority?: 'پایین' | 'متوسط' | 'بالا' | 'بدون اولویت' | null;
  step_id?: number;
  result?: 'در حال انجام' | 'موفق' | 'ناموفق' | undefined;
};

export type TPopulatedDealListData = {
  steps: TDealStep[] | null;
  buyers: TPopulatedUser[] | null;
  creator: TPopulatedAgent[] | null;
};

export type TDealBoard = {
  id: number;
  dtkn: string;
  created_at: string;
  creator: string;
  is_default: boolean;
  name: string;
  description: string;
};
export type TDealStep = {
  board_id: number;
  created_at: string;
  dtkn: string;
  id: number;
  position: string;
  title: string;
};
export type TPaginator = {
  page: number;
  itemsPerPage: number;
};
export type TDealPaginator = {
  table_view: TPaginator;
  kanban_view: TPaginator;
};
export type TDealTableHeader = {
  title: string;
  key: keyof TDeal | 'index' | 'actions';
  align?: string;
};

// =======================================> Filter <=======================================
export type TFilterApiBody = {
  board_id: number | null;
  step_id: number | null;
  priority_id: string | null;
  follow_up_operator_id: string | null;
};
export interface IFilter {
  board: TDealBoard | null;
  step: TDealStep | null;
  user_name_or_phone: string | null;
  priority: 'بدون اولویت' | 'متوسط' | 'بالا' | 'پایین' | null;
  follow_up_operator: string | null;
  from_created_date: string | null;
  to_created_date: string | null;
  from_next_followup_task_date: string | null;
  to_next_followup_task_date: string | null;

  clear(): void;
}
export class Filter implements IFilter {
  board: TDealBoard | null = null;
  step: TDealStep | null = null;
  user_name_or_phone: string | null = null;
  priority: 'بدون اولویت' | 'متوسط' | 'بالا' | 'پایین' | null = null;
  follow_up_operator: string | null = null;
  from_created_date: string | null = null;
  to_created_date: string | null = null;
  from_next_followup_task_date: string | null = null;
  to_next_followup_task_date: string | null = null;

  constructor() {}

  clear() {
    this.board = null;
    this.step = null;
    this.priority = null;
    this.follow_up_operator = null;
    this.from_created_date = null;
    this.to_created_date = null;
    this.from_next_followup_task_date = null;
    this.to_next_followup_task_date = null;
  }
}

// =======================================> ID <=======================================
export type TDealActionTypes = 'all' | 'call' | 'note' | 'sms' | 'task';
export type TDeal = {
  archived: boolean;
  associates: {
    deal_id: number;
    object_id: string;
    object_type: string;
  }[];
  board_id: number;
  buyer_name: string;
  buyer_form_type: 'حقیقی' | 'حقوقی';
  buyer_ulid: string;
  ci_ulid: string;
  deal_ulid: string;
  created_at: string;
  currency: string[];
  description: string;
  followup_operator: string;
  id: number;
  next_follow_up_timestamp: number;
  notes: string[];
  price: number;
  priority: 'پایین' | 'متوسط' | 'بالا' | 'بدون اولویت' | null;
  products: {
    count: number;
    deal_id: number;
    id: number;
    product_id: string;
  }[];
  remaining_timestamp: number;
  upcoming_task: Record<string, any> | null;
  result: 'در حال انجام' | 'موفق' | 'ناموفق';
  step_id: number;
  title: string;
  updated_at: string;
  invoices: string[] | null;
};

export type TDealInvoiceList = {
  data: string[];
  message: string;
  status: number;
};

export type TPopulatedDealData = {
  buyer: TPopulatedUser | null;
  creator: TPopulatedAgent | null;
};

// =======================================> Activities <=======================================
export type TDealActivity = {
  label: string;
  value: string;
  component: Component;
  permissionKey?: TAccess[];
};

// =======================================> Global <=======================================
export type TDealAction = {
  id: number;
  hasPermission?: boolean;
  icon: string;
  title: string;
  action: () => void;
};

export type TPopulatedUser = {
  Avatar: boolean;
  avatarUrl: string | null;
  created_at: string;
  name: string;
  firstname: string;
  phone_number: string;
  submitter_operator: string;
  ulid: string;
  company_name?: string;
};
export type TPopulatedAgent = INNavaNumber;
