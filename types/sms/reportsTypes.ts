export type TSRFiltersTableForm = {
  createTime: any | null;
  sendTime: any | null;
  status: number | null;
  search: string | null;
};

export type TSRFiltersChartForm = {
  createTime: any | null;
  sendTime: any | null;
  status?: number | null;
  search?: string | null;
};

export type TSRFiltersDateRange = {
  gregorian: {
    from: number | null;
    to: number | null;
  };
};

export type TSelectsList = Record<'title' | 'value', string | number | null>[];
