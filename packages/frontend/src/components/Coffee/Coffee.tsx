import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import LocalStyles from './Coffee.module.scss';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu, MenuItem } from '../Sidemenu';

export type CoffeeProps = RouteComponentProps;

export type CoffeeBaseState = {
    posts: CoffeeEntry[];
    menu: MenuItem[];
    filter: string;
};

export class CoffeeBase extends Component<CoffeeProps, CoffeeBaseState> {
    public readonly state: CoffeeBaseState = {
        posts: [],
        menu: [],
        filter: '',
    };

    public componentDidMount() {
        this.setState({
            filter: 'Coffee by region',
            menu: [
                {id: 1, name: 'Hawaii', count: 0},
                {id: 2, name: 'Mexico', count: 0},
                {id: 3, name: 'Puerto Rico', count: 0},
                {id: 4, name: 'Guatemala', count: 0},
                {id: 5, name: 'Costa Rica', count: 0},
                {id: 6, name: 'Colombia', count: 0},
                {id: 7, name: 'Brazil', count: 0},
                {id: 7, name: 'Ethiopia', count: 0},
                {id: 9, name: 'Kenya', count: 0},
                {id: 10, name: 'Ivory Coast', count: 0},
                {id: 11, name: 'Yemen', count: 0},
                {id: 12, name: 'Indonesia', count: 0},
                {id: 13, name: 'Vietnam', count: 0}
            ]
            ,
            posts: [
                {
                    images: [
                        {
                            name: 'Test',
                            url: 'http://placekitten.com/500/500',
                            alt: 'cat',
                        },
                        {
                            name: 'Test 2',
                            url: 'http://placekitten.com/500/500',
                            alt: 'another cat',
                        },
                    ],
                    name: 'Test',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                    origin: 'Germany',
                    rating: 5,
                    kind: 'Light coffee', 
                    roasted: 'Kiel',
                },{
                    images: [
                        {
                            name: 'Test',
                            url: 'http://placekitten.com/500/500',
                            alt: 'cat',
                        },
                        {
                            name: 'Test 2',
                            url: 'http://placekitten.com/500/500',
                            alt: 'another cat',
                        },
                    ],
                    name: 'Test',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                    origin: 'Germany',
                    rating: 5,
                    kind: 'Light coffee', 
                    roasted: 'Kiel',
                },
            ],
        });
    }

    public render() {
        const { posts, menu, filter } = this.state;

        return (
            <>
                <Navigationbar />
                <div className={`container`}>
                    <div className="row">
                        <h1>Coffee</h1>
                    </div>
                    <div className={`${LocalStyles.CoffeeContainer} row`}>
                        <div className="col-12 col-xl-3">
                            <Sidemenu content={menu} header={filter} />
                        </div>
                        <div className="col-12 col-xl-9">
                            {posts.length === 0 && <p>nothing here</p>}
                            {posts.length >= 0 && posts.map((post, i) => <CoffeeCard entry={post} key={i} />)}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
