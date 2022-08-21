import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import './mock';

import { Todos } from './Todos';
import { Todo } from './Todo';

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
        <Router>
            <QueryClientProvider client={queryClient}>
                <div className="app">
                    <Routes>
                        <Route path="/todo/:id" element={<Todo />} />
                        <Route path="/" element={<Todos />} />
                    </Routes>
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Router>
    );
};

export default App;
