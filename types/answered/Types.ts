import { useDateTimeManager } from "@/composables/useDateTimeManager";
import { useUsersOperatorStore } from "~/stores/users/operator";

export interface IAnswered {
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

export interface IStatistics {
  count: number | null;
  avg_billsec: number | null;
  avg_waitsec: number | null;
  sum_billsec: number | null;
}

export const ConvertToClientModel = (data: any) => {
  const { convertSec } = useDateTimeManager();
  const { dateToPersian } = useDateTimeManager();
  const usersOperatorStore = useUsersOperatorStore();

  const result: any = [];
  let id: any = 1;

  data.forEach((element: any) => {
    result.push({
      ...element,
      operator: usersOperatorStore.getOperatorName(element.operator),
      WaitingTime: convertSec(element.WaitingTime),
      callDuration: convertSec(element.callDuration),
      calltime:
        `${element.calltime.slice(11)} - ` + dateToPersian(element.calltime),
      id: id++,
    });
  });
  return result;
};

export const TimingDataTable = (data: any) => {
  const { convertSec } = useDateTimeManager();
  return {
    count: data.count,
    sum_billsec: convertSec(data.sum_billsec),
    avg_billsec: convertSec(data.avg_billsec),
    min_billsec: convertSec(data.min_billsec),
    max_billsec: convertSec(data.max_billsec),
    sum_waitsec: convertSec(data.sum_waitsec),
    avg_waitsec: convertSec(data.avg_waitsec),
    min_waitsec: convertSec(data.min_waitsec),
    max_waitsec: convertSec(data.max_waitsec),
  };
};
