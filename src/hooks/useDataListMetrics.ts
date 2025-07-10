import {useQuery} from "@tanstack/react-query";
import AirQualityApiService from "../services/AirQualityApiService";

const useDataListMetrics = (filters: any) => {
    return useQuery({
        queryKey: ['GENERAL_METRICS', filters],
        queryFn: () => AirQualityApiService.getMetrics({...filters})
    });
};

export default useDataListMetrics;
