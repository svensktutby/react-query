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
    const { data = {}, isLoading, isFetching } = useGetFilm(url);

    const getLoadingText = (text) => {
        if (isLoading) return <span style={{ color: 'navy' }}>Loading...</span>;
        return <>{text}</>;
    };

    return (
        <div>
            <h1>{getLoadingText(data.title)}</h1>
            <b>Episode: </b>
            {getLoadingText(data.episode_id)}
            <h3>Description:</h3>
            <p>{getLoadingText(data.opening_crawl)}</p>
            <hr />
            {isFetching && <span style={{ color: 'coral' }}>Updating...</span>}
        </div>
    );
};
