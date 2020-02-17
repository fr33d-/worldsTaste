import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { UserContext } from '../../Contexts/UserContext';
import { CoffeeCardDetail } from './CoffeeCardDetail';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { emptyCoffee } from './CoffeeCardHelperFuctions';
import { WTModal } from '../../components/Modal/Modal';
import { NotFoundWindow } from '../404/404';

export const CoffeeDetailFrame = () => {
    const { firstParam, secondParam, thirdParam, forthParam } = useParams();
    const { pathname } = useLocation();

    const { coffees, coffeeStores } = useContext(CoffeeContext);
    const { user } = useContext(UserContext);

    if (!coffeeStores) return <NotFoundWindow message='Sorry, no coffee stores loaded' />;

    if (firstParam === 'new') {
        if (!user) return <NotFoundWindow message='It seams you are not logged in' />;

        return (
            <WTModal>
                <CoffeeCardEdit coffee={emptyCoffee(user, coffeeStores)} />;
            </WTModal>
        );
    } else if (typeof Number(firstParam) === 'number') {
        const coffee = coffees && coffees.find((elm) => elm.id === Number(firstParam));
        if (!coffee) return <NotFoundWindow message='Sorry, coffee not found!' />;

        if (secondParam === 'edit') {
            return (
                <WTModal>
                    <CoffeeCardEdit coffee={coffee} />;
                </WTModal>
            );
        } else {
            return (
                <WTModal>
                    <CoffeeCardDetail
                        coffee={coffee}
                        initialTab={secondParam}
                        brewingId={thirdParam}
                        initialState={forthParam}
                        baseUrl={pathname}
                    />
                </WTModal>
            );
        }
    } else {
        return <NotFoundWindow />;
    }
};
