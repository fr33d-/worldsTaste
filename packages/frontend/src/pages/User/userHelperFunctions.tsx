import { Position, Toaster } from '@blueprintjs/core';
import axios from 'axios';
import { baseURL, userURL } from '../../data';
import { ExtendedUser, FullUser, User } from '../../helpers/types';

export const createUser = async (newUser: ExtendedUser): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');

    return await axios
        .post(`${baseURL}${userURL}/`, { ...newUser }, { headers: { auth: jwtObj } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

export const getUserList = async (): Promise<FullUser[]> => {
    const jwtObj = sessionStorage.getItem('auth');

    return await axios
        .get<FullUser[]>(`${baseURL}${userURL}/`, { headers: { auth: jwtObj } })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
};

export const changeUser = async (user: User): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');
    return await axios
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
};

export const AppToaster = Toaster.create({
    className: "coffee-toaster",
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
