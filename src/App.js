import { QueryClient, QueryClientProvider } from 'react-query';

import Films from './Films';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Films />
            </div>
        </QueryClientProvider>
    );
};

export default App;
