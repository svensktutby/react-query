import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from './App';
import { useParams } from 'react-router-dom';

export const Todo = () => {
    const { id } = useParams();
    const [todoInput, setTodoInput] = useState('');

    const { data: todo = {}, ...todoOptions } = useQuery(['todo', id], () =>
        fetch(`api/todos/${id}`).then((res) => res.json()),
    );
    const { mutate, isLoading, isError, error, isSuccess } = useMutation(
        (todo) => fetch('api/todos', { method: 'PUT', body: todo }).then((res) => res.json()),
        {
            onSuccess: (data, value) => {
                setTodoInput('');
                // queryClient.invalidateQueries(['todo', value.id.toString()]);
                queryClient.setQueryData(['todo', data.id.toString()], data);
            },
        },
    );

    const onChange = ({ target: { value = '' } = {} }) => {
        setTodoInput(value);
    };

    const getButtonText = () => {
        if (isLoading) return 'Saving...';
        if (isError) return 'Fetching error!';
        if (isSuccess) return 'Save successfully!';
        return 'Save';
    };

    return (
        <div>
            {todoOptions.isLoading ? (
                <>Loading...</>
            ) : (
                <>
                    <h2>{todo.name}</h2>
                    <input type="text" value={todoInput} onChange={onChange} disabled={isLoading} />
                    <button onClick={() => mutate({ id: todo.id, name: todoInput })} disabled={isLoading}>
                        {getButtonText()}
                    </button>
                    <br />

                    {error && <span style={{ color: 'coral' }}>{error.message}</span>}
                </>
            )}
        </div>
    );
};
