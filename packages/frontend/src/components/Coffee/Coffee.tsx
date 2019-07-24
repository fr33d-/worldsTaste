import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { AttrDataWindow } from '../AttrDataWindow';
import { CoffeeCardDisplay } from '../CoffeeCard/CoffeeCardDisplay';
import { CoffeeCardEdit } from '../CoffeeCard/CoffeeCardEdit';
import { Filter } from '../Filter';
import { Footer } from '../Footer';
import { AttrDataType, CoffeeEntry, FilterMenuType } from '../FormComponents';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './Coffee.module.scss';

export type CoffeeProps = RouteComponentProps;

export type CoffeeBaseState = {
    posts: CoffeeEntry[];
    filteredPosts: CoffeeEntry[];
    menu: AttrDataType[];
    filter: string;
    loading: boolean;
    coffeeKinds: AttrDataType[];
    coffeeRoateds: AttrDataType[];
    coffeeOrigins: AttrDataType[];
    coffeeProcessed: AttrDataType[];
    coffeeSpecies: AttrDataType[];
    coffeeBrewMethod: AttrDataType[];
    displayAttrMenu: boolean;
    editCard?: CoffeeEntry;
    activeFilter?: string;
};

export class CoffeeBase extends Component<CoffeeProps, CoffeeBaseState> {
    public readonly state: CoffeeBaseState = {
        posts: [],
        filteredPosts: [],
        menu: [],
        filter: '',
        loading: false,
        coffeeKinds: [],
        coffeeOrigins: [],
        coffeeRoateds: [],
        displayAttrMenu: false,
        coffeeProcessed: [],
        coffeeSpecies: [],
        coffeeBrewMethod: [],
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
                console.log(error);
            });
    };

    public createCard = () => {
        const newPost: CoffeeEntry = {
            id: 0,
            imageFiles: [],
            imageStrings: [],
            name: 'Neue Karte',
            description: '',
            origin: this.state.coffeeOrigins[0],
            rating: 0,
            kind: this.state.coffeeKinds[0],
            roasted: this.state.coffeeRoateds[0],
            bitter: 0,
            ownDescription: '',
            sour: 0,
            taste: 0,
            tasteKind: 0,
            woody: 0,
            buydate: new Date(),
            dateAdded: new Date(),
            processed: this.state.coffeeProcessed[0],
            species: this.state.coffeeSpecies[0],
        };

        axios
            .post('http://localhost:4000/coffee', { ...newPost })
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
        const processedPromise = axios.get<AttrDataType[]>('http://localhost:4000/coffeeAttrs/processes');
        const speciesPromise = axios.get<AttrDataType[]>('http://localhost:4000/coffeeAttrs/species');
        const brewMethodPromise = axios.get<AttrDataType[]>('http://localhost:4000/coffeeAttrs/brewmethod');

        Promise.all([
            coffeesPromise,
            kindsPromise,
            originsPromise,
            roastedsPromise,
            processedPromise,
            speciesPromise,
            brewMethodPromise,
        ])
            .then((responses) => {
                console.log(responses[0].data);
                this.setState({
                    posts: responses[0].data,
                    filteredPosts: responses[0].data,
                    coffeeKinds: responses[1].data,
                    coffeeOrigins: responses[2].data,
                    coffeeRoateds: responses[3].data,
                    coffeeProcessed: responses[4].data,
                    coffeeSpecies: responses[5].data,
                    coffeeBrewMethod: responses[6].data,
                    loading: false,
                    filter: 'origin',
                    menu: responses[2].data,
                });
                console.log(this.state.filteredPosts);
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

    public clearEditCard = (newPost: CoffeeEntry, deleted: boolean) => {
        // let newPosts = [];
        // if (deleted) {
        //     newPosts = this.state.posts.filter(post => post.id !== newPost.id);
        // } else {
        //     newPosts = this.state.posts.map(post => {
        //         return post.id === newPost.id ? newPost :post;
        //     });
        // }

        // console.log(newPosts);

        // this.setState({
        //     editCard: undefined,
        //     posts: newPosts,
        //     filteredPosts: newPosts,
        // });

        this.setState({
            editCard: undefined,
        });

        this.initiateData();
    };

    public componentDidMount() {
        this.initiateData();
    }

    public filterPosts = (filterName: string, filterAttr: string) => {
        let newPosts = [];

        switch (filterName) {
            case 'Arten':
                newPosts = this.state.posts.filter((post) => {
                    console.log(`Vergleich ${post.kind.name} === ${filterAttr}`);
                    return post.kind.name === filterAttr;
                });
                break;
            case 'Herkunft':
                newPosts = this.state.posts.filter((post) => {
                    console.log(`Vergleich ${post.origin.name} === ${filterAttr}`);
                    return post.origin.name === filterAttr;
                });
                break;
            case 'Röstereien':
                // newPosts = this.state.posts.filter((post) => post.roasted.name === filterAttr);
                newPosts = this.state.posts.filter((post) => {
                    console.log(`Vergleich ${post.roasted.name} === ${filterAttr}`);
                    return post.roasted.name === filterAttr;
                });
                break;
            case 'Bewertung':
                // newPosts = this.state.posts.filter((post) => String(post.rating) === filterAttr);
                newPosts = this.state.posts.filter((post) => {
                    console.log(post);
                    if (String(post.rating) === filterAttr) {
                        console.log(`Vergleich ${String(post.rating)} === ${filterAttr}`);
                    } else {
                        console.log(`Vergleich ${String(post.rating)} != ${filterAttr}`);
                    }
                    return String(post.rating) === filterAttr;
                });
                break;
            default:
                newPosts = this.state.posts;
                break;
        }

        this.setState({ filteredPosts: newPosts, activeFilter: filterAttr });
    };

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const {
            posts,
            coffeeKinds,
            coffeeOrigins,
            coffeeRoateds,
            displayAttrMenu,
            editCard,
            filteredPosts,
            activeFilter,
        } = this.state;
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
        const filterMenu: FilterMenuType[] = [
            {
                name: 'Arten',
                items: coffeeKinds.map((item) => item.name),
            },
            {
                name: 'Herkunft',
                items: coffeeOrigins.map((item) => item.name),
            },
            {
                name: 'Röstereien',
                items: coffeeRoateds.map((item) => item.name),
            },
            {
                name: 'Bewertung',
                items: ['1', '2', '3', '4', '5'],
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
                            <Sidemenu
                                filter={filterMenu}
                                image={chemexSVG}
                                filterAction={this.filterPosts}
                                activeFilter={activeFilter}
                            />
                            <div className={classNames(`col-12 col-lg-9`, LocalStyles.CoffeeContent)}>
                                <div className={LocalStyles.CoffeeContentScrollable}>
                                    <Filter
                                        addAction={this.createCard}
                                        dataAction={this.toggleAttrMenu}
                                        orderAction={() => {}}
                                        orderItems={filterMenu}
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
                                            <div className={GeneralStyles.ReplImg}>
                                                <img src={CoffeeReplacement} />
                                                <p>No coffees to display</p>
                                            </div>
                                        ) : (
                                            filteredPosts.map((post) => {
                                                return (
                                                    <CoffeeCardDisplay
                                                        entry={post}
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
                    </div>
                    {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={this.toggleAttrMenu} />}
                    <Footer year="2019" version="0.1" />
                </div>
                {editCard && (
                    <div className={LocalStyles.EditFrame}>
                        <div className="container">
                            <div className="col-12 col-md-10 offset-md-1">
                                <div className={LocalStyles.EditCard}>
                                    <CoffeeCardEdit
                                        entry={editCard}
                                        deleteFunction={this.deletePost}
                                        kinds={coffeeKinds}
                                        roasteds={coffeeRoateds}
                                        origins={coffeeOrigins}
                                        close={this.clearEditCard}
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
