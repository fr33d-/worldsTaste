import { User } from "../../pages/User";

export type Image = {
    name: string;
    url?: string;
    alt?: string;
    file?: File;
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

export type FilterMenuType = {
    name: string;
    items: string[];
};