import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import { greenAccent, red, yellow, yellowAccent } from '../../style/colors';
import { AttrDataType } from '../AttrDataWindow';
import { CigarEntry } from '../Cigars';
import { BoolInput, DropdownInput, TextareaInput, TextInput } from '../FormElements';
import { SliderAttrField } from '../FormElements/AttrFields';
import { AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../IconButton';
import { IconSelectColumn } from '../IconSelectColumn';
import LocalStyles from './CigarCardEdit.module.scss';

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

    public handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, name: value }, edited: true }));
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
            smokeagain,
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
                                    <TextInput name="Name" value={name} onChange={() => {}} />
                                </div>
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
                                <div className="col-12 col-md-6">
                                    <IconSelectColumn
                                        labelIcon="heart"
                                        labelIconColor={red}
                                        selectIcon="star"
                                        selectIconColor={yellow}
                                        numberOfValues={5}
                                        value={rating}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <BoolInput label="Nochmal rauchen?" onChange={() => {}} value={smokeagain} />
                                </div>
                                <div className="col-12">
                                    <TextareaInput label="Beschreibung" onChange={() => {}} value={description} />
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
                                        onChange={() => {}}
                                    />
                                </div>
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
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarDeckblatt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Deckblatt"
                                        selectedItem={deckplatt}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DropdownInput
                                        items={cigarAnschnitt}
                                        icon="leaf"
                                        iconColor={greenAccent}
                                        label="Anschnitt"
                                        selectedItem={anschnitt}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <TextInput name="Länge:" value={lenght} onChange={() => {}} unit="cm" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <TextInput name="Ringmas:" value={ringmas} onChange={() => {}} unit="cm" />
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <TextInput name="Gekauft am:" value={buydate} onChange={() => {}} unit=" " />
                                </div>
                                <div className="col-12 col-md-6">
                                    <TextInput name="Geraucht am:" value={smokedate} onChange={() => {}} unit=" " />
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <TextInput
                                        name="Rauchdauer:"
                                        value={smokeduration}
                                        onChange={() => {}}
                                        unit="min"
                                    />
                                </div>
                            </div>
                            <div className={LocalStyles.Row}>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField maxValue={5} name="Stärke:" value={strength} onChange={() => {}} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        maxValue={5}
                                        name="Zugwiederstand:"
                                        value={zugwiederstand}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        maxValue={5}
                                        name="Aromavielfalt:"
                                        value={aromavielfalt}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField
                                        maxValue={5}
                                        name="Aromaentwicklung:"
                                        value={aromaentwicklung}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <SliderAttrField maxValue={5} name="Abbrand:" value={abbrand} onChange={() => {}} />
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
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={LocalStyles.Row}>
                        <div className={LocalStyles.ButtonSection}>
                            <AdvancedDeleteButton changes={edited} onClick={this.deleteCard} />
                            <AdvancedCancelButton changes={edited} onClick={close} />
                            <AdvancedSaveButton save={this.saveCard} close={close} error={saveError} changes={edited} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
