import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { AttrDataType, AttrDataWindow, AttrDataItemType } from '../AttrDataWindow';
import { Footer } from '../Footer';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import CigarReplacement from './../../images/Cigar-replacement.svg';
import { CigarCard } from './../CigarCard';
import { Image } from '../FormComponents';

export type CigarEntry = {
    id: number;
    name: string;
    images?: Image[];
    description: string;
    producer: AttrDataItemType;
    origin: AttrDataItemType;
    rating: number;
    einlage: AttrDataItemType;
    umblatt: AttrDataItemType;
    deckplatt: AttrDataItemType;
    anschnitt: AttrDataItemType;
    ringmas: number;
    buydate: string;
    smokedate: string;
    smokeduration: number;
    strength: number;
    lenght: number;
    aromavielfalt: number;
    zugwiederstand: number;
    aromaentwicklung: number;
    abbrand: number;
    armoarad: AttrDataItemType;
};

const exampleCigar: CigarEntry = {
    id: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    name: 'Test',
    origin: { id: 0, name: 'Kuba' },
    producer: { id: 0, name: 'PCC' },
    einlage: { id: 0, name: 'Banane' },
    umblatt: { id: 0, name: 'Schilf' },
    deckplatt: { id: 0, name: 'Banane' },
    anschnitt: { id: 0, name: 'schwierig' },
    armoarad: { id: 0, name: 'eklig' },
    lenght: 20,
    ringmas: 8,
    buydate: '1.1.1970',
    smokedate: '1.1.1970',
    smokeduration: 260,
    aromavielfalt: 2,
    strength: 5,
    abbrand: 3,
    aromaentwicklung: 2,
    zugwiederstand: 5,
    rating: 5,
};

const exampleProducers: AttrDataType = {
    description: 'Hier rollt man die Zigarren noch von Hand',
    id: 0,
    name: 'Hersteller',
    urlSubstring: 'cigars/producer',
    items: [{ id: 0, name: 'PCC' }, { id: 1, name: 'Jose' }],
};

const exampleOrigins: AttrDataType = {
    description: 'zB. Bahndamm',
    id: 0,
    name: 'Hersteller',
    urlSubstring: 'cigars/origins',
    items: [{ id: 0, name: 'Kuba' }, { id: 1, name: 'USA' }],
};

const exampleEinlage: AttrDataType = {
    description: 'zB. Bahndamm',
    id: 0,
    name: 'Einlage',
    urlSubstring: 'cigars/einlage',
    items: [{ id: 0, name: 'Kuba' }, { id: 1, name: 'USA' }],
};

const exampleUmblatt: AttrDataType = {
    description: 'zB. Bahndamm',
    id: 0,
    name: 'Umblatt',
    urlSubstring: 'cigars/einlage',
    items: [{ id: 0, name: 'Kuba' }, { id: 1, name: 'USA' }],
};

const exampleDeckblatt: AttrDataType = {
    description: 'zB. Bahndamm',
    id: 0,
    name: 'Deckblatt',
    urlSubstring: 'cigars/einlage',
    items: [{ id: 0, name: 'Kuba' }, { id: 1, name: 'USA' }],
};

const exampleAnschnitt: AttrDataType = {
    description: 'zB. Bahndamm',
    id: 0,
    name: 'Anschnitt',
    urlSubstring: 'cigars/einlage',
    items: [{ id: 0, name: 'Kuba' }, { id: 1, name: 'USA' }],
};

const exampleAromarad: AttrDataType = {
    description: 'zB. Bahndamm',
    id: 0,
    name: 'Aromarad',
    urlSubstring: 'cigars/einlage',
    items: [{ id: 0, name: 'Kuba' }, { id: 1, name: 'USA' }],
};

export type CigarsProps = RouteComponentProps;

