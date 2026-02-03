import { fa2en } from '@/utils/inputFormatter';

import { i18n } from '~/plugins/vue-i18n';

export type TValidationRule =
  | 'requiredRule'
  | 'requiredRuleCrmLinkUser'
  | 'requiredRuleSelect'
  | 'requiredRuleAutoComplete'
  | 'onlyEnglish'
  | 'onlyEnglishNumbers'
  | 'noOnlyNumber'
  | 'noZero'
  | 'length'
  | 'minLength'
  | 'maxLength'
  | 'max'
  | 'confirmRule'
  | 'noSpecial'
  | 'lowercase_and_int'
  | 'alphabet'
  | 'valid_character'
  | 'email'
  | 'url'
  | 'integer'
  | 'floatNumber'
  | 'mobile'
  | 'phone'
  | 'requiredPhone'
  | 'homePhone'
  | 'iranianPhone'
  | 'iranianPhone98'
  | 'postalCode'
  | 'nationalCode'
  | 'nationalId'
  | 'crmUrl'
  | 'enNumberRules'
  | 'validationToBoolean'
  | 'isCellValid'
  | 'isRequiredColsExists'
  | 'isFileValid'
  | 'checkDash'
  | 'checkSpace'
  | 'isCharAllowed'
  | 'noNumberInclude'
  | 'bannedWords';
export const requiredRule = (v: unknown) => {
  const isEmpty = v == null || (Array.isArray(v) ? v.length === 0 : !v);
  return !isEmpty || 'پر کردن این فیلد اجباری است.';
};

export const requiredRuleCrmLinkUser = (v: string) =>
  !!v || `پر کردن این فیلد اجباری است.`;

export const requiredRuleSelect = (v: string | number) =>
  !!v || `انتخاب یک مورد اجباری است.`;

export const requiredRuleAutoComplete = (v: any) => {
  return v.length !== 0 || `انتخاب یک مورد اجباری است.`;
};

export const onlyEnglish = (v: string) => {
  return (
    !v ||
    /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/.test(v) ||
    i18n.global.t('onlyEnglishIsAllowed')
  );
};

export const onlyEnglishNumbers = (v: string | number) => {
  const str = String(v);
  return (
    !str || /^[0-9]+$/.test(str) || i18n.global.t('onlyEnglishNumbersIsAllowed')
  );
};

export const noOnlyNumber = (v: string) => {
  return (
    /^[A-Za-z][A-Za-z0-9]*$/.test(v) ||
    i18n.global.t('noStartWithNumberIsAllowed')
  );
};
export const noZero = (v: string) => {
  return /^(?!0$).+$/.test(v) || i18n.global.t('noZeroIsAllowed');
};

export const length = (length: number) => (v: string) => {
  if (!v) return true;
  return v.length == length || `${length} کاراکتر وارد کنید.`;
};

export const minLength = (length: number) => (v: string) => {
  if (!v) return true;
  return v.length >= length || `حداقل ${length} کاراکتر وارد کنید.`;
};

export const maxLength = (length: number) => (v: string) => {
  if (!v) return true;
  return v.length <= length || `حداکثر ${length} کاراکتر وارد کنید.`;
};

export const max = (length: number) => (v: string) => {
  if (!v) return true;
  const enNumber = fa2en(v);
  return (
    enNumber <= length || `مقدار وارد شده نمیتواند بیشتر از  ${length} باشد.`
  );
};

export const confirmRule = (confirm: string) => (v: string) => {
  if (!v) return true;
  return v === confirm || 'مقدار وارد شده با تکرار آن برابر نیست.';
};

