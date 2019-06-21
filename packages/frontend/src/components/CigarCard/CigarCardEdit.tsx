import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Button, Col, Form, FormControlProps, Row, Container } from 'react-bootstrap';
import { DropdownColumn } from '../DropdownColumn';
import {
    SaveButton,
    DeleteButton,
    CancelButton,
    AdvancedCancelButton,
    AdvancedDeleteButton,
    AdvancedSaveButton,
} from '../IconButton';
import LocalStyles from './CigarCardEdit.module.scss';
import { green, brown, blue, red, yellow, grayDarker, yellowAccent, greenAccent } from '../../style/colors';
import { IconSelectColumn } from '../IconSelectColumn';
import { CigarEntry } from '../Cigars';
import { AttrDataType, AttrDataItemType } from '../AttrDataWindow';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import { TextInput, DropdownInput } from '../FormElements';

type CigarCardEditProps = {
    entry: CigarEntry;
    cigarsProducer: AttrDataType;
    cigarsOrigin: AttrDataType;
    cigarEinlage: AttrDataType;
    cigarUmblatt: AttrDataType;
    cigarDeckblatt: AttrDataType;
    cigarAnschnitt: AttrDataType;
    cigarAromarad: AttrDataType;
    saveFunction(post: CigarEntry): void;
    deleteFunction(id: number): void;
    close(): void;
};

type CigarCardEditState = {
    entry: CigarEntry;
    saveError: boolean;
    edited: boolean;
};

export class CigarCardEdit extends Component<CigarCardEditProps, CigarCardEditState> {
    public readonly state: CigarCardEditState = {
        entry: this.props.entry,
        saveError: false,
        edited: false,
    };

    public saveCard = () => {
        if (this.state.entry.id === 0) {
            axios
                .post('http://localhost:4000/cigars', { ...this.state.entry })
                .then((response) => {
                    console.log(response);
                    // this.props.close();
                    this.setState({ edited: false, saveError: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ saveError: true });
                });
        } else {
            axios
                .put(`http://localhost:4000/cigars/${this.state.entry.id}`, { ...this.state.entry })
                .then((response) => {
                    // this.props.close();
                    this.setState({ edited: false, saveError: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ saveError: true });
                });
        }
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    };

    //tslint:disable-next-line: max-func-body-length
    public render() {
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
        } = this.state.entry;
        const { edited, saveError } = this.state;
        const {
            close,
            cigarAnschnitt,
            cigarAromarad,
            cigarDeckblatt,
            cigarEinlage,
            cigarUmblatt,
            cigarsOrigin,
            cigarsProducer,
        } = this.props;

        return (
            <>
                <div className={LocalStyles.CigarCardEdit}>
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
                        <h2>Kaffee</h2>
                        <div className="row">
                            <div className="col-12">
                                <TextInput name="Name" value={name} onChange={() => {}} />
                            </div>
                        </div>
                        <div className={LocalStyles.Row}>
                            <div className="col-12 col-md-6">
                                <DropdownInput
                                    items={cigarsProducer}
                                    icon="store"
                                    iconColor={yellowAccent}
                                    label="Hersteller"
                                    selectedItem={producer}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <DropdownInput
                                    items={cigarsOrigin}
                                    icon="globe-americas"
                                    iconColor={greenAccent}
                                    label="Herkunft"
                                    selectedItem={origin}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        <div className={LocalStyles.Row}>
                            <div className="col-12">Description</div>
                        </div>
                        <div className={LocalStyles.Row}>
                            <div className="col-12 col-md-6">Rating</div>
                            <div className="col-12 col-md-6">Nochmal rauen?</div>
                        </div>
                        <div className={LocalStyles.Row}>
                            <div className="col-12"><h3>Details</h3></div>
                        </div>
                        <div className={LocalStyles.Row}>
                            <div className="col-12 col-md-6">
                                <DropdownInput
                                    items={cigarEinlage}
                                    icon="leaf"
                                    iconColor={greenAccent}
                                    label="Einlage"
                                    selectedItem={einlage}
                                    onChange={() => {}}
                                /></div>
                            <div className="col-12 col-md-6">
                            <DropdownInput
                                    items={cigarUmblatt}
                                    icon="leaf"
                                    iconColor={greenAccent}
                                    label="Umblatt"
                                    selectedItem={umblatt}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <DropdownInput
                                    items={cigarDeckblatt}
                                    icon="leaf"
                                    iconColor={greenAccent}
                                    label="Deckblatt"
                                    selectedItem={deckplatt}
                                    onChange={() => {}}
                                /></div>
                            <div className="col-12 col-md-6">
                            <DropdownInput
                                    items={cigarEinlage}
                                    icon="leaf"
                                    iconColor={greenAccent}
                                    label="Einlage"
                                    selectedItem={einlage}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <TextInput name="Länge" value={lenght} onChange={() => {}} />
                            </div>
                            <div className="col-12 col-md-6">
                                <TextInput name="Name" value={name} onChange={() => {}} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
