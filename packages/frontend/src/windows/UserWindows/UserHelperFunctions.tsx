import axios from 'axios';
import { authURL, baseURL } from '../../data';

export const login = async (username: string, password: string): Promise<void> => {
    return await axios
        .post<string>(`${baseURL}${authURL}/login`, { username, password })
        .then((response) => {
            sessionStorage.setItem('auth', response.data);
            return response;
        })
        .catch((error) => {
            return error;
        });
};
