import React, {useCallback, useRef} from 'react';
import MenuItem from '@mui/material/MenuItem';
import {ListItemText} from '@mui/material';
import {FilterBase} from '../Base';
import {IDateRangeOption, OptionTypes} from "../../interfaces/date.types";
import {useDateRangeFilter} from "../../hooks/useRangeFilter";
import DateFilterSelector from "./DateFilterSelector";
import {BaseFilterProps} from "../Base/FilterBase";

export type DateFilterProps = BaseFilterProps & {
    value?: string;
    options?: Array<IDateRangeOption | string>;
    excludeOptions?: OptionTypes[];
    onChange: (selected: string) => void;
    enableCustom?: boolean;
};

const DateFilter = ({id, title, onChange, value = '', ...rest}: DateFilterProps) => {
    const menuPopupRef = useRef<any>(null);

    const onRangeOptionSelect = useCallback(() => {
        // let's wait the popover re-render its content before re-position it
        setTimeout(() => {
            menuPopupRef?.current?.updatePosition();
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuPopupRef?.current]);

    const {handleClear} = useDateRangeFilter(value, onChange);

    return (
        <FilterBase title={title} id={id} ref={menuPopupRef}>
            <DateFilterSelector {...rest} value={value} onChange={onChange} onRangeOptionSelect={onRangeOptionSelect}/>
            <MenuItem key={'clear'} value={'clear'} onClick={handleClear}>
                <ListItemText primary={'Clear'} primaryTypographyProps={{color: 'primary', ml: 0.5}}/>
            </MenuItem>
        </FilterBase>
    );
};

export default DateFilter;
