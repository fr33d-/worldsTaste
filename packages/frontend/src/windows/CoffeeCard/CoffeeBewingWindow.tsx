import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AttrDataType, BrewingEntry, CoffeeEntry, User } from '../../helpers/types';
import Beans from '../../images/beans.svg';
import Cup from '../../images/cup-bw.svg';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { CoffeeBrewingCard } from './CoffeeBrewingCard';
import LocalStyles from './CoffeeBrewingCard.module.scss';
import { getCoffeeBrewings, saveCoffeeBrewing, newBrewing } from './CoffeeCardHelperFuctions';

export const displayDate = (date?: Date) => {
    if (date) {
        return (
            <>
                {/* {date.getDate()}.{date.getMonth()}.{date.getFullYear()} - {date.getUTCHours()}:
                {date.getUTCMinutes()} Uhr */}
            </>
        );
    } else {
        return <> unknown</>;
    }
};


type CoffeeBrewingWindowProps = {
    coffee: CoffeeEntry;
    methods: AttrDataType[];
    basePath: string;
    user?: User;
    saveCoffee(coffee: CoffeeEntry): void;
    delteCoffee(id: number): void;
};

export const CoffeeBrewingWindow = ({
    coffee,
    methods,
    basePath,
    user,
    saveCoffee,
    delteCoffee,
}: CoffeeBrewingWindowProps) => {
    const [selectedBrewing, setSelectedBrewing] = useState<BrewingEntry>();
    // When we have the context we have a setCoffee or so, then write the coffee therer
    const [brewings, setBrewings] = useState<BrewingEntry[]>([]);
    // const [stateCoffee, setStateCoffee] = useState<CoffeeEntry>(coffee);

    useEffect(() => {
        openBrewingWindow();
    }, [coffee]);

    const openBrewingWindow = () => {
        getCoffeeBrewings(coffee.id)
            .then((res) => {
                throwDataSucess('brewings loaded');
                setBrewings(res);
            })
            .catch((error) => {
                throwDataError('cant load brewings', error);
            });
    };

    const createBrewing = () => {
        setSelectedBrewing(newBrewing(methods[0]));
    };

    const innerDeleteBrewing = (brewing: BrewingEntry) => {};

    const innerSaveBrewing = (brewing: BrewingEntry) => {
        saveCoffeeBrewing(coffee.id, brewing)
            .then((newId) => {
                // Now save the new id, in case of save new if this works and display stuff
                const newBrewing: BrewingEntry = { ...brewing, id: newId };
                setSelectedBrewing(newBrewing);
                throwDataSucess(`saved brewing with id ${newId}`);
            })
            .catch((error) => {
                throwDataError('cant save brewing', error);
            });
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
                            {brewings.length > 0 ? (
                                brewings.map((brewing) => (
                                    <li
                                        className={classNames(
                                            selectedBrewing && brewing.id === selectedBrewing.id && LocalStyles.Active
                                        )}
                                        onClick={() => setSelectedBrewing(brewing)}
                                    >
                                        {brewing.method.name} am {displayDate(brewing.brewDate)}
                                    </li>
                                ))
                            ) : (
                                <li className={LocalStyles.NoContent}>
                                    <img src={Cup} alt="Cup" /> no brewings
                                </li>
                            )}
                        </ul>
                        {user &&
                        <button onClick={createBrewing}>
                            <FontAwesomeIcon icon="plus" size="sm" />
                            Add brewing
                        </button>}
                    </div>
                    <div className={classNames(LocalStyles.BrewingCard, 'col-8')}>
                        {selectedBrewing ? (
                            <CoffeeBrewingCard
                                brewing={selectedBrewing}
                                key={selectedBrewing.id}
                                methods={methods}
                                saveBrewing={innerSaveBrewing}
                                deleteBrewing={innerDeleteBrewing}
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
