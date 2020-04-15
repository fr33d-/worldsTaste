import axios from 'axios';
import { baseURL, coffeeURL } from '../../data';
import { BrewingEntry,CoffeeEntry, User, AttrDataType, AttrDataItemType } from '../../helpers/types';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { localCoffeeAttrData } from '../../helpers/attrData';

export const saveCoffeeBrewing = async (id: number, brewing: BrewingEntry): Promise<number> => {

    try {
        const res = await axios.post(`${baseURL}${coffeeURL}/${id}/brewings/`, brewing);
        const location: string = res.headers['location'];
        const [newId] = location.split('/').slice(-1);
        throwDataSucess(`Saved brewing with id ${newId}`);
        return Number(newId);
    } catch(e) {
        throwDataError('Cant save brewing', e);
        throw e;
    };
};

export const deleteCoffeeBrewing = async (id: number, brewing: BrewingEntry): Promise<number> => {

    try {
        const res = await axios.delete(`${baseURL}${coffeeURL}/${id}/brewings/${brewing.id}`)
        throwDataSucess(`deleted brewing with id ${res}`);
        return Number(res);
    } catch(e) {
        throwDataError('cant delete brewing', e);
        throw e;
    };
};

export const emptyCoffee = (user: User, stores: AttrDataItemType[] ): CoffeeEntry => {
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
        store: stores[0],
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

    try {
        const res = await axios.get<BrewingEntry[]>(`${baseURL}${coffeeURL}/${coffeeId}/brewings`);
        throwDataSucess('brewings loaded');
        return res.data;
    } catch(e) {
        throwDataError('cant load brewings', e);
        throw e;
    };
};

export const deleteImageByURL = async (url: string, id: number): Promise<any> => {

    try {
        const res = await axios.delete(`${baseURL}${coffeeURL}/assets/${id}`, { data: { url: url } });
        throwDataSucess('image deleted');
        return res;
    } catch(e) {
        throwDataError('cant delete image', e);
        throw e;
    };
};

export const handleFileUpload = async (files: FileList, coffeeID: number): Promise<string> => {
    //für backend
    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append('images', file);
    });

    try {
        const res = await axios.post(`${baseURL}${coffeeURL}/assets/${coffeeID}`, formData);
        let newImageString: string = res.headers.location;
        newImageString = newImageString.split('/').slice(-1)[0];
        newImageString = `/coffee/assets/${coffeeID}/${newImageString}`;

        throwDataSucess('Image uploaded');
        return newImageString;
    } catch(e) {
        throwDataError('Cant upload image', e);
        throw e;
    };
};
