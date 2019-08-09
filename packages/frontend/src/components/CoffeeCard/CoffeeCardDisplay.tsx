import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React, { useState } from 'react';
import { baseURL } from '../../data';
import { blue, cyan, green, yellow, black, brown } from '../../style/colors';
import { CoffeeEntry, BrewingEntry } from '../FormComponents';
import {
    AttrField,
    AttrFieldDescription,
    AttrFieldLikeList,
    AttrFieldSlider,
    AttrFieldSliderSingle,
    DateFormat,
    LikeSliderAttrField,
} from '../FormElements/AttrFields';
import coffeePlacement from './../../images/coffeePlacement.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './CoffeeCard.module.scss';
import axios from 'axios';

type CoffeeCardDisplayProps = {
    entry: CoffeeEntry;
    active?: boolean;
    deleteFunction(id: number): void;
    editFunction(id: number): void;
    openBrewings(coffeeEntry: CoffeeEntry): void;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeCardDisplay = (props: CoffeeCardDisplayProps) => {
    const [expanded, setExpanded] = useState(false);
    const [id, setId] = useState(props.entry.id);
    const [imageStrings, setImageStrings] = useState(props.entry.imageStrings);
    const [name, setName] = useState(props.entry.name);
    const [description, setDescription] = useState(props.entry.description);
    const [origin, setOrigin] = useState(props.entry.origin);
    const [rating, setRating] = useState(props.entry.rating);
    const [roasted, setRoasted] = useState(props.entry.roasted);
    const [kind, setKind] = useState(props.entry.kind);
    const [taste, setTaste] = useState(props.entry.taste);
    const [tasteKind, setTasteKind] = useState(props.entry.tasteKind);
    const [woody, setWoody] = useState(props.entry.woody);
    const [bitter, setBitter] = useState(props.entry.bitter);
    const [sour, setSour] = useState(props.entry.sour);
    const [ownDescription, setOwnDescription] = useState(props.entry.ownDescription);
    const [dateAdded, setDateAdded] = useState(props.entry.dateAdded);
    const [process, setProcess] = useState(props.entry.process);
    const [buyDate, setBuyDate] = useState(props.entry.buyDate);
    const [species, setSpecies] = useState(props.entry.species);
    const [brewings, setBrewings] = useState(props.entry.brewings);
    const [tab, setTab] = useState(0);

    const { openBrewings, entry } = props;

    const toggleCard = () => {
        setExpanded(!expanded);
        console.log('toggled');
    };

    const editCard = () => {
        props.editFunction(id);
    };

    const deleteCard = () => {
        props.deleteFunction(id);
    };

    const { active } = props;

    const openBrewingsForCoffee = (coffeeId: number) => {
        axios
            .get(`http://localhost:4000/coffee/${coffeeId}/brewings`)
            .then((response) => {
                console.log('Got brewings');
                let loadedBrewings = response.data as BrewingEntry[];
                // console.log(loadedBrewings);
                loadedBrewings = loadedBrewings.map((brewing) => {
                    brewing.brewDate = new Date(brewing.brewDate);
                    return brewing;
                });
                console.log(loadedBrewings);
                setBrewings(loadedBrewings);
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant get brewings');
            });

        setTab(2);
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
                        onClick={() => openBrewings(entry)}
                        className={classNames(LocalStyles.IconButton, LocalStyles.HoverGreen)}
                    >
                        <FontAwesomeIcon icon="flask" />
                        Add brewing
                    </button>
                    <button onClick={editCard} className={classNames(LocalStyles.IconButton, LocalStyles.HoverBlue)}>
                        <FontAwesomeIcon icon="edit" />
                        Edit
                    </button>
                    <button onClick={deleteCard} className={classNames(LocalStyles.IconButton, LocalStyles.HoverRed)}>
                        <FontAwesomeIcon icon="trash-alt" />
                        Delete
                    </button>
                    <button onClick={toggleCard}>
                        <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                    </button>
                </div>
                <div className={LocalStyles.CoffeeCardImageSection}>
                    {imageStrings !== undefined && imageStrings.length > 0 ? (
                        <>
                            {expanded ? (
                                imageStrings.map((img, i) => (
                                    <div
                                        className={LocalStyles.Img}
                                        style={{ backgroundImage: `url(${baseURL}${img})` }}
                                        key={i}
                                    />
                                ))
                            ) : (
                                // <img src={`${baseURL}${imageStrings[0]}`} />
                                <div
                                    className={LocalStyles.Img}
                                    style={{ backgroundImage: `url(${baseURL}${imageStrings[0]})` }}
                                />
                            )}
                        </>
                    ) : (
                        <img src={coffeePlacement} />
                    )}
                </div>
                <div className={LocalStyles.CoffeeCardTextSection}>
                    <div className="container">
                        <div className="row">
                            <h2>{name}</h2>
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
                                        <li
                                            className={classNames(tab === 2 && GeneralStyles.Active)}
                                            onClick={() => openBrewingsForCoffee(id)}
                                        >
                                            Bewings
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {tab === 0 && (
                                <>
                                    <div className="col-12 col-md-6">
                                        <AttrField
                                            color={yellow}
                                            icon="globe-americas"
                                            value={origin.name}
                                            name="Herkunft:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrField color={blue} icon="flask" value={kind.name} name="Art:" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrField color={yellow} icon="store" value={roasted.name} name="Rösterei:" />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <AttrField color={green} icon="leaf" value={process.name} name="Prozess:" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrField color={green} icon="leaf" value={species.name} name="Bohnenart:" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrFieldLikeList value={rating} name="Gesammtbewertung:" />
                                    </div>
                                    <div className="col-12">
                                        <AttrFieldDescription
                                            expanded={expanded}
                                            name="Beschreibung:"
                                            value={description}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {tab === 1 && (
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={blue} name="Geschmack:" value={taste} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSliderSingle
                                        color={green}
                                        textLeft="Schokoloade"
                                        textRight="Frucht"
                                        value={tasteKind}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={green} name="Erbsig:" value={woody} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={cyan} name="Bitter:" value={bitter} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldSlider color={yellow} name="Säure:" value={sour} />
                                </div>
                                <div className="col-12">
                                    <AttrFieldDescription
                                        expanded={true}
                                        name="Eigene Beschreibung"
                                        value={ownDescription}
                                    />
                                </div>
                            </div>
                        )}

                        {tab === 2 && brewings && (
                            <div className={LocalStyles.BrewingTab}>
                                {brewings.map((brewing) => (
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
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
