import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { UserContext } from '../../Contexts/UserContext';
import { CoffeeCardDetail } from './CoffeeCardDetail';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { emptyCoffee } from './CoffeeCardHelperFuctions';

export const CoffeeDetailWindow = () => {
    const { fistParam, secondParam, thirdParam, forthParam } = useParams();
    // const { search } = useLocation();

    const { coffees, coffeeStores } = useContext(CoffeeContext);
    const { user } = useContext(UserContext);

    // const { user, coffeeStores } = useContext(CoffeeContext);
    // const coffees: CoffeeEntry[] = [];
    // console.log('Coffees in context', coffees);

    // const view = new URLSearchParams(search).get('view');

    if (!coffeeStores) return <p>Error, no coffee stores defined</p>;

    if (fistParam === 'new') {
        if (!user) return <p>Error, you are not logged in </p>;

        return <CoffeeCardEdit coffee={emptyCoffee(user, coffeeStores)} />;
    } else if (typeof Number(fistParam) === 'number') {

        const coffee = coffees && coffees.find((elm) => elm.id === Number(fistParam));
        if (!coffee) return <p>Error, coffee not found</p>;

        if (secondParam === 'edit') {
            return <CoffeeCardEdit coffee={coffee} />;
        } else {
            return (
                <CoffeeCardDetail coffee={coffee} initialTab={secondParam} brewingId={thirdParam} state={forthParam} />
            );
        }
    } else {
        return <p>Invalid url</p>;
    }
};
