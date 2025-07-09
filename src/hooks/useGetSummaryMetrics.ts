import {useQuery} from "@tanstack/react-query";

const useGetSummaryMetrics = (
    {filters, operator = 'avg'}:
    { filters: any, operator: 'avg' | 'min' | 'max' }
) => {
    return useQuery({
        queryKey: ['SUMMARY_METRICS', filters, operator],
        // @ts-ignore
        queryFn: () => AddressService.getCuPoi(lng, lat),
        // @ts-ignore
        enabled: !!(lng && lat && countryCode === 'CU' && updateMarker),
    });
};

export default useGetSummaryMetrics;
