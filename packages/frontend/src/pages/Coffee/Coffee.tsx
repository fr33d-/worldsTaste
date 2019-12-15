import React, { FC, useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch, useHistory, useLocation, withRouter } from 'react-router';
import { AddButton, DataButton, Filter, IntroText } from '../../components/Filter';
import { Sidemenu } from '../../components/Sidemenu';
import { CoffeeAttrData, CoffeeEntry, FilterMenuType, User } from '../../helpers/types';
import { AppWindow } from '../../windows/AppWindow';
import { AttrDataWindow, CoffeeAttrDataWindow } from '../../windows/AttrDataWindow';
import { CoffeeCardDisplay } from '../../windows/CoffeeCard/CoffeeCardDisplay';
import { CoffeeDetailWindow } from '../../windows/CoffeeCard/CoffeeDetailWindow';
import { setUserFromSessionStorage } from '../User';
import { throwDataError, throwDataSucess } from '../User/userHelperFunctions';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './Coffee.module.scss';
import { deleteCoffee, getCoffeAttrData, getCoffees, saveNewCoffee, updateCoffee } from './CoffeeHelperFunctions';
import { useJwt } from '../../windows/UserWindows/UserHelperFunctions';

const CoffeeBase: FC<RouteComponentProps> = ({ match }) => {
    const [posts, setPosts] = useState<CoffeeEntry[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    // const [menu, setMenu] = useState<AttrDataType[]>([]);
    // const [filter, setFilter] = useState<string>();

    // Maybe we dont need this
    const [loading, setLoading] = useState(false);

    // new
    const [coffeeAttrData, setCoffeeAttrData] = useState<CoffeeAttrData>();

    // old
    // const [coffeeKinds, setCoffeeKinds] = useState<AttrDataType[]>([]);
    // const [coffeeRoateds, setCoffeeRoateds] = useState<AttrDataType[]>([]);
    // const [coffeeOrigins, setCoffeeOrigins] = useState<AttrDataType[]>([]);
    // const [coffeeProcesses, setCoffeeProcesses] = useState<AttrDataType[]>([]);
    // const [coffeeSpecies, setCoffeeSpecies] = useState<AttrDataType[]>([]);
    // const [coffeeBrewMethod, setCoffeeBrewMethod] = useState<AttrDataType[]>([]);

    // const [displayAttrMenu, setDisplayAttrMenu] = useState<boolean>();
    // const [editCard, setEditCard] = useState<CoffeeEntry>();
    const [activeFilter, setActiveFilter] = useState<string>();
    // const [brewingCard, setBrewingCard] = useState<CoffeeEntry>();
    const [user, setUser] = useState<User>();

    const history = useHistory();
    const { pathname } = useLocation();
    const basePath = '/coffee';

    // Todo: vill sollte man das schlauer machen
    useEffect(() => {
        setUser(useJwt());
        initiateData();
    }, []);

    const innerSaveCoffee = async (coffee: CoffeeEntry): Promise<void> => {
        if (coffee.id === 0) {
            //Create new coffee
            saveNewCoffee(coffee)
                .then((id) => {
                    setPosts((posts) => (!posts ? posts : [{ ...coffee, id: Number(id) }, ...posts]));
                    throwDataSucess('new coffee saved');
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Cant create coffee');
                    throwDataError('sorry, cant create new coffe', error);
                });
        } else {
            // Save existing coffee
            updateCoffee(coffee)
                .then((res) => {
                    console.log('updated coffee with id:', res);
                    throwDataSucess('coffee updated!');
                    setPosts((posts) => (!posts ? posts : posts.map((elm) => (elm.id === coffee.id ? coffee : elm))));
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Cant save coffee');
                    throwDataError('sorry, cant update coffee', error);
                });
        }
    };

    const innerDeleteCoffee = (id: number) => {
        deleteCoffee(id)
            .then((res) => {
                console.log('Post deleted');
                setPosts((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
                setFilteredPosts((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
                setLoading(false);
                throwDataSucess('coffee deleted');
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant delete Post');
                throwDataError('cant delete coffee', error);
            });
    };

    // const createCoffee = () => {
    //     if (user && coffeeOrigins && coffeeKinds && coffeeRoateds && coffeeProcesses && coffeeSpecies) {
    //         const newPost: CoffeeEntry = {
    //             id: 0,
    //             imageFiles: [],
    //             imageStrings: [],
    //             name: 'Neue Karte',
    //             description: '',
    //             origin: coffeeOrigins[0],
    //             rating: 0,
    //             kind: coffeeKinds[0],
    //             roasted: coffeeRoateds[0],
    //             bitter: 0,
    //             ownDescription: '',
    //             sour: 0,
    //             taste: 0,
    //             tasteKind: 0,
    //             woody: 0,
    //             buyDate: new Date(),
    //             dateAdded: new Date(),
    //             process: coffeeProcesses[0],
    //             species: coffeeSpecies[0],
    //             owner: user,
    //             brewings: [],
    //         };

    //         const jwtObj = sessionStorage.getItem('auth');

    //         axios
    //             .post(`${baseURL}${coffeeURL}`, { ...newPost }, { headers: { auth: jwtObj } })
    //             .then((response) => {
    //                 // console.log(response.headers['location']);
    //                 const location: string = response.headers['location'];
    //                 const [id] = location.split('/').slice(-1);
    //                 newPost.id = Number(id);

    //                 // console.log('Coffee created');
    //                 setPosts((posts) => (!posts ? posts : [newPost, ...posts]));

    //                 // setEditCard(Number(newPost.id));
    //                 loadEditCard(Number(newPost.id));
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 console.log('Cant create coffee');
    //             });
    //     } else {
    //         console.log('your are not logged in or some data are missing');
    //         // Todo: Toasts
    //     }
    // };

    const openAttrWindow = () => {
        history.push('attrDataWindow/');
    };

    const openBrewingWindow = (id: number) => {
        history.push(`${id}?view=brewings`);
    };

    const closeAttrWindow = () => {
        history.push(pathname.replace('attrDataWindow/', ''));
    };

    // Das wird noch nicht funktionieren
    const goToCreateCoffee = () => {
        history.push('new/');
    }

    const initiateData = () => {
        getCoffeAttrData()
            .then((coffeeAttrData) => {
                // setCoffeeKinds(coffeeAttrData.kinds);
                // setCoffeeOrigins(coffeeAttrData.roasteds);
                // setCoffeeRoateds(coffeeAttrData.roasteds);
                // setCoffeeProcesses(coffeeAttrData.processes);
                // setCoffeeSpecies(coffeeAttrData.specieses);
                // setCoffeeBrewMethod(coffeeAttrData.brewMethods);

                setCoffeeAttrData({
                    brewMethods: coffeeAttrData.brewMethods,
                    kinds: coffeeAttrData.kinds,
                    origins: coffeeAttrData.origins,
                    processes: coffeeAttrData.processes,
                    roasteds: coffeeAttrData.processes,
                    specieses: coffeeAttrData.specieses,
                });

                // setMenu(coffeeAttrData.origins);
                setLoading(false);
                // setFilter('origin');

                throwDataSucess('got coffee data');
            })
            .catch((error) => {
                throwDataError('cant get data from data', error);
            });

        getCoffees()
            .then((coffees) => {
                throwDataSucess('got coffees');
                setPosts(coffees);
            })
            .catch((error) => {
                throwDataError('cant get coffees', error);
            });

        setUserFromSessionStorage();
    };

    // const loadEditCard = (id: number) => {
    //     if (posts) {
    //         const post = posts.find((item) => item.id === id - 1);
    //         setEditCard(post);
    //         console.log('set edit card', post);
    //         console.log('with id', id);
    //         console.log('in posts ', posts);
    //     } else {
    //         console.log('post not found for edit');
    //         // Todo: Error toast
    //     }
    // };

    // const cardUpdated = (newPost: CoffeeEntry) => {
    //     console.log('new Post', newPost);

    //     const newPosts = posts.map((post) => {
    //         return post.id === newPost.id ? newPost : post;
    //     });

    //     setEditCard(undefined);
    //     setPosts(newPosts);
    //     setFilteredPosts(newPosts);
    // };

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

    // const closeBrewingWindow = () => {
    //     setBrewingCard(undefined);
    // };

    // const openBrewingWindow = (coffeeEntry: CoffeeEntry) => {
    //     //Add brewings to coffee card
    //     axios
    //         .get<BrewingEntry[]>(`${baseURL}${coffeeURL}/${coffeeEntry.id}/brewings`)
    //         .then((response) => {
    //             console.log('Got brewings');
    //             let loadedBrewings = response.data;
    //             loadedBrewings = loadedBrewings.map((brewing) => {
    //                 brewing.brewDate = new Date(brewing.brewDate);
    //                 return brewing;
    //             });
    //             console.log(loadedBrewings);
    //             setBrewingCard({ brewings: loadedBrewings, ...coffeeEntry });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             console.log('Cant get brewings');
    //         });
    // };

    // Todo: warum fällt das nicht aus der API raus
    // const attrData = coffeeAttrData ? [
    //     {
    //         id: 1,
    //         name: 'Röstarten',
    //         urlSubstring: 'coffeeAttrs/kinds',
    //         description: 'Kaffee Arten, zB Filter Kaffee oder Espresso',
    //         items: coffeeAttrData.kinds,
    //     },
    //     {
    //         id: 2,
    //         name: 'Herkünfte',
    //         urlSubstring: 'coffeeAttrs/origins',
    //         description: 'Kaffee herkunfts Länder',
    //         items: coffeeAttrData.origins,
    //     },
    //     {
    //         id: 3,
    //         name: 'Röstereien',
    //         urlSubstring: 'coffeeAttrs/roasteds',
    //         description: 'Kaffee Röstereien',
    //         items: coffeeAttrData.roasteds,
    //     },
    //     {
    //         id: 4,
    //         name: 'Bohnenart',
    //         urlSubstring: 'coffeeAttrs/species',
    //         description: 'Art der Bohne, zB Arabica oder Robusta',
    //         items: coffeeAttrData.specieses,
    //     },
    //     {
    //         id: 5,
    //         name: 'Prozess',
    //         urlSubstring: 'coffeeAttrs/processes',
    //         description: 'Verarbeitungsprozess, zB Washed oder Natural',
    //         items: coffeeAttrData.processes,
    //     },
    //     {
    //         id: 6,
    //         name: 'Brühmethoden',
    //         urlSubstring: 'coffeeAttrs/method',
    //         description: 'Brühmethoden, zB. V60, French Press oder AeroPress',
    //         items: coffeeAttrData.brewMethods,
    //     },
    // ] : [];

    const filterMenu: FilterMenuType[] = coffeeAttrData ? [
        {
            name: 'Arten',
            items: coffeeAttrData.kinds.map((item) => item.name),
        },
        {
            name: 'Herkunft',
            items: coffeeAttrData.origins.map((item) => item.name),
        },
        {
            name: 'Röstereien',
            items: coffeeAttrData.roasteds.map((item) => item.name),
        },
        {
            name: 'Bewertung',
            items: ['1', '2', '3', '4', '5'],
        },
    ] : [];

    const params: any = match.params;

    return (
        <>
            <Route path={`${basePath}/:extention?`}>
                <AppWindow
                    editState={params.extention}
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
                        {user && <AddButton onClick={goToCreateCoffee} />}
                        {user && <DataButton onClick={openAttrWindow} />}
                    </div>

                    <IntroText header={'Kaffee - Genuss und Wissenschaft'}>
                        Kaffee macht nicht nur wach sondern kann viel mehr. Es ist eine Wissenschaft ihn zuzbereiten, es
                        gibt hunderte, wenn nicht tausende von Arten, Varianten, Geschmäcker und alles an Nerdkram den
                        man sich vorstellen kann. Außerdem bedient er eine gewisse Sammelleidenschaft. Fast jede größere
                        Stadt bietet heute mehr als eine kleine Rösterei mit viel verschiedenen Sorten. Ein kleiner
                        Überblick über meine persönlichen Erfahrungen soll nun hier entstehen.
                    </IntroText>

                    <div className={`${LocalStyles.CoffeeContainer}`}>
                        {posts.length === 0 ? (
                            <div className={GeneralStyles.ReplImg}>
                                <img src={CoffeeReplacement} alt="no content" />
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
            <Switch>
                <Route path={`${basePath}/:id/edit?`}>
                    <CoffeeDetailWindow
                        basePath={basePath}
                        coffees={posts}
                        coffeeAttrData={coffeeAttrData}
                        saveCoffee={innerSaveCoffee}
                        deleteCoffee={innerDeleteCoffee}
                    />
                    {/* <CoffeeBrewingWindow
                            methods={coffeeBrewMethod}
                            basePath={basePath}
                            coffees={posts}
                            saveCoffee={innerSaveCoffee}
                            delteCoffee={deleteCoffee}
                        /> */}
                </Route>

                <Route path={`${basePath}/attrDataWindow`}>
                    <CoffeeAttrDataWindow close={() => closeAttrWindow()} />
                </Route>
            </Switch>

            {/* {editCard && (
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
            )} */}
        </>
    );
};

export default withRouter(CoffeeBase);