export type CigarsState = {
    posts: CigarEntry[];
    menu: AttrDataType[];
    filter: string;
    loading: boolean;
    displayAttrMenu: boolean;
    cigarsProducer: AttrDataType;
    cigarsOrigin: AttrDataType;
    cigarEinlage: AttrDataType;
    cigarUmblatt: AttrDataType;
    cigarDeckblatt: AttrDataType;
    cigarAnschnitt: AttrDataType;
    cigarAromarad: AttrDataType;
};

export class Cigars extends Component<CigarsProps, CigarsState> {
    public readonly state: CigarsState = {
        posts: [],
        menu: [],
        filter: '',
        loading: false,
        cigarsProducer: exampleProducers,
        cigarsOrigin: exampleOrigins,
        displayAttrMenu: false,
        cigarAnschnitt: exampleAnschnitt,
        cigarDeckblatt: exampleDeckblatt,
        cigarEinlage: exampleEinlage,
        cigarUmblatt: exampleUmblatt,
        cigarAromarad: exampleAromarad,
    };

    public deletePost = (id: number) => {};

    public createCard = () => {};

    public saveNewCard = (post: CigarEntry) => {};

    public initiateData() {
        this.setState({
            cigarsOrigin: exampleOrigins,
            cigarsProducer: exampleProducers,
            posts: [exampleCigar],
        });
    }

    public componentDidMount() {
        this.initiateData();
    }

    public toggleAttrMenu = () => {
        if (this.state.displayAttrMenu === true) {
            this.initiateData();
        }
        this.setState((oldState) => ({
            displayAttrMenu: !oldState.displayAttrMenu,
        }));
    };

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const { posts, displayAttrMenu } = this.state;
        const attrData = [
            exampleOrigins,
            exampleProducers,
            exampleAnschnitt,
            exampleAromarad,
            exampleDeckblatt,
            exampleUmblatt,
            exampleEinlage,
        ];

        return (
            <>
                <div className={GeneralStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={classNames(`container`, GeneralStyles.Container)}>
                    <div className={classNames('row', GeneralStyles.MobileHeader)}>
                        <FontAwesomeIcon icon="smoking" size="4x" color="#8B572A" />
                        <h1>Smoke of fame</h1>
                    </div>
                    <div className="row">
                        <Sidemenu
                            filter={attrData}
                            header={'Smoke of fame'}
                            icon={<FontAwesomeIcon icon="smoking" size="3x" color="#8B572A" />}
                        />
                        <div className={classNames(`col-12 col-lg-9`)}>
                            <div className={`${GeneralStyles.Filter}`}>
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
                                        <button className="add-button big" onClick={this.toggleAttrMenu}>
                                            <FontAwesomeIcon icon="database" />
                                        </button>
                                        <button className="add-button big" onClick={this.createCard}>
                                            <FontAwesomeIcon icon="plus" />
                                        </button>
                                    </Col>
                                </Row>
                            </div>

                            <div className={GeneralStyles.Introtext}>
                                <h2>Zigarren raucht man überall</h2>
                                <p>Irgend was schlaues über Zigarren.</p>
                            </div>
                            <div className={`${GeneralStyles.CardsContainer}`}>
                                {posts.length === 0 ? (
                                    <div className={GeneralStyles.ReplImg}>
                                        <img src={CigarReplacement} />
                                        <p>No cigars to display</p>
                                    </div>
                                ) : (
                                    posts.map((post) => {
                                        return (
                                            <CigarCard
                                                entry={post}
                                                key={post.id}
                                                saveFunction={this.saveNewCard}
                                                deleteFunction={this.deletePost}
                                                cigarAnschnitt={exampleAnschnitt}
                                                cigarAromarad={exampleAromarad}
                                                cigarDeckblatt={exampleDeckblatt}
                                                cigarEinlage={exampleEinlage}
                                                cigarUmblatt={exampleUmblatt}
                                                cigarsProducer={exampleProducers}
                                                cigarsOrigin={exampleOrigins}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={this.toggleAttrMenu} />}
                <Footer year="2019" version="0.1" />
            </>
        );
    }
}
