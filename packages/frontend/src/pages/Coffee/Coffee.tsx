import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState, FC } from 'react';
import { AttrDataWindow } from '../../components/AttrDataWindow';
import { CoffeeBrewingWindow } from '../../windows/CoffeeCard/CoffeeBrewingCard';
import { CoffeeCardDisplay } from '../../windows/CoffeeCard/CoffeeCardDisplay';
import { CoffeeCardEdit } from '../../windows/CoffeeCard/CoffeeCardEdit';
import { AddButton, DataButton, Filter, IntroText } from '../../components/Filter';
import { AttrDataType, BrewingEntry, CoffeeEntry, FilterMenuType } from '../../components/FormComponents';
import { Sidemenu } from '../../components/Sidemenu';
import { baseURL, coffeeAttrURL, coffeeURL } from '../../data';
import { AppWindow } from '../../windows/AppWindow';
import { User } from '../User';
import { useJwt } from '../User/LoginWindwo';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './Coffee.module.scss';
import { Route, useLocation, RouteComponentProps, withRouter, useParams, useHistory } from 'react-router';
import OverlayFrame from '../../windows/OverlayFrame/OverlayFrame';

const CoffeeBase: FC<RouteComponentProps> = ({ match }) => {
    const [posts, setPosts] = useState<CoffeeEntry[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [menu, setMenu] = useState<AttrDataType[]>([]);
    const [filter, setFilter] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [coffeeKinds, setCoffeeKinds] = useState<AttrDataType[]>([]);
    const [coffeeRoateds, setCoffeeRoateds] = useState<AttrDataType[]>([]);
    const [coffeeOrigins, setCoffeeOrigins] = useState<AttrDataType[]>([]);
    const [coffeeProcesses, setCoffeeProcesses] = useState<AttrDataType[]>([]);
    const [coffeeSpecies, setCoffeeSpecies] = useState<AttrDataType[]>([]);
    const [coffeeBrewMethod, setCoffeeBrewMethod] = useState<AttrDataType[]>([]);
    // const [displayAttrMenu, setDisplayAttrMenu] = useState<boolean>();
    const [editCard, setEditCard] = useState<CoffeeEntry>();
    const [activeFilter, setActiveFilter] = useState<string>();
    const [brewingCard, setBrewingCard] = useState<CoffeeEntry>();
    const [user, setUser] = useState<User>();

    const jwtObj = sessionStorage.getItem('auth');

    const history = useHistory();
    const {pathname} = useLocation();
    const basePath = '/coffee';
    // console.log('location in coffeeBase', location);
    // console.log('match in coffeeBase', match);

    // Todo: vill sollte man das schlauer machen
    useEffect(() => {
        setUser(useJwt());
        initiateData();
    }, []);

    //Todo: eigentlich müsste diese funkton asyncron sein und dann via then später das fenster schließen
    const saveCoffee = (coffee: CoffeeEntry): boolean => {
        if (coffee.id === 0) {
            //Create new coffee
            axios
                .post(`${baseURL}${coffeeURL}`, { ...coffee }, { headers: { auth: jwtObj } })
                .then((response) => {
                    console.log(response.headers['location']);
                    const location: string = response.headers['location'];
                    const [id] = location.split('/').slice(-1);

                    setPosts((posts) => (!posts ? posts : [{ ...coffee, id: Number(id) }, ...posts]));
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Cant create coffee');
                });
            return false;
        } else {
            // Save existing coffee
            axios
                .put(`${baseURL}${coffeeURL}/${coffee.id}`, { ...coffee }, { headers: { auth: jwtObj } })
                .then((response) => {
                    console.log(response.headers['location']);
                    // const location: string = response.headers['location'];
                    // const [id] = location.split('/').slice(-1);

                    setPosts((posts) => (!posts ? posts : posts.map((elm) => (elm.id === coffee.id ? coffee : elm))));
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Cant save coffee');
                });
            return false;
        }
    };


    const deleteCoffee = (id: number) => {
        axios
            .delete(`http://localhost:4000/coffee/${id}`)
            .then((response) => {
                // console.log(response);
                // console.log('Post deleted');
                setPosts((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
                setFilteredPosts((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
                setLoading(false);
                // Todo: Toasts
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant delete Post');
                // Todo: Toasts
            });
    };

    const createCoffee = () => {
        if (user && coffeeOrigins && coffeeKinds && coffeeRoateds && coffeeProcesses && coffeeSpecies) {
            const newPost: CoffeeEntry = {
                id: 0,
                imageFiles: [],
                imageStrings: [],
                name: 'Neue Karte',
                description: '',
                origin: coffeeOrigins[0],
                rating: 0,
                kind: coffeeKinds[0],
                roasted: coffeeRoateds[0],
                bitter: 0,
                ownDescription: '',
                sour: 0,
                taste: 0,
                tasteKind: 0,
                woody: 0,
                buyDate: new Date(),
                dateAdded: new Date(),
                process: coffeeProcesses[0],
                species: coffeeSpecies[0],
                owner: user,
                brewings: [],
            };

            const jwtObj = sessionStorage.getItem('auth');

            axios
                .post(`${baseURL}${coffeeURL}`, { ...newPost }, { headers: { auth: jwtObj } })
                .then((response) => {
                    console.log(response.headers['location']);
                    const location: string = response.headers['location'];
                    const [id] = location.split('/').slice(-1);
                    newPost.id = Number(id);

                    // console.log('Coffee created');
                    setPosts((posts) => (!posts ? posts : [newPost, ...posts]));

                    // this.setEditCard(Number(newPost.id));
                    loadEditCard(Number(newPost.id));
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Cant create coffee');
                });
        } else {
            console.log('your are not logged in or some data are missing');
            // Todo: Toasts
        }
    };

    // const toggleAttrMenu = () => {
    //     setDisplayAttrMenu((old) => !old);
    // };

    const openAttrWindow = () => {
        history.push('attrDataWindow/')
    }
    
    const closeAttrWindow = () => {
        history.push(pathname.replace('attrDataWindow/', ''))
    }

    const initiateData = () => {
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
                console.log('got response', responses[0].data);
                setPosts(responses[0].data);
                setFilteredPosts(responses[0].data);
                setCoffeeKinds(responses[1].data);
                setCoffeeOrigins(responses[2].data);
                setCoffeeRoateds(responses[3].data);
                setCoffeeProcesses(responses[4].data);
                setCoffeeSpecies(responses[5].data);
                setCoffeeBrewMethod(responses[6].data);
                setLoading(false);
                setFilter('origin');
                setMenu(responses[2].data);
                // console.log(this.state.filteredPosts);
                // Todo: Toasts
            })
            .catch((error) => {
                console.log(error);
                // Todo: Toasts
            });

        const jwtObj = sessionStorage.getItem('auth');

        if (jwtObj != null) {
            const data = jwt.decode(jwtObj);

            if (data != null && typeof data !== 'string') {
                const actuallUser: User = {
                    id: data['userId'],
                    username: data['username'],
                    name: data['name'],
                    role: data['role'],
                };
                setUser(actuallUser);
            }
        }
    };

    const loadEditCard = (id: number) => {
        if (posts) {
            setEditCard(posts.find((item) => item.id === id));
            console.log('set edit card', id);
        } else {
            console.log('post not found for edit');
            // Todo: Error toast
        }
    };

    const cardUpdated = (newPost: CoffeeEntry) => {
        console.log('new Post', newPost);

        const newPosts = posts.map((post) => {
            return post.id === newPost.id ? newPost : post;
        });

        setEditCard(undefined);
        setPosts(newPosts);
        setFilteredPosts(newPosts);
    };

    const filterPosts = (filterName: string, filterAttr: string) => {
        let newPosts = [];

        switch (filterName) {
            case 'Arten':
                newPosts = posts.filter((post) => {
                    console.log(`Vergleich ${post.kind.name} === ${filterAttr}`);
                    return post.kind.name === filterAttr;
                });
                break;
            case 'Herkunft':
                newPosts = posts.filter((post) => {
                    console.log(`Vergleich ${post.origin.name} === ${filterAttr}`);
                    return post.origin.name === filterAttr;
                });
                break;
            case 'Röstereien':
                newPosts = posts.filter((post) => {
                    console.log(`Vergleich ${post.roasted.name} === ${filterAttr}`);
                    return post.roasted.name === filterAttr;
                });
                break;
            case 'Bewertung':
                newPosts = posts.filter((post) => {
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
                newPosts = posts;
                break;
        }

        setFilteredPosts(newPosts);
        setActiveFilter(filterAttr);
    };

    const closeBrewingWindow = () => {
        setBrewingCard(undefined);
    };

    const openBrewingWindow = (coffeeEntry: CoffeeEntry) => {
        //Add brewings to coffee card
        axios
            .get(`${baseURL}${coffeeURL}/${coffeeEntry.id}/brewings`)
            .then((response) => {
                console.log('Got brewings');
                let loadedBrewings = response.data as BrewingEntry[];
                loadedBrewings = loadedBrewings.map((brewing) => {
                    brewing.brewDate = new Date(brewing.brewDate);
                    return brewing;
                });
                console.log(loadedBrewings);
                setBrewingCard({ brewings: loadedBrewings, ...coffeeEntry });
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant get brewings');
            });
    };

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

    console.log('match', match.params);
    // const {extention} =  match.params;
    const params: any =  match.params;

    return (
        <>
        <Route path={`${basePath}/:extention?`}>
            
        
            <AppWindow
                editState={params.extention }
                // editState={editCard != undefined || displayAttrMenu === true || brewingCard != undefined}
                loading={loading}
                sidebar={
                    <Sidemenu
                        filter={filterMenu}
                        image={chemexSVG}
                        filterAction={filterPosts}
                        activeFilter={activeFilter}
                    />
                }
            >
                <div className={GeneralStyles.FilterRow}>
                    <Filter orderAction={() => {}} orderItems={filterMenu} />
                    {user && <AddButton onClick={createCoffee} />}
                    {/* {user && <DataButton onClick={toggleAttrMenu} />} */}
                    {user && <DataButton onClick={openAttrWindow} />}
                </div>

                <IntroText header={'Kaffee - Genuss und Wissenschaft'}>
                    Kaffee macht nicht nur wach sondern kann viel mehr. Es ist eine Wissenschaft ihn zuzbereiten, es
                    gibt hunderte, wenn nicht tausende von Arten, Varianten, Geschmäcker und alles an Nerdkram den man
                    sich vorstellen kann. Außerdem bedient er eine gewisse Sammelleidenschaft. Fast jede größere Stadt
                    bietet heute mehr als eine kleine Rösterei mit viel verschiedenen Sorten. Ein kleiner Überblick über
                    meine persönlichen Erfahrungen soll nun hier entstehen.
                </IntroText>

                <div className={`${LocalStyles.CoffeeContainer}`}>
                    {posts.length === 0 ? (
                        <div className={GeneralStyles.ReplImg}>
                            <img src={CoffeeReplacement} />
                            <p>No coffees to display</p>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <CoffeeCardDisplay
                                entry={post}
                                deleteFunction={deleteCoffee}
                                editFunction={loadEditCard}
                                openBrewings={openBrewingWindow}
                            />
                        ))
                    )}
                </div>
            </AppWindow>
            </Route>
            <Route path={`${basePath}/:id`}>
                <OverlayFrame>
                    <CoffeeBrewingWindow
                        methods={coffeeBrewMethod}
                        basePath={basePath}
                        coffees={posts}
                        saveCoffee={saveCoffee}
                        delteCoffee={deleteCoffee}
                    />
                </OverlayFrame>
            </Route>

            <Route path={`${basePath}/attrDataWindow`}>
                <AttrDataWindow content={attrData} close={() => closeAttrWindow()} />
            </Route>
            {/* {displayAttrMenu && <AttrDataWindow content={attrData} toggleFunktion={toggleAttrMenu} />} */}
            {editCard && (
                <OverlayFrame>
                    <CoffeeCardEdit
                        entry={editCard}
                        kinds={coffeeKinds}
                        roasteds={coffeeRoateds}
                        origins={coffeeOrigins}
                        processes={coffeeProcesses}
                        specieses={coffeeSpecies}
                        deleteCoffee={deleteCoffee}
                        saveCoffee={saveCoffee}
                        basePath={basePath}
                    />
                </OverlayFrame>
            )}
        </>
    );
};

export default withRouter(CoffeeBase);
