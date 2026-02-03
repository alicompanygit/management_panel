import { useDateTimeManager } from '@/composables/useDateTimeManager';
import { useContactFormStore } from '@/stores/contact/form';
import { useUsersOperatorStore } from '~/stores/users/operator';

export const DetectCallDirection = (val: string) => {
  switch (val) {
    case 'enterprise_out':
    case 'nava_out':
      return {
        value: 'خروجی',
        color: '#E3F8ED',
        textColor: '#4BD08B',
        border: '1px solid #A6E8C6',
      };
    case 'enterprise_did':
      return {
        value: 'ورودی',
        color: '#d4dfff',
        textColor: '#0085db',
        border: '1px solid #0085db',
      };
    case 'internal':
      return {
        value: 'داخلی',
        color: '#E3F8ED',
        textColor: '#4BD08B',
        border: '1px solid #A6E8C6',
      };
    case 'divert':
      return {
        value: 'منتقل‌شده',
        color: '#E3F8ED',
        textColor: '#4BD08B',
        border: '1px solid #A6E8C6',
      };
    default:
      return {
        value: 'نا معلوم',
        color: '#E3F8ED',
        textColor: '#4BD08B',
        border: '1px solid #A6E8C6',
      };
  }
};

export const ConvertToClientModel = async (data: any) => {
  const contactFormStore = useContactFormStore();
  const { convertSec } = useDateTimeManager();
  const { dateToPersian } = useDateTimeManager();
  const usersOperatorStore = useUsersOperatorStore();

  const detectCustomForm = contactFormStore.formsList.find((item) => {
    return item.type == 'custom';
  });

  const result: any = [];
  let id: any = 1;

  const allCallId = data.map((item: any) => {
    return item.id.toString();
  });

  const res = await $fetch('/api/contact/data/exists', {
    method: 'POST',
    body: {
      form_type: detectCustomForm ? 'custom' : 'call_qa',
      field_name: 'call_id',
      value_list: allCallId,
    },
  });

  data.forEach((element: any) => {
    let hasAction = false;

    // ** exist for cdr has action ** //
    if (
      element.rec_path &&
      !element.rec_path.startsWith('#') &&
      element.usge != 0
    ) {
      hasAction = true;
    }
    // ** exist for cdr has action ** //

    result.push({
      ...element,
      en_call_type: element.call_type,
      dateTime: new Date(element.setup_time),
      duration: element.usge / 1000000000,
      caller_number: element.caller,
      id: element.id,
      idView: element.id.slice(0, 6),
      caller: {
        name: usersOperatorStore.getOperatorName(element.caller),
        number: element.caller,
      },
      destination: {
        name: usersOperatorStore.getOperatorName(element.destination),
        number: element.destination,
      },
      oprator_number_qaqc:
        element.call_type == 'nava_out' ? element.caller : element.destination,
      call_type: DetectCallDirection(element.call_type),
      usge: convertSec(element.usge / 1000000000),
      setup_time:
        `${element.setup_time.slice(11)}-` + dateToPersian(element.setup_time),
      cost: Math.ceil(Number(element.cost)) + ' تومان',
      hasAction: hasAction,
      hasEvaluation: res[element.id] ? true : false,
      playState: false,
      selected: false,
      loading: false,
      row: id++,
    });
  });
  return result;
};
