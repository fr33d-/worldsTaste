import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component } from 'react';
import { CoffeeEntry } from '.';
import { blue, grayDark, green, red, yellow, grayDarker } from '../../style/colors';
import LocalStyles from './CoffeeCard.module.scss';
import coffeePlaceImage_small from './coffeePlaceImage_small.jpeg';

type CoffeeCardDisplayProps = {
    entry: CoffeeEntry;
    deleteFunction(id: number): void;
    edit(): void;
};

type CoffeeCardDisplayState = {
    expanded: boolean;
    entry: CoffeeEntry;
};

export class CoffeeCardDisplay extends Component<CoffeeCardDisplayProps, CoffeeCardDisplayState> {
    public readonly state: CoffeeCardDisplayState = {
        expanded: false,
        entry: this.props.entry,
    };

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
        console.log('toggled');
    };

    public editCard = () => {
        this.props.edit();
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    };

    public render() {
        const { expanded } = this.state;
        const { id, images, name, description, origin, rating, kind, roasted } = this.state.entry;

        return (
            <>
                <div className={classnames(LocalStyles.CoffeeCard, expanded && LocalStyles.Extended)}>
                    <div className={LocalStyles.CoffeeCardActionSection}>
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
                    <div className={LocalStyles.CoffeeCardImageSection}>
                        {images !== undefined && images.length > 0 ? (
                            <>
                                {expanded ? (
                                    images.map((img, i) => <img src={img.url} alt={img.alt} key={i} />)
                                ) : (
                                    <img src={images[0].url} alt={images[0].alt} />
                                )}
                            </>
                        ) : (
                            <img src={coffeePlaceImage_small} />
                        )}
                    </div>
                    <div className={LocalStyles.CoffeeCardTextSection}>
                        <h2>{name}</h2>
                        <p>
                            <span>
                                <FontAwesomeIcon icon="globe-americas" size="lg" color={green} />
                            </span>
                            {origin.name}
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon="flask" size="lg" color={blue} />
                            </span>
                            {kind.name}
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon="store" size="lg" color={yellow} />
                            </span>
                            {roasted.name}
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon="heart" size="lg" color={red} />
                            </span>
                            {[...Array(rating)].map((i) => (
                                <FontAwesomeIcon icon="star" color={yellow} />
                            ))}
                            {[...Array(5 - rating)].map((i) => (
                                <FontAwesomeIcon icon="star" color={grayDark} />
                            ))}
                        </p>
                        <p className={LocalStyles.Description}>
                            <span>
                                <FontAwesomeIcon icon="bars" size="lg" color={grayDarker}/>
                            </span>
                            {expanded ? description : `${description.substring(0, 200)} ...`}
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
