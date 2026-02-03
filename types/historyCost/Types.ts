import { useDateTimeManager } from "@/composables/useDateTimeManager";

export const ConvertToClientModel = (data: any) => {
  const { mobile, inState, outCountry, outState } = data;
  let finallyList = [];

  const mobileDataAfterParsed = [];
  const inStateDataAfterParsed = [];
  const outCountryDataAfterParsed = [];
  const outStateDataAfterParsed = [];

  let mobileData = {
    name: "همراه",
    type: "area",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  let inStateData = {
    name: "درون استانی",
    type: "area",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  let outCountryData = {
    name: "بین استانی",
    type: "area",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  let outStateData = {
    name: "خارج از کشور",
    type: "area",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  if (mobile) {
    for (let key in mobile) {
      mobileDataAfterParsed.push(mobile[key]);
    }
    mobileDataAfterParsed.forEach((elem) => {
      for (const [index, value] of mobileData?.data.entries()) {
        if (index + 1 == elem.startMonth) {
          mobileData.data[elem.startMonth - 1] = Math.round(elem.sumCost);
        }
      }
    });
    finallyList.push(mobileData);
  }

  if (inState) {
    for (let key in inState) {
      inStateDataAfterParsed.push(inState[key]);
    }
    inStateDataAfterParsed.forEach((elem) => {
      for (const [index, value] of inStateData?.data.entries()) {
        if (index + 1 == elem.startMonth) {
          inStateData.data[elem.startMonth - 1] = Math.round(elem.sumCost);
        }
      }
    });
    finallyList.push(inStateData);
  }

  if (outCountry) {
    for (let key in outCountry) {
      outCountryDataAfterParsed.push(outCountry[key]);
    }
    outCountryDataAfterParsed.forEach((elem) => {
      for (const [index, value] of outCountryData?.data.entries()) {
        if (index + 1 == elem.startMonth) {
          outCountryData.data[elem.startMonth - 1] = Math.round(elem.sumCost);
        }
      }
    });
    finallyList.push(outCountryData);
  }

  if (outState) {
    for (let key in outState) {
      outStateDataAfterParsed.push(outState[key]);
    }
    outStateDataAfterParsed.forEach((elem) => {
      for (const [index, value] of outStateData?.data.entries()) {
        if (index + 1 == elem.startMonth) {
          outStateData.data[elem.startMonth - 1] = Math.round(elem.sumCost);
        }
      }
    });
    finallyList.push(outStateData);
  }

  return finallyList;
};
