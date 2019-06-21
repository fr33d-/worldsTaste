import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Button, Col, Form, FormControlProps, Row, Container } from 'react-bootstrap';
import { CoffeeEntry, CoffeeKind, CoffeeOrigin, CoffeeRoasted } from '.';
import { DropdownColumn } from '../DropdownColumn';
import { SaveButton, DeleteButton, CancelButton, AdvancedCancelButton, AdvancedDeleteButton, AdvancedSaveButton } from '../IconButton';
import LocalStyles from './CoffeeCardEdit.module.scss';
import { green, brown, blue, red, yellow, grayDarker } from '../../style/colors';
import { IconSelectColumn } from '../IconSelectColumn';

type CoffeeCardEditProps = {
    entry: CoffeeEntry;
    kinds: CoffeeKind[];
    origins: CoffeeOrigin[];
    roasteds: CoffeeRoasted[];
    saveFunction(post: CoffeeEntry): void;
    deleteFunction(id: number): void;
    close(): void;
};

type CoffeeCardEditState = {
    entry: CoffeeEntry;
    saveError: boolean;
    edited: boolean;
};

export class CoffeeCardEdit extends Component<CoffeeCardEditProps, CoffeeCardEditState> {
    public readonly state: CoffeeCardEditState = {
        entry: this.props.entry,
        saveError: false,
        edited: false,
    };

    public saveCard = () => {
        if (this.state.entry.id === 0) {
            this.createCard();
        } else {
            this.updateCard();
        }
    };

    public updateCard = () => {
        axios
            .put(`http://localhost:4000/coffee/${this.state.entry.id}`, { ...this.state.entry })
            .then((response) => {
                // this.props.close();
                this.setState({edited: false, saveError: false})
            })
            .catch((error) => {
                console.log(error);
                this.setState({saveError: true})
            });
    };

    public createCard = () => {
        axios
            .post('http://localhost:4000/coffee', { ...this.state.entry })
            .then((response) => {
                console.log(response);
                // this.props.close();
                this.setState({edited: false, saveError: false})
            })
            .catch((error) => {
                console.log(error);
                this.setState({saveError: true})
            });
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    };

    public handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, name: value }, edited: true }));
    };

    public handleDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, description: value }, edited: true }));
    };

    public handleRatingChange = (i: number) => {
        console.log('clicked on ' + i);
        this.setState((state) => ({ entry: { ...state.entry, rating: i }, edited: true }));
    };

    public handleOriginChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        const origin = this.props.origins.find(({ name }) => name === value);
        if (origin !== undefined) {
            this.setState((state) => ({ entry: { ...state.entry, origin }, edited: true }));
        }
    };

    public handleKindChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        const kind = this.props.kinds.find((item) => item.name === value);
        if (kind !== undefined) {
            this.setState((state) => ({
                entry: { ...state.entry, kind },
                edited: true
            }));
        }
    };

    public handleRoastChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        const roasted = this.props.roasteds.find((item) => item.name === value);
        if (roasted !== undefined) {
            this.setState((state) => ({
                entry: { ...state.entry, roasted },
                edited: true
            }));
        }
    };

    public handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const eventFiles = event.target.files;

        if (eventFiles === null) {
            return;
        }

        console.log(eventFiles);

        const images = Object.entries(eventFiles)
            .filter(([key, _]) => key !== 'length')
            .map(([_, file]) => ({ name: file.name, url: '', alt: file.name, file }));

        if (images.length > 0) {
            this.setState((state) => ({
                entry: { ...state.entry, images },
                edited: true
            }));
        }
    };

    //tslint:disable-next-line: max-func-body-length
    public render() {
        const { id, images, name, description, origin, rating, kind, roasted } = this.state.entry;
        const { edited, saveError } = this.state;
        const { kinds, roasteds, origins, close } = this.props;

        return (
            <>
                <div className={LocalStyles.CoffeeCardEdit}>
                    <div className={LocalStyles.Row}>
                        <div className={LocalStyles.ImageSection}>
                            <div className={LocalStyles.UploadArea}>
                                <label htmlFor="file">
                                    {/* <Button variant="outline-secondary"> */}
                                    <FontAwesomeIcon icon="upload" />
                                    {/* </Button> */}
                                </label>
                                <br />
                                <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    onChange={this.handleFileUpload}
                                    className={LocalStyles.Fileupload}
                                    id="file"
                                />
                            </div>

                            {images !== undefined &&
                                images.map(({ url, alt, file }, i) => (
                                    <img src={url === '' ? window.URL.createObjectURL(file) : url} alt={alt} key={i} />
                                ))}
                        </div>
                        <div className={LocalStyles.TextSection}>
                            <h2>Kaffee</h2>
                            <Form>
                                <Row>
                                    <Col>
                                        <div className={LocalStyles.NameInput}>
                                            <span>Name</span>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={this.handleNameChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <DropdownColumn
                                        iconLabel="globe-americas"
                                        iconLabelColor={green}
                                        items={origins}
                                        onChange={this.handleOriginChange}
                                        selectedItem={origin}
                                    />
                                    <DropdownColumn
                                        iconLabel="mug-hot"
                                        iconLabelColor={brown}
                                        items={kinds}
                                        onChange={this.handleKindChange}
                                        selectedItem={kind}
                                    />
                                </Row>
                                <Row>
                                    <DropdownColumn
                                        iconLabel="flask"
                                        iconLabelColor={blue}
                                        items={roasteds}
                                        onChange={this.handleRoastChange}
                                        selectedItem={roasted}
                                    />
                                    <Col>
                                        <IconSelectColumn
                                            labelIcon="heart"
                                            labelIconColor={red}
                                            selectIcon="star"
                                            selectIconColor={yellow}
                                            numberOfValues={5}
                                            value={rating}
                                            onChange={this.handleRatingChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className={LocalStyles.DescriptionInput}>
                                            <FontAwesomeIcon icon="bars" size="lg" color={grayDarker} />
                                            <textarea
                                                placeholder="Beschreibung"
                                                value={description}
                                                onChange={this.handleDescChange}
                                                className="formElement"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                    <div className={LocalStyles.Row}>
                        <div className={LocalStyles.ButtonSection}>
                            <AdvancedDeleteButton changes={edited} onClick={this.deleteCard} />
                            <AdvancedCancelButton changes={edited} onClick={close} />
                            <AdvancedSaveButton save={this.saveCard} close={close} error={saveError} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
