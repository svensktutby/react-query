import React, { useReducer } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

export const fetchFilm = (url) => {
    return fetch(url).then((res) => res.json());
};

const FilmPageWrapper = () => {
    const { id } = useParams();
    const [isShow, toggle] = useReducer((isShow) => !isShow, true);

    const url = `https://swapi.dev/api/films/${id}/`;

    return (
        <>
            <>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at, cumque, dicta dolore eligendi
                facilis impedit minus mollitia nesciunt quod rem rerum sed ullam, veniam voluptatem. Consequatur cumque
                ea et iure maiores modi molestiae. Ab accusantium ad animi asperiores beatae, blanditiis deleniti
                dolorem, ducimus est et, magnam maiores molestiae pariatur perspiciatis recusandae reprehenderit saepe
                sed sint sunt suscipit. Alias aliquam, beatae, consectetur eaque excepturi, incidunt ipsam laborum
                maiores molestiae neque nihil obcaecati quia tempore ullam velit? Aspernatur distinctio doloremque ex
                impedit maiores possimus quam quia quisquam reprehenderit veritatis! Deleniti eligendi facere fugiat in
                incidunt laborum nesciunt non officia rerum veritatis!
            </>
            <br />
            <button onClick={toggle}>{isShow ? 'Hide' : 'Show'} movie info</button>
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
    } = useQuery(['film', url], () => fetchFilm(url), {
        enabled: !!url.length,
        onSuccess: (data) => {
            increment();
        },
        onError: (error) => {},
        onSettled: (data, error) => {},
    });

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
