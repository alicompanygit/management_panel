import { useDateTimeManager } from "@/composables/useDateTimeManager";

export const handleStatus = (val: string) => {
  switch (val) {
    case "0":
      return "در حال بررسی";
    case "1":
      return "پاسخ داده شده";
  }
};

export const handleDepartment = (val: string) => {
  switch (val) {
    case "technical":
      return "فنی";
    case "finance":
      return "مالی";
    case "sales":
      return "فروش";
  }
};

export const ConvertToClientModel = (data: any) => {
  const { dateToPersian } = useDateTimeManager();
  const { convertSec } = useDateTimeManager();
  let result = [];
  for (let key of data) {
    const obj = {
      ...key,
      creationTime: dateToPersian(key.creationTime),
      status: handleStatus(key.status),
      department: handleDepartment(key.department),
    };
    result.push(obj);
  }
  return result;
};

export const CommentsToClientModel = (data: any) => {
  const { dateToPersian } = useDateTimeManager();
  const { convertSec } = useDateTimeManager();
  let result = [];
  for (let key of data) {
    let itsMe = false;
    if (key.answerName == "self") {
      itsMe = true;
      key.answerName = "شما";
    }
    const obj = {
      ...key,
      answerTime: dateToPersian(key.answerTime),
      itsMe: itsMe,
      // creationTime: dateToPersian(key.creationTime),
      // status: handleStatus(key.status),
      // department: handleDepartment(key.department),
    };

    result.push(obj);
  }
  return result;
};
