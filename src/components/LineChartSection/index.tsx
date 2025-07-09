import React, {memo, useMemo} from 'react';
import {Typography} from "@mui/material"
import AreaContainer from '../AreaContainer/AreaContainer';
import useTimeLineMetrics from "../../hooks/useTimeLineMetrics";
import {INTERVAL_OPTIONS, PARAMETERS_OPTIONS} from "../../constants";
import ApexCharts from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';
import {useFilter} from "../../providers/FilterProvider";
import SelectBase from "../SelectBase";
import {INTERVALS} from "../../interfaces/values.types";

const graphConfig: ApexOptions = {
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom',
            tools: {
                download: false,
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    yaxis: {
        labels: {
            formatter: function (val: number) {
                return Number(val).toFixed(0)
            },
        }
    },
    xaxis: {
        type: 'datetime',
    },
    plotOptions: {
        line: {
            colors: {
                threshold: 0,
                colorAboveThreshold: '#3181bc',
                colorBelowThreshold: 'rgba(243,141,141)',
            },
        },
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val: number) {
                return Number(val).toFixed(0)
            }
        }
    }
}

const LineChartSection = () => {
    const {filters, parameter, interval, setParameter, setInterval} = useFilter()
    const {data, isLoading} = useTimeLineMetrics(filters, interval, parameter)

    const series = useMemo(() => [
        {
            name: parameter,
            data: data?.map((d: any) => [new Date(d.interval).getTime(), d[parameter as string]]) || []
        }
    ], [data, parameter]);

    return (
        <AreaContainer className="gap-4 flex flex-col py-4">
            <div className="flex md:items-center md:justify-between w-full md:flex-row flex-col">
                <Typography className="text-gray-600 mt-1 text-lg">
                    Time Series Data
                </Typography>
                <div
                    className="flex md:justify-between items-end md:items-center md:flex-row flex-col gap-x-4 gap-y-2">
                    <div className="flex items-center gap-x-1">
                        <Typography variant="body1" className="text-gray-600 mt-1">
                            Parameter:
                        </Typography>
                        <SelectBase
                            value={parameter}
                            onChange={(v) => setParameter?.(v?.target?.value as string)}
                            options={PARAMETERS_OPTIONS}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Typography variant="body1" className="text-gray-600 mt-1">
                            Interval
                        </Typography>
                        <SelectBase
                            value={interval}
                            onChange={(v) => setInterval?.(v?.target?.value as INTERVALS)}
                            options={INTERVAL_OPTIONS}
                        />
                    </div>
                </div>
            </div>

            <div id="chart">
                <ApexCharts options={graphConfig} series={series} type="line" height={350}/>
            </div>
        </AreaContainer>
    )
}

export default memo(LineChartSection);
