import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { BrewingEntry, CoffeeEntry } from '../../helpers/types';
import Beans from '../../images/beans.svg';
import Cup from '../../images/cup-bw.svg';
import { throwDataError } from '../../pages/User/userHelperFunctions';
import { CoffeeBrewingCard } from './CoffeeBrewingCard';
import { deleteCoffeeBrewing, getCoffeeBrewings, newBrewing, saveCoffeeBrewing } from './CoffeeCardHelperFuctions';
import { displayDate } from '../../helpers/helperFunctions';

// export const displayDate = (dateString?: Date) => {
//     if (dateString) {
//         const date = new Date(dateString);
//         return (
//             <>
//                 {date.getDate()}.{date.getMonth()}.{date.getFullYear()} - {date.getUTCHours()}:{date.getUTCMinutes()}
//             </>
//         );
//     } else {
//         return <> unknown</>;
//     }
// };

type CoffeeBrewingWindowProps = {
    coffee: CoffeeEntry;
};

export const CoffeeBrewingWindow = ({ coffee }: CoffeeBrewingWindowProps) => {
    const [brewings, setBrewings] = useState<BrewingEntry[]>([]);
    const [selectedBrewing, setSelectedBrewing] = useState<BrewingEntry>();

    const { user, coffeeAttrData } = useContext(CoffeeContext);

    useEffect(() => {
        getCoffeeBrewings(coffee.id).then((res) => {
            setBrewings(res);
        });
    }, [coffee]);

    const createBrewing = () => {
        if (coffeeAttrData) {
            setSelectedBrewing(newBrewing(coffeeAttrData.brewMethods[0]));
        } else {
            throwDataError('no attr data to create brewing');
        }
    };

    // i hope this works
    const innerDeleteBrewing = (brewing: BrewingEntry) => {
        deleteCoffeeBrewing(coffee.id, brewing).then((deletedID) => {
            setSelectedBrewing(undefined);
            setBrewings((brewings) => brewings.filter((brewing) => brewing.id !== deletedID));
        });
    };

    const innerSaveBrewing = (brewing: BrewingEntry) => {
        saveCoffeeBrewing(coffee.id, brewing).then((newId) => {
            setSelectedBrewing({ ...brewing, id: newId });
        });
    };

    if (!coffee) return <p>Error, coffee not found with this id</p>;

    return (
        <div className={"LayoutCard"}>
            <h6>{coffee.name}</h6>
            <div className="container">
                <div className="row">
                    <div className={'BrewList col-4'}>
                        <h4>Brewings</h4>
                        <ul>
                            {brewings.length > 0 ? (
                                brewings.map((brewing) => (
                                    <li
                                        className={classNames(
                                            selectedBrewing && brewing.id === selectedBrewing.id && 'Active'
                                        )}
                                        onClick={() => setSelectedBrewing(brewing)}
                                    >
                                        {brewing.method.name}: {displayDate(brewing.brewDate)}
                                    </li>
                                ))
                            ) : (
                                <li className={'NoContent'}>
                                    <img src={Cup} alt="Cup" /> no brewings
                                </li>
                            )}
                        </ul>
                        {user && (
                            <button onClick={createBrewing}>
                                <FontAwesomeIcon icon="plus" size="sm" />
                                Add brewing
                            </button>
                        )}
                    </div>
                    <div className={'BrewingCard col-8'}>
                        {selectedBrewing ? (
                            <CoffeeBrewingCard
                                brewing={selectedBrewing}
                                key={selectedBrewing.id}
                                saveBrewing={innerSaveBrewing}
                                deleteBrewing={innerDeleteBrewing}
                            />
                        ) : (
                            <div className={'NoContent'}>
                                <img src={Beans} alt="beans" />
                                nothing selected
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={'CloseButton'}>
                <Link to={`/coffee/card/${coffee.id}?view=edit`}>
                    <button>
                        <FontAwesomeIcon icon="times-circle" size="lg" />
                    </button>
                </Link>
            </div>
        </div>
    );
};
