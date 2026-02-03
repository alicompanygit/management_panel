export interface IDateRange {
    from: string;
    to: string;
}

export interface IDateObject {
    gregorian: IDateRange;
    jalali: IDateRange;
}