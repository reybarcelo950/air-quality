export type IDateRangeOption = {
    _id?: string;
    label?: string;
    name?: string;
    translate?: boolean;
    range?: Date[];
};

export type IDateSelection = {
    startDate?: Date;
    endDate?: Date;
};

export enum OptionTypes {
    TODAY = 'TODAY',
    YESTERDAY = 'YESTERDAY',
    CURRENT_MONTH = 'CURRENT_MONTH',
    LAST_MONTH = 'LAST_MONTH',
    LAST_SEVEN_DAYS = 'LAST-SEVEN-DAYS',
    LAST_THIRTY_DAYS = 'LAST-THIRTY-DAYS',
    LAST_NINETY_DAYS = 'LAST-NINETY-DAYS',
    THIS_YEAR = 'THIS-YEAR',
    LAST_TWELVE_MONTHS = 'LAST-TWELVE-MONTHS',
}
