import axios from 'axios';
import React, { createContext, useEffect } from 'react';
import { useState, PropsWithChildren, useContext } from "react";
import { CoffeeEntry, AttrDataType } from '../components/FormComponents';
import { useJwt } from '../pages/User/LoginWindwo';
import { User } from '../pages/User';

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