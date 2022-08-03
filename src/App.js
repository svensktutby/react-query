import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Films from './Films';

import './App.css';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            // staleTime: Infinity,
            // cacheTime: 5000,
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Films />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
