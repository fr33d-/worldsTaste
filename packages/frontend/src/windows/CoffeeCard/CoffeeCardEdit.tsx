import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import React, { ChangeEvent, useContext, useState } from 'react';
import { SaveSection } from '../../components/Buttons/AdvancedButtons';
import { TextareaInput, TextInput, AttrDataDropdownInput, StringDropdownInput } from '../../components/FormElements';
import {
    ObjLikeSliderAttrField,
    ObjSingleSliderAttrField,
    ObjSliderAttrField,
} from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { baseURL } from '../../data';
import { CoffeeEntry } from '../../helpers/types';
import { blue, brown, cyan, grayDarker, green, yellow } from '../../styles/colors';
import { deleteImageByURL, handleFileUpload } from './CoffeeCardHelperFuctions';
import { localCoffeeAttrData } from '../../helpers/attrData';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';

type CoffeeCardEditProps = {
    coffee: CoffeeEntry;
};

export const CoffeeCardEdit = ({ coffee }: CoffeeCardEditProps) => {
    const [tab, setTab] = useState(0);
    const [formCoffee, setFormCoffee] = useState<CoffeeEntry>(coffee);
    const [imageStrings, setImageStrings] = useState(coffee.imageStrings);

    const { coffeeStores, contextDeleteCoffee, contextSaveCoffee, viewCoffeeCard } = useContext(CoffeeContext);

    const innerDeleteImage = async (url: string, id: number) => {

        try {
            await deleteImageByURL(url, id);
            if (imageStrings !== undefined && imageStrings.length > 0) {
                setImageStrings(imageStrings.filter((image) => image !== url));
            }
        } catch(e) {
            throwDataError('Cant delete image', e);
            throw e;
        };
    };

    const innerSaveCoffee = async (): Promise<number> => {

        try {
            const newId = await contextSaveCoffee(formCoffee);
            setFormCoffee({ ...formCoffee, id: newId });
            return newId;
        } catch(e) {
            throwDataError('Cant save coffee', e)
            throw e;
        };
    };

    const uploadSelectedFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const eventFiles = event.target.files;
        if (eventFiles === null)
            throw 'no file there';

        try {
            const newImageString = await handleFileUpload(eventFiles, coffee.id);
            if (imageStrings !== undefined) setImageStrings([newImageString, ...imageStrings]);
            throwDataSucess('File uploaded');
        } catch(e) {
            throwDataError('Cant upload file', e);
            throw e;
        };
    };

    const uploadDropeddFile = async (event: React.DragEvent<HTMLInputElement>) => {
        const eventFiles = event.currentTarget.files;
        if (eventFiles === null) throw 'no file there';

        try {
            const newImageString = await handleFileUpload(eventFiles, coffee.id)
            if (imageStrings !== undefined) setImageStrings([newImageString, ...imageStrings]);
            throwDataSucess('File uploaded');
        } catch(e) {
            throwDataError('Cant upload file', e);
            throw e;
        };
    };

    return !coffeeStores ? (
        <h1>no coffee data</h1>
    ) : (
        <>
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
                </ul>
            </div>
            {tab === 0 && (
                <>
                    <div className={'TextSection'}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <StringDropdownInput
                                    items={localCoffeeAttrData.origins}
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
                                <StringDropdownInput
                                    items={localCoffeeAttrData.kinds}
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
                                <AttrDataDropdownInput
                                    items={coffeeStores}
                                    icon="flask"
                                    iconColor={blue}
                                    label="Rösterei"
                                    selectedItem={formCoffee.store}
                                    onChange={setFormCoffee}
                                    propPath={['roasted']}
                                    obj={formCoffee}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <StringDropdownInput
                                    items={localCoffeeAttrData.processes}
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
                                <StringDropdownInput
                                    items={localCoffeeAttrData.specieses}
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
                                        <button onClick={() => innerDeleteImage(url, formCoffee.id)}>
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

            <div className={'ButtonSection'}>
                <SaveSection
                    changes={isEqual(formCoffee, coffee)}
                    deleteFunction={async() => contextDeleteCoffee(formCoffee.id)}
                    closeFunction={async () => viewCoffeeCard(formCoffee.id)}
                    saveFunction={async () => innerSaveCoffee()}
                />
                {/* <AdvancedDeleteButton changes={true} onClick={() => contextDeleteCoffee(formCoffee.id)} />
                <AdvancedCancelButton changes={true} onClick={() => viewCoffeeCard(formCoffee.id)} />
                <AdvancedSaveButton
                    save={() => contextSaveCoffee(formCoffee)}
                    close={() => viewCoffeeCard(formCoffee.id)}
                    changes={true}
                /> */}
            </div>
        </>
    );
};
