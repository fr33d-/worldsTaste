import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { baseURL, cigarsAttrURL, cigarsURL } from '../../data';
import { AttrDataWindow } from '../AttrDataWindow';
import { CigarCardDisplay } from '../CigarCard/CigarCardDisplay';
import { CigarCardEdit } from '../CigarCard/CigarCardEdit';
import { Filter } from '../Filter';
import { Footer } from '../Footer';
import { AttrDataItemType, FilterMenuType, Image } from '../FormComponents';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import CigarReplacement from './../../images/Cigar-replacement.svg';
import Tabak from './../../images/Tabak.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './Cigars.module.scss';

export type CigarEntry = {
    abbrand: number;
    anschnitt: AttrDataItemType;
    aromarad: AttrDataItemType;
    aromavielfalt: number;
    aromaentwicklung: number;
    buydate: string;
    deckblatt: AttrDataItemType;
    description: string;
    einlage: AttrDataItemType;
    id: number;
    imageFiles?: Image[];
    imageStrings?: string[];
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

export type CigarsProps = RouteComponentProps;

export type CigarsState = {
    posts: CigarEntry[];
    filteredPosts: CigarEntry[];
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
    editCard?: CigarEntry;
    activeFilter?: string;
};

export class Cigars extends Component<CigarsProps, CigarsState> {
    public readonly state: CigarsState = {
        posts: [],
        filteredPosts: [],
        menu: [],
        filter: '',
        loading: false,
        cigarsProducer: [{ id: 0, name: 'unknown' }],
        cigarsOrigin: [{ id: 0, name: 'unknown' }],
        displayAttrMenu: false,
        cigarAnschnitt: [{ id: 0, name: 'unknown' }],
        cigarDeckblatt: [{ id: 0, name: 'unknown' }],
        cigarEinlage: [{ id: 0, name: 'unknown' }],
        cigarUmblatt: [{ id: 0, name: 'unknown' }],
        cigarAromarad: [{ id: 0, name: 'unknown' }],
    };

    public deletePost = (id: number) => {
        axios
            .delete(`http://localhost:4000/cigars/${id}`)
            .then((response) => {
                console.log(response);

                this.setState((oldState) => ({
                    posts: oldState.posts.filter((item) => item.id !== id),
                    loading: false,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public setEditCard = (id: number) => {
        const card = this.state.posts.find((item) => item.id === id);

        if (card !== undefined) {
            this.setState({
                editCard: card,
            });
        }
    };

    public clearEditCard = () => {
        this.setState({
            editCard: undefined,
        });
    };

    public createCard = () => {
        const newPost: CigarEntry = {
            id: 0,
            imageFiles: [],
            imageStrings: [],
            name: 'Neue Zigarre',
            description: 'Lorem ipsum...',
            abbrand: 1,
            anschnitt: this.state.cigarAnschnitt[0],
            aromaentwicklung: 1,
            aromarad: this.state.cigarAromarad[0],
            aromavielfalt: 1,
            buydate: '01.01.1970',
            deckblatt: this.state.cigarDeckblatt[0],
            einlage: this.state.cigarEinlage[0],
            lenght: 10,
            origin: this.state.cigarsOrigin[0],
            producer: this.state.cigarsProducer[0],
            rating: 1,
            ringmas: 10,
            smokeagain: true,
            smokeduration: 10,
            smokedate: '01.01.1970',
            strength: 1,
            umblatt: this.state.cigarUmblatt[0],
            zugwiederstand: 1,
        };

        axios
            .post(`${baseURL}${cigarsURL}`, { ...newPost })
            .then((response) => {
                console.log(response.headers['location']);
                const location: string = response.headers['location'];
                const [id] = location.split('/').slice(-1);
                newPost.id = Number(id);

                this.setState((state) => ({
                    posts: [newPost, ...state.posts],
                }));

                this.setEditCard(Number(id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public initiateData() {
        const cigarsPromise = axios.get<CigarEntry[]>(`${baseURL}${cigarsURL}`);
        const anschnittPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/anschnitt`);
        const aromaradPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/aromarad`);
        const deckBlattPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/deckblatt`);
        const einlagePromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/einlage`);
        const originPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/origin`);
        const producerPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/producer`);
        const umblattPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/umblatt`);

        Promise.all([
            cigarsPromise,
            anschnittPromise,
            aromaradPromise,
            deckBlattPromise,
            einlagePromise,
            originPromise,
            producerPromise,
            umblattPromise,
        ])
            .then((responses) => {
                console.log(responses[0].data);
                this.setState({
                    posts: responses[0].data,
                    filteredPosts: responses[0].data,
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

    public filterPosts = (filterName: string, filterAttr: string) => {
        let newPosts = [];

        switch (filterName) {
            case 'Herkunft':
                newPosts = this.state.posts.filter((post) => post.origin.name === filterAttr);
                break;
            default:
                newPosts = this.state.posts;
                break;
        }

        this.setState({ filteredPosts: newPosts });
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
            editCard,
            filteredPosts,
            activeFilter,
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
                id: 1,
                name: 'Aromarad',
                urlSubstring: 'cigarAttrs/aromarad',
                items: cigarAromarad,
            },
            {
                description: 'Variationen von Deckblättern',
                id: 2,
                name: 'Deckblätter',
                urlSubstring: 'cigarAttrs/deckblatt',
                items: cigarDeckblatt,
            },
            {
                description: 'Variationen von Einlagen',
                id: 3,
                name: 'Einlagen',
                urlSubstring: 'cigarAttrs/einlage',
                items: cigarEinlage,
            },
            {
                description: 'Variationen von Umblättern',
                id: 4,
                name: 'Umblätter',
                urlSubstring: 'cigarAttrs/umblatt',
                items: cigarUmblatt,
            },
            {
                description: 'Aus den sonnigsten Regionen der Welt',
                id: 5,
                name: 'Herkünfte',
                urlSubstring: 'cigarAttrs/origin',
                items: cigarsOrigin,
            },
            {
                description: 'Aus den lupenreinsten Demokraturen der Welt',
                id: 6,
                name: 'Hersteller',
                urlSubstring: 'cigarAttrs/producer',
                items: cigarsProducer,
            },
        ];

        const filterMenuData: FilterMenuType[] = [
            {
                name: 'Anschnitte',
                items: cigarAnschnitt.map((item) => item.name),
            },
            {
                name: 'Aromarad',
                items: cigarAromarad.map((item) => item.name),
            },
            {
                name: 'Deckblätter',
                items: cigarDeckblatt.map((item) => item.name),
            },
            {
                name: 'Einlagen',
                items: cigarEinlage.map((item) => item.name),
            },
            {
                name: 'Umblätter',
                items: cigarUmblatt.map((item) => item.name),
            },
            {
                name: 'Herkunft',
                items: cigarsOrigin.map((item) => item.name),
            },
            {
                name: 'Hersteller',
                items: cigarsProducer.map((item) => item.name),
            },
            {
                name: 'Bewertung',
                items: ['1', '2', '3', '4', '5'],
            },
        ];

        return (
            <>
                <div className={GeneralStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={classNames(editCard && LocalStyles.EditBackground)}>
                    <div className={classNames(`container`, GeneralStyles.Container, 'pageContainer')}>
                        <div className={classNames('row', GeneralStyles.MobileHeader)}>
                            <FontAwesomeIcon icon="smoking" size="4x" color="#8B572A" />
                            <h1>Smoke of fame</h1>
                        </div>
                        <div className="row">
                            <Sidemenu
                                filter={filterMenuData}
                                image={Tabak}
                                filterAction={this.filterPosts}
                                activeFilter={activeFilter}
                            />
                            <div className={classNames(`col-12 col-lg-9`)}>
                                <Filter
                                    addAction={this.createCard}
                                    dataAction={this.toggleAttrMenu}
                                    orderAction={() => {}}
                                    orderItems={filterMenuData}
                                />

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
                                        filteredPosts.map((post) => {
                                            return (
                                                <CigarCardDisplay
                                                    entry={post}
                                                    key={post.id}
                                                    deleteFunction={this.deletePost}
                                                    editFunction={this.setEditCard}
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
                </div>
                {editCard && (
                    <div className={LocalStyles.EditFrame}>
                        <div className="container">
                            <div className="col-12 col-md-10 offset-md-1">
                                <div className={LocalStyles.EditCard}>
                                    <CigarCardEdit
                                        entry={editCard}
                                        deleteFunction={this.deletePost}
                                        close={this.clearEditCard}
                                        cigarAnschnitt={cigarAnschnitt}
                                        cigarAromarad={cigarAromarad}
                                        cigarDeckblatt={cigarDeckblatt}
                                        cigarEinlage={cigarEinlage}
                                        cigarUmblatt={cigarUmblatt}
                                        cigarsOrigin={cigarsOrigin}
                                        cigarsProducer={cigarsProducer}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
