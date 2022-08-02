import React from 'react';
import { useQuery } from 'react-query';

const useGetPlanet = (planetUrl = '') =>
    useQuery(
        ['planet', planetUrl],
        () => {
            return fetch(planetUrl).then((res) => res.json());
        },
        {
            enabled: !!planetUrl.length,
        },
    );

export const Planet = ({ planetUrl }) => {
    const { data = {}, isLoading } = useGetPlanet(planetUrl);

    return <div>planet: {isLoading ? '...' : data.name}</div>;
};
