import React from 'react';
import { useQuery } from 'react-query';

const Films = ({ queryKey }) => {
    const {
        data: { results = [] } = {},
        isLoading,
        isFetching,
        isError,
        error,
    } = useQuery(queryKey, () => {
        return fetch('http://swapi.dev/api/films').then((res) => res.json());
    });

    if (isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isFetching) return <div>Fetching...</div>;

    return (
        <ul>
            {results?.map(({ title, episode_id }) => (
                <li key={episode_id}>{title}</li>
            ))}
        </ul>
    );
};

export default Films;
