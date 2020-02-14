import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classNames } from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AttrField, AttrFieldDescription, AttrFieldLikeList } from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { baseURL } from '../../data';
import { CoffeeEntry } from '../../helpers/types';
import { blue, green, yellow } from '../../styles/colors';
import coffeePlacement from './../../images/coffeePlacement.svg';
import { UserContext } from '../../Contexts/UserContext';

type InlineCoffeeCardDisplayProps = {
    entry: CoffeeEntry;
};

export const InlineCoffeeCardDisplay = ({ entry }: InlineCoffeeCardDisplayProps) => {
    const { editCoffeeCard, contextDeleteCoffee } = useContext(CoffeeContext);
    const { user } = useContext(UserContext);

    return (
        <>
            <div className={'InlineLayoutCard'}>
                <div className={'ActionSection'}>
                    {user && (
                        <button
                            onClick={() => editCoffeeCard(entry.id)}
                            className={classNames('IconButton', 'HoverBlue')}
                        >
                            <FontAwesomeIcon icon="edit" />
                            Edit
                        </button>
                    )}
                    {user && (
                        <button onClick={() => contextDeleteCoffee(entry.id)} className={classNames('IconButton', 'HoverRed')}>
                            <FontAwesomeIcon icon="trash-alt" />
                            Delete
                        </button>
                    )}
                </div>
                <div className={'ImageSection'}>
                    {entry.imageStrings !== undefined && entry.imageStrings.length > 0 ? (
                        <>
                            <div
                                className={'Img'}
                                style={{ backgroundImage: `url(${baseURL}${entry.imageStrings[0]})` }}
                                >
                                    {/* <img src={`url(${baseURL}${entry.imageStrings[0]})`} /> */}
                                </div>
                        </>
                    ) : (
                        <img src={coffeePlacement} alt="no coffees" />
                    )}
                </div>
                <div className={'TextSection'}>
                    <div className="container">
                        <div className="row">
                            <h2>
                                <Link to={`/coffee/card/${entry.id}?view=display`}>{entry.name}</Link>
                            </h2>

                            <div className="col-12 col-md-6">
                                <AttrField
                                    color={yellow}
                                    icon="globe-americas"
                                    value={entry.origin}
                                    name="Herkunft:"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={blue} icon="flask" value={entry.kind} name="Art:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="store" value={entry.store && entry.store.name} name="Rösterei:" />
                            </div>

                            <div className="col-12 col-md-6">
                                <AttrField color={green} icon="leaf" value={entry.process} name="Prozess:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={green} icon="leaf" value={entry.species} name="Bohnenart:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldLikeList value={entry.rating} name="Gesammtbewertung:" />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription name="Beschreibung:" value={entry.description} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
