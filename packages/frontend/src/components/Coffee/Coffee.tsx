import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { AttrDataType, AttrDataWindow } from '../AttrDataWindow';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import { IconButton } from '../IconButton';
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
                    id: 0,
                    images: [],
                    name: '',
                    description: '',
                    origin: { id: 0, name: 'unknown' },
                    rating: 0,
                    kind: { id: 0, name: 'unknown' },
                    roasted: { id: 0, name: 'unknown' },
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
                    filter: 'origin',
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

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const { posts, coffeeKinds, coffeeOrigins, coffeeRoateds, displayAttrMenu } = this.state;
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

        const filterMenu = [
            { name: 'Herkunft', content: coffeeOrigins },
            { name: 'Arten', content: coffeeKinds },
            { name: 'Röstereien', content: coffeeRoateds },
            {
                name: 'Bewertung',
                content: [
                    { id: 1, name: '1' },
                    { id: 2, name: '2' },
                    { id: 3, name: '3' },
                    { id: 4, name: '4' },
                    { id: 5, name: '5' },
                ],
            },
        ];

        return (
            <>
                <div className={LocalStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={`container`}>
                    <div className="row">
                        <Sidemenu
                            filter={filterMenu}
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
                                        <IconButton
                                            icon="database"
                                            className="add-button big"
                                            onClick={this.toggleAttrMenu}
                                        />
                                        <IconButton icon="plus" className="add-button big" onClick={this.createCard} />
                                    </Col>
                                </Row>
                            </div>
                            <div className={`${LocalStyles.CoffeeContainer}`}>
                                {posts.length === 0 ? (
                                    <p>nothing here</p>
                                ) : (
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
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={this.toggleAttrMenu} />}
            </>
        );
    }
}
