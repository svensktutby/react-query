import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Planet } from './Planet';

const useGetFilm = (film = '') =>
    useQuery(
        ['films', film],
        () => {
            return fetch(`http://swapi.dev/api/films?&search=${film}`).then((res) => res.json());
        },
        {
            retry: 2,
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
                {results?.map(({ title, episode_id, planets }) => (
                    <li key={episode_id}>
                        {title}
                        {planets?.map((planet) => (
                            <Planet key={planet} planetUrl={planet} />
                        ))}
                    </li>
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
