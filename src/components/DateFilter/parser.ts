import {endOfDay, format, startOfDay} from 'date-fns';
import {DATES_OPTIONS_VALUES} from "../../constants";

export const defaultValue = '';

export const selectionRange = {
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
};

export const rangeToString = (value: Date[] | string | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value?.map((d) => format(d, 'P')).join('_');
};

export const stringToRange = (value: string): Date[] | undefined => {
    if (!value) return undefined;
    const range = value.split('_');
    if (range?.length === 1 && DATES_OPTIONS_VALUES[value]) {
        return DATES_OPTIONS_VALUES[value];
    }
    return range?.map((d, index) => {
        if (index === 0) return startOfDay(new Date(d));
        return endOfDay(new Date(d));
    });
};

export const isRangeEqual = (range: Date[] | string | undefined, range2: Date[] | string | undefined) => {
    return rangeToString(range) === rangeToString(range2);
};
