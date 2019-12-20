import axios from 'axios';
import { baseURL, coffeeURL } from '../../data';
import { BrewingEntry, AttrDataItemType } from '../../helpers/types';

export const saveCoffeeBrewing = async (id: number, brewing: BrewingEntry): Promise<number> => {
    return await axios
        .post(`${baseURL}${coffeeURL}/${id}/brewings/`, brewing)
        .then((response) => {
            const location: string = response.headers['location'];
            const [newId] = location.split('/').slice(-1);

            return Number(newId);
        })
        .catch((error) => {
            return error;
        });
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
            console.log('Got brewings');
            let loadedBrewings = response.data;
            // loadedBrewings = loadedBrewings.map((brewing) => {
            //     brewing.brewDate = new Date(brewing.brewDate);
            //     return brewing;
            // });
            return loadedBrewings;
        })
        .catch((error) => {
            return error;
        });
};
