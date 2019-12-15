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

export type CoffeeAttrData = {
    kinds: AttrDataType[];
    origins: AttrDataType[];
    roasteds: AttrDataType[];
    processes: AttrDataType[];
    specieses: AttrDataType[];
    brewMethods: AttrDataType[];
}

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
    method: AttrDataItemType;
    waterAmount: number;
    coffeeAmount: number;
};

export type CoffeeEntry = {
    id: number;
    imageFiles?: Image[];
    imageStrings?: string[];
    name: string;
    description: string;
    origin: AttrDataItemType;
    rating: number;
    kind: AttrDataItemType; //Filterkaffee, Espresso
    roasted: AttrDataItemType;
    taste: number; //Geschmacksintensivität
    tasteKind: number; // Schokolade/Frucht
    woody: number; //Holzig, Mehlig, Erbsig
    bitter: number;
    sour: number;
    ownDescription: string;
    dateAdded: Date;
    process: AttrDataItemType;
    buyDate: Date;
    species: AttrDataItemType; //Arabica, Robusta
    brewings: BrewingEntry[];
    owner: User;
};

export type FilterMenuType = {
    name: string;
    items: string[];
};

