import React, { Component, useState } from 'react';
import { AttrDataItemType } from '../AttrDataWindow';
import { CoffeeCardDisplay } from './CoffeeCardDisplay';
import { CoffeeCardEdit } from './CoffeeCardEdit';
import { Image } from '../FormComponents';

export type CoffeeEntry = {
    id: number;
    images?: Image[];
    name: string;
    description: string;
    origin: AttrDataItemType;
    rating: number;
    kind: AttrDataItemType;
    roasted: AttrDataItemType;
};

export type SetCoffeeEntry = {
    setId: React.Dispatch<React.SetStateAction<number>>;
    setImages?: React.Dispatch<React.SetStateAction<Image[] | undefined>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setOrigin: React.Dispatch<React.SetStateAction<AttrDataItemType>>;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    setKind: React.Dispatch<React.SetStateAction<AttrDataItemType>>;
    setRoasted: React.Dispatch<React.SetStateAction<AttrDataItemType>>;
};

type CoffeeCardProps = {
    entry: CoffeeEntry;
    kinds: AttrDataItemType[];
    origins: AttrDataItemType[];
    roasteds: AttrDataItemType[];
    saveFunction(post: CoffeeEntry): void;
    deleteFunction(id: number): void;
};

export const CoffeeCard = (props: CoffeeCardProps) => {
    const [edit, setEdit] = useState(props.entry.name === '');
    // const [entry, setEntry] = useState(props.entry);
    const { deleteFunction, kinds, origins, roasteds, saveFunction } = props;
    const [id, setId] = useState(props.entry.id);
    const [images, setImages] = useState(props.entry.images);
    const [name, setName] = useState(props.entry.name);
    const [description, setDescription] = useState(props.entry.description);
    const [origin, setOrigin] = useState(props.entry.origin);
    const [rating, setRating] = useState(props.entry.rating);
    const [roasted, setRoasted] = useState(props.entry.roasted);
    const [kind, setKind] = useState(props.entry.kind);

    const entry: CoffeeEntry = {
        id,
        images,
        name,
        description,
        origin,
        rating,
        roasted,
        kind,
    };

    const setEntry: SetCoffeeEntry = {
        setId,
        setImages,
        setName,
        setDescription,
        setOrigin,
        setRating,
        setRoasted,
        setKind,
    };

    return edit ? (
        <CoffeeCardEdit {...props} entry={entry} setEntry={setEntry} close={() => setEdit(false)} />
    ) : (
        <CoffeeCardDisplay entry={entry} deleteFunction={deleteFunction} edit={() => setEdit(true)} />
    );
};

//Cool new stuff with hooks
// const NewCoffeeCard = (props: CoffeeCardProps) => {
//     const [edit, setEdit] = useState(props.entry.name === '');

//     const { entry, deleteFunction } = props;

//     return edit ? (
//         <CoffeeCardEdit {...props} close={() => setEdit(false)} />
//     ) : (
//         <CoffeeCardDisplay entry={entry} deleteFunction={deleteFunction} edit={() => setEdit(true)} />
//     );
// };
