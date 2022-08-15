import React, { useReducer } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { queryClient } from './App';

const FilmPageWrapper = () => {
    const { id } = useParams();
    const [isShow, toggle] = useReducer((isShow) => !isShow);

    const url = `http://swapi.dev/api/films/${id}/`;

    return (
        <>
            <button onClick={toggle}>Toggle visibility</button>
            <button
                onClick={() => {
                    queryClient.invalidateQueries(['film', url], { refetchActive: false });
                }}
            >
                Stale data
            </button>
            <button
                onClick={() => {
                    queryClient.invalidateQueries(['film', url], { refetchInactive: true });
                }}
            >
                Update inactive data
            </button>
            {isShow ? <FilmPage url={url} /> : null}
        </>
    );
};

const FilmPage = ({ url }) => {
    const navigate = useNavigate();
    const [count, increment] = useReducer((c) => c + 1, 0);

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

export default FilmPageWrapper;
