import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import {
    AttrField,
    AttrFieldDescription,
    AttrFieldLikeList,
    AttrFieldSlider,
} from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { UserContext } from '../../Contexts/UserContext';
import { baseURL } from '../../data';
import { displayDate } from '../../helpers/helperFunctions';
import { BrewingEntry, CoffeeEntry } from '../../helpers/types';
import Beans from '../../images/beans.svg';
import Cup from '../../images/cup-bw.svg';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { blue, cyan, green, yellow } from '../../styles/colors';
import { deleteCoffeeBrewing, getCoffeeBrewings, newBrewing, saveCoffeeBrewing } from './CoffeeCardHelperFuctions';
import { CoffeeBrewingCardDisplay } from '../BrewingCards/CoffeeBrewingCardDisplay';
import { CoffeeBrewingCardEdit } from '../BrewingCards/CoffeeBrewingCardEdit';

type CoffeeCardDetailProps = {
    coffee: CoffeeEntry;
    brewingId?: string;
    initialTab?: string;
    initialState?: string;
    baseUrl: string;
};

export const CoffeeCardDetail = ({ coffee, brewingId, initialState, initialTab, baseUrl }: CoffeeCardDetailProps) => {
    const [tab, setTab] = useState(initialTab ? initialTab : 'informaton');
    const [brewings, setBrewings] = useState<BrewingEntry[]>([]);
    const [selectedBrewing, setSelectedBrewing] = useState<BrewingEntry>();
    const [state, setState] = useState<string | undefined>(initialState);

    const { user } = useContext(UserContext);

    useEffect(() => {
        innerGetBrewings();
    }, [coffee]);

    const innerGetBrewings = async () => {
        try {
            const res = await getCoffeeBrewings(coffee.id);
            setBrewings(res);

            if (brewingId && Number(brewingId)) {
                setSelectedBrewing(brewings.find((elm) => elm.id === Number(brewingId)));
            }
        } catch (e) {
            throwDataError('Cant get brewings', e);
            throw e;
        }
    };

    const createBrewing = () => {
        const newBrewingEntry = newBrewing();
        setSelectedBrewing(newBrewingEntry);
        setBrewings((brewings) => [...brewings, newBrewingEntry]);
        //Todo: opem in edit state
    };

    // i hope this works
    const innerDeleteBrewing = async (brewing: BrewingEntry) => {
        try {
            const deletedID = await deleteCoffeeBrewing(coffee.id, brewing);
            setSelectedBrewing(undefined);
            setBrewings((brewings) => brewings.filter((brewing) => brewing.id !== deletedID));
            throwDataSucess('Brewing deleted');
        } catch (e) {
            throwDataError('Cant delete brewing', e);
            throw e;
        }
    };

    const innerSaveBrewing = async (brewing: BrewingEntry): Promise<number> => {
        try {
            const newId = await saveCoffeeBrewing(coffee.id, brewing);
            setSelectedBrewing({ ...brewing, id: newId });
            throwDataSucess('Brewing saved');
            return newId;
        } catch (e) {
            throwDataError('Cant save brewing', e);
            throw e;
        }
    };

    const { goToCoffees, editCoffeeCard, contextDeleteCoffee } = useContext(CoffeeContext);

    return (
        <>
            <div className="col-12">
                <h2>{coffee.name}</h2>
            </div>
            <div className={'ActionSection'}>
                {/* <button onClick={() => openBrewingWindow(coffee.id)} className={'IconButton HoverGreen'}>
                    <FontAwesomeIcon icon="flask" />
                    Add brewing
                </button> */}
                <button onClick={() => editCoffeeCard(coffee.id)} className={'IconButton HoverBlue'}>
                    <FontAwesomeIcon icon="edit" />
                    Edit
                </button>
                <button onClick={() => contextDeleteCoffee(coffee.id)} className={'IconButton HoverRed'}>
                    <FontAwesomeIcon icon="trash-alt" />
                    Delete
                </button>
                <button onClick={goToCoffees} className="icon-button">
                    <FontAwesomeIcon icon={'times'} />
                </button>
            </div>
            <div className={'TabBar'}>
                <ul>
                    <li className={classNames(tab === 'informaton' && 'Active')} onClick={() => setTab('informaton')}>
                        Information
                    </li>
                    <li className={classNames(tab === 'details' && 'Active')} onClick={() => setTab('details')}>
                        Details
                    </li>
                    <li className={classNames(tab === 'images' && 'Active')} onClick={() => setTab('images')}>
                        Images
                    </li>
                    <li className={classNames(tab === 'brewings' && 'Active')} onClick={() => setTab('brewings')}>
                        Bewings
                    </li>
                </ul>
            </div>
            {tab === 'informaton' && (
                <>
                    <div className={'TextSection'}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <AttrField
                                    color={yellow}
                                    icon="globe-americas"
                                    value={coffee.origin}
                                    name="Herkunft:"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="mug-hot" value={coffee.kind} name="Art:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="flask" value={coffee.store && coffee.store.name} name="Rösterei:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="leaf" value={coffee.process} name="Prozess:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="leaf" value={coffee.species} name="Bohnenart:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldLikeList value={coffee.rating} name="Gesammtbewertung:" />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription name="Beschreibung:" value={coffee.description} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {tab === 'details' && (
                <>
                    <div className={'TextSection'}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={blue} name="Geschmack:" value={coffee.taste} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={green} name="Schokolade/Frucht:" value={coffee.tasteKind} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={yellow} name="Säure:" value={coffee.sour} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={green} name="Erbsig:" value={coffee.woody} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={cyan} name="Bitter:" value={coffee.bitter} />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription name="Eigene Beschreibung" value={coffee.ownDescription} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {tab === 'images' && (
                <>
                    <div className={'ImageSection'}>
                        {coffee.imageStrings && coffee.imageStrings.length > 0 ? (
                            coffee.imageStrings.map((url, i) => (
                                <>
                                    <div className={'Image'}>
                                        <img src={`${baseURL}${url}`} key={i} alt="coffee" />
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="images-replacement">No images defined</div>
                        )}
                    </div>
                </>
            )}
            {tab === 'brewings' && (
                <>
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
                                                {brewing.method}: {displayDate(brewing.brewDate)}
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
                                    <CoffeeBrewingCardDisplay
                                        brewing={selectedBrewing}
                                        extendedBaseUrl={`${baseUrl}/brewings/${brewingId}`}
                                    />
                                ) : (
                                    <div className={'NoContent'}>
                                        <img src={Beans} alt="beans" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {state && state === 'edit' && selectedBrewing && (
                <div className={'LayoutCard'}>
                    <CoffeeBrewingCardEdit
                        brewing={selectedBrewing}
                        deleteBrewing={innerDeleteBrewing}
                        saveBrewing={innerSaveBrewing}
                        extendedBaseUrl={`${baseUrl}/${coffee.id}/brewings/${brewingId}`}
                    />
                </div>
            )}
        </>
    );
};
