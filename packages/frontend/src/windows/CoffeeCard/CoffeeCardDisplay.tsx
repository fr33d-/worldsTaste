import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classNames } from 'classnames';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AttrField, AttrFieldDescription, AttrFieldLikeList } from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { baseURL } from '../../data';
import { CoffeeEntry } from '../../helpers/types';
import { blue, green, yellow } from '../../styles/colors';
import coffeePlacement from './../../images/coffeePlacement.svg';

type InlineCoffeeCardDisplayProps = {
    entry: CoffeeEntry;
    deleteCoffee(id: number): void;
};

export const InlineCoffeeCardDisplay = ({ entry, deleteCoffee }: InlineCoffeeCardDisplayProps) => {
    const history = useHistory();

    const editCard = () => {
        history.push(`/coffee/card/${entry.id}?view=edit`);
    };

    const openBrewings = () => {
        history.push(`/coffee/card/${entry.id}?view=brewings`);
    };

    const { user } = useContext(CoffeeContext);

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
                            <h2>
                                <Link to={`/coffee/card/${entry.id}?view=display`}>{entry.name}</Link>
                            </h2>

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
                    </div>
                </div>
            </div>
        </>
    );
};
