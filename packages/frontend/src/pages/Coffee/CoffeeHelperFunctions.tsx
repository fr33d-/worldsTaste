import axios from 'axios';

import { AttrDataItemType, User, CoffeeEntry, CoffeeAttrData, AttrDataType, FilterMenuType } from '../../helpers/types';
import { coffeeURL, baseURL, coffeeAttrURL } from '../../data';
import { CoffeeEntity } from 'backend/src/models/entities/CoffeeEntity';
import { throwDataSucess, throwDataError } from '../User/userHelperFunctions';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { useContext } from 'react';

export const getFilterMenu = (coffeeAttrData?: CoffeeAttrData): FilterMenuType[] => {

    return coffeeAttrData
    ? [
          {
              name: 'Arten',
              items: coffeeAttrData.kinds.map((item) => item.name),
          },
          {
              name: 'Herkunft',
              items: coffeeAttrData.origins.map((item) => item.name),
          },
          {
              name: 'Röstereien',
              items: coffeeAttrData.roasteds.map((item) => item.name),
          },
          {
              name: 'Bewertung',
              items: ['1', '2', '3', '4', '5'],
          },
      ]
    : [];
}

export const createCoffee = (
    coffeeOrigin: AttrDataItemType,
    coffeeKind: AttrDataItemType,
    coffeeRoated: AttrDataItemType,
    coffeeProcess: AttrDataItemType,
    coffeeSpecies: AttrDataItemType,
    user: User
) => {
    const newPost: CoffeeEntry = {
        id: 0,
        imageFiles: [],
        imageStrings: [],
        name: 'Neue Karte',
        description: '',
        origin: coffeeOrigin,
        rating: 0,
        kind: coffeeKind,
        roasted: coffeeRoated,
        bitter: 0,
        ownDescription: '',
        sour: 0,
        taste: 0,
        tasteKind: 0,
        woody: 0,
        buyDate: new Date(),
        dateAdded: new Date(),
        process: coffeeProcess,
        species: coffeeSpecies,
        owner: user,
        brewings: [],
    };

    return newPost;
};

export const deleteCoffee = async (id: number): Promise<void> => {
    return await axios
        .delete(`${baseURL}${coffeeURL}/${id}`)
        .then((response) => {
            throwDataSucess('coffee deleted');
            return response;
        })
        .catch((error) => {
            throwDataError('cant delete coffee', error);
            return error;
        });
};

export const saveNewCoffee = async (coffee: CoffeeEntry): Promise<{id: number}> => {
    const jwtObj = sessionStorage.getItem('auth');
    return await axios
        .post(`${baseURL}${coffeeURL}`, { ...coffee }, { headers: { auth: jwtObj } })
        .then((response) => {
            const location: string = response.headers['location'];
            const [id] = location.split('/').slice(-1);
            throwDataSucess('new coffee saved');
            return id;
        })
        .catch((error) => {
            throwDataError('sorry, cant create new coffe', error);
            return error;
        });
};

export const updateCoffee = async (coffee: CoffeeEntry): Promise<void> => {
    const jwtObj = sessionStorage.getItem('auth');
    await axios
        .put(`${baseURL}${coffeeURL}/${coffee.id}`, { ...coffee }, { headers: { auth: jwtObj } })
        .then((res) => {
            throwDataSucess('coffee updated!');
            return res.headers['location'];
        })
        .catch((error) => {
            throwDataError('sorry, cant update coffee', error);
            return error;
        });
};


export const getCoffees = async (): Promise<CoffeeEntity[]> => {
    return await axios
        .get<CoffeeEntity[]>(`${baseURL}${coffeeURL}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error;
        });
};

export const getCoffeAttrData = async (): Promise<CoffeeAttrData> => {
    const kindsPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/kinds`);
    const originsPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/origins`);
    const roastedsPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/roasteds`);
    const processedPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/processes`);
    const speciesPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/species`);
    const brewMethodPromise = axios.get<AttrDataType[]>(`${baseURL}${coffeeAttrURL}/method`);

    return await axios
        .all([kindsPromise, originsPromise, roastedsPromise, processedPromise, speciesPromise, brewMethodPromise])
        .then((res) => {
            return {
                kinds: res[0].data,
                origins: res[1].data,
                processes: res[2].data,
                roasteds: res[3].data,
                specieses: res[4].data,
                brewMethods: res[5].data,
            };
        })
        .catch((error) => {
            return error;
        });
};


