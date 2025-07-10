import {useQuery} from "@tanstack/react-query";
import AirQualityApiService from "../services/AirQualityApiService";
import {OPERATORS} from "../interfaces/values.types";

const useGetSummaryMetrics = (filters?: any, operator = OPERATORS.AVG) => {
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
