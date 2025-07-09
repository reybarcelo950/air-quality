import {Box, Stack, styled} from '@mui/material';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {useDateRangeFilter} from "../../hooks/useRangeFilter";
import {IDateRangeOption, OptionTypes} from "../../interfaces/date.types";
import enLocale from 'date-fns/locale/en-US';

export type DateFilterProps = {
    value?: string;
    options?: Array<IDateRangeOption | string>;
    excludeOptions?: OptionTypes[];
    onChange: (selected: string) => void;
    enableCustom?: boolean;
    onRangeOptionSelect?: () => void;
};

const defaultValue: string = '';

export const CustomMenuItem = styled(Stack)(({theme}) => ({
    padding: 0,
    [theme.breakpoints.up('md')]: {
        padding: '0px 16px',
    },
}));

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

const DateFilterSelector = ({
                                onChange,
                                value = defaultValue
                            }: DateFilterProps) => {
    const {
        rangeValue,
        handleChange,
        handleCustomRangeChange,
        startDate,
        endDate,
    } = useDateRangeFilter(value, onChange);

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
                        startDate,
                        endDate,
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
