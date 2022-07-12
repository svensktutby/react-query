import React from 'react';
import { useQuery } from 'react-query';

const Films = () => {
    const {
        data: { results = [] } = {},
        isLoading,
        isError,
        error,
    } = useQuery('key', () => {
        return fetch('http://swapi.dev/api/films').then((res) => res.json());
    });

    if (isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {results?.map(({ title, episode_id }) => (
                <li key={episode_id}>{title}</li>
            ))}
        </ul>
    );
};

export default Films;
