import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL, coffeeURL } from '../../data';
import { AttrDataType, BrewingEntry, CoffeeEntry } from '../../helpers/types';
import Beans from '../../images/beans.svg';
import Cup from '../../images/cup-bw.svg';
import { CoffeeBrewingCard } from './CoffeeBrewingCard';
import LocalStyles from './CoffeeBrewingCard.module.scss';

type CoffeeBrewingWindowProps = {
    coffee: CoffeeEntry;
    methods: AttrDataType[];
    basePath: string;
    saveCoffee(coffee: CoffeeEntry): void;
    delteCoffee(id: number): void;
};

export const CoffeeBrewingWindow = ({
    coffee,
    methods,
    basePath,
    saveCoffee,
    delteCoffee,
}: CoffeeBrewingWindowProps) => {
    const [selectedBrewing, setSelectedBrewing] = useState<BrewingEntry>();

    // Todo: this needs to be called when the cared opens
    // also handle what happens if you habent selected a bewing

    // const openBrewingWindow = (coffeeEntry: CoffeeEntry) => {
    //     //Add brewings to coffee card
    //     axios
    //         .get<BrewingEntry[]>(`${baseURL}${coffeeURL}/${coffeeEntry.id}/brewings`)
    //         .then((response) => {
    //             console.log('Got brewings');
    //             let loadedBrewings = response.data;
    //             loadedBrewings = loadedBrewings.map((brewing) => {
    //                 brewing.brewDate = new Date(brewing.brewDate);
    //                 return brewing;
    //             });
    //             console.log(loadedBrewings);
    //             setBrewingCard({ brewings: loadedBrewings, ...coffeeEntry });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             console.log('Cant get brewings');
    //         });
    // };

    const createBrewing = () => {
        if (coffee) {
            let newBrewing: BrewingEntry = {
                id: 0,
                bitter: 0,
                brewDate: new Date(),
                method: methods[0],
                ownDescription: '',
                rating: 0,
                sour: 0,
                strength: 0,
                taste: 0,
                tasteKind: 0,
                useforcalculation: false,
                woody: 0,
                waterAmount: 0,
                coffeeAmount: 0,
            };
            axios
                .post(`${baseURL}${coffeeURL}/${coffee.id}/brewings/`, { ...newBrewing })
                .then((response) => {
                    console.log(response);
                    const location: string = response.headers['location'];
                    const [newId] = location.split('/').slice(-1);
                    newBrewing.id = Number(newId);

                    saveCoffee({ ...coffee, brewings: [newBrewing, ...coffee.brewings] });

                    setSelectedBrewing(newBrewing);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    if (!coffee) return <p>Error, coffee not found with this id</p>;

    return (
        <div className={LocalStyles.BrewingWindow}>
            <h6>{coffee.name}</h6>
            <div className="container">
                <div className="row">
                    <div className={classNames(LocalStyles.BrewList, 'col-4')}>
                        <h4>Brewings</h4>
                        <ul>
                            {coffee && coffee.brewings.length > 0 ? (
                                coffee.brewings.map((brewing) => (
                                    <li
                                        className={classNames(
                                            selectedBrewing && brewing.id === selectedBrewing.id && LocalStyles.Active
                                        )}
                                        onClick={() => setSelectedBrewing(brewing)}
                                    >
                                        {brewing.method.name} am {brewing.brewDate.getDate()}.
                                        {brewing.brewDate.getMonth()}.{brewing.brewDate.getFullYear()} -
                                        {brewing.brewDate.getUTCHours()}:{brewing.brewDate.getUTCMinutes()} Uhr
                                    </li>
                                ))
                            ) : (
                                <li className={LocalStyles.NoContent}>
                                    <img src={Cup} alt="Cup" /> no brewings
                                </li>
                            )}
                        </ul>
                        <button onClick={createBrewing}>
                            <FontAwesomeIcon icon="plus" size="sm" />
                            Add brewing
                        </button>
                    </div>
                    <div className={classNames(LocalStyles.BrewingCard, 'col-8')}>
                        {selectedBrewing ? (
                            <CoffeeBrewingCard
                                brewing={selectedBrewing}
                                key={selectedBrewing.id}
                                methods={methods}
                                coffeeId={coffee.id}
                                deleteCoffee={delteCoffee}
                            />
                        ) : (
                            <div className={LocalStyles.NoContent}>
                                <img src={Beans} alt="beans" />
                                nothing selected
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={LocalStyles.CloseButton}>
                <Link to={basePath}>
                    <button>
                        <FontAwesomeIcon icon="times-circle" size="lg" />
                    </button>
                </Link>
            </div>
        </div>
    );
};
