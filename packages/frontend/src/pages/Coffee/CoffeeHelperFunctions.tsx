import axios from "axios";
import { CoffeeEntity } from "backend/src/models/entities/CoffeeEntity";
import { baseURL, coffeeStoresURL, coffeeURL } from "../../data";
import { AttrDataItemType, CoffeeEntry, FilterMenuType, User, AttrDataType } from "../../helpers/types";
import { throwDataError, throwDataSucess } from "../User/userHelperFunctions";
import { localCoffeeAttrData } from "../../helpers/attrData";

export const getFilterMenu = (): FilterMenuType[] => {
    return [
        {
            name: "Arten",
            items: localCoffeeAttrData.kinds.map((item) => item),
        },
        {
            name: "Herkunft",
            items: localCoffeeAttrData.origins.map((item) => item),
        },
        //   {
        //       name: 'Röstereien',
        //       items: localCoffeeAttrData.roasteds.map((item) => item.name),
        //   },
        {
            name: "Bewertung",
            items: ["1", "2", "3", "4", "5"],
        },
    ];
};

export const createCoffee = (store: AttrDataItemType, user: User) => {
    const newPost: CoffeeEntry = {
        id: 0,
        imageFiles: [],
        name: "Neue Karte",
        description: "",
        origin: localCoffeeAttrData.origins[0],
        rating: 0,
        kind: localCoffeeAttrData.kinds[0],
        store: store,
        bitter: 0,
        ownDescription: "",
        sour: 0,
        taste: 0,
        tasteKind: 0,
        woody: 0,
        buyDate: new Date(),
        dateAdded: new Date(),
        process: localCoffeeAttrData.processes[0],
        species: localCoffeeAttrData.specieses[0],
        owner: user,
        brewings: [],
    };

    return newPost;
};

export const deleteCoffee = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${baseURL}${coffeeURL}/${id}`);
        throwDataSucess("coffee deleted");
    } catch (e) {
        throwDataError("cant delete coffee", e);
        throw e;
    }
};

export const saveNewCoffee = async (coffee: CoffeeEntry): Promise<number> => {
    const jwtObj = sessionStorage.getItem("auth");

    try {
        const response = await axios.post(`${baseURL}${coffeeURL}`, { ...coffee }, { headers: { auth: jwtObj } });
        const location: string = response.headers["location"];
        const [id] = location.split("/").slice(-1);
        throwDataSucess("new coffee saved");
        return Number(id);
    } catch (e) {
        throwDataError("sorry, cant create new coffe", e);
        throw e;
    }
};

export const updateCoffee = async (coffee: CoffeeEntry): Promise<number> => {
    const jwtObj = sessionStorage.getItem("auth");

    try {
        const res = await axios.put(
            `${baseURL}${coffeeURL}/${coffee.id}`,
            { ...coffee },
            { headers: { auth: jwtObj } }
        );
        throwDataSucess("coffee updated!");
        return res.headers["location"];
    } catch (e) {
        throwDataError("sorry, cant update coffee", e);
        throw e;
    }
};

export const getCoffees = async (): Promise<CoffeeEntry[]> => {
    try {
        const res = await axios.get<CoffeeEntry[]>(`${baseURL}${coffeeURL}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const getCoffeStores = async (): Promise<AttrDataItemType[]> => {
    try {
        const res = await axios.get<AttrDataItemType[]>(`${baseURL}${coffeeStoresURL}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
