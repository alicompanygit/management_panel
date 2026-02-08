export function fa2en(number: number | string) {
  if (number) {
    let num = number.toString();
    const id: { [key: string]: string } = {
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

    return num.replace(/[^0-9.]/g, (w) => id[w] || w);
  }

  return "";
}
