import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component, Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { AttrDataItemType, AttrDataType, AttrDataWindow } from '../AttrDataWindow';
import { Footer } from '../Footer';
import { Image } from '../FormComponents';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import CigarReplacement from './../../images/Cigar-replacement.svg';
import cigarSVG from './../../images/cigar.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import { CigarCard } from './../CigarCard';
import LocalStyles from './Cigars.module.scss';

export type CigarEntry = {
    abbrand: number;
    anschnitt: AttrDataItemType;
    armoarad: AttrDataItemType;
    aromavielfalt: number;
    aromaentwicklung: number;
    buydate: string;
    deckplatt: AttrDataItemType;
    description: string;
    einlage: AttrDataItemType;
    id: number;
    images?: Image[];
    lenght: number;
    name: string;
    origin: AttrDataItemType;
    producer: AttrDataItemType;
    rating: number;
    ringmas: number;
    smokeagain: boolean;
    smokeduration: number;
    smokedate: string;
    strength: number;
    umblatt: AttrDataItemType;
    zugwiederstand: number;
};

export type CigarSetterEntry = {
    setAbbrand: Dispatch<SetStateAction<number>>;
    setAnschnitt: Dispatch<SetStateAction<AttrDataItemType>>;
    setArmoarad: Dispatch<SetStateAction<AttrDataItemType>>;
    setAromavielfalt: Dispatch<SetStateAction<number>>;
    setAromaentwicklung: Dispatch<SetStateAction<number>>;
    setBuydate: Dispatch<SetStateAction<string>>;
    setDeckplatt: Dispatch<SetStateAction<AttrDataItemType>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setEinlage: Dispatch<SetStateAction<AttrDataItemType>>;
    setId: Dispatch<SetStateAction<number>>;
    setImages: Dispatch<SetStateAction<Image[] | undefined>>;
    setLenght: Dispatch<SetStateAction<number>>;
    setName: Dispatch<SetStateAction<string>>;
    setOrigin: Dispatch<SetStateAction<AttrDataItemType>>;
    setProducer: Dispatch<SetStateAction<AttrDataItemType>>;
    setRating: Dispatch<SetStateAction<number>>;
    setRingmas: Dispatch<SetStateAction<number>>;
    setSmokeagain: Dispatch<SetStateAction<boolean>>;
    setSmokedate: Dispatch<SetStateAction<string>>;
    setSmokeduration: Dispatch<SetStateAction<number>>;
    setStrength: Dispatch<SetStateAction<number>>;
    setUmblatt: Dispatch<SetStateAction<AttrDataItemType>>;
    setZugwiederstand: Dispatch<SetStateAction<number>>;
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
    smokeagain: true,
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
    menu: AttrDataItemType[];
    filter: string;
    loading: boolean;
    displayAttrMenu: boolean;
    cigarsProducer: AttrDataItemType[];
    cigarsOrigin: AttrDataItemType[];
    cigarEinlage: AttrDataItemType[];
    cigarUmblatt: AttrDataItemType[];
    cigarDeckblatt: AttrDataItemType[];
    cigarAnschnitt: AttrDataItemType[];
    cigarAromarad: AttrDataItemType[];
};

export class Cigars extends Component<CigarsProps, CigarsState> {
    public readonly state: CigarsState = {
        posts: [],
        menu: [],
        filter: '',
        loading: false,
        cigarsProducer: exampleProducers.items,
        cigarsOrigin: exampleOrigins.items,
        displayAttrMenu: false,
        cigarAnschnitt: exampleAnschnitt.items,
        cigarDeckblatt: exampleDeckblatt.items,
        cigarEinlage: exampleEinlage.items,
        cigarUmblatt: exampleUmblatt.items,
        cigarAromarad: exampleAromarad.items,
    };

    public deletePost = (id: number) => {};

    public createCard = () => {};

    public saveNewCard = (post: CigarEntry) => {};

