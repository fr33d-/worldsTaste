import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import { blue, blueAccent, brown, grayDarker, green, greenAccent, red, yellow, yellowAccent } from '../../style/colors';
import { CigarEntry } from '../Cigars';
import { AttrField, AttrFieldLikeList, AttrFieldSlider, AttrFieldDescription } from '../FormElements/AttrFields';
import CigarReplacement from './../../images/Cigar-replacement.svg';
import LocalStyles from './CigarCard.module.scss';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import { baseURL } from '../../data';

type CigarCardDisplayProps = {
    entry: CigarEntry;
    deleteFunction(id: number): void;
    editFunction(id: number): void;
};

type CigarCardDisplayState = {
    expanded: boolean;
    entry: CigarEntry;
    tab: number;
};

export class CigarCardDisplay extends Component<CigarCardDisplayProps, CigarCardDisplayState> {
    public readonly state: CigarCardDisplayState = {
        expanded: false,
        entry: this.props.entry,
        tab: 0,
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    };

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
    };

    public editCard = () => {
        this.props.editFunction(this.state.entry.id);
    };

    public setTab = (i: number) => {
        this.setState({ tab: i });
    };

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const { expanded, tab } = this.state;
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
        } = this.state.entry;

        return (
            <>
                <div className={classNames(LocalStyles.CigarCard, expanded && LocalStyles.Exanded)}>
                    <div className={LocalStyles.ActionSection}>
                        <button onClick={this.editCard}>
                            <FontAwesomeIcon icon="edit" />
                        </button>
                        <button onClick={this.deleteCard}>
                            <FontAwesomeIcon icon="trash-alt" />
                        </button>
                        <button onClick={this.toggleCard}>
                            <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                        </button>
                    </div>
                    <div className={LocalStyles.ImageSection}>
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
                                    <div
                                        className={LocalStyles.Img}
                                        style={{ backgroundImage: `url(${baseURL}${imageStrings[0]})` }}
                                    />
                                )}
                            </>
                        ) : (
                            <img src={CigarReplacement} className={LocalStyles.PlaceImg}/>
                        )}
                    </div>
                    <div className={LocalStyles.TextSection}>
                        <div className="container">
                            <h2>{name}</h2>
                            {expanded && (
                                <div className={GeneralStyles.TabBar}>
                                    <ul>
                                        <li
                                            className={classNames(tab === 0 && GeneralStyles.Active)}
                                            onClick={() => this.setTab(0)}
                                        >
                                            Information
                                        </li>
                                        <li
                                            className={classNames(tab === 1 && GeneralStyles.Active)}
                                            onClick={() => this.setTab(1)}
                                        >
                                            Bewings
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {(tab === 0 || !expanded) && (
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <AttrField
                                            color={yellow}
                                            icon="store"
                                            value={producer.name}
                                            name="Hersteller:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AttrField
                                            color={greenAccent}
                                            icon="globe-americas"
                                            value={origin.name}
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
                                        <AttrFieldDescription
                                            expanded={expanded}
                                            name="Beschreibung:"
                                            value={description}
                                        />
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
                                            value={deckblatt.name}
                                            name="Deckblatt"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 ">
                                        <AttrField color={red} icon="cut" value={anschnitt.name} name="Anschnitt:" />
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
                                        <AttrField
                                            color={greenAccent}
                                            icon="leaf"
                                            value={einlage.name}
                                            name="Einlage"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 ">
                                        <AttrField
                                            color={greenAccent}
                                            icon="leaf"
                                            value={umblatt.name}
                                            name="Umblatt"
                                        />
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
                                        <AttrField color={green} icon="cog" value={aromarad.name} name="Armomarad" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
