import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { AttrDataType, AttrDataWindow } from '../AttrDataWindow';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import LocalStyles from './Coffee.module.scss';

export type CoffeeProps = RouteComponentProps;

export type CoffeeBaseState = {
    posts: CoffeeEntry[];
    menu: AttrDataType[];
    filter: string;
    loading: boolean;
    coffeeKinds: AttrDataType[];
    coffeeRoateds: AttrDataType[];
    coffeeOrigins: AttrDataType[];
    displayAttrMenu: boolean;
};

export class CoffeeBase extends Component<CoffeeProps, CoffeeBaseState> {
    public readonly state: CoffeeBaseState = {
        posts: [],
        menu: [],
        filter: '',
        loading: false,
        coffeeKinds: [],
        coffeeOrigins: [],
        coffeeRoateds: [],
        displayAttrMenu: false,
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
        axios
            .post('http://localhost:4000/coffee', { ...post })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public toggleAttrMenu = () => {
        if (this.state.displayAttrMenu === true) {
            this.initiateData();
        }
        this.setState((oldState) => ({
            displayAttrMenu: !oldState.displayAttrMenu,
        }));
    };

    public initiateData() {
        const coffeesPromise = axios.get<CoffeeEntry[]>('http://localhost:4000/coffee');
        const kindsPromise = axios.get<AttrDataType[]>('http://localhost:4000/coffeeAttrs/kinds');
        const originsPromise = axios.get<AttrDataType[]>('http://localhost:4000/coffeeAttrs/origins');
        const roastedsPromise = axios.get<AttrDataType[]>('http://localhost:4000/coffeeAttrs/roasteds');

        Promise.all([coffeesPromise, kindsPromise, originsPromise, roastedsPromise])
            .then((responses) => {
                console.log(responses[0].data);
                this.setState({
                    posts: responses[0].data,
                    coffeeKinds: responses[1].data,
                    coffeeOrigins: responses[2].data,
                    coffeeRoateds: responses[3].data,
                    loading: false,
                    filter: 'Coffee by origin',
                    menu: responses[2].data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public componentDidMount() {
        this.initiateData();
    }

    public render() {
        const { posts, menu, filter, coffeeKinds, coffeeOrigins, coffeeRoateds, displayAttrMenu } = this.state;
        const attrData = [
            {
                id: 1,
                name: 'Arten',
                urlSubstring: 'kinds',
                description: 'Kaffee Arten',
                items: coffeeKinds,
            },
            {
                id: 2,
                name: 'Herkünfte',
                urlSubstring: 'origins',
                description: 'Kaffee herkunfts Länder',
                items: coffeeOrigins,
            },
            {
                id: 3,
                name: 'Röstereien',
                urlSubstring: 'roasteds',
                description: 'Kaffee Röstereien',
                items: coffeeRoateds,
            },
        ];

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
                                                <option>Origin</option>
                                                <option>Rostary</option>
                                                <option>Raging</option>
                                                <option>Kind</option>
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
                                                <option>Kind</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Search" />
                                    </Col>
                                    <Col>
                                        <button className="add-button big" onClick={this.toggleAttrMenu}>
                                            <FontAwesomeIcon icon="database" />
                                        </button>
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
                                                kinds={coffeeKinds}
                                                roasteds={coffeeRoateds}
                                                origins={coffeeOrigins}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={this.toggleAttrMenu} />}
            </>
        );
    }
}
