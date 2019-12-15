import { Position, Toaster } from '@blueprintjs/core';
import axios from 'axios';
import { baseURL, userURL } from '../../data';
import { ExtendedUser, FullUser, User } from './User';

export const createUser = async (newUser: ExtendedUser): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');

    await axios
        .post(`${baseURL}${userURL}/`, { ...newUser }, { headers: { auth: jwtObj } })
        .then((response) => {
            console.log('user created');
            return response;
            // console.log(response);
        })
        .catch((error) => {
            console.log('cant create user, sorry');
            throw new Error(error);
            // console.log(error);
        });
};

export const getUserList = async (): Promise<FullUser[]> => {
    const jwtObj = sessionStorage.getItem('auth');

    await axios
        .get<FullUser[]>(`${baseURL}${userURL}/`, { headers: { auth: jwtObj } })
        .then((response) => {
            // console.log('Got user list');
            return response.data;
        })
        .catch((error) => {
            // console.log(error);
            return error;
        });

    // Todo: warum brauch ich das und geht das überhaupt?
    return [];
};

export const changeUser = async (user: User): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');
    axios
        .patch(`${baseURL}${userURL}/${user.id}`, user, { headers: { auth: jwtObj } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

export const newExtendedUser: ExtendedUser = {
    id: 0,
    name: 'New User',
    role: 'ADMIN',
    username: 'newUser',
    password: 'test',
    email: 'test@test.de',
    image: '',
}

export const throwDataSucess = (message: string) => {
    console.log('success', message);
    Toaster.create({
        position: Position.TOP_RIGHT,
    }).show({ message: message, intent: 'success' });
};

export const throwDataError = (message: string, error?: any) => {
    console.log('error', message, error);
    Toaster.create({
        position: Position.TOP_RIGHT,
    }).show({ message: message, intent: 'danger' });
};
