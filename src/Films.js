import React from 'react';
import { useQuery } from 'react-query';

const Films = () => {
    const { data: { results = [] } = {} } = useQuery('key', () => {
        return fetch('http://swapi.dev/api/films').then((res) => res.json());
    });
    console.log(results);
    return (
        <ul>
            {results?.map(({ title, episode_id }) => (
                <li key={episode_id}>{title}</li>
            ))}
        </ul>
    );
};

export default Films;
