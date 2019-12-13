import axios from 'axios';
import { baseURL, userURL } from '../../data';
import { ExtendedUser } from './User';

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
