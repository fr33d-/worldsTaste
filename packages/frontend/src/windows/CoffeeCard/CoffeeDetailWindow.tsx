import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { CoffeeCardDetail } from './CoffeeCardDetail';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { emptyCoffee } from './CoffeeCardHelperFuctions';

export const CoffeeDetailWindow = () => {
    const { id } = useParams();
    const { search } = useLocation();

    const { user, coffees, coffeeAttrData } = useContext(CoffeeContext);

    const coffee = coffees.find((elm) => elm.id === Number(id));
    const view = new URLSearchParams(search).get('view');

    if (!coffeeAttrData) return <p>Error, no coffee data defined</p>;

    if (view === 'new') {
        if (!user) return <p>Error, you are not logged in </p>;

        return <CoffeeCardEdit coffee={emptyCoffee(coffeeAttrData, user)} />;
    } else {
        if (!coffee) return <p>Error, coffee not found</p>;
        if (view === 'edit') {
            return <CoffeeCardEdit coffee={coffee} />;
        // } else if (view === 'brewings') {
        //     return <CoffeeBrewingWindow coffee={coffee} />;
        } else {
            return <CoffeeCardDetail coffee={coffee} />;
        }
    }
};
