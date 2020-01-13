import axios from 'axios';
import { baseURL, coffeeURL } from '../../data';
import { BrewingEntry, AttrDataItemType, CoffeeEntry, CoffeeAttrData, User } from '../../helpers/types';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';

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

export const emptyCoffee = (coffeeAttrData: CoffeeAttrData, user: User): CoffeeEntry => {
    return {
    bitter: 0,
    brewings: [],
    buyDate: new Date(),
    dateAdded: new Date(),
    description: '',
    id: 0,
    kind: coffeeAttrData.kinds[0],
    name: 'new coffee',
    origin: coffeeAttrData.origins[0],
    ownDescription: '',
    owner: user,
    process: coffeeAttrData.processes[0],
    rating: 0,
    roasted: coffeeAttrData.roasteds[0],
    sour: 0,
    species: coffeeAttrData.specieses[0],
    taste: 0,
    tasteKind: 0,
    woody: 0
    }
};

export const newBrewing = (brewingMethod: AttrDataItemType): BrewingEntry => {
    return {
        id: 0,
        bitter: 0,
        brewDate: new Date(),
        method: brewingMethod,
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
    }
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
