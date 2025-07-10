import React, {memo} from 'react';
import {Typography,} from "@mui/material"
import {DateFilter} from '../DateFilter';
import AreaContainer from "../AreaContainer";
import {useFilter} from '../../providers/FilterProvider';
import DateValue from "../DateValue";

const Header = () => {
    const {from, to, setDateRange} = useFilter()

    return (
        <AreaContainer>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <Typography variant="h4" component="h1" className="font-bold text-2xl">
                        Air Quality Analytics
                    </Typography>
                    <Typography className="mt-1 italic text-gray-600 !text-[14px]">
                        Environmental monitoring dashboard
                    </Typography>
                </div>

                <div className="flex md:flex-col flex-row gap-1 items-center md:items-end justify-end">
                    <DateFilter
                        id={'Date'}
                        title={'Date range'}
                        value={{from, to}}
                        onChange={(v) => {
                            setDateRange?.(v.from as Date, v.to as Date);
                        }}
                    />
                    <div className="flex items-center gap-x-2 text-gray-600 !text-[14px]">
                        <DateValue value={from} format="PPP" className="text-gray-600 !text-[14px]"/>
                        <span className="text-gray-600">-</span>
                        <DateValue value={to} format="PPP" className="!text-[14px]"/>
                    </div>
                </div>
            </div>
        </AreaContainer>
    )
}

export default memo(Header);
