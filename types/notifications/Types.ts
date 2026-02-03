import { useDateTimeManager } from "@/composables/useDateTimeManager";
const companyName = import.meta.env.VITE_COMPANY_NAME;

export const ConvertToClientModel = (data: any) => {
  const { dateToPersian } = useDateTimeManager();
  const { convertSec } = useDateTimeManager();
  let result = [];
  for (let key of data) {
    const body = JSON.parse(key.body);
    const obj = {
      content:
        `مشترک گرامی؛ به اطلاع می رسانیم حجم فضای ابری شما به کمتر از ۲۰ درصد کاهش یافته است و فضای باقیمانده 0 درصد فضای کل می باشد برای جلوگیری از عدم دسترسی و از دست رفتن صوت ها و مکالمات ضبط شده لطفا حجم فضای ابری خود را ارتقا دهید. باتشکر ${companyName}`,
      creation_time: dateToPersian(key.creation_time),
      title: "حجم فضای ابری شما رو به پایان است.",
    };
    result.push(obj);
  }
  return result;
};
