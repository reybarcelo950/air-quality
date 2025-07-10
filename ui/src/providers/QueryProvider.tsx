import {memo, ReactNode, useState} from 'react';
import {QueryClient, QueryClientConfig, QueryClientProvider} from '@tanstack/react-query';

export const CONFIG: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            networkMode: 'offlineFirst',
        },
        mutations: {
            networkMode: 'offlineFirst',
        },
    },
};

export type QueryContextProps = {
    children: ReactNode;
};

const QueryProvider = ({children}: QueryContextProps) => {
    const [queryClient] = useState<QueryClient>(() => new QueryClient(CONFIG));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default memo(QueryProvider);
