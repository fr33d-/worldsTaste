import { FontawesomeObject, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, Props as FontAwesomeProps } from "@fortawesome/react-fontawesome";
import React, { ComponentType, ReactElement } from "react";
import ChemexSVG from './images/Chemex.svg';
import Cigar from './images/cigar.svg';
import Tabak from './images/Tabak.svg';

export type MainMenuItem = {
    name: string;
    label?: string;
    icon?: ReactElement<FontAwesomeProps>;
    image?: string;
    link: string;
    active: boolean;
    order: number;
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
        order: 1,
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
                order: 1,
            },
            {
                name: 'Regions',
                link: '/regions',
                active: false,
                submenu: [],
                order: 2,
            },
            {
                name: 'Roastaries',
                link: '/rostaries',
                active: false,
                submenu: [],
                order: 3,
            },
            {
                name: 'Flavors',
                link: '/flavors',
                active: false,
                submenu: [],
                order: 4,
            },
            {
                name: 'Ratings',
                link: '/ratings',
                active: false,
                submenu: [],
                order: 5,
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
        order: 2,
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                order: 1,
                submenu: [],
            },
            {
                name: 'Regions',
                link: '/regions',
                active: false,
                order: 2,
                submenu: [],
            },
            {
                name: 'Ratings',
                link: '/ratings',
                active: false,
                order: 3,
                submenu: [],
            },
        ],
    },
    {
        name: 'Craftbeer',
        link: '/craftbeer',
        label: 'Hop and malt',
        icon: <FontAwesomeIcon icon="beer" size="3x" color="#F8E71C"/>,
        active: false,
        order: 3,
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                order: 1,
                submenu: [],
            },
            {
                name: 'Ratings',
                link: '/ratings',
                active: false,
                order: 2,
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
        order: 4,
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                order: 1,
                submenu: [],
            },
            {
                name: 'Reading list',
                link: '/readinglist',
                active: false,
                order: 2,
                submenu: [],
            },
        ],
    },
]