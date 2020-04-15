import React, { useContext, useEffect } from "react";
import { Route, Switch, useParams } from "react-router";
import { AddButton, Filter, IntroText, Search } from "../../components/Filter";
import { Sidemenu } from "../../components/Sidemenu";
import { CoffeeContext } from "../../Contexts/CoffeeContext";
import { UserContext } from "../../Contexts/UserContext";
import { FilterMenuType } from "../../helpers/types";
import { AppWindow } from "../../windows/AppWindow";
import { CoffeeDetailFrame } from "../../windows/CoffeeCard/CoffeeDetailFrame";
import { InlineCoffeeCardDisplay } from "../../windows/CoffeeCard/InlineCoffeeCard";
import { default as chemexSVG, default as CoffeeReplacement } from "./../../images/Chemex.svg";
import { getFilterMenu } from "./CoffeeHelperFunctions";
import { DataAttrWindowButton } from "../../components/Buttons/FunctioalButtons";

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
        getFilterCoffeeList,
        contextInitiateCoffees,
        contextInitiateCoffeeStores,
        editState,
        setEditState,
        attrData,
    } = useContext(CoffeeContext);
    const { user } = useContext(UserContext);
    const { firstParam } = useParams();

    const context = useContext(CoffeeContext);
    console.log("Context", context);

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
                editState={firstParam !== undefined || editState}
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
                <div className={"FilterRow"}>
                    <Search searchString={searchString} setSearchString={setSearchString} />
                    <Filter orderItems={filterMenu} orderString={postOrderBy} setOrderString={setPostOrderBy} />
                    {user && <AddButton onClick={goToCreateCoffee} />}
                    {user && <DataAttrWindowButton setEditState={setEditState} attrData={attrData} />}
                </div>

                <IntroText header={"Kaffee - Genuss und Wissenschaft"}>
                    Kaffee macht nicht nur wach sondern kann viel mehr. Es ist eine Wissenschaft ihn zuzbereiten, es
                    gibt hunderte, wenn nicht tausende von Arten, Varianten, Geschmäcker und alles an Nerdkram den man
                    sich vorstellen kann. Außerdem bedient er eine gewisse Sammelleidenschaft. Fast jede größere Stadt
                    bietet heute mehr als eine kleine Rösterei mit viel verschiedenen Sorten. Ein kleiner Überblick über
                    meine persönlichen Erfahrungen soll nun hier entstehen.
                </IntroText>

                <div className={"CoffeeContainer"}>
                    {!filteredPosts && (
                        <div className={"ReplImg"}>
                            <img src={CoffeeReplacement} alt="no content" />
                            <p>Error loading coffee data</p>
                        </div>
                    )}
                    {filteredPosts && filteredPosts.length === 0 ? (
                        <div className={"ReplImg"}>
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
            </AppWindow>

            <Switch>
                <Route path={`${basePath}/:firstParam/:secondParam?/:thirdParam?/:forthParam?`}>
                    <CoffeeDetailFrame />
                </Route>
            </Switch>
        </>
    );
};
