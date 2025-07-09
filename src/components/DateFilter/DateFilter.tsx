import React, {useRef} from 'react';
import {FilterBase} from '../Base';
import DateFilterSelector, {IDateSelection} from "./DateFilterSelector";
import {BaseFilterProps} from "../Base/FilterBase";

export type DateFilterProps = BaseFilterProps & {
    value?: any;
    onChange: (selected: IDateSelection) => void;
};

const DateFilter = ({id, title, onChange, value, ...rest}: DateFilterProps) => {
    const menuPopupRef = useRef<any>(null);

    return (
        <FilterBase title={title} id={id} ref={menuPopupRef}>
            <DateFilterSelector
                {...rest}
                value={value}
                onChange={onChange}
            />
        </FilterBase>
    );
};

export default DateFilter;
