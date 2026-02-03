export const ConvertToClientModel = (data: any, type: string) => {};

export const handleUnAnsweredCountByTimeDataModel = (data: any, fromTime: number = 0, toTime: number = 0) => {
  let list: any = [];

  if (data) {
    const filteredData = getFilterData(data, fromTime, toTime)

    filteredData.forEach((item: any) => {
      if (item.hour && item.count) {
        const array = [item.hour, item.count];
        list.push(array);
      }
    });

    const result = list.reduce((acc: any, [first, second]) => {
      if (!acc[first]) {
        acc[first] = second;
      } else {
        acc[first] += second;
      }
      return acc;
    }, {});

    const output = Object.keys(result).map((key) => [
      parseInt(key),
      result[key],
    ]);

    return { name: "تعداد تماس های از دست رفته", data: output };
  } else {
    return { name: "تعداد تماس های از دست رفته", data: [] };
  }
};

export const handleOutputCountByTimingDataModel = (data: any, fromTime: number = 0, toTime: number = 0) => {
  let list: any = [];

  if (data) {
    const filteredData = getFilterData(data, fromTime, toTime)

    filteredData.forEach((item: any) => {
      if (item.startHour && item.count) {
        const array = [item.startHour, item.count];
        list.push(array);
      }
    });

    const result = list.reduce((acc: any, [first, second]) => {
      if (!acc[first]) {
        acc[first] = second;
      } else {
        acc[first] += second;
      }
      return acc;
    }, {});

    const output = Object.keys(result).map((key) => [
      parseInt(key),
      result[key],
    ]);

    return { name: "میانگین تماس های خروجی", data: output };
  } else {
    return { name: "میانگین تماس های خروجی", data: [] };
  }
};

export const handleInputCallsCountByTimeDataModel = (data: any, fromTime: number = 0, toTime: number = 0) => {
  if (data) {
    let list: any = [];

    const filteredData = getFilterData(data, fromTime, toTime)

    filteredData.forEach((item: any) => {
      if (item.hour && item.count) {
        const array = [item.hour, item.count];
        list.push(array);
      }
    });

    const result = list.reduce((acc: any, [first, second]) => {
      if (!acc[first]) {
        acc[first] = second;
      } else {
        acc[first] += second;
      }
      return acc;
    }, {});

    const output = Object.keys(result).map((key) => [
      parseInt(key),
      result[key],
    ]);

    return { name: "میانگین تماس های ورودی", data: output };
  } else {
    return { name: "میانگین تماس های ورودی", data: [] };
  }
};

export const handleAllCallsCountByTimeDataModel = (data: any, fromTime: number = 0, toTime: number = 0) => {
  let list: any = [];

  if (data) {
    const filteredData = getFilterData(data, fromTime, toTime)

    filteredData.forEach((item: any) => {
      if (item.hour && item.count) {
        const array = [item.hour, item.count];
        list.push(array);
      }
    });

    const result = list.reduce((acc: any, [first, second]) => {
      if (!acc[first]) {
        acc[first] = second;
      } else {
        acc[first] += second;
      }
      return acc;
    }, {});

    const output = Object.keys(result).map((key) => [
      parseInt(key),
      result[key],
    ]);

    return { name: "میانگین کل تماس ها", data: output };
  } else {
    return { name: "میانگین کل تماس ها", data: [] };
  }
};

export const handleAnsweredCountByTimeDataModel = (data: any, fromTime: number = 0, toTime: number = 0) => {
  let list: any = [];

  if (data) {
    const filteredData = getFilterData(data, fromTime, toTime)

    filteredData.forEach((item: any) => {
      if (item.hour && item.count) {
        const array = [item.hour, item.count];
        list.push(array);
      }
    });

    const result = list.reduce((acc: any, [first, second]) => {
      if (!acc[first]) {
        acc[first] = second;
      } else {
        acc[first] += second;
      }
      return acc;
    }, {});

    const output = Object.keys(result).map((key) => [
      parseInt(key),
      result[key],
    ]);

    return { name: "میانگین تماس های پاسخ داده شده", data: output };
  } else {
    return { name: "میانگین تماس های پاسخ داده شده", data: [] };
  }
};


const getFilterData = (data: any, fromTime: number = 0, toTime: number = 0) => {
  const from = fromTime ? Number(fromTime) : null;
  const to = toTime ? Number(toTime) : null;

  if(!from && !to) return data

  const filteredData = data.filter((item: any) => {
    const hour = Number(item.startHour || item.hour);
    if (from === null && to === null) return true;
    if (from !== null && to !== null) return hour >= from && hour <= to;
    if (from !== null) return hour >= from;
    if (to !== null) return hour <= to;
    return true;
  });
  return filteredData
}