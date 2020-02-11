import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { UserContext } from '../../Contexts/UserContext';
import { CoffeeCardDetail } from './CoffeeCardDetail';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { emptyCoffee } from './CoffeeCardHelperFuctions';

export const CoffeeDetailWindow = () => {
    const { firstParam, secondParam, thirdParam, forthParam } = useParams();
    const { pathname } = useLocation();

    const { coffees, coffeeStores } = useContext(CoffeeContext);
    const { user } = useContext(UserContext);

    // const { user, coffeeStores } = useContext(CoffeeContext);
    // const coffees: CoffeeEntry[] = [];
    // console.log('Coffees in context', coffees);

    // const view = new URLSearchParams(search).get('view');

    console.log('First param: ', firstParam);
    console.log('Second param: ', secondParam);
    console.log('Third param: ', thirdParam);
    console.log('Forth param: ', forthParam);

    if (!coffeeStores) return <p>Error, no coffee stores defined</p>;

    if (firstParam === 'new') {
        if (!user) return <p>Error, you are not logged in </p>;

        return <CoffeeCardEdit coffee={emptyCoffee(user, coffeeStores)} />;
    } else if (typeof Number(firstParam) === 'number') {
        const coffee = coffees && coffees.find((elm) => elm.id === Number(firstParam));
        if (!coffee) return <p>Error, coffee not found</p>;

        if (secondParam === 'edit') {
            return <CoffeeCardEdit coffee={coffee} />;
        } else {
            return (
                <CoffeeCardDetail
                    coffee={coffee}
                    initialTab={secondParam}
                    brewingId={thirdParam}
                    initialState={forthParam}
                    baseUrl={pathname}
                />
            );
        }
    } else {
        return <p>Invalid url</p>;
    }
};
