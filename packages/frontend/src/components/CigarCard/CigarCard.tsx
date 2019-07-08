import React, { Component, useState } from 'react';
import { AttrDataType, AttrDataItemType } from '../AttrDataWindow';
import { CigarEntry, CigarSetterEntry } from '../Cigars';
import { CigarCardDisplay } from './CigarCardDisplay';
import { CigarCardEdit } from './CigarCardEdit';

type CoffeeCardProps = {
    entry: CigarEntry;
    cigarsProducer: AttrDataItemType[];
    cigarsOrigin: AttrDataItemType[];
    cigarEinlage: AttrDataItemType[];
    cigarUmblatt: AttrDataItemType[];
    cigarDeckblatt: AttrDataItemType[];
    cigarAnschnitt: AttrDataItemType[];
    cigarAromarad: AttrDataItemType[];
    saveFunction(post: CigarEntry): void;
    deleteFunction(id: number): void;
};

export const CigarCard = (props: CoffeeCardProps) => {
    const [edit, setEdit] = useState(props.entry.name === '');
    const [abbrand, setAbbrand] = useState(props.entry.abbrand);
    const [anschnitt, setAnschnitt] = useState(props.entry.anschnitt);
    const [aromarad, setAromarad] = useState(props.entry.aromarad);
    const [aromaentwicklung, setAromaentwicklung] = useState(props.entry.aromaentwicklung);
    const [aromavielfalt, setAromavielfalt] = useState(props.entry.aromavielfalt);
    const [buydate, setBuydate] = useState(props.entry.buydate);
    const [deckplatt, setDeckplatt] = useState(props.entry.deckplatt);
    const [description, setDescription] = useState(props.entry.description);
    const [einlage, setEinlage] = useState(props.entry.einlage);
    const [id, setId] = useState(props.entry.id);
    const [images, setImages] = useState(props.entry.images);
    const [lenght, setLenght] = useState(props.entry.lenght);
    const [name, setName] = useState(props.entry.name);
    const [origin, setOrigin] = useState(props.entry.origin);
    const [producer, setProducer] = useState(props.entry.producer);
    const [rating, setRating] = useState(props.entry.rating);
    const [ringmas, setRingmas] = useState(props.entry.ringmas);
    const [smokeagain, setSmokeagain] = useState(props.entry.smokeagain);
    const [smokedate, setSmokedate] = useState(props.entry.smokedate);
    const [smokeduration, setSmokeduration] = useState(props.entry.smokeduration);
    const [strength, setStrength] = useState(props.entry.strength);
    const [umblatt, setUmblatt] = useState(props.entry.umblatt);
    const [zugwiederstand, setZugwiederstand] = useState(props.entry.zugwiederstand);

    const closeEditCard = () => {
        setEdit(false);
    };

    const editCard = () => {
        setEdit(true);
    };

    const cigarEntry: CigarEntry = {
        abbrand,
        anschnitt,
        aromarad,
        aromavielfalt,
        aromaentwicklung,
        buydate,
        deckplatt,
        description,
        einlage,
        id,
        images,
        lenght,
        name,
        origin,
        producer,
        rating,
        ringmas,
        smokeagain,
        smokedate,
        smokeduration,
        strength,
        umblatt,
        zugwiederstand,
    };

    const cigarSetterEntry: CigarSetterEntry = {
        setAbbrand,
        setAnschnitt,
        setAromarad,
        setAromavielfalt,
        setAromaentwicklung,
        setBuydate,
        setDeckplatt,
        setDescription,
        setEinlage,
        setId,
        setImages,
        setLenght,
        setName,
        setOrigin,
        setProducer,
        setRating,
        setRingmas,
        setSmokeagain,
        setSmokedate,
        setSmokeduration,
        setStrength,
        setUmblatt,
        setZugwiederstand,
    };

    return edit ? (
        <CigarCardEdit {...props} entry={cigarEntry} close={closeEditCard} setterEntry={cigarSetterEntry} />
    ) : (
        <CigarCardDisplay entry={cigarEntry} deleteFunction={props.deleteFunction} edit={editCard} />
    );
};
