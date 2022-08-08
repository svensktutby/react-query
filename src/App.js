import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import Films from './Films';
import { FilmPage } from './FilmPage';

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
                        <Route path="/:id" element={<FilmPage />} />
                        <Route path="/" element={<Films />} />
                    </Routes>
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Router>
    );
};

export default App;
