import { useDateTimeManager } from '@/composables/useDateTimeManager';
import { useUsersOperatorStore } from '~/stores/users/operator';

export interface IFiltered {
  from_date: string;
  to_date: string;
  queueID?: string;
  destination?: string;
}

export const ConvertToClientModel = (data: any) => {
  const { convertSec } = useDateTimeManager();
  const usersOperatorStore = useUsersOperatorStore();

  let callsCount: any = null;
  let result: any = [];
  let id: any = 1;

  data.forEach((elem: any) => {
    callsCount += elem.internalCallsCount;
  });

  const listInternalCallsDuration = data.map((item: any) => {
    return item.internalCallsDuration;
  });

  let resultResponseRateOfIncomingCalls: any = null;

  data.forEach((element: any) => {
    if (element.internalCallsCount == 0) {
      resultResponseRateOfIncomingCalls = 0;
    } else {
      resultResponseRateOfIncomingCalls =
        (element.internalCallsCount / callsCount) * 100;
    }
    result.push({
      ...element,
      operatorNumber: element.operator,
      operator: usersOperatorStore.getOperatorName(element.operator),
      internalCallsDuration: convertSec(element.internalCallsDuration),
      externalCallsDuration: convertSec(element.externalCallsDuration),
      avg_call_count: element.internalCallsCount + element.exteranlCallsCount,
      avg_call_time: convertSec(
        element.internalCallsDuration + element.externalCallsDuration
      ),
      responseRateOfIncomingCalls: element.internalRespondPercent + '%',
      id: id++,
      responseRateOfIncomingCallsData: element.internalRespondPercent,
      responseRateOfIncomingCallsColor: getRateColor(
        element.internalRespondPercent
      ),
    });
  });
  return result;
};

const getRateColor = (rate: number) => {
  const colors = {
    low: { color: '#bd0000', bgColor: '#fff' },
    medium: { color: '#ffa500', bgColor: '#fff' },
    high: { color: '#d5ff3c', bgColor: '#fff' },
  };

  if (rate < 19.99) return colors.low;
  if (rate < 59.99) return colors.medium;
  return colors.high;
};
