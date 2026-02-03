import { useDateTimeManager } from '@/composables/useDateTimeManager';
import { useUsersOperatorStore } from '~/stores/users/operator';

import { useQueueStore } from '@/stores/settings/queue';

export interface IHangupReason {
  from_date: string;
  to_date: string;
  destination: string;
  offset: string;
  call_type: string;
  type: string;
}

export interface IExportCdrs {
  caller: string;
  queue: string;
  from_date: string;
  to_date: string;
  destination: string;
  offset: string;
  call_type: string;
  type: string;
  all: boolean;
  file: string;
}

export const DetectDisconnectionCause = (val: string, type: string) => {
  switch (val) {
    case 'NORMAL_UNSPECIFIED':
      return {
        value: 'عادی نامشخص',
        color: 'grey3',
      };
    case 'ORIGINATOR_CANCEL':
      if (type == 'enterprise_did') {
        return {
          value: 'قطع توسط مشتری',
          color: 'grey4',
        };
      } else {
        return {
          value: 'قطع توسط اپراتور',
          color: 'warning7',
        };
      }
    case 'CALL_REJECTED':
      return {
        value: 'ریجکت تماس',
        color: 'grey5',
      };
    case 'NO_ANSWER':
      return {
        value: 'بدون پاسخ',
        color: 'error7',
      };
    case 'LOSE_RACE':
      return {
        value: 'پاسخ توسط اپراتور دیگر',
        color: 'lime6',
      };
    case 'USER_BUSY':
      return {
        value: 'اشغال',
        color: 'amber6',
      };
    case 'NORMAL_CLEARING':
      return {
        value: 'موفق',
        color: 'success6',
      };
    default:
      return {
        value: 'عدم برقراری ارتباط',
        color: 'error7',
      };
  }
};

export const DetectCallDirection = (val: string) => {
  switch (val) {
    case 'enterprise_out':
    case 'nava_out':
      return 'خروجی';
    case 'enterprise_did':
      return 'ورودی';
    case 'internal':
      return 'داخلی';
    case 'divert':
      return 'دایورت';
    default:
      return val;
  }
};

export const ConvertToClientModel = (data: any) => {
  const { convertSec } = useDateTimeManager();
  const { dateToPersian } = useDateTimeManager();
  const usersOperatorStore = useUsersOperatorStore();
  const queueStore = useQueueStore();

  const result: any = [];
  let id: any = 1;

  data.forEach((element: any) => {
    let targetQueue;
    if (element.queueId) {
      targetQueue = queueStore.queues.find((item: any) => {
        return item.CallCenter_queue_uuid == element.queueId;
      });
    }
    console.log('targetQueue', targetQueue);
    result.push({
      ...element,
      operator: {
        name: usersOperatorStore.getOperatorName(element.operator),
        number: element.operator,
      },
      destination: {
        name: usersOperatorStore.getOperatorName(element.destination),
        number: element.destination,
      },
      waitingTime: convertSec(element.waitingTime),
      callDuration: convertSec(element.callDuration),
      id: id++,
      disconnectionCause: DetectDisconnectionCause(
        element.disconnectionCause,
        element.direction
      ),
      direction: DetectCallDirection(element.direction),
      queue: targetQueue ? targetQueue.Queue_name : '-',
      callTime:
        `${element.callTime.slice(11)} - ` + dateToPersian(element.callTime),
    });
  });
  console.log('result', result);

  return result;
};
