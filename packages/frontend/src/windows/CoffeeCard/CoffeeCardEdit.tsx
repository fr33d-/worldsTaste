import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useContext, useState } from 'react';
import { DropdownInput, TextareaInput, TextInput } from '../../components/FormElements';
import {
    ObjLikeSliderAttrField,
    ObjSingleSliderAttrField,
    ObjSliderAttrField,
} from '../../components/FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../../components/IconButton';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { baseURL, coffeeURL } from '../../data';
import { CoffeeEntry } from '../../helpers/types';
import { blue, brown, cyan, grayDarker, green, yellow } from '../../styles/colors';

type CoffeeCardEditProps = {
    entry: CoffeeEntry;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeCardEdit = ({ entry }: CoffeeCardEditProps) => {
    const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const [tab, setTab] = useState(0);

    const [formCoffee, setFormCoffee] = useState<CoffeeEntry>(entry);

    // Not realy used by now
    const [imageFiles, setImageFiles] = useState(entry.imageFiles);
    const [imageStrings, setImageStrings] = useState(entry.imageStrings);

    const { coffeeAttrData, contextDeleteCoffee, contextSaveCoffee, viewCoffeeCard } = useContext(CoffeeContext);

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

    return !coffeeAttrData ? (<h1>loading...</h1>) : (
        <>
            <div className={'CoffeeCardEdit'}>
                <div className="col-12">
                    <TextInput name="Name" obj={formCoffee} propPath={['name']} setStateHandler={setFormCoffee} />
                </div>
                <div className={'TabBar'}>
                    <ul>
                        <li className={classNames(tab === 0 && 'Active')} onClick={() => setTab(0)}>
                            Information
                        </li>
                        <li className={classNames(tab === 1 && 'Active')} onClick={() => setTab(1)}>
                            Details
                        </li>
                        <li className={classNames(tab === 2 && 'Active')} onClick={() => setTab(2)}>
                            Images
                        </li>
                        <li className={classNames(tab === 3 && 'Active')} onClick={() => setTab(3)}>
                            Bewings
                        </li>
                    </ul>
                </div>
                {/* tslint:disable-next-line: max-func-body-length */}
                {tab === 0 && (
                    <>
                        <div className={'TextSection'}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={coffeeAttrData.origins}
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
                                        items={coffeeAttrData.kinds}
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
                                        items={coffeeAttrData.roasteds}
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
                                        items={coffeeAttrData.processes}
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
                                        items={coffeeAttrData.specieses}
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
                        <div className={'TextSection'}>
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
                        <div className={'ImageSection'}>
                            {imageStrings !== undefined &&
                                imageStrings.map((url, i) => (
                                    <>
                                        <div className={'Image'}>
                                            <button onClick={() => deleteImageByURL(url, formCoffee.id)}>
                                                <FontAwesomeIcon icon="trash" color={grayDarker} />
                                            </button>
                                            <img src={`${baseURL}${url}`} key={i} />
                                        </div>
                                    </>
                                ))}

                            <div className={'UploadArea'}>
                                <label htmlFor="file">
                                    <FontAwesomeIcon icon="upload" />
                                </label>
                                <br />
                                <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    onChange={uploadSelectedFile}
                                    className={'Fileupload'}
                                    id="file"
                                    onDrop={uploadDropeddFile}
                                    multiple
                                />
                            </div>
                        </div>
                    </>
                )}
                {tab === 3 && <></>}

                <div className={'ButtonSection'}>
                    <AdvancedDeleteButton changes={edited} onClick={() => contextDeleteCoffee(formCoffee.id)} />
                    <AdvancedCancelButton changes={edited} onClick={() => viewCoffeeCard()} />
                    <AdvancedSaveButton
                        save={() => contextSaveCoffee(formCoffee)}
                        close={() => viewCoffeeCard()}
                        error={saveError}
                        changes={edited}
                    />
                </div>
            </div>
        </>
    );
};
