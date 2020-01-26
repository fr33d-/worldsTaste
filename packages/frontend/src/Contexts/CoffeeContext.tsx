import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router';
import { CoffeeAttrData, CoffeeEntry, User, FullUser } from '../helpers/types';
import { deleteCoffee, saveNewCoffee, updateCoffee, getCoffeAttrData } from '../pages/Coffee/CoffeeHelperFunctions';
import { setUserFromSessionStorage, throwDataSucess, throwDataError } from '../pages/User/userHelperFunctions';

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
    user: FullUser | undefined;
    basePath: string;
    logout(): void;
    contextSaveCoffee(coffee: CoffeeEntry): Promise<void>;
    contextDeleteCoffee(id: number): Promise<void>;
    openAttrWindow(): void;
    // openBrewingWindow(id: number): void;
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

    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [filterName, setFilterName] = useState<string>();
    const [filterAttr, setFilterAttr] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const [postOrderBy, setPostOrderBy] = useState<string>();

    const [coffeeAttrData, setCoffeeAttrData] = useState<CoffeeAttrData>();
    const [user, setUser] = useState<FullUser | undefined>(setUserFromSessionStorage());

    const basePath = '/coffee';

    const history = useHistory();

    const contextSaveCoffee = async (coffee: CoffeeEntry) => {
        if (coffee.id === 0) {
            //Create new coffee
            return await saveNewCoffee(coffee).then((id) => {
                setCoffees((posts) => (!posts ? posts : [{ ...coffee, id: Number(id) }, ...posts]));
            });
        } else {
            // Save existing coffee
            return await updateCoffee(coffee).then((res) => {
                setCoffees((posts) => (!posts ? posts : posts.map((elm) => (elm.id === coffee.id ? coffee : elm))));
            });
        }
    };

    const contextDeleteCoffee = async (id: number) => {
        return await deleteCoffee(id).then((res) => {
            setCoffees((posts) => (!posts ? posts : posts.filter((elm) => elm.id !== id)));
        });
    };

    const logout = () => {
        throwDataSucess('Logged out!')
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
                // openBrewingWindow,
                editCoffeeCard,
                goToCoffees,
                viewCoffeeCard,
                logout,
                getFilterCoffeeList
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
