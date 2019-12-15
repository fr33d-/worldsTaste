import axios from 'axios';
import { baseURL } from '../../data';

export const addNewItem = async (urlSubstring: string, newItemName: string): Promise<number> => {
    await axios
        .post(`${baseURL}/${urlSubstring}`, { id: 0, name: newItemName })
        .then((response) => {
            console.log(response);
            const header = response.headers['location'];
            const id = Number(header.split('/').pop());
            return id;
        })
        .catch((error) => {
            return error;
        });

    // Todo: why do we need this?
    return 0;
};

export const deleteItem = async (urlSubstring: string, id: number): Promise<void> => {
    await axios
        .delete(`${baseURL}/${urlSubstring}/${id}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};
