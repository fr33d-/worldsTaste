import React from 'react';
import { useParams } from 'react-router';
import { CoffeeAttrData, CoffeeEntry } from '../../helpers/types';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { CoffeeBrewingWindow } from './CoffeeBewingWindow';
import OverlayFrame from '../OverlayFrame/OverlayFrame';

type CoffeeDetailWindowProps = {
    basePath: string;
    coffeeAttrData: CoffeeAttrData;
    coffees: CoffeeEntry[];
};

export const CoffeeDetailWindow = ({ basePath, coffeeAttrData, coffees }: CoffeeDetailWindowProps) => {
    const { id, edit } = useParams();
    const coffee = coffees.find((elm) => elm.id === Number(id));

    if (!coffee) return <p>Error, coffee not found</p>;

    return edit ? (
        <CoffeeCardEdit
            entry={coffee}
            coffeeAttrData={coffeeAttrData}
            deleteCoffee={deleteCoffee}
            saveCoffee={saveCoffee}
            basePath={basePath}
        />
    ) : (
        <OverlayFrame>
            <CoffeeBrewingWindow
                coffee={coffee}
                methods={coffeeAttrData.methods}
                basePath={basePath}
                saveCoffee={saveCoffee}
                delteCoffee={deleteCoffee}
            />
        </OverlayFrame>
    );
};
