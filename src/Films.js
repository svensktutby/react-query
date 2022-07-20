import React from 'react';
import { useQuery } from 'react-query';

const useGetFilms = (queryKey = 'films') =>
    useQuery(queryKey, () => {
        return fetch('http://swapi.dev/api/films').then((res) => res.json());
    });

const FilmsLength = ({ queryKey }) => {
    const { data: { results = [] } = {}, isLoading } = useGetFilms(queryKey);

    if (isLoading) return <div>Loading...</div>;

    return <p>Films length: {results?.length}</p>;
};

const Films = ({ queryKey }) => {
    const { data: { results = [] } = {}, isLoading, isFetching, isError, error } = useGetFilms(queryKey);

    if (isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isFetching) return <div>Fetching...</div>;

    return (
        <>
            <FilmsLength queryKey="filmsLength" />
            <ul>
                {results?.map(({ title, episode_id }) => (
                    <li key={episode_id}>{title}</li>
                ))}
            </ul>
        </>
    );
};

export default Films;
