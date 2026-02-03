import type { Component } from 'vue';
import type { TAccess } from '~/composables/settings/roles-and-permissions/AccessEntries';

// tabs
export interface ITicketTab {
  label: string;
  value: string;
  component: Component;
  permissionKey?: TAccess[];
}

export interface ITicketNote {
  created_at: string;
  creator: string;
  file: string;
  id: number;
  org_id: string;
  pinned_at: string;
  text: string;
  ticket_id: string;
  updated_at: string;
}

export interface ITicketNoteForm {
  text: string;
  id: number;
  clearForm(): void;
}

export class TicketNote implements ITicketNoteForm {
  id = 0;
  text = '';
  constructor() {}
  clearForm() {
    this.id = 0;
    this.text = '';
  }
}

export type TTicketHistory = {
  user_id: string;
  type: 'INSERT' | 'UPDATE';
  created_at: string;
  operation_url: string;
  changes: {
    current_flow_step_name: {
      new: string;
      old: string;
    };
    assigned_to: {
      new: string;
      old: string;
    };
  };
};

export type TTicketLatestAssign = {
  new_agent: string;
  setter: string;
  at: string;
};
