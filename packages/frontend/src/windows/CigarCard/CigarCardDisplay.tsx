import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState } from 'react';
import { baseURL } from '../../data';
import { CigarEntry } from '../../pages/Cigars';
import { blue, blueAccent, brown, green, greenAccent, red, yellow, yellowAccent } from '../../styles/colors';
import { AttrField, AttrFieldDescription, AttrFieldLikeList, AttrFieldSlider } from '../../components/FormElements/AttrFields';
import CigarReplacement from './../../images/Cigar-replacement.svg';
// import GeneralStyles from './../../styles/GeneralStyles.module.scss';
// import LocalStyles from './CigarCard.module.scss';

type CigarCardDisplayProps = {
    entry: CigarEntry;
    deleteFunction(id: number): void;
    editFunction(id: number): void;
};

export const CigarCardDisplay = ({ deleteFunction, editFunction, entry }: CigarCardDisplayProps) => {
    const [expanded, setExpanded] = useState(false);
    const [tab, setTab] = useState(0);

    const deleteCard = () => {
        deleteFunction(entry.id);
    };

    const toggleCard = () => {
        setExpanded((expanded) => !expanded);
    };

    const editCard = () => {
        editFunction(entry.id);
    };

    const {
        id,
        imageFiles,
        imageStrings,
        description,
        name,
        origin,
        producer,
        abbrand,
        anschnitt,
        aromarad,
        aromaentwicklung,
        aromavielfalt,
        buydate,
        deckblatt,
        einlage,
        lenght,
        ringmas,
        smokedate,
        smokeduration,
        strength,
        umblatt,
        zugwiederstand,
        rating,
        smokeagain,
    } = entry;

    return (
        <>
            <div className={classNames('InlineLayoutCard LayoutCard--content', expanded && 'Exanded')}>
                <div className={'ActionSection'}>
                    <button onClick={editCard} className={classNames('IconButton', 'HoverGreen')}>
                        <FontAwesomeIcon icon="edit" /> Edit
                    </button>
                    <button onClick={deleteCard} className={classNames('IconButton', 'HoverRed')}>
                        <FontAwesomeIcon icon="trash-alt" /> Delete
                    </button>
                    <button onClick={toggleCard} className={classNames('icon-button')}>
                        <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                    </button>
                </div>
                <div className={'ImageSection'}>
                    {imageStrings !== undefined && imageStrings.length > 0 ? (
                        <>
                            {expanded ? (
                                imageStrings.map((img, i) => (
                                    <div
                                        className={'Img'}
                                        style={{ backgroundImage: `url(${baseURL}${img})` }}
                                        key={i}
                                    />
                                ))
                            ) : (
                                <div
                                    className={'Img'}
                                    style={{ backgroundImage: `url(${baseURL}${imageStrings[0]})` }}
                                />
                            )}
                        </>
                    ) : (
                        <img src={CigarReplacement} className={'PlaceImg'} />
                    )}
                </div>
                <div className={'TextSection'}>
                    <div className="container">
                        <h2>{name}</h2>
                        {expanded && (
                            <div className={"TabBar"}>
                                <ul>
                                    <li
                                        className={classNames(tab === 0 && "Active")}
                                        onClick={() => setTab(0)}
                                    >
                                        Information
                                    </li>
                                    <li
                                        className={classNames(tab === 1 && "Active")}
                                        onClick={() => setTab(1)}
                                    >
                                        Details
                                    </li>
                                </ul>
                            </div>
                        )}

                        {(tab === 0 || !expanded) && (
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <AttrField color={yellow} icon="store" value={producer ? producer.name : 'error'} name="Hersteller:" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField
                                        color={greenAccent}
                                        icon="globe-americas"
                                        value={origin ? origin.name : 'error'}
                                        name="Herkunft:"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrFieldLikeList value={rating} name="Gesammtbewertung:" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField
                                        color={green}
                                        icon="leaf"
                                        value={smokeagain ? 'Ja!' : 'Nein!'}
                                        name="Nochmal rauchen?"
                                    />
                                </div>
                                <div className="col-12">
                                    <AttrFieldDescription name="Beschreibung:" value={description} />
                                </div>
                            </div>
                        )}

                        {tab === 1 && expanded && (
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <AttrField color={greenAccent} icon="leaf" value="Banane" name="Einlage:" />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField color={greenAccent} icon="leaf" value="Banahne" name="Umblatt" />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField
                                        color={greenAccent}
                                        icon="leaf"
                                        value={deckblatt ? deckblatt.name : ''}
                                        name="Deckblatt"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField color={red} icon="cut" value={anschnitt ? anschnitt.name : ''} name="Anschnitt:" />
                                </div>

                                <div className="col-12 col-md-6 ">
                                    <AttrField color={brown} icon="ruler" value={`${lenght} cm`} name="Länge:" />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField color={brown} icon="ruler" value={`${ringmas} cm`} name="Rigmaß:" />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField
                                        color={blueAccent}
                                        icon="calendar-alt"
                                        value={buydate}
                                        name="Gekauft am:"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField
                                        color={blueAccent}
                                        icon="calendar-alt"
                                        value={smokedate}
                                        name="Geraucht am:"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField
                                        color={blueAccent}
                                        icon="clock"
                                        value={`${smokeduration} min`}
                                        name="Rauchdauer:"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField color={greenAccent} icon="leaf" value={einlage ? einlage.name : ''} name="Einlage" />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrField color={greenAccent} icon="leaf" value={umblatt ? umblatt.name : ''} name="Umblatt" />
                                </div>

                                <div className="col-12 col-md-6 ">
                                    <AttrFieldSlider color={red} icon="cut" value={strength} name="Stärke:" />
                                </div>

                                <div className="col-12 col-md-6 ">
                                    <AttrFieldSlider
                                        color={blue}
                                        icon="carrot"
                                        value={zugwiederstand}
                                        name="Zugwiederstand:"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrFieldSlider
                                        color={blue}
                                        icon="smile-beam"
                                        value={aromavielfalt}
                                        name="Armomavielfalt:"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrFieldSlider
                                        color={yellowAccent}
                                        icon="smile-beam"
                                        value={aromaentwicklung}
                                        name="Aromaentwicklung:"
                                    />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <AttrFieldSlider color={blue} icon="ruler" value={abbrand} name="Abbrand:" />
                                </div>

                                <div className="col-12 col-md-6 ">
                                    <AttrField color={green} icon="cog" value={aromarad ? aromarad.name : ''} name="Armomarad" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
