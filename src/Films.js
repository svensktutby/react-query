import React, { useState } from 'react';
import { useQuery } from 'react-query';

const useGetFilm = (film = '') =>
    useQuery(
        ['films', film],
        () => {
            return fetch(`http://swapi.deev/api/films?&search=${film}`).then((res) => res.json());
        },
        {
            retry: 5, // default: 3
            retryDelay: 1000, // default: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000)
            enabled: !!film.length,
        },
    );

const SearchFilm = ({ film }) => {
    const { data: { results = [] } = {}, isLoading, isFetching, isError, error } = useGetFilm(film);

    if (isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isFetching) return <div>Fetching...</div>;

    return (
        <>
            <ul>
                {results?.map(({ title, episode_id }) => (
                    <li key={episode_id}>{title}</li>
                ))}
            </ul>
        </>
    );
};

const Films = () => {
    const [film, setFilm] = useState('');

    return (
        <>
            <input type="text" value={film} onChange={({ target: { value } }) => setFilm(value)} />
            <SearchFilm film={film} />
        </>
    );
};

export default Films;
