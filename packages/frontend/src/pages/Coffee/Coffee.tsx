import React, { useContext, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router';
import { AddButton, DataButton, Filter, IntroText, Search } from '../../components/Filter';
import { Sidemenu } from '../../components/Sidemenu';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { FilterMenuType } from '../../helpers/types';
import { AppWindow } from '../../windows/AppWindow';
import { CoffeeAttrDataWindow } from '../../windows/AttrDataWindow';
import { InlineCoffeeCardDisplay } from '../../windows/CoffeeCard/InlineCoffeeCard';
import { CoffeeDetailWindow } from '../../windows/CoffeeCard/CoffeeDetailWindow';
import OverlayFrame from '../../windows/OverlayFrame/OverlayFrame';
import { throwDataError, throwDataSucess, setUserFromSessionStorage } from '../User/userHelperFunctions';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
// import GeneralStyles from './../../styles/'module'.scss';
// import LocalStyles from './Coffee.module.scss';
import { getCoffeAttrData, getCoffees } from './CoffeeHelperFunctions';

export const Coffee = () => {
    const {
        coffees,
        setCoffees,
        basePath,
        coffeeAttrData,
        filterAttr,
        filterName,
        filteredPosts,
        postOrderBy,
        searchString,
        setCoffeeAttrData,
        setFilterAttr,
        setFilterName,
        setFilteredPosts,
        setPostOrderBy,
        setSearchString,
        user,
        goToCreateCoffee,
        openAttrWindow,
    } = useContext(CoffeeContext);

    // Todo: vill sollte man das schlauer machen
    useEffect(() => {
        initiateData();
    }, []);

    useEffect(() => {
        filterPosts();
    }, [coffees, filterName, filterAttr, searchString, postOrderBy]);

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
                setCoffees(coffees);
            })
            .catch((error) => {
                throwDataError('cant get coffees', error);
            });

        setUserFromSessionStorage(); //.catch((error) => {
        //     throwDataError('you are not logged in', error);
        // });
    };

    const filterPosts = () => {
        let newPosts = [];

        switch (filterName) {
            case 'Arten':
                newPosts = coffees.filter((post) => {
                    return post.kind.name === filterAttr;
                });
                break;
            case 'Herkunft':
                newPosts = coffees.filter((post) => {
                    return post.origin.name === filterAttr;
                });
                break;
            case 'Röstereien':
                newPosts = coffees.filter((post) => {
                    return post.roasted.name === filterAttr;
                });
                break;
            case 'Bewertung':
                newPosts = coffees.filter((post) => {
                    return String(post.rating) === filterAttr;
                });
                break;
            default:
                newPosts = coffees;
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
                default:
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
                <div className={'FilterRow'}>
                    <Search searchString={searchString} setSearchString={setSearchString} />
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

                <div className={`${'CoffeeContainer'}`}>
                    {coffees.length === 0 ? (
                        <div className={'ReplImg'}>
                            <img src={CoffeeReplacement} alt="no content" />
                            <p>No coffees to display</p>
                        </div>
                    ) : (
                        filteredPosts.map((post, i) => (
                            <InlineCoffeeCardDisplay
                                entry={post}
                                key={`${post.name}_${i}`}
                            />
                        ))
                    )}
                </div>
            </AppWindow>
            <Switch>
                <Route exact path={`${basePath}/attrDataWindow`}>
                    <CoffeeAttrDataWindow />
                </Route>
                <Route exact path={`${basePath}/card/:id?`}>
                    <OverlayFrame>
                        <CoffeeDetailWindow />
                    </OverlayFrame>
                </Route>
            </Switch>
        </>
    );
};
