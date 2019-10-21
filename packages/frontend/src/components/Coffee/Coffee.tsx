import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { baseURL, coffeeAttrURL, coffeeURL } from '../../data';
import { AttrDataWindow } from '../AttrDataWindow';
import { CoffeeBrewingWindow } from '../CoffeeCard/CoffeeBrewingCard';
import { CoffeeCardDisplay } from '../CoffeeCard/CoffeeCardDisplay';
import { CoffeeCardEdit } from '../CoffeeCard/CoffeeCardEdit';
import { Filter } from '../Filter';
import { Footer } from '../Footer';
import { AttrDataType, BrewingEntry, CoffeeEntry, FilterMenuType } from '../FormComponents';
import { Navigationbar } from '../Navigationbar';
import { Sidemenu } from '../Sidemenu';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './Coffee.module.scss';
import { useJwt } from '../User/LoginWindwo';

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
    coffeeProcesses: AttrDataType[];
    coffeeSpecies: AttrDataType[];
    coffeeBrewMethod: AttrDataType[];
    displayAttrMenu: boolean;
    editCard?: CoffeeEntry;
    activeFilter?: string;
    brewingCard?: CoffeeEntry;
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
        coffeeProcesses: [],
        coffeeSpecies: [],
        coffeeBrewMethod: [],
    };

    public deletePost = (id: number) => {
        axios
            .delete(`http://localhost:4000/coffee/${id}`)
            .then((response) => {
                console.log(response);
                console.log('Post deleted');
                this.setState((oldState) => ({
                    posts: oldState.posts.filter((item) => item.id !== id),
                    filteredPosts: oldState.posts.filter((item) => item.id !== id),
                    loading: false,
                }));
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant delete Post');
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
            buyDate: new Date(),
            dateAdded: new Date(),
            process: this.state.coffeeProcesses[0],
            species: this.state.coffeeSpecies[0],
        };

        axios
            .post(`${baseURL}${coffeeURL}`, { ...newPost })
            .then((response) => {
                console.log(response.headers['location']);
                const location: string = response.headers['location'];
                const [id] = location.split('/').slice(-1);
                newPost.id = Number(id);

                console.log('Coffee created');
                this.setState((state) => ({
                    posts: [newPost, ...state.posts],
                }));

                this.setEditCard(Number(newPost.id));
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant create coffee');
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
        const coffeesPromise = axios.get<CoffeeEntry[]>(`${baseURL}${coffeeURL}`);
        const kindsPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/kinds`);
        const originsPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/origins`);
        const roastedsPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/roasteds`);
        const processedPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/processes`);
        const speciesPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/species`);
        const brewMethodPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/method`);

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
                    coffeeProcesses: responses[4].data,
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

    public cardUpdated = (newPost: CoffeeEntry) => {
        console.log(newPost);

        const newPosts = this.state.posts.map((post) => {
            return post.id === newPost.id ? newPost : post;
        });

        this.setState({
            editCard: undefined,
            posts: newPosts,
            filteredPosts: newPosts,
        });
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

    public closeBrewingWindow = () => {
        this.setState({
            brewingCard: undefined,
        });
    };

    public openBrewingWindow = (coffeeEntry: CoffeeEntry) => {
        //Add brewings to coffee card
        axios
            .get(`${baseURL}${coffeeURL}/${coffeeEntry.id}/brewings`)
            .then((response) => {
                console.log('Got brewings');
                let loadedBrewings = response.data as BrewingEntry[];
                // console.log(loadedBrewings);
                loadedBrewings = loadedBrewings.map((brewing) => {
                    brewing.brewDate = new Date(brewing.brewDate);
                    return brewing;
                });
                // console.log(loadedBrewings);

                this.setState({
                    brewingCard: { brewings: loadedBrewings, ...coffeeEntry },
                });
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant get brewings');
            });
    };

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const {
            posts,
            coffeeKinds,
            coffeeOrigins,
            coffeeRoateds,
            coffeeProcesses,
            coffeeSpecies,
            coffeeBrewMethod,
            displayAttrMenu,
            editCard,
            filteredPosts,
            activeFilter,
            brewingCard,
        } = this.state;
        const attrData = [
            {
                id: 1,
                name: 'Röstarten',
                urlSubstring: 'coffeeAttrs/kinds',
                description: 'Kaffee Arten, zB Filter Kaffee oder Espresso',
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
            {
                id: 4,
                name: 'Bohnenart',
                urlSubstring: 'coffeeAttrs/species',
                description: 'Art der Bohne, zB Arabica oder Robusta',
                items: coffeeSpecies,
            },
            {
                id: 5,
                name: 'Prozess',
                urlSubstring: 'coffeeAttrs/processes',
                description: 'Verarbeitungsprozess, zB Washed oder Natural',
                items: coffeeProcesses,
            },
            {
                id: 6,
                name: 'Brühmethoden',
                urlSubstring: 'coffeeAttrs/method',
                description: 'Brühmethoden, zB. V60, French Press oder AeroPress',
                items: coffeeBrewMethod,
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

        const user = useJwt();
        
        return (
            <>
                <div className={LocalStyles.BackgroundHelper} />
                <Navigationbar />
                <div className={classNames((editCard || displayAttrMenu || brewingCard) && LocalStyles.EditBackground)}>
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
                                                        openBrewings={this.openBrewingWindow}
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer year="2019" version="0.1" />
                </div>
                {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={this.toggleAttrMenu} />}
                {brewingCard && (
                    <div className={LocalStyles.EditFrame}>
                        <div className="container">
                            <div className="col-12">
                                <div className={LocalStyles.EditCard}>
                                    <CoffeeBrewingWindow
                                        entry={brewingCard}
                                        methods={coffeeBrewMethod}
                                        close={this.closeBrewingWindow}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
                                        processes={coffeeProcesses}
                                        specieses={coffeeSpecies}
                                        close={this.cardUpdated}
                                        cardDeleted={() => {}}
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
