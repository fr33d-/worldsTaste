import React, { FC, useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch, useHistory, useLocation, withRouter, useParams } from 'react-router';
import { AddButton, DataButton, Filter, IntroText } from '../../components/Filter';
import { Sidemenu } from '../../components/Sidemenu';
import { CoffeeAttrData, CoffeeEntry, FilterMenuType, User } from '../../helpers/types';
import { AppWindow } from '../../windows/AppWindow';
import { CoffeeAttrDataWindow } from '../../windows/AttrDataWindow';
import { InlineCoffeeCardDisplay } from '../../windows/CoffeeCard/CoffeeCardDisplay';
import { CoffeeDetailWindow } from '../../windows/CoffeeCard/CoffeeDetailWindow';
import { useJwt } from '../../windows/UserWindows/UserHelperFunctions';
import { setUserFromSessionStorage } from '../User';
import { throwDataError, throwDataSucess } from '../User/userHelperFunctions';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './Coffee.module.scss';
import { deleteCoffee, getCoffeAttrData, getCoffees, saveNewCoffee, updateCoffee } from './CoffeeHelperFunctions';
import OverlayFrame from '../../windows/OverlayFrame/OverlayFrame';

export const Coffee = () => {
    const [posts, setPosts] = useState<CoffeeEntry[]>([]);

    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [filterName, setFilterName] = useState<string>();
    const [filterAttr, setFilterAttr] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const [postOrderBy, setPostOrderBy] = useState<string>();

    const [coffeeAttrData, setCoffeeAttrData] = useState<CoffeeAttrData>();
    const [user] = useState<User | undefined>(useJwt());

    const history = useHistory();
    const { pathname } = useLocation();
    const basePath = '/coffee';

    // Todo: vill sollte man das schlauer machen
    useEffect(() => {
        initiateData();
    }, []);

    useEffect(() => {
        filterPosts();
    }, [posts, filterName, filterAttr, searchString, postOrderBy]);

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
                throwDataSucess('coffee deleted');
            })
            .catch((error) => {
                console.log(error);
                console.log('Cant delete Post');
                throwDataError('cant delete coffee', error);
            });
    };

    const openAttrWindow = () => {
        history.push('attrDataWindow/');
    };

    const openBrewingWindow = (id: number) => {
        history.push(`/coffee/card/${id}?view=brewings`);
    };

    const closeAttrWindow = () => {
        history.push(pathname.replace('attrDataWindow/', ''));
    };

    const goToCreateCoffee = () => {
        //todo das sollte besser gehen, mach das mal so wie man das eigentlich macht
        history.push('/coffee/card/?view=new');
    };

    const initiateData = () => {
        getCoffeAttrData()
            .then((coffeeAttrData) => {
                setCoffeeAttrData({
                    brewMethods: coffeeAttrData.brewMethods,
                    kinds: coffeeAttrData.kinds,
                    origins: coffeeAttrData.origins,
                    processes: coffeeAttrData.processes,
                    roasteds: coffeeAttrData.processes,
                    specieses: coffeeAttrData.specieses,
                });
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

        setUserFromSessionStorage().catch((error) => {
            throwDataError('you are not logged in', error);
        });
    };

    const filterPosts = () => {
        let newPosts = [];

        switch (filterName) {
            case 'Arten':
                newPosts = posts.filter((post) => {
                    return post.kind.name === filterAttr;
                });
                break;
            case 'Herkunft':
                newPosts = posts.filter((post) => {
                    return post.origin.name === filterAttr;
                });
                break;
            case 'Röstereien':
                newPosts = posts.filter((post) => {
                    return post.roasted.name === filterAttr;
                });
                break;
            case 'Bewertung':
                newPosts = posts.filter((post) => {
                    return String(post.rating) === filterAttr;
                });
                break;
            default:
                newPosts = posts;
                break;
        }

        if (searchString) {
            newPosts = newPosts.filter((post) => post.name.includes(searchString));
        }

        if (postOrderBy) {
            switch (filterName) {
                case 'Arten':
                    newPosts = newPosts.sort((a, b) => a.kind.name.localeCompare(b.kind.name));
                    break;
                case 'Herkunft':
                    newPosts = newPosts.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
                    break;
                case 'Röstereien':
                    newPosts = newPosts.sort((a, b) => a.roasted.name.localeCompare(b.roasted.name));
                    break;
                case 'Bewertung':
                    newPosts = newPosts.sort((a, b) => a.rating - b.rating);
                    break;
            }
        }

        setFilteredPosts(newPosts);
    };

    const filterMenu: FilterMenuType[] = coffeeAttrData
        ? [
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
          ]
        : [];

    const { extention } = useParams();

    return (
        <>
            <AppWindow
                editState={extention ? true : false}
                sidebar={
                    <Sidemenu
                        filter={filterMenu}
                        image={chemexSVG}
                        filterName={filterName}
                        setFilterName={setFilterName}
                        filterAttr={filterAttr}
                        setFilterAttr={setFilterAttr}
                    />
                }
            >
                <div className={GeneralStyles.FilterRow}>
                    <Filter orderItems={filterMenu} orderString={postOrderBy} setOrderString={setPostOrderBy} />
                    {user && <AddButton onClick={goToCreateCoffee} />}
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
                            <img src={CoffeeReplacement} alt="no content" />
                            <p>No coffees to display</p>
                        </div>
                    ) : (
                        filteredPosts.map((post, i) => (
                            <InlineCoffeeCardDisplay
                                entry={post}
                                key={`${post.name}_${i}`}
                                deleteCoffee={innerDeleteCoffee}
                            />
                        ))
                    )}
                </div>
            </AppWindow>
            <Switch>
                <Route exact path={`${basePath}/attrDataWindow`}>
                    <CoffeeAttrDataWindow close={closeAttrWindow} coffeeAttrData={coffeeAttrData} />
                </Route>
                <Route exact path={`${basePath}/card/:id?`}>
                    <OverlayFrame>
                        <CoffeeDetailWindow
                            basePath={basePath}
                            coffees={posts}
                            coffeeAttrData={coffeeAttrData}
                            deleteCoffee={innerDeleteCoffee}
                            saveCoffee={innerSaveCoffee}
                        />
                    </OverlayFrame>
                </Route>
            </Switch>
        </>
    );
};
