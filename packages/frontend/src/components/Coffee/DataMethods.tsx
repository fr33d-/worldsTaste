import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { AttrDataWindow } from '../AttrDataWindow';
import { CoffeeCardDisplay } from '../CoffeeCard/CoffeeCardDisplay';
import { CoffeeCardEdit } from '../CoffeeCard/CoffeeCardEdit';
import { Filter } from '../Filter';
import { Footer } from '../Footer';
import { AttrDataType, CoffeeEntry, FilterMenuType, AttrDataItemType } from '../FormComponents';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './Coffee.module.scss';

export const deleteCoffee = (id: number): boolean => {
    axios
        .delete(`http://localhost:4000/coffee/${id}`)
        .then((response) => {
            console.log(response);
            return true;
        })
        .catch((error) => {
            console.log(error);
        });

    return false;
};

export const createCoffee = (
    coffeeOrigin: AttrDataItemType,
    coffeeKind: AttrDataItemType,
    coffeeRoated: AttrDataItemType,
    coffeeProcessed: AttrDataItemType,
    coffeeSpecies: AttrDataItemType
): CoffeeEntry | boolean => {
    const newPost: CoffeeEntry = {
        id: 0,
        imageFiles: [],
        imageStrings: [],
        name: 'Neue Karte',
        description: '',
        origin: coffeeOrigin,
        rating: 0,
        kind: coffeeKind,
        roasted: coffeeRoated,
        bitter: 0,
        ownDescription: '',
        sour: 0,
        taste: 0,
        tasteKind: 0,
        woody: 0,
        buydate: new Date(),
        dateAdded: new Date(),
        processed: coffeeProcessed,
        species: coffeeSpecies,
    };

    axios
        .post('http://localhost:4000/coffee', { ...newPost })
        .then((response) => {
            console.log(response.headers['location']);
            const location: string = response.headers['location'];
            const [id] = location.split('/').slice(-1);
            newPost.id = Number(id);

            return newPost;
        })
        .catch((error) => {
            console.log(error);
        });

    return false;
};
