import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { DropdownInput, TextareaInput, TextInput } from '../../components/FormElements';
import { ObjLikeSliderAttrField, ObjSingleSliderAttrField, ObjSliderAttrField } from '../../components/FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../../components/IconButton';
import { baseURL, coffeeURL } from '../../data';
import { blue, brown, cyan, grayDarker, green, yellow } from '../../styles/colors';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import LocalStyles from './CoffeeCardEdit.module.scss';
import { CoffeeEntry, CoffeeAttrData } from '../../helpers/types';

type CoffeeCardEditProps = {
    entry: CoffeeEntry;
    coffeeAttrData: CoffeeAttrData;
    deleteCoffee(id: number): void;
    saveCoffee(coffee: CoffeeEntry): void;
    basePath: string;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeCardEdit = ({
    entry,
    deleteCoffee,
    saveCoffee,
    basePath,
    coffeeAttrData
}: CoffeeCardEditProps) => {
    const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const [tab, setTab] = useState(0);

    const kinds = coffeeAttrData.kinds;
    const roasteds = coffeeAttrData.roasteds;
    const origins = coffeeAttrData.origins;
    const processes = coffeeAttrData.processes;
    const specieses = coffeeAttrData.specieses;

    const [formCoffee, setFormCoffee] = useState<CoffeeEntry>(entry);

    // Not realy used by now
    const [imageFiles, setImageFiles] = useState(entry.imageFiles);
    const [imageStrings, setImageStrings] = useState(entry.imageStrings);

    const history = useHistory();

    const goBack = () => {
        history.push(`${basePath}`);
    };

    console.log('render coffee card edit with id', formCoffee.id);

    const deleteImageByURL = (url: string, id: number) => {
        axios
            .delete(`${baseURL}${coffeeURL}/assets/${id}`, { data: { url: url } })
            .then((response) => {
                console.log('... sucessfully', response);
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
                    <TextInput name="Name" obj={formCoffee} propPath={['name']} setStateHandler={setFormCoffee} />
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
                                        selectedItem={formCoffee.origin}
                                        onChange={setFormCoffee}
                                        propPath={['origin']}
                                        obj={formCoffee}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={kinds}
                                        icon="mug-hot"
                                        iconColor={brown}
                                        label="Art"
                                        selectedItem={formCoffee.kind}
                                        onChange={setFormCoffee}
                                        propPath={['kind']}
                                        obj={formCoffee}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={roasteds}
                                        icon="flask"
                                        iconColor={blue}
                                        label="Rösterei"
                                        selectedItem={formCoffee.roasted}
                                        onChange={setFormCoffee}
                                        propPath={['roasted']}
                                        obj={formCoffee}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={processes}
                                        icon="leaf"
                                        iconColor={green}
                                        label="Prozess"
                                        selectedItem={formCoffee.process}
                                        onChange={setFormCoffee}
                                        propPath={['process']}
                                        obj={formCoffee}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={specieses}
                                        icon="leaf"
                                        iconColor={green}
                                        label="Bohnenart"
                                        selectedItem={formCoffee.species}
                                        onChange={setFormCoffee}
                                        propPath={['species']}
                                        obj={formCoffee}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjLikeSliderAttrField
                                        maxValue={5}
                                        name="Gesamtbewertung:"
                                        obj={formCoffee}
                                        propPath={['rating']}
                                        setStateHandler={setFormCoffee}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextareaInput
                                        label="Beschreibung"
                                        obj={formCoffee}
                                        propPath={['description']}
                                        setStateHandler={setFormCoffee}
                                    />
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
                                    <ObjSliderAttrField
                                        color={blue}
                                        name="Geschmack:"
                                        obj={formCoffee}
                                        setStateHandler={setFormCoffee}
                                        propPath={['taste']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSingleSliderAttrField
                                        color={green}
                                        name="Schokolade/Frucht:"
                                        obj={formCoffee}
                                        setStateHandler={setFormCoffee}
                                        propPath={['tasteKind']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={yellow}
                                        name="Säure:"
                                        obj={formCoffee}
                                        setStateHandler={setFormCoffee}
                                        propPath={['sour']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={green}
                                        name="Erbisg:"
                                        obj={formCoffee}
                                        setStateHandler={setFormCoffee}
                                        propPath={['woody']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={cyan}
                                        name="Bitter:"
                                        obj={formCoffee}
                                        setStateHandler={setFormCoffee}
                                        propPath={['bitter']}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextareaInput
                                        label="Eigene Beschreibung"
                                        obj={formCoffee}
                                        propPath={['ownDescription']}
                                        setStateHandler={setFormCoffee}
                                    />
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
                    <AdvancedCancelButton changes={edited} onClick={() => goBack()} />
                    <AdvancedSaveButton
                        save={() => saveCoffee(formCoffee)}
                        close={() => goBack()}
                        error={saveError}
                        changes={edited}
                    />
                </div>
            </div>
        </>
    );
};
