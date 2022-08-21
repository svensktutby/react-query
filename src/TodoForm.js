import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from './App';

export const TodoForm = () => {
    const [todo, setTodo] = useState('');

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(
        (todo) =>
            fetch('api/todos', { method: 'POST', body: todo }).then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
            }),
        {
            onSuccess: () => {
                setTodo('');
            },
            onError: (error) => alert(error.message),
            onSettled: () => {
                queryClient.invalidateQueries(['todo']);
            },
        },
    );

    const onChange = ({ target: { value = '' } = {} }) => {
        setTodo(value);
    };

    const getButtonText = () => {
        if (isLoading) return 'Saving...';
        if (isError) return 'Fetching error!';
        if (isSuccess) return 'Save successfully!';
        return 'Save';
    };

    return (
        <div>
            <input type="text" value={todo} onChange={onChange} disabled={isLoading} />
            <button onClick={() => mutate(todo)} disabled={isLoading}>
                {getButtonText()}
            </button>
            <br />
            {error && <span style={{ color: 'coral' }}>{error.message}</span>}
        </div>
    );
};
