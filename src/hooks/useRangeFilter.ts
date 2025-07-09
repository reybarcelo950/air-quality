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
import {IDateSelection} from '../interfaces/date.types';

export const useDateRangeFilter = (
    value: string,
    onChange: (e: string) => void,
) => {
    const [rangeValue, setRange] = useState<Date[] | string | undefined>(defaultValue);
    const [customRangeValue, setCustomRangeValue] = useState<IDateSelection>(selectionRange);

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
            handleSelectedData(item);
        },
        [handleSelectedData],
    );

    const handleClear = useCallback(() => {
        setRange(defaultValue);
        update(defaultValue);
    }, [update]);

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

    return {
        handleClear,
        rangeValue,
        handleChange,
        handleCustomRangeChange,
        ...customRangeValue,
    };
};
