export const ConvertToClientModel = (data: any) => {
  let waitingArray: any = [];
  const resultWaitngArray: any = [];
  data.forEach((element: any) => waitingArray.push(element.waiting));
  const waitingArraySet = new Set(waitingArray);
  waitingArraySet.forEach((element: any) => {
    let counter = 0;
    for (const item of data) {
      if (item.waiting == element) counter++;
    }
    resultWaitngArray.push([element, counter]);
  });

  return resultWaitngArray;
};
