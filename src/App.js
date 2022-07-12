import { useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
                {isOpen && <Films />}
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
