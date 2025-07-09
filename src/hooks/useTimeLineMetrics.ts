import {useQuery} from "@tanstack/react-query";
import AirQualityApiService from "../services/AirQualityApiService";

const useTimeLineMetrics = (filters: any, interval = 'daily', parameter = 'CO') => {
    return useQuery({
        queryKey: ['TIMELINE_METRICS', parameter, filters, interval],
        // @ts-ignore
        queryFn: () => AirQualityApiService.getTimeLineMetrics({
            ...filters,
            parameter,
            interval
        }),
        enabled: !!interval,
    });
};

export default useTimeLineMetrics;
