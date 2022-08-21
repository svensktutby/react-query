import React from 'react';
import { useQuery } from 'react-query';
import { TodoForm } from './TodoForm';
import fetchMock from 'fetch-mock';

const todosMock = ['walk with dog', 'read book', 'make dinner'];
const wrongWords = ['smoke', 'drink'];
fetchMock.get('api/todos', todosMock);
fetchMock.post(
    'api/todos',
    async (_, res) => {
        const isWrong = wrongWords.includes(res.body);
        if (isWrong) {
            return new Response('', {
                status: 400,
                statusText: 'Wrong todo',
            });
        }
        todosMock.push(res.body);
        return 200;
    },
    {
        delay: 1000, // fake a slow network
    },
);

export const Todos = () => {
    const {
        data: todos = [],
        isLoading,
        isFetching,
    } = useQuery(['todo'], () => fetch('api/todos').then((res) => res.json()));

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h3>My todo list{isFetching && '...'}</h3>
                    <ul>
                        {todos.map((todo, idx) => (
                            <li key={idx}>{todo}</li>
                        ))}
                    </ul>
                    <TodoForm />
                </>
            )}
        </>
    );
};
