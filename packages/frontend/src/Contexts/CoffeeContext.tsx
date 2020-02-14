import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router';
import { localCoffeeAttrData } from '../helpers/attrData';
import { AttrDataItemType, CoffeeEntry, LocalCoffeeAttrData } from '../helpers/types';
import {
    deleteCoffee,
    getCoffees,
    getCoffeStores,
    saveNewCoffee,
    updateCoffee,
} from '../pages/Coffee/CoffeeHelperFunctions';
import { throwDataError, throwDataSucess } from '../pages/User/userHelperFunctions';

type CoffeeContextType = {
    coffees: CoffeeEntry[];
    setCoffees: Dispatch<SetStateAction<CoffeeEntry[]>>;
    filteredPosts: CoffeeEntry[];
    setFilteredPosts: Dispatch<SetStateAction<CoffeeEntry[]>>;
    filterName: string | undefined;
    setFilterName: Dispatch<SetStateAction<string | undefined>>;
    filterAttr: string | undefined;
    setFilterAttr: Dispatch<SetStateAction<string | undefined>>;
    searchString: string | undefined;
    setSearchString: Dispatch<SetStateAction<string | undefined>>;
    postOrderBy: string | undefined;
    setPostOrderBy: Dispatch<SetStateAction<string | undefined>>;
    coffeeAttrData: LocalCoffeeAttrData;
    coffeeStores: AttrDataItemType[] | undefined;
    setCoffeeStores: Dispatch<SetStateAction<AttrDataItemType[]>>;
    basePath: string;
    editState: boolean;
    setEditState: Dispatch<SetStateAction<boolean>>;
    contextSaveCoffee(coffee: CoffeeEntry): Promise<number>;
    contextDeleteCoffee(id: number): Promise<void>;
    openAttrWindow(): void;
    closeAttrWindow(): void;
    goToCreateCoffee(): void;
    goToCoffees(): void;
    editCoffeeCard(id: number): void;
    viewCoffeeCard(id: number): void;
    getFilterCoffeeList(): void;
    contextInitiateCoffeeStores(): Promise<void>;
    contextInitiateCoffees(): Promise<void>;
};

export const CoffeeContext = createContext<CoffeeContextType>(({} as unknown) as CoffeeContextType);

export const CoffeeContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [coffees, setCoffees] = useState<CoffeeEntry[]>([]);
    const [coffeeStores, setCoffeeStores] = useState<AttrDataItemType[]>([]);

    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [filterName, setFilterName] = useState<string>();
    const [filterAttr, setFilterAttr] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const [postOrderBy, setPostOrderBy] = useState<string>();
    const [editState, setEditState] = useState(false);

    const [coffeeAttrData, _] = useState<LocalCoffeeAttrData>(localCoffeeAttrData);

    const basePath = '/coffee';
    const history = useHistory();

    const contextInitiateCoffeeStores = async () => {
        try {
            const coffeeStores = await getCoffeStores();
            setCoffeeStores(coffeeStores.concat({ id: 999, name: 'undefined' }));
            throwDataSucess('got coffee stores');
        } catch (e) {
            throwDataError('cant get data from data', e);
        }
    };

    const contextInitiateCoffees = async () => {
        try {
            const coffees = await getCoffees();
            throwDataSucess('got coffees');
            setCoffees(coffees);
        } catch (e) {
            throwDataError('cant get coffees', e);
            throw e;
        }
    };

    const contextSaveCoffee = async (coffee: CoffeeEntry): Promise<number> => {
        if (coffee.id === 0) {
            //Create new coffee
            try {
                const id = await saveNewCoffee(coffee);
                setCoffees((posts) => (!posts ? posts : [{ ...coffee, id: Number(id) }, ...posts]));
                return Number(id);
            } catch (e) {
                throwDataError('Cant create coffee', e);
                throw e;
            }
        } else {
            // Save existing coffee
            try {
                await updateCoffee(coffee);
                setCoffees((posts) => (!posts ? posts : posts.map((elm) => (elm.id === coffee.id ? coffee : elm))));
                return coffee.id;
            } catch (e) {
                throwDataError('Cant save coffee', e);
                throw e;
            }
        }
    };

    const contextDeleteCoffee = async (id: number) => {
        try {
            await deleteCoffee(id);
            throwDataSucess(`Coffee wiht id: ${id} deleted`);
        } catch (e) {
            throwDataError('Cant delete coffee', e);
            throw e;
        }
    };

    const openAttrWindow = () => {
        history.push('/coffee/attrDataWindow/');
    };

    const closeAttrWindow = () => {
        history.push('/coffee/');
    };

    const goToCreateCoffee = () => {
        history.push('/coffee/card/new');
    };

    const goToCoffees = () => {
        history.push(`/coffee/`);
    };

    const editCoffeeCard = (id: number) => {
        history.push(`/coffee/card/${id}/edit`);
    };

    const viewCoffeeCard = (id: number) => {
        history.push(`/coffee/card/${id}`);
    };

    const getFilterCoffeeList = () => {
        let newPosts: CoffeeEntry[] | undefined = [];

        switch (filterName) {
            case 'Arten':
                newPosts =
                    coffees &&
                    coffees.filter((post) => {
                        return post.kind === filterAttr;
                    });
                break;
            case 'Herkunft':
                newPosts =
                    coffees &&
                    coffees.filter((post) => {
                        return post.origin === filterAttr;
                    });
                break;
            case 'Röstereien':
                newPosts =
                    coffees &&
                    coffees.filter((post) => {
                        return post.store.name === filterAttr;
                    });
                break;
            case 'Bewertung':
                newPosts =
                    coffees &&
                    coffees.filter((post) => {
                        return String(post.rating) === filterAttr;
                    });
                break;
            default:
                newPosts = coffees;
                break;
        }

        if (searchString) {
            newPosts = newPosts ? newPosts.filter((post) => post.name.includes(searchString)) : [];
        }

        if (postOrderBy && newPosts) {
            switch (filterName) {
                case 'Arten':
                    newPosts = newPosts.sort((a, b) => a.kind.localeCompare(b.kind));
                    break;
                case 'Herkunft':
                    newPosts = newPosts.sort((a, b) => a.origin.localeCompare(b.origin));
                    break;
                case 'Röstereien':
                    newPosts = newPosts.sort((a, b) => a.store.name.localeCompare(b.store.name));
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
                setFilterAttr,
                setPostOrderBy,
                setSearchString,
                closeAttrWindow,
                contextDeleteCoffee,
                contextSaveCoffee,
                goToCreateCoffee,
                openAttrWindow,
                editCoffeeCard,
                goToCoffees,
                viewCoffeeCard,
                getFilterCoffeeList,
                coffeeStores,
                setCoffeeStores,
                contextInitiateCoffeeStores,
                contextInitiateCoffees,
                editState,
                setEditState,
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
