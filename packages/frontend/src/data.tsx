import { FontawesomeObject, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, Props as FontAwesomeProps } from "@fortawesome/react-fontawesome";
import React, { ComponentType, ReactElement } from "react";
import ChemexSVG from './images/Chemex.svg';
import Cigar from './images/cigar.svg';

export type MainMenuItem = {
    name: string;
    label?: string;
    icon?: ReactElement<FontAwesomeProps>;
    image?: string;
    link: string;
    active: boolean;
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
        image: Cigar,
        active: false,
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
        name: 'Restaurants',
        link: '/restaurants',
        label: 'Good food nearby',
        icon: <FontAwesomeIcon icon="hamburger" size="3x" color="#A83727"/>,
        active: false,
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
        active: false,
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
    {
        name: 'Concepts',
        link: '/concepts',
        label: 'Great ideas yet small',
        icon: <FontAwesomeIcon icon="rocket" size="3x" color="#FE5569"/>,
        active: false,
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
            },
        ],
    },
    {
        name: 'Blog',
        link: '/blog',
        label: 'Read me!',
        icon: <FontAwesomeIcon icon="book" size="3x" color="#4A90E2"/>,
        active: false,
        submenu: [
            {
                name: 'Latest',
                link: '/latest',
                active: false,
                submenu: [],
            },
            {
                name: 'Technologie',
                link: '/technologie',
                active: false,
                submenu: [],
            },
            {
                name: 'UX',
                link: '/ux',
                active: false,
                submenu: [],
            },
        ],
    },
]