import React, {memo} from 'react';
import {Grid, Typography} from "@mui/material"
import AreaContainer from '../AreaContainer/AreaContainer';
import {VALUES_KEY_LABELS} from "../../constants";

interface MetricCardProps {
    title: string
    value: string | number
}

function MetricCard({title, value}: MetricCardProps) {
    return (
        <AreaContainer className="py-1 px-2 shadow-none flex justify-center">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <Typography variant="body2" className="text-gray-600 mb-1 text-xs">
                        {title}
                    </Typography>
                    <Typography variant="h6" className="font-bold text-gray-900 text-sm text-center">
                        {value}
                    </Typography>
                </div>
            </div>
        </AreaContainer>
    )
}

const MetricsGrid = () => {
    return (
        <AreaContainer className="gap-4 flex flex-col py-4">
            <div className="flex justify-between w-full">
                <Typography variant="body1" className="text-gray-600 mt-1">
                    Summary
                </Typography>
                <Typography variant="body1" className="text-gray-600 mt-1">
                    Operator Select
                </Typography>
            </div>

            <Grid container spacing={1}>
                {Object.keys(VALUES_KEY_LABELS).map((metric, index) => {
                    return (
                        <Grid size={2} key={index}>
                            <MetricCard title={VALUES_KEY_LABELS[metric].label} value={0}/>
                        </Grid>
                    )
                })}
            </Grid>
        </AreaContainer>
    )
}

export default memo(MetricsGrid);
