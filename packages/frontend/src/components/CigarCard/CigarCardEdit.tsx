import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { greenAccent, yellowAccent } from '../../style/colors';
import { AttrDataType, AttrDataItemType } from '../AttrDataWindow';
import { CigarEntry, CigarSetterEntry } from '../Cigars';
import { BoolInput, DropdownInput, NumberInput, TextareaInput, TextInput } from '../FormElements';
import { LikeSliderAttrField, SliderAttrField } from '../FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../IconButton';
import LocalStyles from './CigarCardEdit.module.scss';

type CigarCardEditProps = {
    entry: CigarEntry;
    cigarsProducer: AttrDataItemType[];
    cigarsOrigin: AttrDataItemType[];
    cigarEinlage: AttrDataItemType[];
    cigarUmblatt: AttrDataItemType[];
    cigarDeckblatt: AttrDataItemType[];
    cigarAnschnitt: AttrDataItemType[];
    cigarAromarad: AttrDataItemType[];
    setterEntry: CigarSetterEntry;
    saveFunction(post: CigarEntry): void;
    deleteFunction(id: number): void;
    close(): void;
};

//tslint:disable-next-line: max-func-body-length
export const CigarCardEdit = (props: CigarCardEditProps) => {

    const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const {
        id,
        images,
        name,
        description,
        origin,
        rating,
        abbrand,
        anschnitt,
        armoarad,
        aromaentwicklung,
        aromavielfalt,
        buydate,
        deckplatt,
        einlage,
        lenght,
        producer,
        ringmas,
        smokedate,
        smokeduration,
        strength,
        umblatt,
        zugwiederstand,
        smokeagain,
    } = props.entry;
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
    const {
        setAbbrand,
        setAnschnitt,
        setArmoarad,
        setAromaentwicklung,
        setAromavielfalt,
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
    } = props.setterEntry;

    const saveCard = () => {
        if (id === 0) {
            axios
                .post('http://localhost:4000/cigars', { ...props.entry })
                .then((response) => {
                    console.log(response);
                    setEdited(false);
                    setSaveError(false);
                })
                .catch((error) => {
                    console.log(error);
                    setSaveError(true);
                });
        } else {
            axios
                .put(`http://localhost:4000/cigars/${props.entry.id}`, { ...props.entry })
                .then((response) => {
                    // this.props.close();
                    setEdited(false);
                    setSaveError(false);
                })
                .catch((error) => {
                    console.log(error);
                    setSaveError(true);
                });
        }
    };

    const deleteCard = () => {
        props.deleteFunction(id);
    };

    

    return (
        <>
            <div className={LocalStyles.CigarCardEdit}>
                <div className={LocalStyles.Header}>
                    <h2>This is a tastefull cigarr</h2>
                </div>
                <div className={LocalStyles.EditSection}>
                    <div className={LocalStyles.ImageSection}>
                        <div className={LocalStyles.UploadArea}>
                            <label htmlFor="file">
                                <FontAwesomeIcon icon="upload" />
                            </label>
                            <br />
                            {/* <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    onChange={this.handleFileUpload}
                                    className={LocalStyles.Fileupload}
                                    id="file"
                                /> */}
                        </div>

                        {images !== undefined &&
                            images.map(({ url, alt, file }, i) => (
                                <img src={url === '' ? window.URL.createObjectURL(file) : url} alt={alt} key={i} />
                            ))}
                    </div>
                    <div className={LocalStyles.TextSection}>
                        <div className="row">
                            <div className="col-12">
                                <TextInput name="Name" value={name} onChange={setName} />
                            </div>
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
                                <LikeSliderAttrField
                                    maxValue={5}
                                    value={rating}
                                    onChange={setRating}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <BoolInput label="Nochmal rauchen?" onChange={setSmokeagain} value={smokeagain} />
                            </div>
                            <div className="col-12">
                                <TextareaInput label="Beschreibung" onChange={setDescription} value={description} />
                            </div>
                        </div>
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
                                    selectedItem={deckplatt}
                                    onChange={setDeckplatt}
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
                                <SliderAttrField maxValue={5} name="Stärke:" value={strength} onChange={setStrength} />
                            </div>
                            <div className="col-12 col-md-6">
                                <SliderAttrField
                                    maxValue={5}
                                    name="Zugwiederstand:"
                                    value={zugwiederstand}
                                    onChange={setZugwiederstand}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <SliderAttrField
                                    maxValue={5}
                                    name="Aromavielfalt:"
                                    value={aromavielfalt}
                                    onChange={setAromavielfalt}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <SliderAttrField
                                    maxValue={5}
                                    name="Aromaentwicklung:"
                                    value={aromaentwicklung}
                                    onChange={setAromaentwicklung}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <SliderAttrField maxValue={5} name="Abbrand:" value={abbrand} onChange={setAbbrand} />
                            </div>
                        </div>
                        <div className={LocalStyles.Row}>
                            <div className="col-12 col-md-6">
                                <DropdownInput
                                    items={cigarAromarad}
                                    icon="cog"
                                    iconColor={greenAccent}
                                    label="Aromarad"
                                    selectedItem={armoarad}
                                    onChange={setArmoarad}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
