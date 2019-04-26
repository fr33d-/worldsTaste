import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import { Navigationbar } from '../Navigationbar';
import { MenuItem, Sidemenu } from '../Sidemenu';
import LocalStyles from './Coffee.module.scss';

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

    public addCard = () => {
        this.setState((state) => ({
            posts: [
                {
                    images: [],
                    name: '',
                    description: '',
                    origin: '',
                    rating: 1,
                    kind: '',
                    roasted: '',
                },
                ...state.posts,
            ],
        }));
    };

    public componentDidMount() {
        this.setState({
            filter: 'Coffee by region',
            menu: [
                { id: 1, name: 'Hawaii', count: 0 },
                { id: 2, name: 'Mexico', count: 0 },
                { id: 3, name: 'Puerto Rico', count: 0 },
                { id: 4, name: 'Guatemala', count: 0 },
                { id: 5, name: 'Costa Rica', count: 0 },
                { id: 6, name: 'Colombia', count: 0 },
                { id: 7, name: 'Brazil', count: 0 },
                { id: 7, name: 'Ethiopia', count: 0 },
                { id: 9, name: 'Kenya', count: 0 },
                { id: 10, name: 'Ivory Coast', count: 0 },
                { id: 11, name: 'Yemen', count: 0 },
                { id: 12, name: 'Indonesia', count: 0 },
                { id: 13, name: 'Vietnam', count: 0 },
            ],
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
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    origin: 'Germany',
                    rating: 5,
                    kind: 'Light coffee',
                    roasted: 'Kiel',
                },
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
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
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
                        <div className="col-4">
                            <h1>Coffee</h1>
                        </div>
                        <div className="col-7">
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Control as="select">
                                                <option disabled selected>
                                                    Sort by
                                                </option>
                                                <option>Origin</option>∏
                                                <option>Rostary</option>
                                                <option>Raging</option>
                                                <option>Flavor</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Control as="select">
                                                <option disabled selected>
                                                    Order by
                                                </option>
                                                <option>Origin</option>
                                                <option>Rostary</option>
                                                <option>Raging</option>
                                                <option>Flavor</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Search" />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="col-1">
                            {/* <Button variant="add" size='lg'>
                                <FontAwesomeIcon icon="plus" />
                            </Button> */}
                            <button className="add-button big" onClick={this.addCard}>
                                <FontAwesomeIcon icon="plus" />
                            </button>
                        </div>
                    </div>
                    <div className={`${LocalStyles.CoffeeContainer} row`}>
                        <div className="col-12 col-xl-3">
                            <Sidemenu content={menu} header={filter} />
                        </div>
                        <div className="col-12 col-xl-9">
                            {posts.length === 0 && <p>nothing here</p>}
                            {posts.length >= 0 &&
                                // tslint:disable-next-line: use-simple-attributes
                                posts.map((post, i) => <CoffeeCard entry={post} key={posts.length - i} />)}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
