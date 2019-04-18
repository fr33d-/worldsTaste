import React, { Component } from 'react';
import Styles from '../../index.module.scss';
import LocalStyles from  './CoffeeCard.module.scss';
import classnames from 'classnames';

export type Image = {
    name: string;
    url: string;
    alt?: string;
};

export type CoffeeEntry = {
    images: Image[];
    name: string;
    description: string;
    origin: string;
    rating: number;
    kind: string;
    roasted: string;
};

type CoffeeCardProps = {
    entry: CoffeeEntry;
};

type CoffeeCardState = {
    expanded: boolean; 
}

export const CoffeeCard = (props: CoffeeCardProps, state: CoffeeCardState) => {
    const { images, name, description, origin, rating, kind, roasted } = props.entry;
    const { expanded } = state;

    return (
        <>
            <div className={LocalStyles.CoffeeCard} >
                <div className={LocalStyles.CoffeeCardImageSection}>
                    { !expanded && images.length > 0 && <img src={images[0].url} alt={images[0].alt} />}
                    { expanded && images.length > 0 && images.map((img, i) => (
                        <div key={i}>
                            <img src={img.url} alt={img.alt} />
                            {/* <p>{img.name}</p> */}
                        </div>
                    ))}
                </div>
                <div className={LocalStyles.CoffeeCardTextSection}>
                    <h2>{name}</h2>
                    <p><span>Herkunft:</span> {origin}</p>
                    <p><span>Art:</span> {kind}</p>
                    <p><span>Geröstet in:</span> {kind}</p>
                    <p><span>Raging:</span> {rating}/5</p>
                    <p className={LocalStyles.Description}><span>Beschreibung:</span><br /> {description}</p>
                </div>
                
            </div>
        </>
    );
};