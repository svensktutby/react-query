import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { queryClient } from './App';

const useGetFilms = () =>
    useQuery(['films'], () =>
        fetch('https://swapi.dev/api/films')
            .then((res) => res.json())
            .then(({ results }) => {
                results.forEach((film) => {
                    queryClient.setQueryData(['film', film.url], film);
                });
                return results;
            }),
    );

const Films = () => {
    const { data = [], isLoading, isFetching, isError, error } = useGetFilms();

    if (isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isFetching) return <div>Fetching...</div>;

    return (
        <>
            <button
                onClick={() => {
                    queryClient.invalidateQueries('film', { refetchInactive: true });
                }}
            >
                Update all movies
            </button>
            <ul>
                {data?.map(({ title, episode_id, url }) => (
                    <li key={episode_id}>
                        <b>Film: </b>
                        <Link to={url.replace('https://swapi.dev/api/films/', '')}>{title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Films;
