import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { Component, useState, useEffect } from 'react';
import { RouteComponentProps, Route, useHistory, useLocation } from 'react-router';
import { baseURL, cigarsAttrURL, cigarsURL } from '../../data';
import CigarReplacement from './../../images/Cigar-replacement.svg';
import Tabak from './../../images/Tabak.svg';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './Cigars.module.scss';
import { AttrDataItemType, FilterMenuType } from '../../components/FormComponents';
import { Navigationbar } from '../../components/Navigationbar';
import { Sidemenu } from '../../components/Sidemenu';
import { Filter, AddButton, DataButton, IntroText } from '../../components/Filter';
import { CigarCardDisplay } from '../../components/CigarCard';
import { AttrDataWindow } from '../../components/AttrDataWindow';
import { Footer } from '../../components/Footer';
import { CigarCardEdit } from '../../components/CigarCard/CigarCardEdit';
import { useJwt } from '../User/LoginWindwo';

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
    imageFiles?: any[]; //Image[];
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

export const Cigars = () => {
    const [posts, setPosts] = useState<CigarEntry[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<CigarEntry[]>([]);
    const [menu, setMenu] = useState<AttrDataItemType[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [displayAttrMenu, setDisplayAttrMenu] = useState<boolean>(false);
    const [cigarsProducer, setCigarsProducer] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [cigarsOrigin, setCigarsOrigin] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [cigarEinlage, setCigarEinlage] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [cigarUmblatt, setCigarUmblatt] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [cigarDeckblatt, setCigarDeckblatt] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [cigarAnschnitt, setCigarAnschnitt] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [cigarAromarad, setCigarAromarad] = useState<AttrDataItemType[]>([{ id: 0, name: 'unknown' }]);
    const [editCard, setEditCard] = useState<CigarEntry>();
    const [activeFilter, setActiveFilter] = useState<string>();

    const history = useHistory();
    const { pathname } = useLocation();
    const basePath = '/cigars';

    const openAttrWindow = () => {
        history.push('attrDataWindow/');
    };

    const closeAttrWindow = () => {
        history.push(pathname.replace('attrDataWindow/', ''));
    };

    const deletePost = (id: number) => {
        axios
            .delete(`http://localhost:4000/cigars/${id}`)
            .then((response) => {
                console.log(response);

                setLoading(false);
                setPosts((posts) => posts.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const openEditCard = (id: number) => {
        setEditCard(posts.find((item) => item.id === id));
    };

    const clearEditCard = () => {
        setEditCard(undefined);
    };

    const createCard = () => {
        const newPost: CigarEntry = {
            id: 0,
            imageFiles: [],
            imageStrings: [],
            name: 'Neue Zigarre',
            description: 'Lorem ipsum...',
            abbrand: 1,
            anschnitt: cigarAnschnitt[0],
            aromaentwicklung: 1,
            aromarad: cigarAromarad[0],
            aromavielfalt: 1,
            buydate: '01.01.1970',
            deckblatt: cigarDeckblatt[0],
            einlage: cigarEinlage[0],
            lenght: 10,
            origin: cigarsOrigin[0],
            producer: cigarsProducer[0],
            rating: 1,
            ringmas: 10,
            smokeagain: true,
            smokeduration: 10,
            smokedate: '01.01.1970',
            strength: 1,
            umblatt: cigarUmblatt[0],
            zugwiederstand: 1,
        };

        axios
            .post(`${baseURL}${cigarsURL}`, { ...newPost })
            .then((response) => {
                console.log(response.headers['location']);
                const location: string = response.headers['location'];
                const [id] = location.split('/').slice(-1);
                newPost.id = Number(id);

                setPosts((post) => [newPost, ...posts]);

                openEditCard(Number(id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const initiateData = () => {
        const anschnittPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/anschnitt`);
        const aromaradPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/aromarad`);
        const deckBlattPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/deckblatt`);
        const einlagePromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/einlage`);
        const originPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/origin`);
        const producerPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/producer`);
        const umblattPromise = axios.get<AttrDataItemType[]>(`${baseURL}${cigarsAttrURL}/umblatt`);

        Promise.all([
            anschnittPromise,
            aromaradPromise,
            deckBlattPromise,
            einlagePromise,
            originPromise,
            producerPromise,
            umblattPromise,
        ])
            .then((responses) => {
                setCigarAnschnitt(responses[0].data);
                setCigarAromarad(responses[1].data);
                setCigarDeckblatt(responses[2].data);
                setCigarEinlage(responses[3].data);
                setCigarsOrigin(responses[4].data);
                setCigarsProducer(responses[5].data);
                setCigarUmblatt(responses[6].data);
                setLoading(false);
                setFilter('origin');
                setMenu(responses[4].data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get<CigarEntry[]>(`${baseURL}${cigarsURL}`)
            .then((response) => {
                setPosts(response.data);
                setFilteredPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        initiateData();
    }, [pathname]);

    const toggleAttrMenu = () => {
        if (displayAttrMenu === true) {
            initiateData();
        }
        
        setDisplayAttrMenu((old) => !old);
    };

    const filterPosts = (filterName: string, filterAttr: string) => {
        let newPosts = [];

        switch (filterName) {
            case 'Herkunft':
                newPosts = posts.filter((post) => post.origin.name === filterAttr);
                break;
            default:
                newPosts = posts;
                break;
        }

        // this.setState({ filteredPosts: newPosts });
        setFilteredPosts(newPosts);
    };

    // tslint:disable-next-line: max-func-body-length
    // public render() {
    //     const {
    //         posts,
    //         displayAttrMenu,
    //         cigarAnschnitt,
    //         cigarAromarad,
    //         cigarDeckblatt,
    //         cigarEinlage,
    //         cigarUmblatt,
    //         cigarsOrigin,
    //         cigarsProducer,
    //         filter,
    //         loading,
    //         menu,
    //         editCard,
    //         filteredPosts,
    //         activeFilter,
    //     } = this.state;
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

    const user = useJwt();

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
                            filterAction={filterPosts}
                            activeFilter={activeFilter}
                        />
                        <div className={classNames(`col-12 col-lg-9`)}>
                            <Filter orderAction={() => {}} orderItems={filterMenuData} />
                            {user && <AddButton onClick={createCard} />}
                            {user && <DataButton onClick={toggleAttrMenu} />}
                            <IntroText header="Zigarren raucht man überall">
                                Irgend was schlaues über Zigarren.
                            </IntroText>

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
                                                deleteFunction={deletePost}
                                                editFunction={openEditCard}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={this.toggleAttrMenu} />} */}
                <Route path={`${basePath}/attrDataWindow`}>
                    <AttrDataWindow content={attrData} close={() => closeAttrWindow()} />
                </Route>
                <Footer year="2019" version="0.1" />
            </div>
            {editCard && (
                <div className={LocalStyles.EditFrame}>
                    <div className="container">
                        <div className="col-12 col-md-10 offset-md-1">
                            <div className={LocalStyles.EditCard}>
                                <CigarCardEdit
                                    entry={editCard}
                                    deleteCigar={deletePost}
                                    close={clearEditCard}
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
};
// }
