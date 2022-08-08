import React, { useReducer } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

export const FilmPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [count, increment] = useReducer((c) => c + 1, 0);

    const url = `http://swapi.dev/api/films/${id}/`;

    const {
        data = {},
        isLoading,
        isFetching,
    } = useQuery(
        ['film', url],
        () => {
            return fetch(url).then((res) => res.json());
        },
        {
            enabled: !!url.length,
            onSuccess: (data) => {
                increment();
            },
            onError: (error) => {},
            onSettled: (data, error) => {},
        },
    );

    const getLoadingText = (text) => {
        if (isLoading) return <span style={{ color: 'navy' }}>Loading...</span>;
        return <>{text}</>;
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1>{getLoadingText(data.title)}</h1>
            <b>Episode: </b>
            {getLoadingText(data.episode_id)}
            <h3>Description:</h3>
            <p>{getLoadingText(data.opening_crawl)}</p>
            <hr />
            {isFetching && <span style={{ color: 'coral' }}>Updating... #{count}</span>}
        </div>
    );
};
