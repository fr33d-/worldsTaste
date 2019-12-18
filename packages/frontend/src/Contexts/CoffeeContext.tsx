import React, { createContext, PropsWithChildren, useState, SetStateAction, Dispatch } from 'react';
import { CoffeeEntry, CoffeeAttrData, User } from '../helpers/types';
import { useJwt } from '../windows/UserWindows/UserHelperFunctions';

type CoffeeContextType = {
    posts: CoffeeEntry[];
    setPosts: Dispatch<SetStateAction<CoffeeEntry[]>>;
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
};

export const CoffeeContext = createContext<CoffeeContextType>(({} as unknown) as CoffeeContextType);

export const CoffeeContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [posts, setPosts] = useState<CoffeeEntry[]>([]);

    const [filteredPosts, setFilteredPosts] = useState<CoffeeEntry[]>([]);
    const [filterName, setFilterName] = useState<string>();
    const [filterAttr, setFilterAttr] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const [postOrderBy, setPostOrderBy] = useState<string>();

    const [coffeeAttrData, setCoffeeAttrData] = useState<CoffeeAttrData>();
    const [user] = useState<User | undefined>(useJwt());

    const basePath = '/coffee';

    return (
        <CoffeeContext.Provider
            value={{
                posts,
                setPosts,
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
