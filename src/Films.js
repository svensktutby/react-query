import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FilmPage } from './FilmPage';

const useGetFilms = () =>
    useQuery(['films'], () => {
        return fetch('https://swapi.dev/api/films').then((res) => res.json());
    });

const Films = () => {
    const [filmUrl, setFilmUrl] = useState('');
    const { data: { results = [] } = {}, isLoading, isFetching, isError, error } = useGetFilms();

    if (isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isFetching) return <div>Fetching...</div>;

    if (filmUrl.length) {
        return (
            <>
                <button onClick={() => setFilmUrl('')}>Go back</button>
                <FilmPage url={filmUrl} />
            </>
        );
    }

    return (
        <ul>
            {results?.map(({ title, episode_id, url }) => (
                <li key={episode_id}>
                    <b>Film: </b>
                    <a href="#" onClick={() => setFilmUrl(url)}>
                        {title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Films;
