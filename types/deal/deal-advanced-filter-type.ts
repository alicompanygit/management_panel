import type { TDealBoard } from './deal-type';

export type TDealAdvancedFilterCriteria = {
  all_parameters: string;
  buyer_Ids: string[];
  create_time_period: number[];
  followup_operator: string[];
  expected_date_of_closure: number[];
  delayed_transaction: boolean;
  step_id: number[];
  priority: string[];
  product_ids: string[];
  currency: string[];
  start_price: number;
  end_price: number;
  related: string[];
  board_id: number | TDealBoard;
  next_followup_timestamp_period: number[];
  reason_for_failure: string[];
  exist_any_invoice: boolean;
  invoice_status: (
    | 'پیش نویس'
    | 'پرداخت شده'
    | 'ابطال شده'
    | 'ارسال شده'
    | 'منقضی شده'
  )[];
  payment_date_start: string;
  payment_date_end: string;
  send_date_start: string;
  send_date_end: string;
  last_done_duty_date: number[];
  buyer_name: string;
  buyer_phone: string;
  result: ('ناموفق' | 'موفق')[];

  // table and card
  page: number;
  page_size: number;

  // kanban
  order_by_create_time: boolean;
  order_by_update_at: boolean;
  order_by_next_followup: boolean;
  order_by_remaining_timestamp: boolean;
  order_by_price: boolean;
  descending: boolean;
};

export type TAugmentedDealAdvancedFilterCriteria =
  TDealAdvancedFilterCriteria & {
    create_time_period_start: string;
    create_time_period_end: string;
    expected_date_of_closure_start: string;
    expected_date_of_closure_end: string;
    next_followup_timestamp_period_start: string;
    next_followup_timestamp_period_end: string;
    last_done_duty_date_start: string;
    last_done_duty_date_end: string;
    buyer_Ids: string[];
    creator: string[];
  };
