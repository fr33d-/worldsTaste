import React, { createContext, PropsWithChildren, useState } from 'react';
import { CoffeeEntry } from '../helpers/types';

type CoffeeContextType = {
	posts: CoffeeEntry[];
};

const CoffeeContext = createContext<CoffeeContextType>(({} as unknown) as CoffeeContextType);

export const CoffeeContextProvider = ({children}: PropsWithChildren<{}>) => {
	const [posts, setPosts] = useState<CoffeeEntry[]>([]);


	return <CoffeeContext.Provider value={{posts}}>{children}</CoffeeContext.Provider>;
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
