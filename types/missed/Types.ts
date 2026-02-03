import { useDateTimeManager } from "@/composables/useDateTimeManager";

export interface IFiltered {
  from_date: string;
  to_date: string;
  destination?: string;
  offset?: string;
}

export interface IStatistics {
  count: number | null;
}

export const ConvertToClientModel = (data: any) => {
  const { convertSec } = useDateTimeManager();
  return {
    count: data.count,
    sum_waitsec: convertSec(data.sum_waitsec),
    avg_waitsec: convertSec(data.avg_waitsec),
    min_waitsec: convertSec(data.min_waitsec),
    max_waitsec: convertSec(data.max_waitsec),
  };
};
