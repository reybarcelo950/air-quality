import React, {memo, useEffect} from 'react';
import {useTable} from "../../providers/TableProvider";
import {FilterBase} from "../Base";
import {Checkbox} from "@mui/material";

const VisibilityMenu = () => {
    const {columns, setIsVisible, isVisible} = useTable();

    useEffect(() => {
        const initial: Record<string, boolean> = isVisible || {};
        columns?.forEach(col => {
            if (initial[col?.field] === undefined)
                initial[col?.field] = true;
        });
        setIsVisible?.(initial);
    }, [columns]);

    const handleToggle = (col: string) => {
        setIsVisible?.((prev: Record<string, boolean>) => {
            return {...prev, [col]: !prev[col] as boolean};
        });
    };

    return (
        <FilterBase title={'Columns'} id={'visibility-menu'}>
            {columns?.map(col => (
                <label className="!mr-2 flex items-center cursor-pointer mb-1" key={col?.field}>
                    <Checkbox
                        size="small"
                        className="!py-0"
                        id={`chk-${col}`}
                        checked={!!isVisible?.[col?.field]}
                        onChange={() => handleToggle(col?.field)}
                    />
                    {col?.headerName}
                </label>
            ))}
        </FilterBase>
    );
};

export default memo(VisibilityMenu);
