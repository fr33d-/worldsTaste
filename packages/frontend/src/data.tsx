import { FontawesomeObject, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, Props as FontAwesomeProps } from "@fortawesome/react-fontawesome";
import React, { ComponentType, ReactElement } from "react";

export type MainMenuItem = {
    name: string;
    label?: string;
    icon?: ReactElement<FontAwesomeProps>;
    // icon?: IconProp;
    // iconColor?: string;
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
        // icon:  'smoking',
        // iconColor: '#8B572A',
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
        name: 'Restaurantes',
        link: '/restaurantes',
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