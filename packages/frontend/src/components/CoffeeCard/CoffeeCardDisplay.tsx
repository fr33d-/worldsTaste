import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { useState } from 'react';
import { baseURL } from '../../data';
import { blue, grayDark, grayDarker, red, yellow, green, cyan } from '../../style/colors';
import { CoffeeEntry } from '../FormComponents';
import {
    AttrField,
    AttrFieldLikeList,
    AttrFieldDescription,
    AttrFieldSlider,
    AttrFieldSliderSingle,
} from '../FormElements/AttrFields';
import coffeePlacement from './../../images/coffeePlacement.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './CoffeeCard.module.scss';
import classNames from 'classnames';

type CoffeeCardDisplayProps = {
    entry: CoffeeEntry;
    deleteFunction(id: number): void;
    editFunction(id: number): void;
    active?: boolean;
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
    const [tab, setTab] = useState(0);

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

    const {active} = props;

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
                    <button onClick={editCard}>
                        <FontAwesomeIcon icon="edit" />
                    </button>
                    <button onClick={deleteCard}>
                        <FontAwesomeIcon icon="trash-alt" />
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
                                            Bewings
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="globe-americas" value={origin.name} name="Herkunft:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={blue} icon="flask" value={kind.name} name="Art:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="store" value={roasted.name} name="Rösterei:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldLikeList value={rating} name="Gesammtbewertung:" />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription expanded={expanded} name="Beschreibung:" value={description} />
                            </div>
                        </div>

                        {expanded && (
                            <div className="row">
                                <div className="col-12" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    Details:
                                </div>
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
                    </div>
                </div>
            </div>
        </>
    );
};
