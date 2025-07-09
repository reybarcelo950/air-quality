import React, {memo} from 'react';
import {Grid, Typography} from "@mui/material"
import AreaContainer from '../AreaContainer/AreaContainer';
import {VALUES_KEY_LABELS} from "../../constants";
import useGetSummaryMetrics from "../../hooks/useGetSummaryMetrics";
import {cx} from "../../utils";

interface MetricCardProps {
    title: string
    value: string | number
    isLoading?: boolean
}

function MetricCard({title, value, isLoading}: MetricCardProps) {
    return (
        <AreaContainer className="py-1 px-2 shadow-none flex justify-center">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <Typography variant="body2" className="text-gray-600 mb-1 text-xs text-center">
                        {title}
                    </Typography>
                    <Typography
                        className={
                            cx(
                                'text-gray-900 text-sm text-center',
                                {'font-bold ': !isLoading},
                                {'opacity-75 font-light': isLoading},
                            )
                        }>
                        {isLoading ? 'Loading...' : Number(value).toFixed(3)}
                    </Typography>
                </div>
            </div>
        </AreaContainer>
    )
}

const MetricsGrid = () => {
    const {data, isLoading} = useGetSummaryMetrics({
        from: new Date(2004, 0, 1).toISOString(),
        to: new Date(2005, 11, 31).toISOString(),
    })

    return (
        <AreaContainer className="gap-4 flex flex-col py-4">
            <div className="flex justify-between w-full">
                <Typography className="mt-1 text-lg font-bold">
                    Summary
                </Typography>
                <Typography variant="body1" className="mt-1">
                    Operator Select
                </Typography>
            </div>

            <Grid container spacing={2}>
                {Object.keys(VALUES_KEY_LABELS).map((metric, index) => {
                    return (
                        <Grid size={2} key={index}>
                            <MetricCard
                                title={VALUES_KEY_LABELS[metric].label}
                                value={data?.[metric] || '-'}
                                isLoading={isLoading}/>
                        </Grid>
                    )
                })}
            </Grid>
        </AreaContainer>
    )
}

export default memo(MetricsGrid);
