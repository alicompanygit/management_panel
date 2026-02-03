import { useDateTimeManager } from "@/composables/useDateTimeManager";
import { useUsersOperatorStore } from "~/stores/users/operator";

export const ConvertToClientModel = (data: any) => {
  const usersOperatorStore = useUsersOperatorStore();
  const { convertSec } = useDateTimeManager();
  const { dateToPersian } = useDateTimeManager();

  const result: any = [];
  let id: any = 1;

  data.forEach((element: any) => {
    result.push({
      ...element,
      operator_number: element.destination,
      caller: usersOperatorStore.getOperatorName(element.caller),
      destination: usersOperatorStore.getOperatorName(element.destination),
      setup_time:
        `${element.setup_time.slice(11)} - ` +
        dateToPersian(element.setup_time),
      row: id++,
    });
  });
  return result;
};
