import MenuItem from '@mui/material/MenuItem';
import {Box, ListItemText, Radio, Stack, styled} from '@mui/material';
import {DateRangePicker} from 'react-date-range';
import {isRangeEqual} from './parser';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {useDateRangeFilter} from "../../hooks/useRangeFilter";
import {DATES_OPTIONS_ENUM_ENUM, DATES_OPTIONS_VALUES} from '../../constants';
import {IDateRangeOption, OptionTypes} from "../../interfaces/date.types";

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
                                value = defaultValue,
                                options: defaultOptions = DATES_OPTIONS_ENUM_ENUM,
                                excludeOptions = [],
                                enableCustom = true,
                                onRangeOptionSelect,
                            }: DateFilterProps) => {
    const {
        options,
        rangeValue,
        handleChange,
        isOpen,
        handleCustomItemSelect,
        handleCustomRangeChange,
        startDate,
        endDate,
    } = useDateRangeFilter(value, onChange, defaultOptions, excludeOptions, onRangeOptionSelect);

    return (
        <Box px={0} py={0}>
            {options?.map((option: any, index: number) => {
                const itemValue: string | Date[] = option?.range || option._id || option;
                const label: string = option.name || option;
                const isSelected =
                    !isOpen &&
                    (isRangeEqual(rangeValue, itemValue) ||
                        rangeValue === itemValue ||
                        rangeValue === DATES_OPTIONS_VALUES[itemValue as string]);

                return (
                    <MenuItem
                        onClick={() => {
                            handleChange(itemValue);
                        }}
                        key={option._id || index}
                    >
                        <Radio checked={isSelected}/>
                        <ListItemText primary={label}/>
                    </MenuItem>
                );
            })}
            {enableCustom && (
                <>
                    <MenuItem onClick={handleCustomItemSelect}>
                        <Radio checked={isOpen}/>
                        <ListItemText primary={'Custom range'}/>
                    </MenuItem>
                    {isOpen && (
                        <CustomMenuItem>
                            <SDateRangePicker
                                locale={'en'}
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
                        </CustomMenuItem>
                    )}
                </>
            )}
        </Box>
    );
};

export default DateFilterSelector;
