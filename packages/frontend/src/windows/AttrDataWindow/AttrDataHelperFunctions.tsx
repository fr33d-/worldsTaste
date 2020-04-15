import axios from 'axios';
import { baseURL } from '../../data';
import { throwDataError } from '../../pages/User/userHelperFunctions';

export const addNewItem = async (urlSubstring: string, newItemName: string): Promise<number> => {
    try {
        const res = await axios.post(`${baseURL}/${urlSubstring}`, { id: 0, name: newItemName });
        const header = res.headers['location'];
        const id = Number(header.split('/').pop());
        return id;
    } catch(e) {
        throwDataError('Cant create item', e);
        throw e;
    }
};

export const deleteItem = async (urlSubstring: string, id: number): Promise<void> => {
    try {
        await axios.delete(`${baseURL}/${urlSubstring}/${id}`);
    } catch(e) {
        throwDataError('Cant delete item', e);
        throw e;
    }
};
