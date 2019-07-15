import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { CoffeeEntry, SetCoffeeEntry } from '.';
import { blue, brown, green } from '../../style/colors';
import { AttrDataItemType } from '../AttrDataWindow';
import { DropdownInput, TextareaInput, TextInput } from '../FormElements';
import { LikeSliderAttrField, SliderAttrField } from '../FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../IconButton';
import LocalStyles from './CoffeeCardEdit.module.scss';
import classNames from 'classnames';

type CoffeeCardEditProps = {
    entry: CoffeeEntry;
    kinds: AttrDataItemType[];
    origins: AttrDataItemType[];
    roasteds: AttrDataItemType[];
    setEntry: SetCoffeeEntry;
    deleteFunction(id: number): void;
    close(): void;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeCardEdit = (props: CoffeeCardEditProps) => {
    // const [entry, setEntry] = useState(props.entry);
    const [saveError, setSaveError] = useState(false);
    const [edited, setEdited] = useState(false);
    const [tab, setTab] = useState(0);

    const saveCard = () => {
        if (props.entry.id === 0) {
            axios
                .post('http://localhost:4000/coffee', { ...props.entry })
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
                .put(`http://localhost:4000/coffee/${props.entry.id}`, { ...props.entry })
                .then((response) => {
                    props.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const updateCard = () => {
        const formData = new FormData();
        const images = props.entry.images;
        // formData.append('images', this.state.entry.images![0].file);
        // formData.append('images', this.state.entry.images![0].file);
        // const imagesArray = this.state.entry.images!.map(({file}) => file)
        // formData.append('images', this.state.entry.images!.map(({file}) => file));

        // if (images && images.length < 0) {
        //     this.state.entry.images!.forEach(({ file }) => {
        //         formData.append('images', file);
        //     });
        // }

        // console.log(formData);
        // console.log('Update card');
        // axios
        //     .put(`http://localhost:4000/coffee/${this.state.entry.id}`, formData)
        //     .then((response) => {
        //         // this.props.close();
        //         console.log('... sucessfully');
        //         this.setState({ edited: false, saveError: false });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         console.log('... failed');
        //         this.setState({ saveError: true });
        //     });
    };

    const deleteCard = () => {
        props.deleteFunction(props.entry.id);
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const eventFiles = event.target.files;

        if (eventFiles === null) {
            return;
        }

        console.log(eventFiles);

        const images = Array.from(eventFiles).map((file) => ({ name: file.name, url: '', alt: file.name, file }));

        if (images !== undefined && images.length > 0) {
            // props.setEntry.setImages(images);
            setEdited(true);
        }
    };

    //tslint:disable-next-line: max-func-body-length
    const { id, images, name, description, origin, rating, kind, roasted } = props.entry;
    const { setId, setImages, setName, setDescription, setOrigin, setRating, setKind, setRoasted } = props.setEntry;
    const { kinds, roasteds, origins, close } = props;

    return (
        <>
            <div className={LocalStyles.CoffeeCardEdit}>
                <div className="col-12">
                    <TextInput name="Name" value={name} onChange={setName} />
                </div>
                <div className={LocalStyles.TabBar}>
                    <ul>
                        <li className={classNames(tab === 0 && LocalStyles.Active)} onClick={() => setTab(0)}>
                            Information
                        </li>
                        <li className={classNames(tab === 1 && LocalStyles.Active)} onClick={() => setTab(1)}>
                            Details
                        </li>
                        <li className={classNames(tab === 2 && LocalStyles.Active)} onClick={() => setTab(2)}>
                            Images
                        </li>
                        <li className={classNames(tab === 3 && LocalStyles.Active)} onClick={() => setTab(3)}>
                            Bewings
                        </li>
                    </ul>
                </div>
                {/* tslint:disable-next-line: max-func-body-length */}
                {(() => {
                    console.log(tab);
                    switch (tab) {
                        case 0: //Info
                            return (
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
                                                <LikeSliderAttrField
                                                    maxValue={5}
                                                    value={rating}
                                                    onChange={setRating}
                                                    name="Gesamtbewertung:"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <TextareaInput
                                                    label="Beschreibung"
                                                    onChange={setDescription}
                                                    value={description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        case 1: //Details
                            return (
                                <>
                                    <div className={LocalStyles.TextSection}>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                {/* <SliderAttrField
                                                    maxValue={5}
                                                    name="Geschmack:"
                                                    value={taste}
                                                    onChange={setTaste}
                                                />Ì */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        case 2: //Images
                            return (
                                <>
                                    <div className={LocalStyles.ImageSection}>
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

                                        {images !== undefined &&
                                            images.map(({ url, alt, file }, i) => (
                                                <img
                                                    src={url === '' ? window.URL.createObjectURL(file) : url}
                                                    alt={alt}
                                                    key={i}
                                                />
                                            ))}
                                    </div>
                                </>
                            );
                        case 3: //Bewings
                            return <></>;
                        default:
                            //Details
                            return <></>;
                    }
                })()}

                <div className={LocalStyles.ButtonSection}>
                    <AdvancedDeleteButton changes={edited} onClick={deleteCard} />
                    <AdvancedCancelButton changes={edited} onClick={close} />
                    <AdvancedSaveButton save={saveCard} close={close} error={saveError} changes={edited} />
                </div>
            </div>
        </>
    );
};
