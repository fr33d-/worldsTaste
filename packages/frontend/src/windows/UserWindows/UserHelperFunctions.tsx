import axios from 'axios';
import { authURL, baseURL } from '../../data';
import { throwDataSucess, throwDataError } from '../../pages/User/userHelperFunctions';

export const login = async (username: string, password: string): Promise<string> => {
    try {
        const res = await axios.post<string>(`${baseURL}${authURL}/login`, { username, password });
        sessionStorage.setItem('auth', res.data);
        throwDataSucess('Logged in')
        return res.data;
    } catch(e) {
        throwDataError('Cant login', e);
        throw e;
    };
};
