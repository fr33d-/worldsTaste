import { Position, Toaster } from '@blueprintjs/core';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { baseURL, userURL } from '../../data';
import { ExtendedUser, FullUser, User } from '../../helpers/types';

export const createUser = async (newUser: ExtendedUser): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');

    try {
        const res = await axios.post(`${baseURL}${userURL}/`, { ...newUser }, { headers: { auth: jwtObj } });
        throwDataSucess(`User created under: ${res.headers} `)
    } catch(e) {
        throwDataError('Cant create user', e);
        throw e;
    }
};

export const getUserList = async (): Promise<FullUser[]> => {
    const jwtObj = sessionStorage.getItem('auth');

    try {
        const res = await axios.get<FullUser[]>(`${baseURL}${userURL}/`, { headers: { auth: jwtObj } })
        throwDataSucess('Got user list');
        return res.data;
    } catch(e) {
        throwDataError('Cant get user list', e)
        throw e;
    }
};

export const changeUser = async (user: User): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');

    try {
        const res = await axios.patch(`${baseURL}${userURL}/${user.id}`, user, { headers: { auth: jwtObj } });
        throwDataSucess('User edited');
    } catch(e) {
        throwDataError('Cant edit user', e);
        throw e;
    }
};

export const newExtendedUser: ExtendedUser = {
    id: 0,
    name: 'New User',
    role: 'ADMIN',
    username: 'newUser',
    password: 'test',
    email: 'test@test.de',
    image: '',
};

export const AppToaster = Toaster.create({
    className: 'coffee-toaster',
    position: Position.TOP_RIGHT,
});

export const throwDataSucess = (message: string) => {
    console.log('success', message);
    AppToaster.show({ message: message, intent: 'success' });
};

export const throwDataError = (message: string, error?: any) => {
    console.log('error', message, error);
    AppToaster.show({ message: message, intent: 'danger' });
};

export const setUserFromSessionStorage = (): FullUser | undefined=> {
    const jwtObj = sessionStorage.getItem('auth');

    if (jwtObj == null) {
        // throwDataError('cant set user from session strorage, your not logged in ');
        return undefined;
    } else {
        let data = jwt.decode(jwtObj);

        if (data != null && typeof data !== 'string') {
            const user: FullUser = {
                id: data['userId'],
                username: data['username'],
                name: data['name'],
                email: data['email'],
                image: 'avatar_frederic.png',
                created: 'sice 07.08.1989',
                role: data['role'],
            };
            return user;
        }
    }
};
