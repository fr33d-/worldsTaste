import axios from 'axios';
import { baseURL, coffeeURL } from '../../data';
import { BrewingEntry,CoffeeEntry, User, AttrDataType } from '../../helpers/types';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { localCoffeeAttrData } from '../../helpers/attrData';

export const saveCoffeeBrewing = async (id: number, brewing: BrewingEntry): Promise<number> => {
    return await axios
        .post(`${baseURL}${coffeeURL}/${id}/brewings/`, brewing)
        .then((response) => {
            const location: string = response.headers['location'];
            const [newId] = location.split('/').slice(-1);
            throwDataSucess(`saved brewing with id ${newId}`);
            return Number(newId);
        })
        .catch((error) => {
            throwDataError('cant save brewing', error);
            return error;
        });
};

export const deleteCoffeeBrewing = async (id: number, brewing: BrewingEntry): Promise<number> => {
    return await axios
        .delete(`${baseURL}${coffeeURL}/${id}/brewings/${brewing.id}`)
        .then((response) => {
            throwDataSucess(`deleted brewing with id ${response}`);
            return Number(response);
        })
        .catch((error) => {
            throwDataError('cant delete brewing', error);
            return error;
        });
};

export const emptyCoffee = (user: User, stores: AttrDataType ): CoffeeEntry => {
    return {
        bitter: 0,
        brewings: [],
        buyDate: new Date(),
        dateAdded: new Date(),
        description: '',
        id: 0,
        kind: localCoffeeAttrData.kinds[0],
        name: 'new coffee',
        origin: localCoffeeAttrData.origins[0],
        ownDescription: '',
        owner: user,
        process: localCoffeeAttrData.processes[0],
        rating: 0,
        store: stores.items[0],
        sour: 0,
        species: localCoffeeAttrData.specieses[0],
        taste: 0,
        tasteKind: 0,
        woody: 0,
    };
};

export const newBrewing = (): BrewingEntry => {
    return {
        id: 0,
        bitter: 0,
        brewDate: new Date(),
        method: localCoffeeAttrData.brewMethods[0],
        ownDescription: '',
        rating: 0,
        sour: 0,
        strength: 0,
        taste: 0,
        tasteKind: 0,
        useforcalculation: false,
        woody: 0,
        waterAmount: 0,
        coffeeAmount: 0,
    };
};

export const getCoffeeBrewings = async (coffeeId: number): Promise<BrewingEntry[]> => {
    return await axios
        .get<BrewingEntry[]>(`${baseURL}${coffeeURL}/${coffeeId}/brewings`)
        .then((response) => {
            throwDataSucess('brewings loaded');
            return response.data;
        })
        .catch((error) => {
            throwDataError('cant load brewings', error);
            return error;
        });
};

export const deleteImageByURL = async (url: string, id: number): Promise<any> => {
    return await axios
        .delete(`${baseURL}${coffeeURL}/assets/${id}`, { data: { url: url } })
        .then((response) => {
            throwDataSucess('image deleted');
            return response;
        })
        .catch((error) => {
            throwDataError('cant delete image', error);
            return error;
        });
};

export const handleFileUpload = async (files: FileList, coffeeID: number): Promise<string> => {
    //für backend
    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append('images', file);
    });

    return await axios
        .post(`${baseURL}${coffeeURL}/assets/${coffeeID}`, formData)
        .then((response) => {
            let newImageString: string = response.headers.location;
            newImageString = newImageString.split('/').slice(-1)[0];
            newImageString = `/coffee/assets/${coffeeID}/${newImageString}`;

            throwDataSucess('image uploaded');
            return newImageString;
        })
        .catch((error) => {
            throwDataError('cant upload image', error);
            return error;
        });
};
