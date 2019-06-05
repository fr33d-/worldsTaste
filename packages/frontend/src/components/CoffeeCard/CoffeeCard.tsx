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

// import Styles from '../../index.module.scss';

export type Image = {
    name: string;
    url: string;
    alt?: string;
};

export type CoffeeEntry = {
    id: number;
    images?: Image[];
    name: string;
    description: string;
    origin: AttrDataItemType;
    rating: number;
    kind: AttrDataItemType;
    roasted: AttrDataItemType;
};

export type CoffeeKind = {
    id: number;
    name: string;
};

export type CoffeeRoasted = {
    id: number;
    name: string;
};

export type CoffeeOrigin = {
    id: number;
    name: string;
};

type CoffeeCardProps = {
    entry: CoffeeEntry;
    kinds: CoffeeKind[];
    origins: CoffeeOrigin[];
    roasteds: CoffeeRoasted[];
    saveFunction(post: CoffeeEntry): void;
    deleteFunction(id: number): void;
};

type CoffeeCardState = {
    expanded: boolean;
    edit: boolean;
    entry: CoffeeEntry;
};

export class CoffeeCard extends Component<CoffeeCardProps, CoffeeCardState> {
    public readonly state: CoffeeCardState = {
        expanded: false,
        edit: this.props.entry.name === '',
        entry: this.props.entry,
    };

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
        console.log('toggled');
    };

    public editCard = () => {
        this.setState({ edit: true });
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
                console.log(response);
                this.setState({ edit: false });
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
                this.setState({ edit: false });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public cancleEdit = () => {
        this.setState({ edit: false, entry: this.props.entry });
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

    // tslint:disable:max-func-body-length
    public render() {
        const { expanded, edit } = this.state;
        const { id, images, name, description, origin, rating, kind, roasted } = this.state.entry;
        const { kinds, roasteds, origins } = this.props;

        return (
            <>
                <div
                    className={classnames(
                        LocalStyles.CoffeeCard,
                        expanded && LocalStyles.Extended,
                        edit && LocalStyles.Edit
                    )}
                >
                    <div className={LocalStyles.CoffeeCardActionSection}>
                        {edit ? (
                            <>
                                <button onClick={this.cancleEdit}>
                                    <FontAwesomeIcon icon="save" /> Cancle
                                </button>
                                <SaveButton withText />
                            </>
                        ) : (
                            <button onClick={this.editCard}>
                                <FontAwesomeIcon icon="edit" />
                            </button>
                        )}
                        <button onClick={this.deleteCard}>
                            <FontAwesomeIcon icon="trash-alt" />
                            {edit && 'Delete'}
                        </button>
                        {!edit && (
                            <button onClick={this.toggleCard}>
                                <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                            </button>
                        )}
                    </div>
                    <div className={LocalStyles.CoffeeCardImageSection}>
                        {edit && (
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon="upload" />
                            </Button>
                        )}

                        {images !== undefined && images.length > 0 ? (
                            <>
                                {expanded ? (
                                    images.map((img, i) => <img src={img.url} alt={img.alt} key={i} />)
                                ) : (
                                     <img src={images[0].url} alt={images[0].alt} />
                                )}
                            </>
                        ) : ( !edit && <img src={coffeePlaceImage_small} />)}
                    </div>
                    <div className={LocalStyles.CoffeeCardTextSection}>
                        {edit && (
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
                        {!edit && (
                            <>
                                <h2>{name}</h2>
                                <p>
                                    <span>Herkunft:</span> {origin.name}
                                </p>
                                <p>
                                    <span>Art:</span> {kind.name}
                                </p>
                                <p>
                                    <span>Geröstet in:</span> {roasted.name}
                                </p>
                                <p>
                                    <span>Raging:</span> {rating}/5
                                </p>
                                <p className={LocalStyles.Description}>
                                    <span>Beschreibung:</span>
                                    <br />
                                    {expanded ? description : `${description.substring(0, 200)} ...`}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
