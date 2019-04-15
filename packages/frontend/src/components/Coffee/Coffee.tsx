import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Styles from '../../index.module.scss';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import LocalStyles from './Coffee.module.scss';

export type CoffeeProps = RouteComponentProps;

export type CoffeeBaseState = {
    posts: CoffeeEntry[];
};

export class CoffeeBase extends Component<CoffeeProps, CoffeeBaseState> {
    public readonly state: CoffeeBaseState = {
        posts: [],
    };

    public componentDidMount() {
        this.setState({
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
                    description: 'lorem ipsum doloret amet',
                    origin: 'Germany',
                    rating: 5,
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
                    description: 'lorem ipsum doloret amet',
                    origin: 'Germany',
                    rating: 5,
                },
            ],
        });
    }

    public render() {
        const { posts } = this.state;

        return (
            <>
                <h1>Coffee</h1>
                <div className={LocalStyles.coffee}>
                    {posts.length === 0 && <p>nothing here</p>}
                    {posts.length >= 0 && posts.map((post, i) => <CoffeeCard entry={post} key={i} />)}
                </div>
                <button onClick={this.onClickButton}> Go Back</button>
            </>
        );
    }

    private readonly onClickButton = () => {
        this.props.history.goBack();
    };
}
