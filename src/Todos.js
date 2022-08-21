import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { TodoForm } from './TodoForm';

export const Todos = () => {
    const {
        data: todos = [],
        isLoading,
        isFetching,
    } = useQuery(['todos'], () => fetch('api/todos').then((res) => res.json()));

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h3>My todo list{isFetching && '...'}</h3>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <Link to={`/todo/${todo.id}`}>{todo.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <TodoForm />
                </>
            )}
        </>
    );
};
