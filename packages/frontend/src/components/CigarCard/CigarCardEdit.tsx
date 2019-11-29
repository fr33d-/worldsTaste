import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { baseURL, cigarsURL } from '../../data';
import { brown, grayDarker, greenAccent, yellowAccent } from '../../styles/colors';
import { AttrDataItemType } from '../FormComponents';
import { BoolInput, DropdownInput, NumberInput, TextareaInput, TextInput } from '../FormElements';
import { LikeSliderAttrField, SliderAttrField } from '../FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../IconButton';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './CigarCardEdit.module.scss';
import { CigarEntry } from '../../pages/Cigars';

type CigarCardEditProps = {
    entry: CigarEntry;
    cigarsProducer: AttrDataItemType[];
    cigarsOrigin: AttrDataItemType[];
    cigarEinlage: AttrDataItemType[];
    cigarUmblatt: AttrDataItemType[];
    cigarDeckblatt: AttrDataItemType[];
    cigarAnschnitt: AttrDataItemType[];
    cigarAromarad: AttrDataItemType[];
    deleteFunction(id: number): void;
    close(): void;
};

//tslint:disable-next-line: max-func-body-length
export const CigarCardEdit = (props: CigarCardEditProps) => {
    const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const [id, setId] = useState(props.entry.id);
    const [imageStrings, setImageStrings] = useState(props.entry.imageStrings);
    const [imageFiles, setImageFiles] = useState(props.entry.imageFiles);
    const [name, setName] = useState(props.entry.name);
    const [description, setDescription] = useState(props.entry.description);
    const [origin, setOrigin] = useState(props.entry.origin);
    const [rating, setRating] = useState(props.entry.rating);
    const [abbrand, setAbbrand] = useState(props.entry.abbrand);
    const [anschnitt, setAnschnitt] = useState(props.entry.anschnitt);
    const [aromarad, setAromarad] = useState(props.entry.aromarad);
    const [aromaentwicklung, setAromaentwicklung] = useState(props.entry.aromaentwicklung);
    const [aromavielfalt, setAromavielfalt] = useState(props.entry.aromavielfalt);
    const [buydate, setBuydate] = useState(props.entry.buydate);
    const [deckblatt, setDeckblatt] = useState(props.entry.deckblatt);
    const [einlage, setEinlage] = useState(props.entry.einlage);
    const [lenght, setLenght] = useState(props.entry.lenght);
    const [producer, setProducer] = useState(props.entry.producer);
    const [ringmas, setRingmas] = useState(props.entry.ringmas);
    const [smokedate, setSmokedate] = useState(props.entry.smokedate);
    const [smokeduration, setSmokeduration] = useState(props.entry.smokeduration);
    const [strength, setStrength] = useState(props.entry.strength);
    const [umblatt, setUmblatt] = useState(props.entry.umblatt);
    const [zugwiederstand, setZugwiederstand] = useState(props.entry.zugwiederstand);
    const [smokeagain, setSmokeagain] = useState(props.entry.smokeagain);
    const [tab, setTab] = useState(0);

    const {
        close,
        cigarAnschnitt,
        cigarAromarad,
        cigarDeckblatt,
        cigarEinlage,
        cigarUmblatt,
        cigarsOrigin,
        cigarsProducer,
    } = props;

    const saveCard = () => {
        const requestObject: CigarEntry = {
            id: id,
            name: name,
            description: description,
            origin: origin,
            rating: rating,
            abbrand: abbrand,
            anschnitt: anschnitt,
            aromaentwicklung: aromaentwicklung,
            aromarad: aromarad,
            aromavielfalt: aromavielfalt,
            buydate: buydate,
            deckblatt: deckblatt,
            einlage: einlage,
            lenght: lenght,
            producer: producer,
            ringmas: ringmas,
            smokeagain: smokeagain,
            smokedate: smokedate,
            smokeduration: smokeduration,
            strength: strength,
            umblatt: umblatt,
            zugwiederstand: zugwiederstand,
        };

        axios
            .put(`${baseURL}${cigarsURL}/${props.entry.id}`, { ...requestObject })
            .then((response) => {
                setEdited(false);
                setSaveError(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteCard = () => {
        props.deleteFunction(id);
    };

    const deleteImageByURL = (url: string, id: number) => {
        axios
            .delete(`${baseURL}${cigarsURL}/assets/${id}`, { data: { url: url } })
            .then((response) => {
                console.log('... sucessfully');
                setSaveError(false);

                if (imageStrings !== undefined && imageStrings.length > 0) {
                    setImageStrings(imageStrings.filter((image) => image !== url));
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('... failed');
                setSaveError(true);
            });
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const eventFiles = event.target.files;

        if (eventFiles === null) {
            return;
        }

        //für backend
        const formData = new FormData();
        Array.from(eventFiles).forEach((file) => {
            formData.append('images', file);
        });

        axios
            .post(`${baseURL}${cigarsURL}/assets/${props.entry.id}`, formData)
            .then((response) => {
                console.log('... sucessfully');
                setEdited(false);
                setSaveError(false);

                let newImageString: string = response.headers.location;
                newImageString = newImageString.split('/').slice(-1)[0];
                newImageString = `/coffee/assets/${props.entry.id}/${newImageString}`;
                console.log(newImageString);

                if (typeof newImageString === 'string' && imageStrings !== undefined) {
                    imageStrings.push(newImageString);
                    setImageStrings(imageStrings);
                    console.log(imageStrings);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('... failed');
                setSaveError(true);
            });
    };

    return (
        <>
            <div className={LocalStyles.CigarCardEdit}>
                <div className="col-12">
                    <TextInput name="Name" value={name} onChange={setName} />
                </div>
                <div className={GeneralStyles.TabBar}>
                    <ul>
                        <li className={classNames(tab === 0 && GeneralStyles.Active)} onClick={() => setTab(0)}>
                            Information
                        </li>
                        <li className={classNames(tab === 1 && GeneralStyles.Active)} onClick={() => setTab(1)}>
                            Details
                        </li>
                        <li className={classNames(tab === 2 && GeneralStyles.Active)} onClick={() => setTab(2)}>
                            Images
                        </li>
                    </ul>
                </div>
                {tab === 0 && (
                    <>
                        <div className={LocalStyles.TextSection}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarsProducer}
                                        icon="store"
                                        iconColor={yellowAccent}
                                        label="Hersteller"
                                        selectedItem={producer}
                                        onChange={setProducer}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarsOrigin}
                                        icon="globe-americas"
                                        iconColor={greenAccent}
                                        label="Herkunft"
                                        selectedItem={origin}
                                        onChange={setOrigin}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <LikeSliderAttrField maxValue={5} value={rating} onChange={setRating} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <BoolInput label="Nochmal rauchen?" onChange={setSmokeagain} value={smokeagain} />
                                </div>
                                <div className="col-12">
                                    <TextareaInput label="Beschreibung" onChange={setDescription} value={description} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {tab === 1 && (
                    <>
                        <div className={LocalStyles.TextSection}>
                            <div className={LocalStyles.Row}>
                                <div className="col-12">
                                    <h3>Details</h3>
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarEinlage}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Einlage"
                                        selectedItem={einlage}
                                        onChange={setEinlage}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarUmblatt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Umblatt"
                                        selectedItem={umblatt}
                                        onChange={setUmblatt}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarDeckblatt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Deckblatt"
                                        selectedItem={deckblatt}
                                        onChange={setDeckblatt}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarAnschnitt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Anschnitt"
                                        selectedItem={anschnitt}
                                        onChange={setAnschnitt}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <NumberInput name="Länge:" value={lenght} onChange={setLenght} unit="cm" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <NumberInput name="Ringmas:" value={ringmas} onChange={setRingmas} unit="cm" />
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <TextInput name="Gekauft am:" value={buydate} onChange={setBuydate} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <TextInput name="Geraucht am:" value={smokedate} onChange={setSmokedate} />
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <NumberInput
                                        name="Rauchdauer:"
                                        value={smokeduration}
                                        onChange={setSmokeduration}
                                        unit="min"
                                    />
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        color={brown}
                                        name="Stärke:"
                                        value={strength}
                                        onChange={setStrength}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        color={brown}
                                        name="Zugwiederstand:"
                                        value={zugwiederstand}
                                        onChange={setZugwiederstand}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        color={brown}
                                        name="Aromavielfalt:"
                                        value={aromavielfalt}
                                        onChange={setAromavielfalt}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        color={brown}
                                        name="Aromaentwicklung:"
                                        value={aromaentwicklung}
                                        onChange={setAromaentwicklung}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        color={brown}
                                        name="Abbrand:"
                                        value={abbrand}
                                        onChange={setAbbrand}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarAromarad}
                                        icon="cog"
                                        iconColor={greenAccent}
                                        label="Aromarad"
                                        selectedItem={aromarad}
                                        onChange={setAromarad}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {tab === 2 && (
                    <>
                        <div className={LocalStyles.ImageSection}>
                            {imageStrings !== undefined &&
                                imageStrings.map((url, i) => (
                                    <>
                                        <div className={LocalStyles.Image}>
                                            <button onClick={() => deleteImageByURL(url, id)}>
                                                <FontAwesomeIcon icon="trash" color={grayDarker} />
                                            </button>
                                            <img src={`${baseURL}${url}`} key={i} />
                                        </div>
                                    </>
                                ))}

                            <div className={LocalStyles.UploadArea}>
                                <label htmlFor="file">
                                    <FontAwesomeIcon icon="upload" />
                                </label>
                                <br />
                                {/* tslint:disable-next-line: react-a11y-input-elements */}
                                <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className={LocalStyles.Fileupload}
                                    id="file"
                                    multiple
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className={LocalStyles.Row}>
                    <div className={LocalStyles.ButtonSection}>
                        <AdvancedDeleteButton changes={edited} onClick={deleteCard} />
                        <AdvancedCancelButton changes={edited} onClick={close} />
                        <AdvancedSaveButton save={saveCard} close={close} error={saveError} changes={edited} />
                    </div>
                </div>
            </div>
        </>
    );
};
