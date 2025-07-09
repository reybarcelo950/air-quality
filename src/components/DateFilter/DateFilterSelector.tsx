import {Box, debounce, styled} from '@mui/material';
import {DateRangePicker, RangeKeyDict} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import enLocale from 'date-fns/locale/en-US';
import {useCallback, useMemo, useState} from "react";

export type IDateSelection = {
    from?: Date;
    to?: Date;
};

export type DateFilterProps = {
    value?: any;
    onChange: (selected: IDateSelection) => void;
};

const SDateRangePicker = styled<any>(DateRangePicker)(({theme}) => ({
    '.rdrDefinedRangesWrapper, .rdrMonthName': {
        display: 'none',
    },
    '.rdrMonthAndYearWrapper': {
        padding: 0
    },
    '.rdrDays, .rdrMonthsHorizontal, .rdrMonthAndYearWrapper, .rdrDateRangePickerWrapper': {
        maxWidth: '275px',
    },
    [theme.breakpoints.up('sm')]: {
        '.rdrDays, .rdrMonthsHorizontal, .rdrMonthAndYearWrapper, .rdrDateRangePickerWrapper': {
            maxWidth: 'initial',
        },
    },
}));

const DateFilterSelector = ({onChange, value}: DateFilterProps) => {
    const [rangeValue, setRange] = useState<IDateSelection>(value as IDateSelection);
    const update = useMemo(() => {
        return debounce(onChange, 400);
    }, [onChange]);

    const handleCustomRangeChange = useCallback(({selection}: RangeKeyDict) => {
            setRange({from: selection.startDate, to: selection.endDate});
            update({from: selection.startDate, to: selection.endDate});
        }, [update],
    );

    return (
        <Box px={0} py={0}>
            <SDateRangePicker
                locale={enLocale}
                staticRanges={[]}
                inputRanges={[]}
                onChange={handleCustomRangeChange}
                showMonthAndYearPickers={false}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={[
                    {
                        startDate: rangeValue?.from,
                        endDate: rangeValue?.to,
                        key: 'selection',
                    },
                ]}
                direction='horizontal'
                showDateDisplay={false}
            />
        </Box>
    );
};

export default DateFilterSelector;
