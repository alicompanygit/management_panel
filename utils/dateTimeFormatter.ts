import { useI18n } from 'vue-i18n';
import { fa2en } from './fa2en';

export function getShamsiDate(
  gregorianDate: string | Date | number | undefined = '',
  hasTime: boolean = false,
  showSeconds: boolean = false,
  keepTime: boolean = false
): string {
  if (!gregorianDate) gregorianDate = new Date();

  let date: Date;

  if (typeof gregorianDate === 'string' || typeof gregorianDate === 'number') {
    date = new Date(gregorianDate);
  } else {
    date = gregorianDate;
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'persian',
  };

  if (hasTime) {
    if (keepTime) {
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();
      let seconds = date.getUTCSeconds();

      if (typeof gregorianDate === 'string') {
        const match = gregorianDate.match(/T(\d{2}):(\d{2}):?(\d{2})?/);
        if (match) {
          hours = parseInt(match[1], 10);
          minutes = parseInt(match[2], 10);
          seconds = match[3] ? parseInt(match[3], 10) : 0;
        }
      }

      const hourStr = hours.toString().padStart(2, '0');
      const minuteStr = minutes.toString().padStart(2, '0');
      const secondStr = showSeconds
        ? ':' + seconds.toString().padStart(2, '0')
        : '';

      const shamsiDateOnly = date.toLocaleDateString(
        'fa-IR-u-ca-persian',
        dateOptions
      );
      return `${shamsiDateOnly} ${hourStr}:${minuteStr}${secondStr}`;
    } else {
      const dateTimeOptions: Intl.DateTimeFormatOptions = {
        ...dateOptions,
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
      };
      return date
        .toLocaleString('fa-IR-u-ca-persian', dateTimeOptions)
        .replace(',', '');
    }
  } else {
    return date.toLocaleDateString('fa-IR-u-ca-persian', dateOptions);
  }
}

export function transformShamsiDate(date: number, options?: Record<string, any>): string[] | void {
  if (!date) return;
  
  const convertedDate = convertUnixToDate(date, options?.hasTime, options?.hasSecond);
  const shamsiDate = getShamsiDate(convertedDate, options?.hasTime, options?.showSeconds, options?.keepTime);
  return shamsiDate.split(' ').reverse();
}

export const getTodayName = () => {
  const today = new Date();
  let shamsiLocaleDate: any = {
    weekday: 'long',
    calendar: 'persian',
  };
  return today
    .toLocaleString('fa-IR-u-ca-persian', shamsiLocaleDate)
    .replace(',', '');
};

export function getShamsiDateHasTodayIsTime(
  gregorianDate: string | Date | number | undefined = '',
  hasTime: boolean = false
): string {
  const today = new Date();
  const date = gregorianDate ? new Date(gregorianDate) : new Date();
  let shamsiLocaleDate = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'persian',
  };
  let todayDate = today
    .toLocaleString('fa-IR-u-ca-persian', shamsiLocaleDate)
    .replace(',', '');
  let shamsiDate = date
    .toLocaleString('fa-IR-u-ca-persian', shamsiLocaleDate)
    .replace(',', '');
  if (todayDate == shamsiDate && !hasTime) {
    let shamsiLocaleTime = {
      hour: '2-digit',
      minute: '2-digit',
      calendar: 'persian',
    };
    return date
      .toLocaleString('fa-IR-u-ca-persian', shamsiLocaleTime)
      .replace(',', '');
  } else if (hasTime) {
    shamsiLocaleDate = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      calendar: 'persian',
    };
    shamsiDate = date
      .toLocaleString('fa-IR-u-ca-persian', shamsiLocaleDate)
      .replace(',', '');
    return shamsiDate;
  } else {
    return shamsiDate;
  }
}

export const convertDateToUnix = (
  dateString: string | number | null = null,
  endOfDay: boolean = false
) => {
  if (typeof dateString === 'number') return dateString;
  const isExist = dateString ? dateString.includes('T') : false;
  const timeSuffix = isExist ? '' : endOfDay ? 'T23:59:59Z' : 'T00:00:00Z';
  const date = dateString ? new Date(`${dateString}${timeSuffix}`) : new Date();
  return `${Math.floor(date.getTime() / 1000)}`;
};

