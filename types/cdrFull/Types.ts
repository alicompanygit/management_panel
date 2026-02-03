import { useDateTimeManager } from '@/composables/useDateTimeManager';
import { useUsersOperatorStore } from '~/stores/users/operator';
// import { convertSec } from "~/utils/helpers/dateTimeFormatter";
import { useContactCallStore } from '~/stores/contact/call';
import { useContactFormStore } from '~/stores/contact/form';

export const DetectCallDirection = (val: string) => {
  switch (val) {
    case 'enterprise_out':
    case 'nava_out':
      return {
        val: 'خروجی',
        value: 'خروجی',
        color: 'success6',
        icon: 'solar:outgoing-call-rounded-linear',
      };
    case 'enterprise_did':
      return {
        val: 'ورودی',
        value: 'ورودی',
        color: 'primary',
        icon: 'solar:incoming-call-rounded-linear',
      };
    case 'internal':
      return { val: 'داخلی', value: 'داخلی', color: 'primary' };
    case 'divert':
      return {
        val: 'منتقل‌شده',
        value: 'منتقل‌شده',
        color: 'primary',
        icon: 'solar:phone-rounded-linear',
      };
    default:
      return { val: '', value: '', color: 'containerBg' };
  }
};

export const disconnectionCauses = [
  { value: 'NORMAL_UNSPECIFIED', label: 'عادی نامشخص' },
  { value: 'ORIGINATOR_CANCEL', label: 'قطع توسط مشتری' },
  { value: 'ORIGINATOR_CANCEL', label: 'قطع توسط اپراتور' },
  { value: 'CALL_REJECTED', label: 'ریجکت تماس' },
  { value: 'DESTINATION_UNREACHABLE', label: 'مقصد نادرست' },
  { value: 'DESTINATION_BUSY', label: 'مقصد اشغال' },
  { value: 'DESTINATION_NO_ANSWER', label: 'مقصد غیر پاسخگو' },
  { value: 'DESTINATION_UNREACHABLE_OR_BUSY', label: 'مقصد نادرست یا اشغال' },
  { value: 'DESTINATION_OUT_OF_ORDER', label: 'مقصد خراب' },
];
export const DetectDisconnectionCause = (val: string, type: string) => {
  switch (val) {
    case 'NORMAL_UNSPECIFIED':
      return {
        value: 'عادی نامشخص',
        color: 'greyDarken',
        default: 'NORMAL_UNSPECIFIED',
      };
    case 'ORIGINATOR_CANCEL':
      if (type == 'enterprise_did') {
        return {
          value: 'قطع توسط مشتری',
          color: 'grey4',
          default: 'ORIGINATOR_CANCEL',
        };
      } else {
        return {
          value: 'قطع توسط اپراتور',
          color: 'warning7',
          default: 'ORIGINATOR_CANCEL',
        };
      }
    case 'CALL_REJECTED':
      return {
        value: 'ریجکت تماس',
        color: 'grey5',
        default: 'CALL_REJECTED',
      };
    case 'NO_ANSWER':
      return {
        value: 'بدون پاسخ',
        color: 'error7',
        default: 'NO_ANSWER',
      };
    case 'LOSE_RACE':
      return {
        value: 'پاسخ توسط اپراتور دیگر',
        color: 'lime6',
        default: 'LOSE_RACE',
      };
    case 'USER_BUSY':
      return {
        value: 'اشغال',
        color: 'amber6',
        default: 'USER_BUSY',
      };
    case 'NORMAL_CLEARING':
      return {
        value: 'موفق',
        color: 'success6',
        default: 'NORMAL_CLEARING',
      };
    case 'RECOVERY_ON_TIMER_EXPIRE':
      return {
        value: '----',
        color: 'primaryLightest',
        default: 'RECOVERY_ON_TIMER_EXPIRE',
      };
    default:
      return {
        value: '',
        color: '',
        border: '',
      };
  }
};

