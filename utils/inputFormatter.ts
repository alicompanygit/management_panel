export const fa2en = (number: number | string) => {
  if (number) {
    const num = number.toString();
    const id = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };
    return num.replace(/[^0-9.]/g, function (w) {
      return id[w] || w;
    });
  }
}

export const numbersOnly = (event: any) => {
  if (event.key === "Enter") {
    return true;
  }
  event = event || window.event;
  const charCode = event.which ? event.which : event.keyCode;
  if (
    (charCode > 1775 && charCode < 1786) ||
    (charCode > 1631 && charCode < 1642) ||
    (charCode > 47 && charCode < 58)
  ) {
    return true;
  }
  event.preventDefault();
}

export const pasteNumber = (event: any) => {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData(
    "text"
  );
  const filteredPaste = paste.replace(/[^\d۰-۹]/g, ""); // Remove non-numeric characters
  document.execCommand("insertText", false, filteredPaste);

}

export const formatPrice = (number: string): string => {
  if (number && number != undefined) {
    let num = `${number}`.replaceAll("٬", "");
    num = fa2en(num);
    num = +num
    const price = num.toLocaleString("fa-IR-u-ca-persian");
    return price;
  }
}

export const priceToNumber = (price: string | number): number => {
  if (price) {
    let num = String(price).replaceAll("٬", "");
    num = fa2en(num);
    num = +num
    return num;
  } else {
    return 0
  }
}

export const getEnhancedPhoneNumber = (val: string | number, fallbackTo98: boolean = true) => {
  const str = val.toString().replace(/\D/g, '').trim();
  if (str.startsWith("98")) {
    return str
  }
  if (str.startsWith("0")) {
    return '98' + str.slice(1)
  }
  if (str.startsWith("9")) {
    return "98" + str;
  }
  return fallbackTo98 ? '98' + str : str;
}

export const numberToPersianWords = (
  input: number | string,
  unit?: string
): string => {
  const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const teens = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
  const tens = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
  const hundreds = ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
  const bigNumbers = ["هزار", "میلیون", "میلیارد", "تریلیون"];

  const subUnits = new Map<string, string>([
    ["دلار", "سنت"],
    ["پوند", "پنی"],
    ["یورو", "سنت"],
    ["ین", "سن"],
    ["درهم", "فلس"],
    ["دینار", "فلس"],
    ["ریال", ""],
    ["تومان", ""]
  ]);

  const toEnglishDigits = (str: string): string =>
    str.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
      .replace(/[٫٬]/g, ".");

  const normalized = typeof input === "number" ? input.toFixed(2) : toEnglishDigits(input);
  const [intPartStr, decimalPartStr] = normalized.split(".");

  const intPart = parseInt(intPartStr, 10);
  const decimalPart = decimalPartStr ? parseInt(decimalPartStr.padEnd(2, "0")) : null;

  let result = convertIntegerToWords(intPart);
  if (unit) {
    result += " " + unit;
  }

  const subUnit = unit ? subUnits.get(unit) || "" : "";

  if (decimalPart !== null && decimalPart !== 0) {
    const decimalWord = convertIntegerToWords(decimalPart);
    if (subUnit) {
      result += " و " + decimalWord + " صدم " + subUnit;
    } else {
      result += " ممیز " + decimalWord;
    }
  }

  return result;

  function convertIntegerToWords(num: number): string {
    if (num === 0) return "صفر";
    let parts: string[] = [];
    let i = 0;

    while (num > 0) {
      let chunk = num % 1000;
      if (chunk !== 0) {
        let chunkWords = convertChunk(chunk);
        if (i > 0 && bigNumbers[i - 1]) {
          chunkWords += " " + bigNumbers[i - 1];
        }
        parts.unshift(chunkWords);
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return parts.join(" و ");
  }

  function convertChunk(chunk: number): string {
    let result: string[] = [];
    if (chunk >= 100) {
      result.push(hundreds[Math.floor(chunk / 100)]);
      chunk %= 100;
    }
    if (chunk >= 10 && chunk <= 19) {
      result.push(teens[chunk - 10]);
    } else {
      if (chunk >= 20) {
        result.push(tens[Math.floor(chunk / 10)]);
        chunk %= 10;
      }
      if (chunk > 0) {
        result.push(ones[chunk]);
      }
    }
    return result.join(" و ");
  }
};
