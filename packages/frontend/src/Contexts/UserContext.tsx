import React, { createContext, PropsWithChildren, useState } from 'react';
import { useHistory } from 'react-router';
import { FullUser } from '../helpers/types';
import { setUserFromSessionStorage, throwDataError, throwDataSucess } from '../pages/User/userHelperFunctions';
import { login } from '../windows/UserWindows/UserHelperFunctions';

type ContextType = {
    user: FullUser | undefined;
    basePath: string;
    contextLogout(): void;
    contextLogin(username: string, password: string): Promise<FullUser>;
};

export const UserContext = createContext<ContextType>(({} as unknown) as ContextType);

export const UserContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<FullUser | undefined>(setUserFromSessionStorage());

    const basePath = '/user';
    const history = useHistory();

    const contextLogin = async (username: string, password: string): Promise<FullUser> => {

        try {
            await login(username, password);
            const user = setUserFromSessionStorage();
            if (user) {
                throwDataSucess('Logged in');
                return user;
            } else {
                throw 'error, login not possible';
            }
        } catch(e) {
            throwDataError('not logged in', e);
            throw e;
        }
    };

    const contextLogout = () => {
        throwDataSucess('Logged out!');
        sessionStorage.removeItem('auth');
        setUser(undefined);
        history.push('/');
    };

    return (
        <UserContext.Provider
            value={{
                basePath,
                user,
                contextLogin,
                contextLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
