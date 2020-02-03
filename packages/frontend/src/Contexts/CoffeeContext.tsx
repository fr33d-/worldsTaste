import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router';
import { localCoffeeAttrData } from '../helpers/attrData';
import { CoffeeEntry, FullUser, LocalCoffeeAttrData, AttrDataType, AttrDataItemType } from '../helpers/types';
import { deleteCoffee, saveNewCoffee, updateCoffee } from '../pages/Coffee/CoffeeHelperFunctions';
import { setUserFromSessionStorage, throwDataSucess } from '../pages/User/userHelperFunctions';

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
    setCoffeeStores: Dispatch<SetStateAction<AttrDataItemType[] | undefined>>;
    user: FullUser | undefined;
    basePath: string;
    logout(): void;
    contextSaveCoffee(coffee: CoffeeEntry): Promise<number>;
    contextDeleteCoffee(id: number): Promise<void>;
    openAttrWindow(): void;
    closeAttrWindow(): void;
    goToCreateCoffee(): void;
    goToCoffees(): void;
    editCoffeeCard(id: number): void;
    viewCoffeeCard(id: number): void;
    getFilterCoffeeList(): void;
};

export const CoffeeContext = createContext<CoffeeContextType>(({} as unknown) as CoffeeContextType);

export const CoffeeContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [coffees, setCoffees] = useState<CoffeeEntry[]>([]);
    const [coffeeStores, setCoffeeStores] = useState<AttrDataItemType[]>();

    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [filterName, setFilterName] = useState<string>();
    const [filterAttr, setFilterAttr] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const [postOrderBy, setPostOrderBy] = useState<string>();

    const [coffeeAttrData, _] = useState<LocalCoffeeAttrData>(localCoffeeAttrData);
    const [user, setUser] = useState<FullUser | undefined>(setUserFromSessionStorage());

    const basePath = '/coffee';

    const history = useHistory();

    const contextSaveCoffee = async (coffee: CoffeeEntry): Promise<number> => {
        if (coffee.id === 0) {
            //Create new coffee
            return await saveNewCoffee(coffee)
                .then((id) => {
                    setCoffees((posts) => (!posts ? posts : [{ ...coffee, id: Number(id) }, ...posts]));
                    return Number(id);
                })
                .catch((e) => {
                    console.log('error saving', e);
                    return e;
                });
        } else {
            // Save existing coffee
            return await updateCoffee(coffee)
                .then((res) => {
                    setCoffees((posts) => (!posts ? posts : posts.map((elm) => (elm.id === coffee.id ? coffee : elm))));
                    return coffee.id;
                })
                .catch((e) => {
                    console.log('error saving', e);
                    return e;
                });
        }
    };

    const contextDeleteCoffee = async (id: number) => {
        return await deleteCoffee(id).then((res) => {
            setCoffees((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
        });
    };

    const logout = () => {
        throwDataSucess('Logged out!');
        sessionStorage.removeItem('auth');
        setUser(undefined);
    };

    const openAttrWindow = () => {
        history.push('/coffee/attrDataWindow/');
    };

    // const openBrewingWindow = (id: number) => {
    //     history.push(`/coffee/card/${id}?view=brewings`);
    // };

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

    const getFilterCoffeeList = () => {
        let newPosts: CoffeeEntry[] = [];

        switch (filterName) {
            case 'Arten':
                newPosts = coffees.filter((post) => {
                    return post.kind === filterAttr;
                });
                break;
            case 'Herkunft':
                newPosts = coffees.filter((post) => {
                    return post.origin === filterAttr;
                });
                break;
            case 'Röstereien':
                newPosts = coffees.filter((post) => {
                    return post.store.name === filterAttr;
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
                user,
                closeAttrWindow,
                contextDeleteCoffee,
                contextSaveCoffee,
                goToCreateCoffee,
                openAttrWindow,
                editCoffeeCard,
                goToCoffees,
                viewCoffeeCard,
                logout,
                getFilterCoffeeList,
                coffeeStores,
                setCoffeeStores,
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
