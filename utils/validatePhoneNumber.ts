export const ValidationIranianPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.toString().replace(/\D/g, '');

  const patterns = [
    /^09[0-9]{9}$/,
    /^989[0-9]{9}$/,
    /^021[0-9]{8}$/,
    /^\+98[0-9]{10}$/,
    /^0098[0-9]{10}$/,
    /^98[0-9]{10}$/,
  ];

  if (patterns.some((pattern) => pattern.test(cleaned))) {
    return {
      isValid: true,
      message: '',
    };
  } else {
    return {
      isValid: false,
      message: 'شماره تلفن وارد شده معتبر نیست',
    };
  }
};

interface Operator {
  name: string;
  codes: string[];
  type: string;
}

interface Operators {
  [key: string]: Operator;
}

interface AreaCodes {
  [key: string]: string;
}

interface ParseResult {
  isValid: boolean;
  original: string;
  national?: string;
  international?: string;
  type?: string;
  operator?: string;
  operatorCode?: string;
  province?: string;
  areaCode?: string;
  error?: string;
}

interface OperatorInfo {
  operator: string;
  operatorCode: string;
  type: string;
}

interface GeographicalInfo {
  province: string;
  areaCode: string;
  type: string;
}

type PhoneFormat = 'NATIONAL' | 'INTERNATIONAL' | 'PRETTY';

export class IranianPhoneNumberHandler {
  private operators: Operators;
  private areaCodes: AreaCodes;

  constructor() {
    this.operators = {
      HamrahAval: {
        name: 'همراه اول',
        codes: [
          '0996',
          '0910',
          '0911',
          '0912',
          '0913',
          '0914',
          '0915',
          '0916',
          '0917',
          '0918',
          '0919',
          '0990',
          '0991',
          '0992',
          '0993',
          '0994',
        ],
        type: 'Mobile',
      },
      Irancell: {
        name: 'ایرانسل',
        codes: [
          '0900',
          '0901',
          '0902',
          '0903',
          '0904',
          '0905',
          '0930',
          '0931',
          '0932',
          '0933',
          '0934',
          '0935',
          '0936',
          '0937',
          '0938',
          '0939',
          '0941',
        ],
        type: 'Mobile',
      },
      Rightel: {
        name: 'رایتل',
        codes: ['0920', '0921', '0922', '0923'],
        type: 'Mobile',
      },
      ShatelMobile: {
        name: 'شاتل موبایل',
        codes: ['0998', '0999'],
        type: 'Mobile',
      },
      Taliya: {
        name: 'تالیا',
        codes: ['0932'],
        type: 'Mobile',
      },
      ApTel: {
        name: 'آپتل',
        codes: ['0999'],
        type: 'Mobile',
      },
    };

    this.areaCodes = {
      '021': 'تهران',
      '026': 'البرز',
      '031': 'اصفهان',
      '038': 'اردبیل',
      '041': 'آذربایجان شرقی',
      '044': 'آذربایجان غربی',
      '045': 'اردبیل',
      '051': 'خراسان رضوی',
      '056': 'خوزستان',
      '058': 'خراسان شمالی',
      '061': 'خوزستان',
      '066': 'لرستان',
      '071': 'فارس',
      '074': 'کهگیلویه و بویراحمد',
      '076': 'هرمزگان',
      '077': 'سیستان و بلوچستان',
      '081': 'مرکزی',
      '084': 'همدان',
      '086': 'کردستان',
      '087': 'کرمانشاه',
      '011': 'مازندران',
      '013': 'گیلان',
      '017': 'گلستان',
      '023': 'سمنان',
      '024': 'یزد',
      '025': 'قم',
      '028': 'چهارمحال و بختیاری',
      '034': 'کرمان',
      '035': 'ایلام',
      '054': 'بوشهر',
      '083': 'زنجان',
    };
  }

  parsePhoneNumber(phoneNumber: string | number): ParseResult {
    if (phoneNumber) {
      const cleanNumber = phoneNumber.toString().replace(/\D/g, '');

      if (cleanNumber.startsWith('989')) {
        if (cleanNumber.length !== 12) {
          return {
            isValid: false,
            error:
              'طول شماره تلفن همراه بین‌المللی نامعتبر است (باید 11 رقمی باشد)',
            original: phoneNumber.toString(),
          };
        }
        return this._parseInternationalMobileNumber(cleanNumber);
      } else if (cleanNumber.startsWith('09')) {
        if (cleanNumber.length !== 11) {
          return {
            isValid: false,
            error: 'طول شماره تلفن همراه نامعتبر است (باید 11 رقمی باشد)',
            original: phoneNumber.toString(),
          };
        }
        return this._parseIranianMobileNumber(cleanNumber);
      } else if (cleanNumber.startsWith('9')) {
        if (cleanNumber.length !== 10) {
          return {
            isValid: false,
            error:
              'طول شماره تلفن همراه بدون صفر نامعتبر است (باید 10 رقمی باشد)',
            original: phoneNumber.toString(),
          };
        }
        return this._parseWithoutZeroMobileNumber(cleanNumber);
      } else if (cleanNumber.startsWith('0')) {
        return this._parseLandlineNumber(cleanNumber);
      } else if (cleanNumber.startsWith('98')) {
        return this._parseInternationalLandlineNumber(cleanNumber);
      } else {
        return {
          isValid: false,
          error: 'فرمت شماره تلفن نامعتبر است',
          original: phoneNumber.toString(),
        };
      }
    }
  }