export const noSpecial = (v: string) => {
  if (!v) return true;
  return (
    /[^@#$%^&*()_+/.<ء":{}×!>أ،:؛\]\[']+$/.test(v) ||
    'مقدار وارد شده معتبر نیست'
  );
};

export const lowercase_and_int = (v: string) => {
  if (!v) return true;
  return (
    /^(?=.*?\d)(?=.*?[a-z])[a-z\d]+$/.test(v) || 'مقدار وارد شده معتبر نیست'
  );
};

export const alphabet = (v: string) => {
  if (!v) return true;
  return /^[a-zA-Z]+$/.test(v) || 'مقدار وارد شده معتبر نیست';
};

export const valid_character = (v: string) => {
  if (!v) return true;
  return /^[a-zA-Z0-9_.-]*$/.test(v) || 'مقدار وارد شده معتبر نیست';
};

export const email = (v: string) => {
  if (!v) return true;
  return (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(
      v
    ) || 'ایمیل وارد شده معتبر نیست'
  );
};

export const url = (v: string) => {
  if (!v) return true;
  return (
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(
      v
    ) || 'مقدار وارد شده معتبر نیست'
  );
};

export const integer = (v: string) => {
  if (!v) return true;
  const enNumber = fa2en(v);
  return /^[۰۱۲۳۴۵۶۷۸۹0-9٬]+$/.test(enNumber) || 'مقدار وارد شده معتبر نیست';
};

export const floatNumber = (v: string) => {
  if (!v) return true;
  return /^-?\d+(\.\d+)?$/.test(v) || 'مقدار وارد شده معتبر نیست';
};

export const mobile = (v: string) => {
  if (!v) return true;
  const enNumber = fa2en(v);
  return (
    /^(?:09\d{9}|9\d{9}|989\d{9}|\+989\d{9})$/.test(enNumber) ||
    'مقدار وارد شده معتبر نیست'
  );
};

export const phone = (v: string) => {
  if (!v) return true;
  const enNumber = fa2en(v);
  return (
    mobile(v) === true ||
    homePhone(enNumber) === true ||
    'شماره تماس وارد شده معتبر نیست'
  );
};

import { phoneValidate } from '@/utils/validatePhoneNumber';

export const requiredPhone = (v: string) => {
  if (!phoneValidate.parsePhoneNumber(v)?.isValid)
    return phoneValidate.parsePhoneNumber(v)?.error;

  return true;
};

export const homePhone = (v: string) => {
  if (!v) return true;
  return (
    /^(?:98|0)(41|45|31|84|77|21|38|51|56|58|61|24|23|54|71|26|25|28|87|34|83|74|17|13|66|11|86|76|81|35)\d{8}$/.test(
      v
    ) || 'مقدار وارد شده معتبر نیست'
  );
};

export const iranianPhone = (v: string) => {
  if (!v) return true;
  const enNumber = fa2en(v);
  return /^(?:\+98|98|0|)\d{10}$/.test(enNumber) || 'مقدار وارد شده معتبر نیست';
};

export const iranianPhone98 = (v: string) => {
  if (!v) return;
  const enNumber = fa2en(v);
  return /^(?:98)\d{10}$/.test(enNumber) || 'مقدار وارد شده معتبر نیست';
};

export const postalCode = (v: string) => {
  if (!v) return true;
  const enNumber = fa2en(v);
  return /^[1-9][0-9]{9}$/.test(enNumber) || 'مقدار وارد شده معتبر نیست';
};

export const nationalCode = (v: string) => {
  if (!v) return true;

  const isValid = /^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$/.test(v);
  if (!isValid) return 'کد ملی باید ۱۰ رقم باشد';

  const enCode = fa2en(v);

  if (enCode.split('').every((ch) => ch === enCode[0])) {
    return 'کد ملی نمی‌تواند از ۱۰ رقم یکسان تشکیل شده باشد';
  }

  const check = parseInt(enCode[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(enCode[i], 10) * (10 - i);
  }
  const remainder = sum % 11;

  const isValidCheckDigit =
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder);

  if (!isValidCheckDigit) {
    return 'کد ملی معتبر نیست';
  }
  return true;
};

export const nationalId = (v: string) => {
  if (!v) return true;
  const isValid = /^[۰۱۲۳۴۵۶۷۸۹0-9]{11}$/.test(v);
  if (isValid) {
    const enCode = fa2en(v);
    if (parseInt(enCode.substr(3, 6), 10) == 0) return false;
    let c = parseInt(enCode.substr(10, 1), 10);
    let d = parseInt(enCode.substr(9, 1), 10) + 2;
    let z = new Array(29, 27, 23, 19, 17);
    let s = 0;
    for (let i = 0; i < 10; i++)
      s += (d + parseInt(enCode.substr(i, 1), 10)) * z[i % 5];
    s = s % 11;
    if (s == 10) s = 0;
    return c == s;
  } else {
    return 'مقدار وارد شده معتبر نیست';
  }
};

export const crmUrl = (v: string) => {
  if (!v) return true;
  return (
    /^(https?:\/\/)?((\d{1,3}\.){3}\d{1,3}|[a-zA-Z0-9\-\.]+)(:[a-zA-Z0-9]+)?(\/[^\s]*)?$/.test(
      v
    ) || 'مقدار وارد شده معتبر نیست'
  );
};

export const enNumberRules = (v: number) => {
  if (v === null || v === undefined) return true;
  const strValue = String(v);
  return /^[0-9]*$/.test(strValue) || 'تنها اعداد انگلیسی مجاز می‌باشد.';
};

export function validationToBoolean(value: boolean | string): boolean {
  return value === true;
}

export function isCellValid(key: string, value: string): boolean {
  switch (key) {
    case 'نام و نام خانوادگی':
      return validationToBoolean(requiredRule(value));
    case 'نام شرکت':
      return validationToBoolean(requiredRule(value));
    case 'شماره تماس':
      return (
        validationToBoolean(requiredRule(value)) &&
        validationToBoolean(phone(value))
      );
    case 'شماره تماس اصلی':
      return (
        validationToBoolean(requiredRule(value)) &&
        validationToBoolean(phone(value))
      );
    case 'شماره واتس اپ':
      return validationToBoolean(mobile(value));
    case 'شماره تلگرام':
      return validationToBoolean(mobile(value));
    case 'شماره نواتل':
      return validationToBoolean(mobile(value));
    case 'تلفن ثابت':
      return validationToBoolean(homePhone(value));
    case 'ایمیل':
      return validationToBoolean(email(value));
    case 'کد ملی':
      return validationToBoolean(nationalCode(value) ?? '');
    case 'کدپستی':
      return validationToBoolean(postalCode(value));
    default:
      return true;
  }
}

export function isRequiredColsExists(
  row: Record<string, any>,
  fileName: string
): boolean {
  if (fileName === 'people') {
    return !!row['نام و نام خانوادگی'] && !!row['شماره تماس اصلی'];
  } else if (fileName === 'company') {
    return (
      !!row['نام و نام خانوادگی'] && !!row['شماره تماس'] && !!row['نام شرکت']
    );
  }
  return true;
}

export function isFileValid(
  sheetsObj: Record<string, any>[],
  fileName: string
): boolean {
  if (!isRequiredColsExists(sheetsObj[0], fileName)) return false;
  for (let row of sheetsObj) {
    for (let key in row) {
      if (!isCellValid(key, row[key])) return false;
    }
  }
  return true;
}

export function checkDash(str: string) {
  if (str.includes('-')) {
    return "امکان استفاده از کاراکتر ' - ' وجود ندارد.";
  }
  return true;
}

export function checkSpace(str: string) {
  if (str && str.includes(' ')) {
    return 'امکان استفاده از کاراکتر فاصله وجود ندارد.';
  }
  return true;
}

export function isCharAllowed(
  chars: string | undefined,
  bannedChars: string[]
): boolean | string {
  if (!chars) return true;

  const usedChars: string[] = [...new Set(chars.split(''))].filter((char) =>
    bannedChars.includes(char)
  );
  return usedChars.length > 0
    ? `امکان استفاده از کاراکتر ${usedChars.join(' ')} وجود ندارد.`
    : true;
}

export const noNumberInclude = (v: string) => {
  if (!v) return true; // allow empty
  return /^[^\d]+$/u.test(v) || i18n.global.t('noNumberInclude');
};

export const bannedWords =
  (words: string[], ignoreCase = false) =>
  (v: string): true | string => {
    if (!v) return true;

    const value = ignoreCase ? v.toLowerCase() : v;
    const checkWords = ignoreCase ? words.map((w) => w.toLowerCase()) : words;

    const used = checkWords.find((w) => value === w);

    return used ? `امکان استفاده از "${used}" وجود ندارد` : true;
  };

export const RuleMap: Record<TValidationRule, (v: any) => boolean | string> = {
  requiredRule,
  requiredRuleCrmLinkUser,
  requiredRuleSelect,
  requiredRuleAutoComplete,
  onlyEnglish,
  onlyEnglishNumbers,
  noOnlyNumber,
  noZero,
  length,
  minLength,
  maxLength,
  max,
  confirmRule,
  noSpecial,
  lowercase_and_int,
  alphabet,
  valid_character,
  email,
  url,
  integer,
  floatNumber,
  mobile,
  phone,
  requiredPhone,
  homePhone,
  iranianPhone,
  iranianPhone98,
  postalCode,
  nationalCode,
  nationalId,
  crmUrl,
  enNumberRules,
  validationToBoolean,
  isCellValid,
  isRequiredColsExists,
  isFileValid,
  checkDash,
  checkSpace,
  isCharAllowed,
  noNumberInclude,
  bannedWords,
};
