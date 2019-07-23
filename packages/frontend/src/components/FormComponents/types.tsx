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
    kind: AttrDataItemType;
    roasted: AttrDataItemType;
    taste: number;
    tasteKind: number;
    woody: number;
    bitter: number;
    sour: number;
    ownDescription: string;
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