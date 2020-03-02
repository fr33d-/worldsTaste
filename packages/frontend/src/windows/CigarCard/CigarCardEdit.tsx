import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { baseURL, cigarsURL } from '../../data';
import { CigarEntry } from '../../pages/Cigars';
import { brown, grayDarker, greenAccent, yellowAccent } from '../../styles/colors';
import { ObjLikeSliderAttrField, ObjSliderAttrField } from '../../components/FormElements/AttrFields';
import { AttrDataItemType } from '../../helpers/types';
import { SaveSection } from '../../components/Buttons/AdvancedButtons';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { set } from 'lodash';
import { TextInput, AttrDataDropdownInput, BoolInput, TextareaInput, NumberInput, WTDateInput } from '../../components/FormElements/FormElements';

type CigarCardEditProps = {
    entry: CigarEntry;
    cigarsProducer: AttrDataItemType[];
    cigarsOrigin: AttrDataItemType[];
    cigarEinlage: AttrDataItemType[];
    cigarUmblatt: AttrDataItemType[];
    cigarDeckblatt: AttrDataItemType[];
    cigarAnschnitt: AttrDataItemType[];
    cigarAromarad: AttrDataItemType[];
    deleteCigar(id: number): Promise<void>;
    close(): void;
};

//tslint:disable-next-line: max-func-body-length
export const CigarCardEdit = ({
    cigarAnschnitt,
    cigarAromarad,
    cigarDeckblatt,
    cigarEinlage,
    cigarUmblatt,
    cigarsOrigin,
    cigarsProducer,
    close,
    deleteCigar,
    entry,
}: CigarCardEditProps) => {
    const [formCigar, setFormCigar] = useState<CigarEntry>(entry);

    // const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const [tab, setTab] = useState(0);

    const saveCard = async (): Promise<number> => {
        try {
            await axios.put(`${baseURL}${cigarsURL}/${entry.id}`, { ...formCigar });
            setEdited(false);
            throwDataSucess('Cigar saved');
            return entry.id;
        } catch (e) {
            throwDataError('Cant save cigar', e);
            throw e;
        }
    };

    const deleteImageByURL = async (url: string, id: number) => {
        // Todo; make try await !!!!!!!!!!!!!
        try {
            await axios.delete(`${baseURL}${cigarsURL}/assets/${id}`, { data: { url: url } });
            if (formCigar.imageStrings !== undefined && formCigar.imageStrings.length > 0) {
                // setImageStrings(imageStrings.filter((image) => image !== url));
                setFormCigar({
                    ...formCigar,
                    imageStrings: formCigar.imageStrings.filter((image) => image !== url),
                });
            }
        } catch (e) {
            throwDataError('Cant delete image', e);
            throw e;
        }
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
            .post(`${baseURL}${cigarsURL}/assets/${entry.id}`, formData)
            .then((response) => {
                console.log('... sucessfully');
                setEdited(false);
                // setSaveError(false);

                let newImageString: string = response.headers.location;
                newImageString = newImageString.split('/').slice(-1)[0];
                newImageString = `/cigars/assets/${entry.id}/${newImageString}`;
                console.log(newImageString);

                if (typeof newImageString === 'string' && formCigar.imageStrings !== undefined) {
                    // imageStrings.push(newImageString);
                    // setImageStrings(imageStrings);
                    setFormCigar({ ...formCigar, imageStrings: [...formCigar.imageStrings, newImageString] });
                    console.log(newImageString);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('... failed');
                // setSaveError(true);
            });
    };

    return (
        <>
            <div className={'LayoutCard LayoutCard--content'}>
                <div className="col-12">
                    <TextInput name="Name" setValue={(val) => set(formCigar, 'name', val)} value={formCigar.name} />
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
                                    <AttrDataDropdownInput
                                        items={cigarsProducer}
                                        icon="store"
                                        iconColor={yellowAccent}
                                        label="Hersteller"
                                        selectedItem={formCigar.producer}
                                        obj={formCigar}
                                        propPath={['producer']}
                                        onChange={setFormCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrDataDropdownInput
                                        items={cigarsOrigin}
                                        icon="globe-americas"
                                        iconColor={greenAccent}
                                        label="Herkunft"
                                        selectedItem={formCigar.origin}
                                        propPath={['origin']}
                                        onChange={setFormCigar}
                                        obj={formCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjLikeSliderAttrField
                                        name="Gesammtbewertung"
                                        maxValue={5}
                                        obj={formCigar}
                                        propPath={['rating']}
                                        setStateHandler={setFormCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <BoolInput
                                        name="Nochmal rauchen?"
                                        setValue={val => set(formCigar, 'smokeagain', val)}
                                        value={formCigar.smokeagain}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextareaInput
                                        name="Beschreibung"
                                        setValue={val => set(formCigar, 'description', val)}
                                        value={formCigar.description}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {tab === 1 && (
                    <>
                        <div className={'TextSection'}>
                            <div className={'Row'}>
                                <div className="col-12">
                                    <h3>Details</h3>
                                </div>
                            </div>
                            <div className={'Row'}>
                                <div className="col-12 col-md-6">
                                    <AttrDataDropdownInput
                                        items={cigarEinlage}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Einlage"
                                        selectedItem={formCigar.einlage}
                                        onChange={setFormCigar}
                                        propPath={['einlage']}
                                        obj={formCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrDataDropdownInput
                                        items={cigarUmblatt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Umblatt"
                                        selectedItem={formCigar.umblatt}
                                        onChange={setFormCigar}
                                        propPath={['umblatt']}
                                        obj={formCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrDataDropdownInput
                                        items={cigarDeckblatt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Deckblatt"
                                        selectedItem={formCigar.deckblatt}
                                        onChange={setFormCigar}
                                        propPath={['deckblatt']}
                                        obj={formCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrDataDropdownInput
                                        items={cigarAnschnitt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Anschnitt"
                                        selectedItem={formCigar.anschnitt}
                                        onChange={setFormCigar}
                                        propPath={['anschnitt']}
                                        obj={formCigar}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <NumberInput
                                        name="Länge:"
                                        unit="cm"
                                        setValue={val => set(formCigar, 'lenght', val)}
                                        value={formCigar.lenght}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <NumberInput
                                        name="Ringmas:"
                                        unit="cm"
                                        setValue={val => set(formCigar, 'ringmas', val)}
                                        value={formCigar.ringmas}
                                    />
                                </div>
                            </div>
                            <div className={'Row'}>
                                <div className="col-12 col-md-6">
                                    <WTDateInput
                                        name="Gekauft am:"
                                        setValue={val => set(formCigar, 'buydate', val)}
                                        value={new Date(formCigar.buydate)}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <WTDateInput
                                        name="Geraucht am:"
                                        setValue={val => set(formCigar, 'smokedate', val)}
                                        value={new Date(formCigar.smokedate)}
                                    />
                                </div>
                            </div>
                            <div className={'Row'}>
                                <div className="col-12 col-md-6">
                                    <NumberInput
                                        name="Rauchdauer:"
                                        unit="min"
                                        setValue={val => set(formCigar, 'smokeduration', val)}
                                        value={formCigar.smokeduration}
                                    />
                                </div>
                            </div>
                            <div className={'Row'}>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={brown}
                                        name="Stärke:"
                                        obj={formCigar}
                                        setStateHandler={setFormCigar}
                                        propPath={['strength']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={brown}
                                        name="Zugwiederstand:"
                                        obj={formCigar}
                                        setStateHandler={setFormCigar}
                                        propPath={['zugwiederstand']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={brown}
                                        name="Aromavielfalt:"
                                        obj={formCigar}
                                        setStateHandler={setFormCigar}
                                        propPath={['aromavielfalt']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={brown}
                                        name="Aromaentwicklung:"
                                        obj={formCigar}
                                        setStateHandler={setFormCigar}
                                        propPath={['aromaentwicklung']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <ObjSliderAttrField
                                        color={brown}
                                        name="Abbrand:"
                                        obj={formCigar}
                                        setStateHandler={setFormCigar}
                                        propPath={['abbrand']}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrDataDropdownInput
                                        items={cigarAromarad}
                                        icon="cog"
                                        iconColor={greenAccent}
                                        label="Aromarad"
                                        selectedItem={formCigar.aromarad}
                                        onChange={setFormCigar}
                                        propPath={['aromarad']}
                                        obj={formCigar}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {tab === 2 && (
                    <>
                        <div className={'ImageSection'}>
                            {formCigar.imageStrings !== undefined &&
                                formCigar.imageStrings.map((url, i) => (
                                    <>
                                        <div className={'Image'}>
                                            <button onClick={() => deleteImageByURL(url, formCigar.id)}>
                                                <FontAwesomeIcon icon="trash" color={grayDarker} />
                                            </button>
                                            <img src={`${baseURL}${url}`} key={i} alt={'cigar'} />
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
                                    onChange={handleFileUpload}
                                    className={'Fileupload'}
                                    id="file"
                                    multiple
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className={'Row'}>
                    <div className={'ButtonSection'}>
                        <SaveSection
                            changes={edited}
                            deleteFunction={() => deleteCigar(formCigar.id)}
                            closeFunction={close}
                            saveFunction={saveCard}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
