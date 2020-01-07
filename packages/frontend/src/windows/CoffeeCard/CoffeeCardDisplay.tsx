import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React, { useState } from 'react';
import {
    AttrField,
    AttrFieldDescription,
    AttrFieldLikeList,
    AttrFieldSlider,
    AttrFieldSliderSingle,
} from '../../components/FormElements/AttrFields';
import { baseURL } from '../../data';
import { CoffeeEntry, User } from '../../helpers/types';
import { blue, cyan, green, yellow } from '../../styles/colors';
import coffeePlacement from './../../images/coffeePlacement.svg';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
// import LocalStyles from './CoffeeCard.module.scss';
import { useHistory } from 'react-router';

type InlineCoffeeCardDisplayProps = {
    entry: CoffeeEntry;
    active?: boolean;
    user?: User;
    deleteCoffee(id: number): void;
};

export const InlineCoffeeCardDisplay = ({ entry, active, user, deleteCoffee }: InlineCoffeeCardDisplayProps) => {
    // const [expanded, setExpanded] = useState(false);

    const history = useHistory();
    // const [tab, setTab] = useState(0);

    const openDetails = () => {
        history.push(`/coffee/card/${entry.id}?view=display`);
    };
    const editCard = () => {
        // Todo: routing ist noch echt ungeil
        history.push(`/coffee/card/${entry.id}?view=edit`);
    };

    const openBrewings = () => {
        history.push(`/coffee/card/${entry.id}?view=brewings`);
    };

    return (
        <>
            <div className={'CoffeeCard'}>
                <div className={'CoffeeCardActionSection'}>
                    <button onClick={openBrewings} className={classNames('IconButton', 'HoverGreen')}>
                        <FontAwesomeIcon icon="flask" />
                        Brewings
                    </button>
                    {user && (
                        <button onClick={editCard} className={classNames('IconButton', 'HoverBlue')}>
                            <FontAwesomeIcon icon="edit" />
                            Edit
                        </button>
                    )}
                    {user && (
                        <button onClick={() => deleteCoffee(entry.id)} className={classNames('IconButton', 'HoverRed')}>
                            <FontAwesomeIcon icon="trash-alt" />
                            Delete
                        </button>
                    )}
                    {/* <button onClick={toggleCard}>
                        <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                    </button> */}
                    <button onClick={openDetails}>
                        <FontAwesomeIcon icon={'chevron-right'} />
                    </button>
                </div>
                <div className={'CoffeeCardImageSection'}>
                    {entry.imageStrings !== undefined && entry.imageStrings.length > 0 ? (
                        <>
                            <div
                                className={'Img'}
                                style={{ backgroundImage: `url(${baseURL}${entry.imageStrings[0]})` }}
                            />
                        </>
                    ) : (
                        <img src={coffeePlacement} alt="no coffees" />
                    )}
                </div>
                <div className={'CoffeeCardTextSection'}>
                    <div className="container">
                        <div className="row">
                            <h2>{entry.name}</h2>

                            <div className="col-12 col-md-6">
                                <AttrField
                                    color={yellow}
                                    icon="globe-americas"
                                    value={entry.origin.name}
                                    name="Herkunft:"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={blue} icon="flask" value={entry.kind.name} name="Art:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="store" value={entry.roasted.name} name="Rösterei:" />
                            </div>

                            <div className="col-12 col-md-6">
                                <AttrField color={green} icon="leaf" value={entry.process.name} name="Prozess:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={green} icon="leaf" value={entry.species.name} name="Bohnenart:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldLikeList value={entry.rating} name="Gesammtbewertung:" />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription name="Beschreibung:" value={entry.description} />
                            </div>
                        </div>

                        {/* {tab === 1 && (
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={blue} name="Geschmack:" value={entry.taste} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSliderSingle
                                        color={green}
                                        textLeft="Schokoloade"
                                        textRight="Frucht"
                                        value={entry.tasteKind}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={green} name="Erbsig:" value={entry.woody} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={cyan} name="Bitter:" value={entry.bitter} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={yellow} name="Säure:" value={entry.sour} />
                                </div>
                                <div className="col-12">
                                    <AttrFieldDescription name="Eigene Beschreibung" value={entry.ownDescription} />
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
};
