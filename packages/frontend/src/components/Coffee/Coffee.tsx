import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import { Navigationbar } from '../Navigationbar';
import { SideMenuItem, Sidemenu } from '../Sidemenu';
import LocalStyles from './Coffee.module.scss';
import axios from 'axios';

export type CoffeeProps = RouteComponentProps;

export type CoffeeBaseState = {
    posts: CoffeeEntry[];
    menu: SideMenuItem[];
    filter: string;
    loading: boolean;
};

export class CoffeeBase extends Component<CoffeeProps, CoffeeBaseState> {
    public readonly state: CoffeeBaseState = {
        posts: [],
        menu: [],
        filter: '',
        loading: false,
    };

    public deletePost = (id: number) => {
        axios
            .delete(`http://localhost:4000/coffee/${id}`)
            .then((response) => {
                console.log(response);

                this.setState((oldState) => ({
                    posts: oldState.posts.filter((item) => item.id !== id),
                    loading: false,
                }));
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    public createCard = () => {
        this.setState((state) => ({
            posts: [
                {
                    id: 0, //state.posts.length + 1,
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

    public saveNewCard = (post: CoffeeEntry) => {
        console.log('Save new card: ');
        console.log(post);

        axios
            .post('http://localhost:4000/coffee', { ...post })
            .then((response) => {
                console.log(response);

                // this.setState({
                //     posts: response.data,
                //     loading: false,
                // });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
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
        });

        axios
            .get<CoffeeEntry[]>('http://localhost:4000/coffee')
            .then((response) => {
                // handle success
                console.log(response);

                this.setState({
                    posts: response.data,
                    loading: false,
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    public render() {
        const { posts, menu, filter } = this.state;

        return (
            <>
                <div className={LocalStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={`container`}>
                    <div className="row">
                        <Sidemenu
                            content={menu}
                            filter={filter}
                            header={'Blog of Coffee'}
                            icon={<FontAwesomeIcon icon="mug-hot" size="3x" color="#8B572A" />}
                        />
                        <div className={`col-9`}>
                            <div className={`${LocalStyles.Filter}`}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Control as="select">
                                                <option disabled selected>
                                                    Sort by
                                                </option>
                                                <option>Origin</option>∏<option>Rostary</option>
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
                                    {/* <Button variant="add" size='lg'>
                                <FontAwesomeIcon icon="plus" />
                            </Button> */}
                                    <Col>
                                        <button className="add-button big" onClick={this.createCard}>
                                            <FontAwesomeIcon icon="plus" />
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`${LocalStyles.CoffeeContainer}`}>
                                {posts.length === 0 && <p>nothing here</p>}
                                {posts.length >= 0 &&
                                    // tslint:disable-next-line: use-simple-attributes
                                    posts.map((post) => {
                                        return (
                                            <CoffeeCard
                                                entry={post}
                                                key={post.id}
                                                saveFunction={this.saveNewCard}
                                                deleteFunction={this.deletePost}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
