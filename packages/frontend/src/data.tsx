import { FontawesomeObject, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, Props as FontAwesomeProps } from "@fortawesome/react-fontawesome";
import React, { ComponentType, ReactElement } from "react";
import ChemexSVG from './images/Chemex.svg';
import Tabak from './images/Tabak.svg';
import Beer from './images/Beer.svg';

export const baseURL = 'http://localhost:4000/api';
export const userURL = '/user';
export const authURL = '/auth';
export const coffeeURL = '/coffee';
export const brewingURL = '/coffeebrewings';
export const coffeeAttrURL = '/coffeeAttrs';
export const cigarsURL = '/cigars';
export const cigarsAttrURL = '/cigarAttrs';

export type MainMenuItem = {
    name: string;
    label?: string;
    icon?: ReactElement<FontAwesomeProps>;
    image?: string;
    link: string;
    active: boolean;
    color?: string;
    submenu: MainMenuItem[];
};

export const MainMenu: MainMenuItem[] = [
    {
        name: 'Coffee',
        link: '/coffee',
        label: 'Blog of Coffee',
        icon: <FontAwesomeIcon icon="mug-hot" size="3x" color="#8B572A"/>,
        image: ChemexSVG,
        active: false,
        color: '#D46D4F',
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
            },
            {
                name: 'Regions',
                link: '/regions',
                active: false,
                submenu: [],
            },
            {
                name: 'Roastaries',
                link: '/rostaries',
                active: false,
                submenu: [],
            },
            {
                name: 'Flavors',
                link: '/flavors',
                active: false,
                submenu: [],
            },
            {
                name: 'Ratings',
                link: '/ratings',
                active: false,
                submenu: [],
            },
        ],
    },
    {
        name: 'Cigars',
        link: '/cigars',
        label: 'A pleasure of smoke',
        icon: <FontAwesomeIcon icon="smoking" size="3x" color="#BC9B33"/>,
        image: Tabak,
        active: false,
        color: '#46988E',
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
            },
            {
                name: 'Regions',
                link: '/regions',
                active: false,
                submenu: [],
            },
            {
                name: 'Ratings',
                link: '/ratings',
                active: false,
                submenu: [],
            },
        ],
    },
    {
        name: 'Craftbeer',
        link: '/craftbeer',
        label: 'Hop and malt',
        icon: <FontAwesomeIcon icon="beer" size="3x" color="#F8E71C"/>,
        image: Beer,
        active: false,
        color: '#346A6E',
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
            },
            {
                name: 'Ratings',
                link: '/ratings',
                active: false,
                submenu: [],
            },
        ],
    },
    {
        name: 'Links',
        link: '/links',
        label: 'Read me when you need it',
        icon: <FontAwesomeIcon icon="link" size="3x" color="#50E3C2"/>,
        active: false,
        color: '#495F99',
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
            },
            {
                name: 'Reading list',
                link: '/readinglist',
                active: false,
                submenu: [],
            },
        ],
    },
]