export const convertUnixToDate = (
  unixTimestamp: number,
  hasTime: boolean = false,
  hasSecond: boolean = true
) => {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  if (hasTime) {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return hasSecond
      ? `${year}-${month}-${day} ${hour}:${minute}:${second}`
      : `${year}-${month}-${day} ${hour}:${minute}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

export const getDaysBetweenUnix = (
  fromUnix: number,
  toUnix: number
): number => {
  const from = new Date(fromUnix * 1000);
  const to = new Date(toUnix * 1000);

  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  const diff = to.getTime() - from.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const unixToShamsiDate = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const time = date.toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const shamsiDate = date.toLocaleDateString('fa-IR');
  return `${time} ${shamsiDate}`;
};

export const getDateWithAddedDays = (
  days: number = 0,
  customDate: string = ''
) => {
  const date = customDate ? new Date(customDate) : new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const getDateWithAddedMonth = (
  month: number = 0,
  customDate: string = ''
) => {
  const date = customDate ? new Date(customDate) : new Date();
  date.setMonth(date.getMonth() + month);
  return date.toISOString().split('T')[0];
};

export const getDaysBetween = (end: Date, start: Date | null) => {
  const startDate = start ? new Date(start) : new Date();
  const endDate = new Date(end);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const diffTime = endDate - startDate;

  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getDateWithAddTime = (
  hours: number = 0,
  minutes: number = 0,
  customDate: string = ''
): string => {
  const date = customDate ? new Date(customDate) : new Date();
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  const formattedHours = date.getHours().toString().padStart(2, '0');
  const formattedMinutes = date.getMinutes().toString().padStart(2, '0');
  const formatDate =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0');
  return `${formatDate}T${formattedHours}:${formattedMinutes}:00`;
};

export const convertSec = (
  totalSeconds: number | null,
  showSymbols: boolean = false,
  showFullText: boolean = true
): string => {
  if (
    totalSeconds === null ||
    totalSeconds === undefined ||
    totalSeconds <= 0
  ) {
    return '00:00';
  }

  let seconds = Math.floor(totalSeconds % 60);
  let minutes = Math.floor(totalSeconds / 60);
  let hours = '';

  if (minutes > 59) {
    hours = Math.floor(minutes / 60).toString();
    hours = +hours >= 10 ? hours.toString() : '0' + hours;
    minutes -= +hours * 60;
  }

  const formattedMinutes = minutes >= 10 ? minutes.toString() : '0' + minutes;
  const formattedSeconds = seconds >= 10 ? seconds.toString() : '0' + seconds;

  const minuteSymbol = showSymbols ? '’' : '';
  const secondSymbol = showSymbols ? '”' : '';

  if (hours) {
    hours = hours.length === 1 ? '0' + hours : hours;
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `${formattedMinutes}${
    minutes ? minuteSymbol : ''
  }:${formattedSeconds}${secondSymbol}`;
};

export const convertFullSec = (totalSeconds: number) => {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours >= 10 ? hours : '0' + hours}:${
    minutes >= 10 ? minutes : '0' + minutes
  }:${seconds >= 10 ? seconds : '0' + seconds}`;
};

export const getDurationFromNow = (dateString: string) => {
  const givenDate = new Date(dateString);
  const now = new Date();
  const diff = now - givenDate;
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let duration;

  if (days > 0) {
    duration = `${days} روز, ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else if (hours > 0) {
    duration = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    duration = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  } else {
    duration = `00:${seconds}`;
  }
  return duration;
};

export const timeToSeconds = (timeStr: string): number | null => {
  const regex = /^(\d+)(d|h|m|s)$/i;
  const match = timeStr.match(regex);

  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'd':
      return value * 86400;
    case 'h':
      return value * 3600;
    case 'm':
      return value * 60;
    case 's':
      return value;
    default:
      return null;
  }
};

export const isoDate = (dateTime: string) => {
  let [dateStr, timeStr] = dateTime.split(' ');
  const date = `${dateStr}T${timeStr}:00`;
  return date;
};

export const getNameOfMonth = (date: string, isShamsi: boolean = false) => {
  const { t } = useI18n();
  const match = date.match(/\b\d{4}[-/](0[1-9]|1[0-2])\b/);
  if (match) {
    const month = match[0].split(/[-/]/)[1];
    switch (month) {
      case '01':
        return isShamsi ? t('April') : 'April';
      case '02':
        return isShamsi ? t('May') : 'May';
      case '03':
        return isShamsi ? t('June') : 'June';
      case '04':
        return isShamsi ? t('July') : 'July';
      case '05':
        return isShamsi ? t('August') : 'August';
      case '06':
        return isShamsi ? t('September') : 'September';
      case '07':
        return isShamsi ? t('October') : 'October';
      case '08':
        return isShamsi ? t('November') : 'November';
      case '09':
        return isShamsi ? t('December') : 'December';
      case '10':
        return isShamsi ? t('January') : 'January';
      case '11':
        return isShamsi ? t('February') : 'February';
      case '12':
        return isShamsi ? t('March') : 'March';
      default:
        return 'Invalid month';
    }
  }
};

export const shamsiToGregorian = (shamsiDate: string): string => {
  const [jy, jm, jd] = shamsiDate.split('-').map(Number);
  let jy2 = jy + 1595;
  let days =
    -355668 +
    365 * jy2 +
    Math.floor(jy2 / 33) * 8 +
    Math.floor(((jy2 % 33) + 3) / 4) +
    jd;
  if (jm < 7) {
    days += (jm - 1) * 31;
  } else {
    days += 6 * 31 + (jm - 7) * 30;
  }

  let gy = 400 * Math.floor(days / 146097);
  days %= 146097;
  let leap = true;

  if (days >= 36525) {
    days -= 1;
    gy += 100 * Math.floor(days / 36524);
    days %= 36524;
    if (days >= 365) days += 1;
    else leap = false;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days >= 366) {
    leap = false;
    days -= 1;
    gy += Math.floor(days / 365);
    days %= 365;
  }

  const gregorianMonths = [
    31,
    leap ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let gm = 0;
  while (gm < 12 && days >= gregorianMonths[gm]) {
    days -= gregorianMonths[gm];
    gm++;
  }
  let gd = days + 1;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${gy}-${pad(gm + 1)}-${pad(gd)}`;
};

export const minutesToCustomTime = (
  totalMinutes: number,
  showHours: boolean = true,
  showMinutes: boolean = true,
  showSeconds: boolean = true
) => {
  if (!totalMinutes) return '-';

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.round((totalMinutes * 60) % 60);

  let parts = [];

  if (showHours) parts.push(`${hours} ساعت`);
  if (showMinutes) parts.push(`${minutes} دقیقه`);
  if (showSeconds) parts.push(`${seconds} ثانیه`);

  return parts.join(' و ');
};

export function shamsiDateEnDigits(date: number | string) {
  return fa2en(getShamsiDate(date));
}