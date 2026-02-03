import { usePermissionStore } from '@/stores/permission/index';
import { useAsyncData } from 'nuxt/app';
import type { TLinks } from '~/composables/settings/roles-and-permissions/AccessEntries';

const permissionStore = usePermissionStore();
await useAsyncData('permission', () => permissionStore.getVisibilityMenu());
var { rolePermission } = permissionStore;

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: TLinks;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  permission: boolean;
}

const sidebarItem: menu[] = [
  {
    title: 'CRM',
    permission:
      rolePermission?.permission.get('root/contacts')?.visible ?? false,
    icon: 'solar:users-group-rounded-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'people',
        permission:
          rolePermission?.permission.get('contacts/people')?.visible ?? false,
        to: '/contacts/people',
      },
      {
        title: 'companies',
        permission:
          rolePermission?.permission.get('contacts/company')?.visible ?? false,
        to: '/contacts/company',
      },
      {
        title: 'leads',
        permission:
          rolePermission?.permission.get('contacts/lead')?.visible ?? false,
        to: '/contacts/lead',
      },
      {
        title: 'deal menu',
        permission:
          rolePermission?.permission.get('contacts/deal')?.visible ?? true,
        to: '/contacts/deal',
      },
      {
        title: 'tickets',
        permission:
          rolePermission?.permission.get('contacts/ticket')?.visible ?? false,
        to: '/contacts/ticket',
      },
      {
        title: 'tasks',
        permission:
          rolePermission?.permission.get('contacts/tasks')?.visible ?? false,
        to: '/contacts/tasks',
      },
      {
        title: 'invoice, pre invoice',
        permission:
          rolePermission?.permission.get('contacts/invoice')?.visible ?? false,
        to: '/contacts/invoice',
      },
      {
        title: 'Invoice Setting',
        permission:
          rolePermission?.permission.get('contacts/invoice/setting')?.visible ??
          false,
        to: '/contacts/invoice/setting',
      },
      // {
      //   title: "whatsapp",
      //   permission:
      //     rolePermission?.permission.byId("contacts/whatsapp")?.visible ?? false,
      //   to: "/contacts/whatsapp",
      // },
      {
        title: 'products',
        permission:
          rolePermission?.permission.get('contacts/products')?.visible ?? false,
        icon: 'ph:whatsapp-logo-light',
        to: '/contacts/products',
      },
      {
        title: 'inventory',
        permission:
          rolePermission?.permission.get('contacts/inventory')?.visible ??
          false,
        icon: 'ph:whatsapp-logo-light',
        to: '/contacts/inventory',
      },
    ],
  },
  // // { header: "Home" },
  {
    title: 'report',
    permission: rolePermission?.permission.get('root/report')?.visible ?? false,
    icon: 'solar:presentation-graph-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'hangupReason',
        permission:
          rolePermission?.permission.get('report/hangupReason')?.visible ??
          false,
        to: '/report/hangupReason',
      },
      // {
      //   title: "answered",
      //   permission:
      //     rolePermission?.permission.byId("report/answered")?.visible ?? false,
      //   to: "/report/answered",
      // },
      {
        title: 'calls',
        permission:
          rolePermission?.permission.get('report/calls')?.visible ?? false,
        to: '/report/calls',
      },
      {
        title: 'operatorActivity',
        permission:
          rolePermission?.permission.get('report/operatorActivity')?.visible ??
          false,
        to: '/report/operatorActivity',
      },
      {
        title: 'cdr',
        permission:
          rolePermission?.permission.get('report/cdr')?.visible ?? false,
        to: '/report/cdr',
      },
      {
        title: 'fullCdrs',
        permission:
          rolePermission?.permission.get('report/fullCdrs')?.visible ?? false,
        to: '/report/fullCdrs',
      },
      {
        title: 'rating',
        permission:
          rolePermission?.permission.get('report/rating')?.visible ?? false,
        to: '/report/rating',
      },
      {
        title: 'scatteirng',
        permission:
          rolePermission?.permission.get('report/scatteirng')?.visible ?? false,
        to: '/report/scatteirng',
      },
      {
        title: 'cost',
        permission:
          rolePermission?.permission.get('report/cost')?.visible ?? false,
        to: '/report/cost',
      },
      {
        title: 'waiting',
        permission:
          rolePermission?.permission.get('report/waiting')?.visible ?? false,
        to: '/report/waiting',
      },
    ],
  },
  {
    title: 'Monitoring',
    permission:
      rolePermission?.permission.get('root/monitoring')?.visible ?? false,
    icon: 'solar:monitor-camera-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'Dashboard',
        permission:
          rolePermission?.permission.get('monitoring/dashboard')?.visible ??
          false,
        to: '/monitoring/dashboard',
      },
      {
        title: 'Wallboard',
        permission:
          rolePermission?.permission.get('monitoring/wallboard')?.visible ??
          false,
        to: '/monitoring/wallboard',
      },
      {
        title: 'users monitoring',
        permission:
          rolePermission?.permission.get('monitoring/call')?.visible ?? false,
        to: '/monitoring/call',
      },
      // {
      //   title: "Users Status",
      //   permission:
      //     rolePermission?.permission.byId("monitoring/users")?.visible ?? false,
      //   to: "/monitoring/users",
      // },
    ],
  },
  {
    title: 'Sms',
    permission: rolePermission?.permission.get('root/send')?.visible ?? false,
    icon: 'solar:plain-3-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'phonebook',
        permission:
          rolePermission?.permission.get('send/phone-book')?.visible ?? false,
        to: '/send/phone-book',
      },
      {
        title: 'send a single',
        permission:
          rolePermission?.permission.get('send/send-single')?.visible ?? false,
        to: '/send/send-single',
      },
      {
        title: 'send a groups SMS',
        permission:
          rolePermission?.permission.get('send/groups')?.visible ?? false,
        to: '/send/groups',
      },
      {
        title: 'send a bulk',
        permission:
          rolePermission?.permission.get('send/bulk')?.visible ?? false,
        to: '/send/bulk',
      },
      {
        title: 'send a corresponding',
        permission:
          rolePermission?.permission.get('send/corresponding')?.visible ??
          false,
        to: '/send/corresponding',
      },
      {
        title: 'send a parametric',
        permission:
          rolePermission?.permission.get('send/parametric')?.visible ?? false,
        to: '/send/parametric',
      },
      {
        title: 'programmers special',
        permission:
          rolePermission?.permission.get('send/otp')?.visible ?? false,
        to: '/send/otp',
      },
      {
        title: 'report send',
        permission:
          rolePermission?.permission.get('send/report-send')?.visible ?? false,
        to: '/send/report-send',
      },
      {
        title: 'report receive',
        permission:
          rolePermission?.permission.get('send/report-receive')?.visible ??
          false,
        to: '/send/report-receive',
      },
    ],
  },
  {
    title: 'Webchat',
    permission:
      rolePermission?.permission.get('root/Webchat')?.visible ?? false,
    icon: 'solar:dialog-2-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      // {
      //   title: 'DashboardWebchat',
      //   permission:
      //     rolePermission?.permission.get('Webchat/dashboard')?.visible ?? false,
      //   to: '/Webchat/dashboard',
      // },
      {
        title: 'Insert New Websit',
        permission:
          rolePermission?.permission.get('Webchat/settings')?.visible ?? false,
        to: '/Webchat/settings',
      },
      // {
      //   title: "Insert Operator Number",
      //   permission:
      //       rolePermission?.permission.byId("Webchat/number")?.visible ?? false,
      //   to: "/Webchat/number",
      // },
      {
        title: 'Manage Operator',
        permission:
          rolePermission?.permission.get('Webchat/user')?.visible ?? false,
        to: '/Webchat/user',
      },
      // {
      //   title: "Manage Roles",
      //   permission:
      //       rolePermission?.permission.byId("Webchat/role")?.visible ?? false,
      //   to: "/Webchat/role",
      // },
      {
        title: 'Department',
        permission:
          rolePermission?.permission.get('Webchat/department')?.visible ??
          false,
        to: '/Webchat/department',
      },
      {
        title: 'Customize',
        permission:
          rolePermission?.permission.get('Webchat/customize')?.visible ?? false,
        to: '/Webchat/customize',
      },
      {
        title: 'Conversations',
        permission:
          rolePermission?.permission.get('Webchat/conversations')?.visible ??
          false,
        to: '/Webchat/conversations',
      },
    ],
  },
  {
    title: 'Performance Evaluation',
    permission:
      rolePermission?.permission.get('root/evaluation')?.visible ?? false,
    icon: 'solar:clipboard-check-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'Save performance Evaluation',
        permission:
          rolePermission?.permission.get('evaluation/save')?.visible ?? false,
        to: '/evaluation/save',
      },
      {
        title: 'Report Evaluation User',
        permission:
          rolePermission?.permission.get('evaluation/user')?.visible ?? false,
        to: '/evaluation/user',
      },
      // {
      //   title: "Performance Evaluation Report",
      //   permission:
      //     rolePermission?.permission.byId("evaluation/report")?.visible ?? false,
      //   to: "/evaluation/report",
      // },
    ],
  },
  {
    title: 'Fax',
    permission: rolePermission?.permission.get('root/fax')?.visible ?? false,
    icon: 'solar:printer-2-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'Insert New Fax',
        permission:
          rolePermission?.permission.get('fax/insert')?.visible ?? false,
        to: '/fax/insert',
      },
      {
        title: 'Send Fax',
        permission:
          rolePermission?.permission.get('fax/send')?.visible ?? false,
        to: '/fax/send',
      },
      {
        title: 'Report of Submitted Fax',
        permission:
          rolePermission?.permission.get('fax/submitted')?.visible ?? false,
        to: '/fax/submitted',
      },
      {
        title: 'Report of Received Fax',
        permission:
          rolePermission?.permission.get('fax/received')?.visible ?? false,
        to: '/fax/received',
      },
    ],
  },
  {
    title: 'videoConference',
    permission:
      rolePermission?.permission.get('root/videoConference')?.visible ?? false,
    icon: 'solar:videocamera-record-outline',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'createLink',
        permission:
          rolePermission?.permission.get('videoConference/createLink')
            ?.visible ?? false,
        to: '/videoConference/createLink',
      },
      {
        title: 'report',
        permission:
          rolePermission?.permission.get('videoConference/report')?.visible ??
          false,
        to: '/videoConference/report',
      },
    ],
  },
  {
    title: 'Users settings',
    permission: rolePermission?.permission.get('root/users')?.visible ?? false,
    icon: 'solar:user-rounded-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'Definition of operator',
        permission:
          rolePermission?.permission.get('users/operator')?.visible ?? false,
        to: '/users/operator',
      },
      {
        title: 'departments',
        permission:
          rolePermission?.permission.get('users/operator')?.visible ?? false,
        to: '/users/department',
      },
      {
        title: 'manageRolesAndPermissions',
        permission:
          rolePermission?.permission.get('users/operator')?.visible ?? false,
        to: '/users/access',
      },
      // {
      //   title: "List of users",
      //   permission:
      //     rolePermission?.permission.byId("users/list")?.visible ?? false,
      //   to: "/users/list",
      // },
      // {
      //   title: "Role management",
      //   permission:
      //     rolePermission?.permission.byId("users/role")?.visible ?? false,
      //   to: "/users/role",
      // },
      {
        title: 'Messages to operators',
        permission:
          rolePermission?.permission.get('users/message')?.visible ?? false,
        to: '/users/message',
      },
      {
        title: 'whatsapp',
        permission:
          rolePermission?.permission.get('users/whatsapp')?.visible ?? false,
        to: '/users/whatsapp',
      },
    ],
  },
  {
    title: 'Call Setting',
    permission:
      rolePermission?.permission.get('root/settings')?.visible ?? false,
    icon: 'solar:tuning-square-2-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'Call Forward',
        permission:
          rolePermission?.permission.get('settings/forward')?.visible ?? false,
        to: '/settings/forward',
      },
      {
        title: 'Upload Recording',
        permission:
          rolePermission?.permission.get('settings/recording')?.visible ??
          false,
        to: '/settings/recording',
      },
      {
        title: 'Queue',
        permission:
          rolePermission?.permission.get('settings/queue')?.visible ?? false,
        to: '/settings/queue',
      },
      {
        title: 'Manage IVR',
        permission:
          rolePermission?.permission.get('settings/ivr')?.visible ?? false,
        to: '/settings/ivr',
      },
      {
        title: 'Set Time Condition',
        permission:
          rolePermission?.permission.get('settings/timeCondition')?.visible ??
          false,
        to: '/settings/timeCondition',
      },
      {
        title: 'Manage Voicemail',
        permission:
          rolePermission?.permission.get('settings/voiceMail')?.visible ??
          false,
        to: '/settings/voiceMail',
      },
      {
        title: 'Black List',
        permission:
          rolePermission?.permission.get('settings/blackList')?.visible ??
          false,
        to: '/settings/blackList',
      },
      {
        title: 'Call Destination',
        permission:
          rolePermission?.permission.get('settings/destination')?.visible ??
          false,
        to: '/settings/destination',
      },
      /*
      {
        title: "Ratings",
        permission:
          rolePermission?.permission.byId("settings/rating")?.visible ?? false,
        to: "/settings/rating",
      },
      */
    ],
  },

  {
    title: 'Connect to CRM',
    permission: rolePermission?.permission.get('root/crm')?.visible ?? false,
    icon: 'solar:folder-path-connect-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'CRM Numbers',
        permission:
          rolePermission?.permission.get('crm/numbers')?.visible ?? false,
        to: '/crm/numbers',
      },
      {
        title: 'CRM Structure',
        permission:
          rolePermission?.permission.get('crm/settings')?.visible ?? false,
        to: '/crm/settings',
      },
      {
        title: 'CRM links',
        permission:
          rolePermission?.permission.get('crm/links')?.visible ?? false,
        to: '/crm/links',
      },
    ],
  },

  {
    title: 'Support Navatel',
    permission:
      rolePermission?.permission.get('root/support')?.visible ?? false,
    icon: 'solar:call-chat-rounded-line-duotone',
    BgColor: 'primary',
    to: '/',
    children: [
      {
        title: 'Insert New Ticket',
        permission:
          rolePermission?.permission.get('support/send')?.visible ?? false,
        to: '/support/send',
      },
      {
        title: 'Tickets List',
        permission:
          rolePermission?.permission.get('support/tickets')?.visible ?? false,
        to: '/support/tickets',
      },
    ],
  },
  // {
  //   title: 'settings',
  //   permission: true,
  //   icon: 'settings-linear',
  //   BgColor: 'primary',
  //   to: '/settings',
  // },
];

export default sidebarItem;
