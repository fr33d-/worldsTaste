import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { AttrDataType, AttrDataWindow } from '../AttrDataWindow';
import { CoffeeCard, CoffeeEntry } from '../CoffeeCard';
import { Filter } from '../Filter';
import { Footer } from '../Footer';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import chemexSVG from './../../images/Chemex.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
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
    editCard?: CoffeeEntry;
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

    public componentDidMount() {
        this.initiateData();
    }

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const { posts, coffeeKinds, coffeeOrigins, coffeeRoateds, displayAttrMenu, editCard } = this.state;
        const attrData = [
            {
                id: 1,
                name: 'Arten',
                urlSubstring: 'coffeeAttrs/kinds',
                description: 'Kaffee Arten',
                items: coffeeKinds,
            },
            {
                id: 2,
                name: 'Herkünfte',
                urlSubstring: 'coffeeAttrs/origins',
                description: 'Kaffee herkunfts Länder',
                items: coffeeOrigins,
            },
            {
                id: 3,
                name: 'Röstereien',
                urlSubstring: 'coffeeAttrs/roasteds',
                description: 'Kaffee Röstereien',
                items: coffeeRoateds,
            },
        ];

        return (
            <>
                <div className={LocalStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={classNames(editCard && LocalStyles.EditBackground)}>
                    <div className={LocalStyles.Container}>
                        <div className={classNames('row', LocalStyles.MobileHeader)}>
                            <FontAwesomeIcon icon="mug-hot" size="4x" color="#8B572A" />
                            <h1>Blog of Coffee</h1>
                        </div>
                        <div className="row">
                            <Sidemenu filter={attrData} image={chemexSVG} />
                            <div className={classNames(`col-12 col-lg-9`, LocalStyles.CoffeeContent)}>
                                <div className={LocalStyles.CoffeeContentScrollable}>
                                    <Filter
                                        addAction={this.createCard}
                                        dataAction={this.toggleAttrMenu}
                                        orderAction={() => {}}
                                        orderItems={attrData}
                                    />

                                    <div className={GeneralStyles.Introtext}>
                                        <h2>Kaffee - Genuss und Wissenschaft</h2>
                                        <p>
                                            Kaffee macht nicht nur wach sondern kann viel mehr. Es ist eine Wissenschaft
                                            ihn zuzbereiten, es gibt hunderte, wenn nicht tausende von Arten, Varianten,
                                            Geschmäcker und alles an Nerdkram den man sich vorstellen kann. Außerdem
                                            bedient er eine gewisse Sammelleidenschaft. Fast jede größere Stadt bietet
                                            heute mehr als eine kleine Rösterei mit viel verschiedenen Sorten. Ein
                                            kleiner Überblick über meine persönlichen Erfahrungen soll nun hier
                                            entstehen.
                                        </p>
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
                                                        deleteFunction={this.deletePost}
                                                        kinds={coffeeKinds}
                                                        roasteds={coffeeRoateds}
                                                        origins={coffeeOrigins}
                                                        edit={false}
                                                        setCoffeeEditCard={this.setEditCard}
                                                        clearCoffeeEditCard={this.clearEditCard}
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
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
                                    <CoffeeCard
                                        entry={editCard}
                                        deleteFunction={this.deletePost}
                                        kinds={coffeeKinds}
                                        roasteds={coffeeRoateds}
                                        origins={coffeeOrigins}
                                        edit={true}
                                        setCoffeeEditCard={this.setEditCard}
                                        clearCoffeeEditCard={this.clearEditCard}
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
