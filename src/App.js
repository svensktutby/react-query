import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Films from './Films';

import './App.css';

const queryClient = new QueryClient({
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
                <Films queryKey="films1" />
                <Films queryKey="films2" />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
