import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router';
import { CoffeeAttrData, CoffeeEntry, User } from '../helpers/types';
import { deleteCoffee, saveNewCoffee, updateCoffee } from '../pages/Coffee/CoffeeHelperFunctions';
import { useJwt } from '../windows/UserWindows/UserHelperFunctions';

type CoffeeContextType = {
    coffees: CoffeeEntry[];
    setCoffees: Dispatch<SetStateAction<CoffeeEntry[]>>;
    filteredPosts: CoffeeEntry[];
    setFilteredPosts: Dispatch<SetStateAction<CoffeeEntry[]>>;
    filterName: string | undefined;
    setFilterName: Dispatch<SetStateAction<string | undefined>>;
    filterAttr: string | undefined;
    setFilterAttr: React.Dispatch<React.SetStateAction<string | undefined>>;
    searchString: string | undefined;
    setSearchString: React.Dispatch<React.SetStateAction<string | undefined>>;
    postOrderBy: string | undefined;
    setPostOrderBy: React.Dispatch<React.SetStateAction<string | undefined>>;
    coffeeAttrData: CoffeeAttrData | undefined;
    setCoffeeAttrData: React.Dispatch<React.SetStateAction<CoffeeAttrData | undefined>>;
    user: User | undefined;
    basePath: string;
    contextSaveCoffee(coffee: CoffeeEntry): void;
    contextDeleteCoffee(id: number): void;
    openAttrWindow(): void;
    openBrewingWindow(id: number): void;
    closeAttrWindow(): void;
    goToCreateCoffee(): void;
    goToCoffees(): void;
    editCoffeeCard(id: number): void;
    viewCoffeeCard(id: number): void;
};

export const CoffeeContext = createContext<CoffeeContextType>(({} as unknown) as CoffeeContextType);

export const CoffeeContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [coffees, setCoffees] = useState<CoffeeEntry[]>([]);

    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [filterName, setFilterName] = useState<string>();
    const [filterAttr, setFilterAttr] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const [postOrderBy, setPostOrderBy] = useState<string>();

    const [coffeeAttrData, setCoffeeAttrData] = useState<CoffeeAttrData>();
    const [user] = useState<User | undefined>(useJwt());

    const basePath = '/coffee';

    const history = useHistory();

    const contextSaveCoffee = (coffee: CoffeeEntry) => {
        if (coffee.id === 0) {
            //Create new coffee
            saveNewCoffee(coffee).then((id) => {
                setCoffees((posts) => (!posts ? posts : [{ ...coffee, id: Number(id) }, ...posts]));
            });
        } else {
            // Save existing coffee
            updateCoffee(coffee).then((res) => {
                setCoffees((posts) => (!posts ? posts : posts.map((elm) => (elm.id === coffee.id ? coffee : elm))));
            });
        }
    };

    const contextDeleteCoffee = (id: number) => {
        deleteCoffee(id).then((res) => {
            setCoffees((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
        });
    };

    const openAttrWindow = () => {
        history.push('/coffee/attrDataWindow/');
    };

    const openBrewingWindow = (id: number) => {
        history.push(`/coffee/card/${id}?view=brewings`);
    };

    const closeAttrWindow = () => {
        history.push('/coffee/');
    };

    const goToCreateCoffee = () => {
        history.push('/coffee/card/?view=new');
    };

    const goToCoffees = () => {
        history.push(`/coffee/`);
    };

    const editCoffeeCard = (id: number) => {
        history.push(`/coffee/card/${id}?view=edit`);
    };

    const viewCoffeeCard = (id: number) => {
        history.push(`/coffee/card/${id}?view=view`);
    };

    return (
        <CoffeeContext.Provider
            value={{
                coffees,
                setCoffees,
                filterName,
                filteredPosts,
                setFilterName,
                setFilteredPosts,
                basePath,
                coffeeAttrData,
                filterAttr,
                postOrderBy,
                searchString,
                setCoffeeAttrData,
                setFilterAttr,
                setPostOrderBy,
                setSearchString,
                user,
                closeAttrWindow,
                contextDeleteCoffee,
                contextSaveCoffee,
                goToCreateCoffee,
                openAttrWindow,
                openBrewingWindow,
                editCoffeeCard,
                goToCoffees,
                viewCoffeeCard
            }}
        >
            {children}
        </CoffeeContext.Provider>
    );
};

// export const SomewhereDeepInWhimsyshire = () => {
// 	const {someFunction, someVariable} = useContext(CoffeeContext);

// 	return <button onClick={() => someFunction('foo')}>{someVariable}</button>;
// };

// const App = () => {
// 	return (
// 		<CoffeeContextProvider>
// 			<h1>Awesome App</h1>
// 		</CoffeeContextProvider>
// 	);
// };
