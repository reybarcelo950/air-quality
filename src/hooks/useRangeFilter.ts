import {useCallback, useEffect, useMemo, useState} from 'react';
import {debounce} from '@mui/material';
import {
    defaultValue,
    isRangeEqual,
    rangeToString,
    selectionRange,
    stringToRange
} from '../components/DateFilter/parser';
import {RangeKeyDict} from 'react-date-range';
import {IDateRangeOption, IDateSelection, OptionTypes} from '../interfaces/date.types';
import {DATES_OPTIONS_VALUES} from "../constants";
import useToggle from "./useToggle";

export const useDateRangeFilter = (
    value: string,
    onChange: (e: string) => void,
    options?: Array<IDateRangeOption | string>,
    excludeOptions?: OptionTypes[],
    onRangeOptionSelect?: () => void,
) => {
    const [rangeValue, setRange] = useState<Date[] | string | undefined>(defaultValue);
    const [customRangeValue, setCustomRangeValue] = useState<IDateSelection>(selectionRange);

    const isCustomOption = useMemo(() => {
        return !options?.some((option: any) => {
            const valueToCheck = stringToRange(value);
            const itemValue: string | Date[] = option?.range || option._id || option;
            return (
                isRangeEqual(valueToCheck, itemValue) ||
                valueToCheck === itemValue ||
                valueToCheck === DATES_OPTIONS_VALUES[itemValue as string]
            );
        });
    }, [options, value]);

    const {isOpen, setOpen} = useToggle(isCustomOption);

    useEffect(() => {
        setRange((preRange) => {
            const range = stringToRange(value);
            if (isRangeEqual(preRange, range)) {
                return preRange;
            }
            return range;
        });
    }, [value]);

    useEffect(() => {
        const range = stringToRange(value);
        if (range) {
            setCustomRangeValue({
                startDate: range[0],
                endDate: range[1],
            });
        }
    }, [value]);

    useEffect(() => {
        // check if is some options values
        setOpen(isCustomOption);
    }, [isCustomOption, setOpen]);

    const update = useMemo(() => {
        return debounce(onChange, 400);
    }, [onChange]);

    const handleSelectedData = useCallback(
        (item: Date[] | string) => {
            setRange(item);
            if (typeof item === 'string') {
                update(item);
            } else {
                update(rangeToString(item));
            }
        },
        [update],
    );

    const handleChange = useCallback(
        (item: Date[] | string) => {
            setOpen(false);
            handleSelectedData(item);
        },
        [setOpen, handleSelectedData],
    );

    const handleClear = useCallback(() => {
        setOpen(false);
        setRange(defaultValue);
        update(defaultValue);
    }, [update, setOpen]);

    const handleCustomItemSelect = useCallback(() => {
        setOpen(true);
        setRange(defaultValue);
        onRangeOptionSelect?.();
    }, [setOpen, onRangeOptionSelect]);

    const handleCustomRangeChange = useCallback(
        ({selection}: RangeKeyDict) => {
            setCustomRangeValue({startDate: selection.startDate, endDate: selection.endDate});
            if (selection.startDate && selection.endDate) {
                const sValues = [selection.startDate, selection.endDate];
                setRange(sValues);
                update(rangeToString(sValues));
            }
        },
        [update],
    );

    const mOptions = useMemo(
        () =>
            options
                // @ts-ignore
                ?.filter((option: IDateRangeOption | string) => !excludeOptions.includes(option?._id || option))
                ?.map((option: IDateRangeOption | string) => {
                    if (typeof option === 'string') {
                        return {_id: option, name: option};
                    }
                    return {...option, name: option.label || option.name || option._id || ''};
                }),
        [options, excludeOptions],
    );

    return {
        options: mOptions,
        isOpen,
        handleClear,
        rangeValue,
        handleChange,
        handleCustomRangeChange,
        handleCustomItemSelect,
        ...customRangeValue,
    };
};
