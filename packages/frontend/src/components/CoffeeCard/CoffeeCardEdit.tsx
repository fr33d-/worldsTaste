import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classnames from 'classnames';
import React, { Component, FormEvent } from 'react';
import { Button, Col, Form, FormControlProps, Row } from 'react-bootstrap';
import { AttrDataItemType } from '../AttrDataWindow';
import { DropdownColumn } from '../DropdownColumn';
import LocalStyles from './CoffeeCard.module.scss';
import coffeePlaceImage_small from './coffeePlaceImage_small.jpeg';
import { SaveButton } from '../IconButton';
import { CoffeeEntry, CoffeeKind, CoffeeOrigin, CoffeeRoasted } from '.';

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
};

export class CoffeeCardEdit extends Component<CoffeeCardEditProps, CoffeeCardEditState> {
    public readonly state: CoffeeCardEditState = {
        entry: this.props.entry,
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
                this.props.close();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public createCard = () => {
        axios
            .post('http://localhost:4000/coffee', { ...this.state.entry })
            .then((response) => {
                console.log(response);
                this.props.close();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public cancleEdit = () => {
        this.props.close();
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    };

    public handleNameChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, name: value } }));
    };

    public handleDescChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, description: value } }));
    };

    public handleRatingChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, rating: Number(value) } }));
    };

    public handleOriginChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        // destructuring of: (item) => item.name === value
        const origin = this.props.origins.find(({ name }) => name === value);
        if (origin !== undefined) {
            this.setState((state) => ({ entry: { ...state.entry, origin } }));
        }
    };

    public handleKindChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        const kind = this.props.kinds.find((item) => item.name === value);
        if (kind !== undefined) {
            this.setState((state) => ({
                entry: { ...state.entry, kind },
            }));
        }
    };

    public handleRoastChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        const roasted = this.props.roasteds.find((item) => item.name === value);
        if (roasted !== undefined) {
            this.setState((state) => ({
                entry: { ...state.entry, roasted },
            }));
        }
    };

    public render() {
        const { id, images, name, description, origin, rating, kind, roasted } = this.state.entry;
        const { kinds, roasteds, origins } = this.props;

        return (
            <>
                <div
                    className={classnames( LocalStyles.CoffeeCard, LocalStyles.Edit )}
                >
                    <div className={LocalStyles.CoffeeCardActionSection}>
                        {(
                            <>
                                <button onClick={this.cancleEdit}>
                                    <FontAwesomeIcon icon="save" /> Cancle
                                </button>
                                <SaveButton withText />
                            </>
                        )}
                        <button onClick={this.deleteCard}>
                            <FontAwesomeIcon icon="trash-alt" /> Delete
                        </button>
                    </div>
                    <div className={LocalStyles.CoffeeCardImageSection}>
                        <Button variant="outline-secondary">
                            <FontAwesomeIcon icon="upload" />
                        </Button>

                        {images !== undefined && images.length > 0 && (
                            images.map((img, i) => <img src={img.url} alt={img.alt} key={i} />)
                        )}
                    </div>
                    <div className={LocalStyles.CoffeeCardTextSection}>
                        {(
                            <>
                                <Form>
                                    <Row>
                                        <Col>
                                            <h2>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={this.handleNameChange}
                                                />
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <DropdownColumn
                                            label="Herkunft"
                                            items={origins}
                                            onChange={this.handleOriginChange}
                                            selectedItem={origin}
                                        />
                                        <DropdownColumn
                                            label="Art"
                                            items={kinds}
                                            onChange={this.handleKindChange}
                                            selectedItem={kind}
                                        />
                                    </Row>
                                    <Row>
                                        <DropdownColumn
                                            label="Rösterei"
                                            items={roasteds}
                                            onChange={this.handleRoastChange}
                                            selectedItem={roasted}
                                        />
                                        <Col>
                                            <Form.Label>Bewertung</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="0"
                                                value={`${rating}`}
                                                onChange={this.handleRatingChange}
                                            />
                                            / 5
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Beschreibung</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="6"
                                                value={description}
                                                onChange={this.handleDescChange}
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