export const ConvertToClientModel = async (
  data: any,
  formType: string,
  service_type?: string
) => {
  const { convertSec } = useDateTimeManager();
  const { dateToPersian } = useDateTimeManager();
  const usersOperatorStore = useUsersOperatorStore();

  const contactCallStore = useContactCallStore();

  const result: any = [];
  let id: any = 1;

  const allCallId = data.map((item: any) => {
    return item.id.toString();
  });

  const body: any = {
    field_name: 'call_id',
    value_list: allCallId,
  };

  if (service_type) {
    body['service_type'] = service_type;
  } else {
    body['form_type'] = formType;
  }

  let res = undefined;
  if ((formType === 'call_qa' && useContactFormStore().formsList.find(f => f.type === 'call_qa')) || formType !== 'call_qa')
    res = await $fetch('/api/contact/data/exists', {
      method: 'POST',
      body,
    });

  // const evaluationScore = await $fetch("/api/report/cdrFull/getEvaluationScore", {
  //   method: "POST",
  //   body: {
  //     form_type: "call_qa",
  //     field_name: "call_id",
  //     value_list: allCallId,
  //   },
  // });

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

    const call_type = DetectCallDirection(element.call_type).val;

    const caller =
      call_type === 'ورودی' || call_type === 'داخلی' || call_type === 'خروجی'
        ? usersOperatorStore.getOperatorName(element.caller)
        : usersOperatorStore.getOperatorName(element.destination);

    const caller_number = element.caller;
    const destination =
      call_type === 'ورودی' || call_type === 'داخلی' || call_type === 'خروجی'
        ? usersOperatorStore.getOperatorName(element.destination)
        : usersOperatorStore.getOperatorName(element.caller);

    let cost = '-';
    const temp = Number(element.cost);
    if (temp) {
      cost = temp.toFixed(1) + ' تومان';
    }

    const { user, contact } = getUserAndContact(
      caller,
      destination,
      call_type,
      element
    );
    result.push({
      ...element,
      user,
      contact,
      callType: element.call_type,
      call_type: DetectCallDirection(element.call_type),
      usge: convertSec(element.usge),
      setup_time: `${element.setup_time.slice(11).slice(0, -3)}`,
      setup_date: dateToPersian(element.setup_time),
      cost,
      hasAction: hasAction,
      hasEvaluation: res && res[element.id] ? true : false,
      playState: false,
      selected: false,
      loading: false,
      row: id++,
      disconnectionCause: DetectDisconnectionCause(
        element.disconnectionCause,
        element.call_type
      ),
      waitingTimeConverted: convertSec(element.waitingTime, true),
      evaluationScore: '-',
      caller_number,
    });
  });
  return result;
};

const findNavaData = (value: string | number) => {
  const usersOperatorStore = useUsersOperatorStore();
  const user = usersOperatorStore.nnavaNumber.find((item: INNavaNumber) => {
    return (
      item.number == value || item.uuid == value || item.custoemr_uuid == value
    );
  });
  return user ? user : null;
};

const getUserAndContact = (caller, destination, call_type, element) => {
  const usersOperatorStore = useUsersOperatorStore();
  switch (call_type) {
    case 'ورودی':
      return {
        user: { operator: destination, number: element.destination },
        contact: {
          operator: findNavaData(element.caller)
            ? findNavaData(element.caller)?.fullname
            : element.caller,
          number: findNavaData(element.caller) ? element.caller : '',
        },
      };

    case 'خروجی':
      return {
        user: { number: element.caller, operator: caller },
        contact: {
          operator: findNavaData(element.destination)
            ? findNavaData(element.destination)?.fullname
            : element.destination,
          number: findNavaData(element.destination) ? element.destination : '',
        },
      };

    case 'داخلی':
      return {
        user: { operator: destination, number: element.destination },
        contact: {
          number: element.caller,
          name: usersOperatorStore.getOperatorName(caller),
        },
      };

    case 'منتقل‌شده':
      return {
        user: { operator: element.destination, number: '' },
        contact: { number: element.caller, name: caller },
      };
  }
};

const getNthPart = (string: string, partNumber: number) => {
  if (string && string.includes(' ')) {
    const res = string.split(' ')[partNumber];
    return res;
  } else if (partNumber === 0) {
    return string;
  } else {
    return '';
  }
};

export const getDestinationAndContact = (call_type, operator, contact) => {
  switch (call_type) {
    case '001':
      return { destination: operator || '', caller: contact || '' };
    case '002':
      return { destination: operator || '', caller: contact || '' };
    case '003':
      return { destination: contact || '', caller: operator || '' };
    default:
      return { destination: operator || '', caller: contact || '' };
  }
};

export const searchFilters = [
  { id: 1, text: 'کاربر' },
  { id: 2, text: 'تاریخ تماس' },
  { id: 4, text: 'نوع تماس' },
  { id: 5, text: 'دلیل قطع ارتباط' },
  { id: 6, text: 'زمان انتظار' },
  { id: 7, text: 'طول تماس' },
  { id: 8, text: 'هزینه تماس' },
  { id: 9, text: 'صف' },
];

// export const searchFilters = [
//   { id: 1, text: "کاربر" },
//   { id: 2, text: "تاریخ تماس" },
//   { id: 3, text: "ساعت تماس" },
//   { id: 4, text: "نوع تماس" },
//   { id: 5, text: "دلیل قطع ارتباط" },
//   { id: 6, text: "زمان انتظار" },
//   { id: 7, text: "طول تماس" },
//   { id: 8, text: "هزینه تماس" },
//   { id: 9, text: "صف" },
// ]
