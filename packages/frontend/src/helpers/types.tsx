export type User = {
    id: number;
    name: string;
    username: string;
    role: string;
};

export type FullUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    image: string;
    created: string;
    role: string;
};

export type ExtendedUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    image: string;
    role: string;
    password: string;
};

export type AttrDataItemType = {
    id: number;
    name: string;
};

export type AttrDataType = {
    id: number;
    name: string;
    urlSubstring: string;
    description: string;
    items: AttrDataItemType[];
};

// export type CoffeStoresDataType = {
//     id: number;
//     name: string;
//     description: string;
//     items: AttrDataItemType[];
// };

export type LocalCoffeeAttrData = {
    brewMethods: string[];
    kinds: string[];
    origins: string[];
    processes: string[];
    specieses: string[];
};

export type Image = {
    name: string;
    url?: string;
    alt?: string;
    file?: File;
};

export type BrewingEntry = {
    id: number;
    bitter: number;
    brewDate: Date;
    ownDescription: string;
    taste: number;
    tasteKind: number; // Schokolade/Frucht
    useforcalculation: boolean;
    rating: number;
    strength: number;
    sour: number;
    woody: number; //Holzig, Mehlig, Erbsig
    method: string;
    waterAmount: number;
    coffeeAmount: number;
};

export type CoffeeEntry = {
    id: number;
    imageFiles?: Image[];
    imageStrings?: string[];
    name: string;
    description: string;
    origin: string;
    rating: number;
    kind: string; //Filterkaffee, Espresso
    taste: number; //Geschmacksintensivität
    tasteKind: number; // Schokolade/Frucht
    woody: number; //Holzig, Mehlig, Erbsig
    bitter: number;
    sour: number;
    ownDescription: string;
    dateAdded: Date;
    process: string;
    buyDate: Date;
    species: string; //Arabica, Robusta
    brewings: BrewingEntry[];
    owner: User;
    store: AttrDataItemType;
};

export type FilterMenuType = {
    name: string;
    items: string[];
};
