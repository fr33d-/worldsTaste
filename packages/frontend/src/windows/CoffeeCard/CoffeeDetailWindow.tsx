import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { CoffeeAttrData, CoffeeEntry, User } from '../../helpers/types';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { CoffeeBrewingWindow } from './CoffeeBewingWindow';
import { useJwt } from '../UserWindows/UserHelperFunctions';
import { CoffeeCardDetail } from './CoffeeCardDetail';

type CoffeeDetailWindowProps = {
    basePath: string;
    coffeeAttrData?: CoffeeAttrData;
    coffees: CoffeeEntry[];
    deleteCoffee(id: number): void;
    saveCoffee(coffee: CoffeeEntry): void;
};

export const CoffeeDetailWindow = ({
    basePath,
    coffeeAttrData,
    coffees,
    deleteCoffee,
    saveCoffee,
}: CoffeeDetailWindowProps) => {
    const [user] = useState<User | undefined>(useJwt());
    const { id } = useParams();
    const { search } = useLocation();

    const coffee = coffees.find((elm) => elm.id === Number(id));
    const view = new URLSearchParams(search).get('view');

    if (!coffeeAttrData) return <p>Error, no coffee data defined</p>;

    if (view === 'new') {

        if (!user) return <p>Error, you are not logged in </p>;

        const newCoffee: CoffeeEntry = {
            bitter: 0,
            brewings: [],
            buyDate: new Date(),
            dateAdded: new Date(),
            description: '',
            id: 0,
            kind: coffeeAttrData.kinds[0],
            name: 'new coffee',
            origin: coffeeAttrData.origins[0],
            ownDescription: '',
            owner: user,
            process: coffeeAttrData.processes[0],
            rating: 0,
            roasted: coffeeAttrData.roasteds[0],
            sour: 0,
            species: coffeeAttrData.specieses[0],
            taste: 0,
            tasteKind: 0,
            woody: 0,
        };

        return (
            <CoffeeCardEdit
                entry={newCoffee}
                coffeeAttrData={coffeeAttrData}
                deleteCoffee={deleteCoffee}
                saveCoffee={saveCoffee}
                basePath={basePath}
            />
        );
    } else {
        if (!coffee) return <p>Error, coffee not found</p>;
        if (view === 'edit') {
            return (
                <CoffeeCardEdit
                    entry={coffee}
                    coffeeAttrData={coffeeAttrData}
                    deleteCoffee={deleteCoffee}
                    saveCoffee={saveCoffee}
                    basePath={basePath}
                />
            );
        } else if (view === 'brewings') {
            return (
                <CoffeeBrewingWindow
                    coffee={coffee}
                    methods={coffeeAttrData.brewMethods}
                    // basePath={basePath}
                    // saveCoffee={saveCoffee}
                    // delteCoffee={deleteCoffee}
                />
            );
        } else {
            return (
                <CoffeeCardDetail
                    basePath={basePath}
                    coffee={coffee}
                    coffeeAttrData={coffeeAttrData}
                    deleteCoffee={deleteCoffee}
                />
            );
        }
    }
};
