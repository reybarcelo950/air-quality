import React, {memo} from 'react';
import {Typography,} from "@mui/material"
import DateFilter from '../DateFilter/DateFilter';
import AreaContainer from "../AreaContainer/AreaContainer";

const Header = () => {
    return (
        <AreaContainer>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <Typography variant="h4" component="h1" className="font-bold text-gray-900">
                        Dashboard Analytics
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mt-1">
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <DateFilter
                        id={'Date'}
                        title={'Date range'}
                        value={''}
                        onChange={(v) => {
                            console.log(v);
                        }}
                    />
                </div>
            </div>
        </AreaContainer>
    )
}

export default memo(Header);