    public initiateData() {
        const cigarsPromise = axios.get<CigarEntry[]>('http://localhost:4000/cigars');
        const anschnittPromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/anschnitt');
        const aromaradPromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/aromarad');
        const deckplattPromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/deckplatt');
        const einlagePromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/einlage');
        const originPromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/origin');
        const producerPromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/producer');
        const umblattPromise = axios.get<AttrDataItemType[]>('http://localhost:4000/cigarAttrs/umblatt');

        Promise.all([
            cigarsPromise,
            anschnittPromise,
            aromaradPromise,
            deckplattPromise,
            einlagePromise,
            originPromise,
            producerPromise,
            umblattPromise,
        ])
            .then((responses) => {
                console.log(responses[0].data);
                this.setState({
                    posts: responses[0].data,
                    cigarAnschnitt: responses[1].data,
                    cigarAromarad: responses[2].data,
                    cigarDeckblatt: responses[3].data,
                    cigarEinlage: responses[4].data,
                    cigarsOrigin: responses[5].data,
                    cigarsProducer: responses[6].data,
                    cigarUmblatt: responses[7].data,
                    loading: false,
                    filter: 'origin',
                    menu: responses[5].data,
                });
            })
            .catch((error) => {
                console.log(error);
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
        const {
            posts,
            displayAttrMenu,
            cigarAnschnitt,
            cigarAromarad,
            cigarDeckblatt,
            cigarEinlage,
            cigarUmblatt,
            cigarsOrigin,
            cigarsProducer,
            filter,
            loading,
            menu,
        } = this.state;
        const attrData = [
            {
                description: 'So schneidet man eine Zigarre an',
                id: 0,
                name: 'Anschnitte',
                urlSubstring: 'cigarAttrs/anschnitt',
                items: cigarAnschnitt,
            },
            {
                description: 'Das Rad der Aromen',
                id: 0,
                name: 'Aromarad',
                urlSubstring: 'cigarAttrs/aromarad',
                items: cigarAromarad,
            },
            {
                description: 'Variationen von Deckblättern',
                id: 0,
                name: 'Deckblätter',
                urlSubstring: 'cigarAttrs/deckblatt',
                items: cigarDeckblatt,
            },
            {
                description: 'Variationen von Einlagen',
                id: 0,
                name: 'Einlagen',
                urlSubstring: 'cigarAttrs/einlage',
                items: cigarEinlage,
            },
            {
                description: 'Variationen von Umblättern',
                id: 0,
                name: 'Umblätter',
                urlSubstring: 'cigarAttrs/umblatt',
                items: cigarUmblatt,
            },
            {
                description: 'Aus den sonnigsten Regionen der Welt',
                id: 0,
                name: 'Herkünfte',
                urlSubstring: 'cigarAttrs/origins',
                items: cigarsOrigin,
            },
            {
                description: 'Aus den lupenreinsten Demokraturen der Welt',
                id: 0,
                name: 'Hersteller',
                urlSubstring: 'cigarAttrs/producer',
                items: cigarsProducer,
            },
        ];

        return (
            <>
                <div className={GeneralStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={classNames(`container`, GeneralStyles.Container, 'pageContainer')}>
                    <div className={classNames('row', GeneralStyles.MobileHeader)}>
                        <FontAwesomeIcon icon="smoking" size="4x" color="#8B572A" />
                        <h1>Smoke of fame</h1>
                    </div>
                    <div className="row">
                        {/* <Sidemenu
                            filter={attrData}
                            header={'Smoke of fame'}
                            icon={<FontAwesomeIcon icon="smoking" size="3x" color="#8B572A" />}
                        /> */}
                        <Sidemenu filter={attrData} image={cigarSVG} />
                        <div className={classNames(`col-12 col-lg-9`)}>
                            <div className={`${LocalStyles.Filter}`}>
                                <Form.Control as="select" className={LocalStyles.Select}>
                                    <option disabled selected>
                                        Order by
                                    </option>
                                    <option>Origin</option>
                                    <option>Rostary</option>
                                    <option>Raging</option>
                                    <option>Kind</option>
                                </Form.Control>
                                <Form.Control placeholder="Search" className={LocalStyles.Select} />
                                <button
                                    className={classNames('add-button big', LocalStyles.Button)}
                                    onClick={this.toggleAttrMenu}
                                >
                                    <FontAwesomeIcon icon="database" />
                                </button>
                                <button
                                    className={classNames('add-button big', LocalStyles.Button)}
                                    onClick={this.createCard}
                                >
                                    <FontAwesomeIcon icon="plus" />
                                </button>
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
                                                cigarAnschnitt={cigarAnschnitt}
                                                cigarAromarad={cigarAromarad}
                                                cigarDeckblatt={cigarDeckblatt}
                                                cigarEinlage={cigarEinlage}
                                                cigarUmblatt={cigarUmblatt}
                                                cigarsProducer={cigarsProducer}
                                                cigarsOrigin={cigarsOrigin}
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
