import React from 'react';
import {FilterBase} from '../Base';
import DateFilterSelector, {IDateSelection} from "./DateFilterSelector";
import {BaseFilterProps} from "../Base/FilterBase";

export type DateFilterProps = BaseFilterProps & {
    value?: any;
    onChange: (selected: IDateSelection) => void;
};

const DateFilter = ({id, title, onChange, value, ...rest}: DateFilterProps) => {

    return (
        <FilterBase title={title} id={id}>
            <DateFilterSelector
                {...rest}
                value={value}
                onChange={onChange}
            />
        </FilterBase>
    );
};

export default DateFilter;
