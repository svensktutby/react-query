import React from 'react';
import { useQuery } from 'react-query';

import { queryClient } from './App';

const useGetFilm = (url = '') =>
    useQuery(
        ['film', url],
        () => {
            return fetch(url).then((res) => res.json());
        },
        {
            enabled: !!url.length,
            initialData: () => queryClient.getQueryData('films')?.results?.find((film) => film.url === url),
        },
    );

export const FilmPage = ({ url }) => {
    const { data = {}, isLoading, isFetching } = useGetFilm(url);

    const getLoadingText = (text) => {
        if (isLoading) return <span>Loading...</span>;
        if (isFetching) return <span>Updating...</span>;
        return <>{text}</>;
    };

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
