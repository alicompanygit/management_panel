import { type TBoard } from './ticket';

export type TAdvancedFilterCriteria = {
  is_archived: boolean;
  allParams?: string;
  user_ids: string[];
  type_ids: string[];
  creators_ids: string[];
  assigned_to: string[];
  priority_id: number[];
  communication_port_id: number[];
  board_id: number | TBoard;
  department: number[];
  current_flow_step_id: number[];
  products: string[];
  sense_of_audience_id: number[];
  created_at_start: string;
  created_at_end: string;
  ids: string[];
  next_follow_up_start: string;
  next_follow_up_end: string;
  update_at_start: string;
  update_at_end: string;
  next_follow_up_date: string;
  created_at_order: string;
  updated_at_order: string;
  order_type: string;
  is_closed: boolean;
  closed_at_start: string;
  closed_at_end: string;

  page: number;
  page_size: number;
};
