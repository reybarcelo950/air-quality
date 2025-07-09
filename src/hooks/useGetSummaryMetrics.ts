import {useQuery} from "@tanstack/react-query";
import AirQualityApiService from "../services/AirQualityApiService";

const useGetSummaryMetrics = (filters?: any, operator = 'avg') => {
    return useQuery({
        queryKey: ['SUMMARY_METRICS', filters, operator],
        // @ts-ignore
        queryFn: () => AirQualityApiService.getSummaryMetrics({
            ...filters,
            operator
        }),
        enabled: !!operator,
    });
};

export default useGetSummaryMetrics;
