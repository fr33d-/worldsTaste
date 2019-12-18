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
import { CoffeeEntry } from '../../helpers/types';
import { blue, cyan, green, yellow } from '../../styles/colors';
import coffeePlacement from './../../images/coffeePlacement.svg';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './CoffeeCard.module.scss';
import { useHistory } from 'react-router';

type InlineCoffeeCardDisplayProps = {
    entry: CoffeeEntry;
    active?: boolean;
    deleteCoffee(id: number): void;
};

export const InlineCoffeeCardDisplay = ({ entry, active, deleteCoffee }: InlineCoffeeCardDisplayProps) => {
    const [expanded, setExpanded] = useState(false);

    const history = useHistory();
    const [tab, setTab] = useState(0);

    const toggleCard = () => {
        setExpanded(!expanded);
    };

    const editCard = () => {
        // Todo: routing ist noch echt ungeil
        history.push(`card/${entry.id}?view=edit`);
    };

    const openBrewings = () => {
        history.push(`/coffee/card/${entry.id}?view=brewings`);
    };

    return (
        <>
            <div
                className={classnames(
                    LocalStyles.CoffeeCard,
                    expanded && LocalStyles.Extended,
                    active && LocalStyles.Extended
                )}
            >
                <div className={LocalStyles.CoffeeCardActionSection}>
                    <button
                        onClick={openBrewings}
                        className={classNames(LocalStyles.IconButton, LocalStyles.HoverGreen)}
                    >
                        <FontAwesomeIcon icon="flask" />
                        Add brewing
                    </button>
                    <button onClick={editCard} className={classNames(LocalStyles.IconButton, LocalStyles.HoverBlue)}>
                        <FontAwesomeIcon icon="edit" />
                        Edit
                    </button>
                    <button
                        onClick={() => deleteCoffee(entry.id)}
                        className={classNames(LocalStyles.IconButton, LocalStyles.HoverRed)}
                    >
                        <FontAwesomeIcon icon="trash-alt" />
                        Delete
                    </button>
                    <button onClick={toggleCard}>
                        <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                    </button>
                </div>
                <div className={LocalStyles.CoffeeCardImageSection}>
                    {entry.imageStrings !== undefined && entry.imageStrings.length > 0 ? (
                        <>
                            {expanded ? (
                                entry.imageStrings.map((img, i) => (
                                    <div
                                        className={LocalStyles.Img}
                                        style={{ backgroundImage: `url(${baseURL}${img})` }}
                                        key={i}
                                    />
                                ))
                            ) : (
                                <div
                                    className={LocalStyles.Img}
                                    style={{ backgroundImage: `url(${baseURL}${entry.imageStrings[0]})` }}
                                />
                            )}
                        </>
                    ) : (
                        <img src={coffeePlacement} alt="no coffees" />
                    )}
                </div>
                <div className={LocalStyles.CoffeeCardTextSection}>
                    <div className="container">
                        <div className="row">
                            <h2>{entry.name}</h2>
                            {expanded && (
                                <div className={GeneralStyles.TabBar}>
                                    <ul>
                                        <li
                                            className={classNames(tab === 0 && GeneralStyles.Active)}
                                            onClick={() => setTab(0)}
                                        >
                                            Information
                                        </li>
                                        <li
                                            className={classNames(tab === 1 && GeneralStyles.Active)}
                                            onClick={() => setTab(1)}
                                        >
                                            Details
                                        </li>
                                        {/* <li
                                            className={classNames(tab === 2 && GeneralStyles.Active)}
                                            onClick={() => openBrewingsForCoffee(entry.id)}
                                        >
                                            Bewings
                                        </li> */}
                                    </ul>
                                </div>
                            )}
                            {tab === 0 && (
                                <>
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
                                        <AttrField
                                            color={yellow}
                                            icon="store"
                                            value={entry.roasted.name}
                                            name="Rösterei:"
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <AttrField
                                            color={green}
                                            icon="leaf"
                                            value={entry.process.name}
                                            name="Prozess:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrField
                                            color={green}
                                            icon="leaf"
                                            value={entry.species.name}
                                            name="Bohnenart:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrFieldLikeList value={entry.rating} name="Gesammtbewertung:" />
                                    </div>
                                    <div className="col-12">
                                        <AttrFieldDescription
                                            expanded={expanded}
                                            name="Beschreibung:"
                                            value={entry.description}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {tab === 1 && (
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
                                    <AttrFieldDescription
                                        expanded={true}
                                        name="Eigene Beschreibung"
                                        value={entry.ownDescription}
                                    />
                                </div>
                            </div>
                        )}

                        {/* {tab === 2 && entry.brewings && (
                            <div className={LocalStyles.BrewingTab}>
                                {entry.brewings.map((brewing) => (
                                    <>
                                        <h4>
                                            {brewing.method.name} am <DateFormat date={brewing.brewDate} />
                                        </h4>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <AttrFieldSlider
                                                    color={black}
                                                    name="Stärke:"
                                                    value={brewing.strength}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrFieldSlider color={blue} name="Geschmack:" value={brewing.taste} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrFieldLikeList value={brewing.rating} name="Bewertung:" />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrFieldSliderSingle
                                                    color={green}
                                                    textLeft="Schokoloade"
                                                    textRight="Frucht"
                                                    value={brewing.tasteKind}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrFieldSlider color={green} name="Erbsig:" value={brewing.woody} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrFieldSlider color={cyan} name="Bitter:" value={brewing.bitter} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrFieldSlider color={yellow} name="Säure:" value={brewing.sour} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrField
                                                    color={brown}
                                                    icon="leaf"
                                                    value={`${brewing.coffeeAmount} Gram`}
                                                    name="Kaffeemänge:"
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrField
                                                    color={brown}
                                                    icon="leaf"
                                                    value={`${brewing.waterAmount} mil L`}
                                                    name="Wassermänge:"
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <AttrField
                                                    color={brown}
                                                    icon="leaf"
                                                    value={brewing.useforcalculation ? 'ja' : 'nein'}
                                                    name="Für Berechnung verwenden:"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <AttrFieldDescription
                                                    expanded={true}
                                                    name="Eigene Beschreibung"
                                                    value={brewing.ownDescription}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
};
