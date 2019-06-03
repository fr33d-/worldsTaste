import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component, FormEventHandler, FormEvent, ChangeEvent } from 'react';
import { Col, Form, Row, Button, FormControlProps, FormControl } from 'react-bootstrap';
import LocalStyles from './CoffeeCard.module.scss';
import axios from 'axios';

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

type DropdownComponentProps = {
    label: string;
    items: string[];
    onChange(event: FormEvent<Required<FormControlProps>>): void;
    selectedItem: number;
};

const DropdownColumn = ({ items, label, onChange, selectedItem }: DropdownComponentProps) => (
    <Col>
        <Form.Label>{label}</Form.Label>
        <Form.Group>
            <Form.Control as="select" onChange={onChange}>
                <option>unknown</option>
                {items.map((item, i) => {
                    if (i === selectedItem) {
                        return (
                            <option key={i} selected>
                                {item}
                            </option>
                        );
                    } else {
                        return <option key={i}>{item}</option>;
                    }
                })}
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
        // console.log(this.props.entry);
    }

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
        const { kinds, roasteds, origins } = this.props;

        let roastedsStrings: string[] = [];
        let originsStrings: string[] = [];
        let kindsStrings: string[] = [];

        roasteds.map((item) => roastedsStrings.push(item.name));
        kinds.map((item) => kindsStrings.push(item.name));
        origins.map((item) => originsStrings.push(item.name));

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
                                <button onClick={this.cancleEdit}>
                                    <FontAwesomeIcon icon="save" /> Cancle
                                </button>
                                <button onClick={this.saveCard}>
                                    <FontAwesomeIcon icon="save" /> Save
                                </button>
                            </>
                        )}
                        <button onClick={this.deleteCard}>
                            {!edit && <FontAwesomeIcon icon="trash-alt" />}
                            {edit && (
                                <>
                                    <FontAwesomeIcon icon="trash-alt" /> Delete{' '}
                                </>
                            )}
                        </button>
                        <button onClick={this.toggleCard}>
                            {!expanded && !edit && <FontAwesomeIcon icon="chevron-down" />}
                            {expanded && !edit && <FontAwesomeIcon icon="chevron-up" />}
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
                                            items={originsStrings}
                                            onChange={this.handleOriginChange}
                                            //Todo: hier müsste die nummer stehen des tabelleneintrags
                                            // und nicht der string des namesn
                                            selectedItem={0}
                                        />
                                        <DropdownColumn
                                            label="Art"
                                            items={kindsStrings}
                                            onChange={this.handleKindChange}
                                            selectedItem={0}
                                        />
                                    </Row>
                                    <Row>
                                        <DropdownColumn
                                            label="Rösterei"
                                            items={roastedsStrings}
                                            onChange={this.handleRoastChange}
                                            selectedItem={0}
                                        />
                                        <DropdownColumn
                                            label="Bewertung"
                                            items={['1', '2', '3', '4', '5']}
                                            onChange={this.handleRatingChange}
                                            selectedItem={rating}
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
                                    <span>Herkunft:</span> {origin} {/* Todo: Hier müsste nicht der eintrag sthen sondern die nummer aus dem array aller origins die in der db steht, bei 0 unknown  */}
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
