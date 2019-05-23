import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component, FormEventHandler, FormEvent, ChangeEvent } from 'react';
import { Col, Form, Row, Button, FormControlProps, FormControl } from 'react-bootstrap';
import LocalStyles from './CoffeeCard.module.scss';

// import Styles from '../../index.module.scss';

export type Image = {
    name: string;
    url: string;
    alt?: string;
};

export type CoffeeEntry = {
    id: number;
    images: Image[];
    name: string;
    description: string;
    origin: string;
    rating: number;
    kind: string;
    roasted: string;
};

type CoffeeCardProps = {
    entry: CoffeeEntry;
    saveFunction(post: CoffeeEntry): void;
    deleteFunction(id: number): void;
};

type CoffeeCardState = {
    expanded: boolean;
    edit: boolean;
    entry: CoffeeEntry;
};

type DropdownComponentProps = {
    label: string;
    items: string[];
    onChange(event: FormEvent<Required<FormControlProps>>): void;
};

const DropdownColumn = ({ items, label, onChange }: DropdownComponentProps) => (
    <Col>
        <Form.Label>{label}</Form.Label>
        <Form.Group>
            <Form.Control as="select" onChange={onChange}>
                {items.map((item, i) => (
                    <option key={i}>{item}</option>
                ))}
            </Form.Control>
        </Form.Group>
    </Col>
);

export class CoffeeCard extends Component<CoffeeCardProps, CoffeeCardState> {
    public readonly state: CoffeeCardState = {
        expanded: false,
        edit: this.props.entry.name === '',
        entry: this.props.entry,
    };

    public constructor(props: CoffeeCardProps) {
        super(props);
        console.log(this.props.entry);
    }

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
        console.log('toggled');
    };

    public editCard = () => {
        this.setState({ edit: true });
    };

    public saveCard = () => {
        this.setState({ edit: false });

        console.log('try to save new card');
        this.props.saveFunction(this.state.entry);
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    }

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
        this.setState((state) => ({ entry: { ...state.entry, origin: value } }));
    };

    public handleKindChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, kind: value } }));
    };

    public handleRoastChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ entry: { ...state.entry, roasted: value } }));
    };

    // tslint:disable:max-func-body-length
    public render() {
        const { expanded, edit } = this.state;
        const { id, images, name, description, origin, rating, kind, roasted } = this.state.entry;
        const { deleteFunction } = this.props;

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
                        {!edit && (
                            <>
                                <button onClick={this.editCard}>
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                            </>
                        )}
                        {edit && (
                            <>
                                <button onClick={this.saveCard}>
                                    <FontAwesomeIcon icon="save" />
                                </button>
                            </>
                        )}
                        <button onClick={this.deleteCard}>
                            <FontAwesomeIcon icon="trash-alt" />
                        </button>
                        <button onClick={this.toggleCard}>
                            {!expanded && <FontAwesomeIcon icon="chevron-down" />}
                            {expanded && <FontAwesomeIcon icon="chevron-up" />}
                        </button>
                    </div>
                    <div className={LocalStyles.CoffeeCardImageSection}>
                        {edit && (
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon="upload" />
                            </Button>
                        )}
                        {!expanded && images !== undefined && images.length > 0 && (
                            <img src={images[0].url} alt={images[0].alt} />
                        )}
                        {expanded &&
                            images !== undefined &&
                            images.length > 0 &&
                            images.map((img, i) => <img src={img.url} alt={img.alt} key={i} />)}
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
                                            items={['Hawaii', 'Mexico', 'Puerto Rico', 'Guatemala']}
                                            onChange={this.handleOriginChange}
                                        />
                                        <DropdownColumn
                                            label="Art"
                                            items={['Leichter Kaffee', 'Starker Kaffe', 'Espresso', 'Starker Espresso']}
                                            onChange={this.handleKindChange}
                                        />
                                    </Row>
                                    <Row>
                                        <DropdownColumn
                                            label="Rösterei"
                                            items={[
                                                'Roesstrommel - Nuremberg',
                                                'Vits - Munich',
                                                'Gang und Gaebe - Munich',
                                            ]}
                                            onChange={this.handleRoastChange}
                                        />
                                        <DropdownColumn
                                            label="Bewertung"
                                            items={['1', '2', '3', '4', '5']}
                                            onChange={this.handleRatingChange}
                                        />
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
                                    <span>Herkunft:</span> {origin}
                                </p>
                                <p>
                                    <span>Art:</span> {kind}
                                </p>
                                <p>
                                    <span>Geröstet in:</span> {roasted}
                                </p>
                                <p>
                                    <span>Raging:</span> {rating}/5
                                </p>
                                <p className={LocalStyles.Description}>
                                    <span>Beschreibung:</span>
                                    <br />
                                    {!expanded && `${description.substring(0, 200)} ...`}
                                    {expanded && description}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
