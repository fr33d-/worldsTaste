import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { baseURL, coffeeURL } from '../../data';
import { blue, brown, cyan, grayDarker, green, yellow } from '../../styles/colors';
import { AttrDataItemType, CoffeeEntry } from '../../components/FormComponents';
import { DropdownInput, TextareaInput, TextInput } from '../../components/FormElements';
import { LikeSliderAttrField, SingleSliderAttrField, SliderAttrField } from '../../components/FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../../components/IconButton';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './CoffeeCardEdit.module.scss';

type CoffeeCardEditProps = {
    entry: CoffeeEntry;
    kinds: AttrDataItemType[];
    origins: AttrDataItemType[];
    roasteds: AttrDataItemType[];
    processes: AttrDataItemType[];
    specieses: AttrDataItemType[];
    close(): void;
    deleteCoffee(id: number): void;
    saveCoffee(coffee: CoffeeEntry): void;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeCardEdit = ({entry, kinds, roasteds, origins, close, processes, specieses, deleteCoffee, saveCoffee}: CoffeeCardEditProps) => {
    const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const [tab, setTab] = useState(0);

    const [formCoffee, setFormCoffee] = useState<CoffeeEntry>(entry);

    // const [id, setId] = useState(props.entry.id);
    const [imageFiles, setImageFiles] = useState(entry.imageFiles);
    const [imageStrings, setImageStrings] = useState(entry.imageStrings);
    // const [name, setName] = useState(props.entry.name);
    // const [description, setDescription] = useState(props.entry.description);
    // const [origin, setOrigin] = useState(props.entry.origin);
    // const [rating, setRating] = useState(props.entry.rating);
    // const [roasted, setRoasted] = useState(props.entry.roasted);
    // const [kind, setKind] = useState(props.entry.kind);
    // const [taste, setTaste] = useState(props.entry.taste);
    // const [tasteKind, setTasteKind] = useState(props.entry.tasteKind);
    // const [woody, setWoody] = useState(props.entry.woody);
    // const [bitter, setBitter] = useState(props.entry.bitter);
    // const [sour, setSour] = useState(props.entry.sour);
    // const [ownDescription, setOwnDescription] = useState(props.entry.ownDescription);
    // const [dateAdded, setDateAdded] = useState(props.entry.dateAdded);
    // const [process, setProcess] = useState(props.entry.process);
    // const [buyDate, setBuyDate] = useState(props.entry.buyDate);
    // const [brewings, setBrewings] = useState(props.entry.brewings);
    // const [species, setSpecies] = useState(props.entry.species);
    // const [owner, setOwner] = useState(props.entry.owner);

    // const { kinds, roasteds, origins, close, processes, specieses } = props;

    // const closeCard = () => {
    //     const newObject: CoffeeEntry = {
    //         id,
    //         name,
    //         description,
    //         origin,
    //         rating,
    //         roasted,
    //         kind,
    //         taste,
    //         tasteKind,
    //         woody,
    //         bitter,
    //         sour,
    //         ownDescription,
    //         buyDate,
    //         dateAdded,
    //         process,
    //         species,
    //         owner,
    //         brewings,
    //     };

    //     props.close(newObject);
    // };

    const saveCard = () => {
        
        if (formCoffee.id === 0) {
            //create new card
            axios
                .post(`${baseURL}${coffeeURL}`, { ...formCoffee })
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
            // save card
            axios
                .put(`${baseURL}${coffeeURL}/${formCoffee.id}`, { ...formCoffee })
                .then((response) => {
                    setEdited(false);
                    setSaveError(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const deleteImageByURL = (url: string, id: number) => {
        axios
            .delete(`${baseURL}${coffeeURL}/assets/${id}`, { data: { url: url } })
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

    const handleFileUpload = (files: FileList) => {
        //für backend
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('images', file);
        });

        axios
            .post(`${baseURL}${coffeeURL}/assets/${entry.id}`, formData)
            .then((response) => {
                console.log('... sucessfully');
                setEdited(false);
                setSaveError(false);

                let newImageString: string = response.headers.location;
                newImageString = newImageString.split('/').slice(-1)[0];
                newImageString = `/coffee/assets/${entry.id}/${newImageString}`;
                console.log(newImageString);

                if (typeof newImageString === 'string' && imageStrings !== undefined) {
                    setImageStrings([newImageString, ...imageStrings]);
                    // imageStrings.push(newImageString);
                    // setImageStrings(imageStrings);
                    console.log(imageStrings);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('... failed');
                setSaveError(true);
            });
    };

    const uploadSelectedFile = (event: ChangeEvent<HTMLInputElement>) => {
        const eventFiles = event.target.files;
        if (eventFiles === null) {
            return;
        }
        handleFileUpload(eventFiles);
    };

    const uploadDropeddFile = (event: React.DragEvent<HTMLInputElement>) => {
        const eventFiles = event.currentTarget.files;
        if (eventFiles === null) {
            return;
        }
        handleFileUpload(eventFiles);
    };

    return (
        <>
            <div className={LocalStyles.CoffeeCardEdit}>
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
                        <li className={classNames(tab === 3 && GeneralStyles.Active)} onClick={() => setTab(3)}>
                            Bewings
                        </li>
                    </ul>
                </div>
                {/* tslint:disable-next-line: max-func-body-length */}
                {tab === 0 && (
                    <>
                        <div className={LocalStyles.TextSection}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={origins}
                                        icon="globe-americas"
                                        iconColor={green}
                                        label="Herkunft"
                                        selectedItem={origin}
                                        onChange={setOrigin}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={kinds}
                                        icon="mug-hot"
                                        iconColor={brown}
                                        label="Art"
                                        selectedItem={kind}
                                        onChange={setKind}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={roasteds}
                                        icon="flask"
                                        iconColor={blue}
                                        label="Rösterei"
                                        selectedItem={roasted}
                                        onChange={setRoasted}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={processes}
                                        icon="leaf"
                                        iconColor={green}
                                        label="Prozess"
                                        selectedItem={process}
                                        onChange={setProcess}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={specieses}
                                        icon="leaf"
                                        iconColor={green}
                                        label="Bohnenart"
                                        selectedItem={species}
                                        onChange={setSpecies}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <LikeSliderAttrField
                                        maxValue={5}
                                        value={rating}
                                        onChange={setRating}
                                        name="Gesamtbewertung:"
                                    />
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
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <SliderAttrField color={blue} name="Geschmack:" value={taste} onChange={setTaste} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SingleSliderAttrField
                                        color={green}
                                        name="Schokolade/Frucht:"
                                        value={tasteKind}
                                        onChange={setTasteKind}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField color={yellow} name="Säure:" value={sour} onChange={setSour} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField color={green} name="Erbisg:" value={woody} onChange={setWoody} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField color={cyan} name="Bitter:" value={bitter} onChange={setBitter} />
                                </div>
                                <div className="col-12">
                                    <TextareaInput
                                        label="Eigene Beschreibung"
                                        onChange={setOwnDescription}
                                        value={ownDescription}
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
                                            <button onClick={() => deleteImageByURL(url, formCoffee.id)}>
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
                                <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    onChange={uploadSelectedFile}
                                    className={LocalStyles.Fileupload}
                                    id="file"
                                    onDrop={uploadDropeddFile}
                                    multiple
                                />
                            </div>
                        </div>
                    </>
                )}
                {tab === 3 && <></>}

                <div className={LocalStyles.ButtonSection}>
                    <AdvancedDeleteButton changes={edited} onClick={() => deleteCoffee(formCoffee.id)} />
                    <AdvancedCancelButton changes={edited} onClick={() => close()} />
                    <AdvancedSaveButton save={saveCard} close={() => close()} error={saveError} changes={edited} />
                </div>
            </div>
        </>
    );
};
