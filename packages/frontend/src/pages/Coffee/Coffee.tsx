import React, { useContext, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router';
import { AddButton, DataButton, Filter, IntroText, Search } from '../../components/Filter';
import { Sidemenu } from '../../components/Sidemenu';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { FilterMenuType } from '../../helpers/types';
import { AppWindow } from '../../windows/AppWindow';
import { CoffeeAttrDataWindow } from '../../windows/AttrDataWindow';
import { CoffeeDetailWindow } from '../../windows/CoffeeCard/CoffeeDetailWindow';
import { InlineCoffeeCardDisplay } from '../../windows/CoffeeCard/InlineCoffeeCard';
import OverlayFrame from '../../windows/OverlayFrame/OverlayFrame';
import { default as chemexSVG, default as CoffeeReplacement } from './../../images/Chemex.svg';
import { getFilterMenu } from './CoffeeHelperFunctions';
import { UserContext } from '../../Contexts/UserContext';
import { ModalRoot, WTModal } from '../../components/Modal/Modal';

export const Coffee = () => {
    const {
        coffees,
        basePath,
        filterAttr,
        filterName,
        filteredPosts,
        postOrderBy,
        searchString,
        setFilterAttr,
        setFilterName,
        setPostOrderBy,
        setSearchString,
        goToCreateCoffee,
        openAttrWindow,
        getFilterCoffeeList,
        contextInitiateCoffees,
        contextInitiateCoffeeStores,
    } = useContext(CoffeeContext);
    const { user } = useContext(UserContext);
    const { firstParam, secondParam, thirdParam, forthParam } = useParams();

    console.log('First param: ', firstParam);
    console.log('Second param: ', secondParam);
    console.log('Third param: ', thirdParam);
    console.log('Forth param: ', forthParam);

    const filterMenu: FilterMenuType[] = getFilterMenu();

    // Todo: vill sollte man das schlauer machen
    useEffect(() => {
        initiateData();
    }, []);

    useEffect(() => {
        getFilterCoffeeList();
    }, [coffees, filterName, filterAttr, searchString, postOrderBy]);

    //Maybe this can be done when the context loads;
    const initiateData = () => {
        contextInitiateCoffees();
        contextInitiateCoffeeStores();
    };

    return (
        <>
            <AppWindow
                editState={firstParam !== undefined}
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

                <div className={'CoffeeContainer'}>
                    {!filteredPosts && (
                        <div className={'ReplImg'}>
                            <img src={CoffeeReplacement} alt="no content" />
                            <p>Error loading coffee data</p>
                        </div>
                    )}
                    {filteredPosts && filteredPosts.length === 0 ? (
                        <div className={'ReplImg'}>
                            <img src={CoffeeReplacement} alt="no content" />
                            <p>No coffees to display</p>
                        </div>
                    ) : (
                        filteredPosts &&
                        filteredPosts.map((post, i) => (
                            <InlineCoffeeCardDisplay entry={post} key={`${post.name}_${i}`} />
                        ))
                    )}
                </div>

                {/* {firstParam === 'attrDataWindow' && (
                    <WTModal>
                        <CoffeeAttrDataWindow />
                    </WTModal>
                )} */}
            </AppWindow>
            <ModalRoot />
            <Switch>
                <Route exact path={`${basePath}/attrDataWindow`}>
                    <CoffeeAttrDataWindow />
                </Route>
                <Route exact path={`${basePath}/card/:firstParam?/:secondParam?/:thirdParam?/:forthParam?`}>
                    <OverlayFrame>
                        <div className={'LayoutCard'}>
                            <CoffeeDetailWindow />
                        </div>
                    </OverlayFrame>
                </Route>
            </Switch>
        </>
    );
};
