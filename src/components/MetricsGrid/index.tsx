import React, {memo} from 'react';
import {Grid, Typography} from "@mui/material"
import AreaContainer from '../AreaContainer/AreaContainer';
import {OPERATOR_OPTION_HELP, OPERATOR_OPTIONS, VALUES_KEY_LABELS} from "../../constants";
import useGetSummaryMetrics from "../../hooks/useGetSummaryMetrics";
import {cx} from "../../utils";
import {useFilter} from "../../providers/FilterProvider";
import SelectBase from "../SelectBase";
import {OPERATORS} from "../../interfaces/values.types";
import useDelayedLoading from "../../hooks/useDelayedLoading";

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
                                {'!font-bold ': !isLoading},
                                {'!opacity-75 !font-light': isLoading},
                            )
                        }>
                        {isLoading ? 'Loading...' : (value !== undefined ? Number(value).toFixed(3) : '-')}
                    </Typography>
                </div>
            </div>
        </AreaContainer>
    )
}

const MetricsGrid = () => {
    const {filters, operator, setOperator} = useFilter()

    const {data, isLoading} = useGetSummaryMetrics(filters, operator)
    const loading = useDelayedLoading(isLoading)

    return (
        <AreaContainer className="gap-4 flex flex-col py-4">
            <div className="flex md:justify-between items-end w-full md:items-center md:flex-row flex-col">
                <div>
                    <Typography className="mt-1 text-lg font-bold">
                        Summary
                    </Typography>
                    <Typography className="mt-1 italic text-gray-600 !text-[14px]">
                        {OPERATOR_OPTION_HELP[operator as OPERATORS]}
                    </Typography>
                </div>
                <div className="flex items-center gap-x-1">
                    <Typography variant="body1" className="text-gray-600 mt-1">
                        Operator:
                    </Typography>
                    <SelectBase
                        value={operator}
                        onChange={(v) => setOperator?.(v?.target?.value as OPERATORS)}
                        options={OPERATOR_OPTIONS}
                    />
                </div>
            </div>

            <Grid container spacing={2}>
                {Object.keys(VALUES_KEY_LABELS).map((metric, index) => {
                    return (
                        <Grid size={{xs: 6, md: 2}} key={index}>
                            <MetricCard
                                title={VALUES_KEY_LABELS[metric].label}
                                value={data?.[metric]}
                                isLoading={loading}/>
                        </Grid>
                    )
                })}
            </Grid>
        </AreaContainer>
    )
}

export default memo(MetricsGrid);
