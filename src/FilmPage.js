import React from 'react';
import { useQuery } from 'react-query';

const useGetFilm = (url = '') =>
    useQuery(
        ['film', url],
        () => {
            return fetch(url).then((res) => res.json());
        },
        { enabled: !!url.length },
    );

export const FilmPage = ({ url }) => {
    const { data = {}, isLoading } = useGetFilm(url);

    const getLoadingText = (text) => (isLoading ? <span>...</span> : <>{text}</>);

    return (
        <div>
            <h1>{getLoadingText(data.title)}</h1>
            <b>Episode: </b>
            {getLoadingText(data.episode_id)}
            <h3>Description:</h3>
            <p>{getLoadingText(data.opening_crawl)}</p>
        </div>
    );
};
