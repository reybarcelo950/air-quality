import React, {memo} from 'react';
import {Typography,} from "@mui/material"
import DateFilter from '../DateFilter/DateFilter';
import AreaContainer from "../AreaContainer/AreaContainer";
import {useFilter} from '../../providers/FilterProvider';

const Header = () => {
    const {from, to, setDateRange} = useFilter()

    return (
        <AreaContainer>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <Typography variant="h4" component="h1" className="font-bold text-gray-900">
                        Dashboard Analytics
                    </Typography>
                    <Typography className="mt-1 italic text-gray-600 !text-[14px]">
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <DateFilter
                        id={'Date'}
                        title={'Date range'}
                        value={{from, to}}
                        onChange={(v) => {
                            setDateRange?.(v.from as Date, v.to as Date);
                        }}
                    />
                </div>
            </div>
        </AreaContainer>
    )
}

export default memo(Header);