  private _parseIranianMobileNumber(number: string): ParseResult {
    const result: ParseResult = {
      isValid: true,
      original: number,
      national: number,
      international: `+98${number.substring(1)}`,
      type: 'Mobile',
    };

    return this._identifyMobileOperator(number.substring(0, 4), result);
  }

  private _parseInternationalMobileNumber(number: string): ParseResult {
    const iranianNumber = `0${number.substring(2)}`;
    const result: ParseResult = {
      isValid: true,
      original: number,
      national: iranianNumber,
      international: `+${number}`,
      type: 'Mobile',
    };

    return this._identifyMobileOperator(iranianNumber.substring(0, 4), result);
  }

  private _parseWithoutZeroMobileNumber(number: string): ParseResult {
    const iranianNumber = `0${number}`;
    const result: ParseResult = {
      isValid: true,
      original: number,
      national: iranianNumber,
      international: `+98${number}`,
      type: 'Mobile',
    };

    return this._identifyMobileOperator(iranianNumber.substring(0, 4), result);
  }

  private _identifyMobileOperator(
    prefix: string,
    result: ParseResult
  ): ParseResult {
    for (const [operatorKey, operatorData] of Object.entries(this.operators)) {
      if (operatorData.codes.includes(prefix)) {
        result.operator = operatorData.name;
        result.operatorCode = operatorKey;
        return result;
      }
    }

    result.isValid = false;
    result.error = 'اپراتور شناسایی نشد';
    return result;
  }

  private _parseLandlineNumber(number: string): ParseResult {
    if (number.length < 7 || number.length > 13) {
      return {
        isValid: false,
        error: 'طول شماره تلفن ثابت نامعتبر است (باید بین 7 تا 13 رقمی باشد)',
        original: number,
      };
    }

    const result: ParseResult = {
      isValid: true,
      original: number,
      national: number,
      international: `+98${number.substring(1)}`,
      type: 'Landline',
    };

    return this._identifyGeographicalInfo(number, result);
  }

  private _parseInternationalLandlineNumber(number: string): ParseResult {
    const iranianNumber = `0${number.substring(2)}`;

    if (iranianNumber.length < 7 || iranianNumber.length > 13) {
      return {
        isValid: false,
        error:
          'طول شماره تلفن ثابت بین‌المللی نامعتبر است (باید بین 7 تا 13 رقمی باشد)',
        original: number,
      };
    }

    const result: ParseResult = {
      isValid: true,
      original: number,
      national: iranianNumber,
      international: `+${number}`,
      type: 'Landline',
    };

    return this._identifyGeographicalInfo(iranianNumber, result);
  }

  private _identifyGeographicalInfo(
    number: string,
    result: ParseResult
  ): ParseResult {
    const areaCode3 = number.substring(0, 3);
    if (this.areaCodes[areaCode3]) {
      result.areaCode = areaCode3;
      result.province = this.areaCodes[areaCode3];
      return result;
    }

    const areaCode2 = number.substring(0, 2);
    const fullAreaCode2 = `0${areaCode2}`;
    if (this.areaCodes[fullAreaCode2]) {
      result.areaCode = fullAreaCode2;
      result.province = this.areaCodes[fullAreaCode2];
      return result;
    }

    result.isValid = false;
    result.error = 'کد استان شناسایی نشد';
    return result;
  }

  validatePhoneNumber(phoneNumber: string | number): boolean {
    const parsed = this.parsePhoneNumber(phoneNumber);
    return parsed.isValid;
  }

  getOperatorInfo(phoneNumber: string | number): OperatorInfo | null {
    const parsed = this.parsePhoneNumber(phoneNumber);
    if (
      parsed.isValid &&
      parsed.type === 'Mobile' &&
      parsed.operator &&
      parsed.operatorCode
    ) {
      return {
        operator: parsed.operator,
        operatorCode: parsed.operatorCode,
        type: parsed.type,
      };
    }
    return null;
  }

  getGeographicalInfo(phoneNumber: string | number): GeographicalInfo | null {
    const parsed = this.parsePhoneNumber(phoneNumber);
    if (
      parsed.isValid &&
      parsed.type === 'Landline' &&
      parsed.province &&
      parsed.areaCode
    ) {
      return {
        province: parsed.province,
        areaCode: parsed.areaCode,
        type: parsed.type,
      };
    }
    return null;
  }

  formatPhoneNumber(
    phoneNumber: string | number,
    format: PhoneFormat = 'NATIONAL'
  ): string {
    const parsed = this.parsePhoneNumber(phoneNumber);

    if (!parsed.isValid) {
      return phoneNumber.toString();
    }

    switch (format.toUpperCase()) {
      case 'INTERNATIONAL':
        return parsed.international || phoneNumber.toString();
      case 'NATIONAL':
        return parsed.national || phoneNumber.toString();
      case 'PRETTY':
        return this._formatPretty(
          parsed.national || phoneNumber.toString(),
          parsed.type || ''
        );
      default:
        return parsed.national || phoneNumber.toString();
    }
  }

  private _formatPretty(number: string, type: string): string {
    if (type === 'Mobile') {
      return number.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    } else {
      if (
        number.startsWith('021') ||
        number.startsWith('026') ||
        number.startsWith('031') ||
        number.startsWith('041') ||
        number.startsWith('051') ||
        number.startsWith('061') ||
        number.startsWith('071') ||
        number.startsWith('081')
      ) {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
      } else {
        return number.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
      }
    }
  }
}

export const phoneValidate = new IranianPhoneNumberHandler();
