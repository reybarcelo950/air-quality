import React, {memo, useMemo, useState} from 'react';
import {Typography} from "@mui/material"
import AreaContainer from '../AreaContainer/AreaContainer';
import useTimeLineMetrics from "../../hooks/useTimeLineMetrics";
import {INTERVALS, VALUES_KEY_LABELS} from "../../constants";
import ApexCharts from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';

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
        stepSize: 500,
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
    const [parameter, setParameter] = useState('CO');
    const [interval, setInterval] = useState(INTERVALS.daily);

    const {data, isLoading} = useTimeLineMetrics({
        from: new Date(2004, 0, 1).toISOString(),
        to: new Date(2005, 11, 31).toISOString(),
    }, interval, parameter)

    const series = useMemo(() => [
        {
            name: parameter,
            data: data?.map((d: any) => [new Date(d.interval).getTime(), d[parameter]]) || []
        }
    ], [data, parameter]);

    return (
        <AreaContainer className="gap-4 flex flex-col py-4">
            <div className="flex justify-between w-full items-center">
                <Typography className="text-gray-600 mt-1 text-lg">
                    <b>{VALUES_KEY_LABELS[parameter]?.label}</b> - Time Series Data
                </Typography>
                <div className="flex items-center gap-x-4">
                    <Typography variant="body1" className="text-gray-600 mt-1">
                        Parameter Select
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mt-1">
                        Interval Select
                    </Typography>
                </div>
            </div>

            <div id="chart">
                <ApexCharts options={graphConfig} series={series} type="line" height={350}/>
            </div>
        </AreaContainer>
    )
}

export default memo(LineChartSection);
