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
};

type CoffeeCardProps = {
    entry: CoffeeEntry;
};

export const CoffeeCard = (props: CoffeeCardProps) => {
    const { images, name, description, origin, rating } = props.entry;

    return (
        <>
            <div className={classnames(Styles.card, LocalStyles.coffeecard)} >
                {/* {images.length >= 0 && <img src={images[0].url} alt={images[0].alt} />} */}
                <h1>{name}</h1>
                <p>{description}</p>
                <p>Herkunft: {origin}</p>
                <p>Raging: {rating}</p>
                {images.map((img, i) => (
                    <div key={i}>
                        <img src={img.url} alt={img.alt} />
                        <p>{img.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};