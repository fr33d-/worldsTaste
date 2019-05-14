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
};

type CoffeeCardState = {
    expanded: boolean;
    edit: boolean;
    entry: CoffeeEntry;
};

type DropdownComponentProps = {
    label: string;
    items: string[];
};

const DropdownColumn = ({ items, label }: DropdownComponentProps) => (
    <Col>
        <Form.Label>{label}</Form.Label>
        <Form.Group>
            <Form.Control as="select">
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

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
        console.log('toggled');
    };

    public editCard = () => {
        this.setState({ edit: true });
    };

    public saveCard = (post: CoffeeEntry) => () => {
        this.setState({ edit: false });

        console.log('try to save new card');
        this.props.saveFunction(post);
    };

    // public handleChange = (event: FormEvent<Required<FormControlProps>>, field: string) => {
    //     this.setState((state) => ({ entry: { ...state.entry, field: event.currentTarget.value } }));
    //Hier müsste ein name stehen, aber field wird nicht aufgelöst
    // };

    public handleNameChange = (event: FormEvent<Required<FormControlProps>>) => {
        this.setState((state) => ({ entry: { ...state.entry, name: event.currentTarget.value } }));
    };

    public handleDescChange = (event: FormEvent<Required<FormControlProps>>) => {
        this.setState((state) => ({ entry: { ...state.entry, description: event.currentTarget.value } }));
    };

    // tslint:disable:max-func-body-length
    public render() {
        const { expanded, edit } = this.state;
        const { images, name, description, origin, rating, kind, roasted } = this.state.entry;
        const { entry } = this.state;

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
                                <button onClick={this.saveCard(entry)}>
                                    <FontAwesomeIcon icon="save" />
                                </button>
                            </>
                        )}
                        <button>
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
                        {!expanded && images.length > 0 && <img src={images[0].url} alt={images[0].alt} />}
                        {expanded &&
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
                                        />
                                        <DropdownColumn
                                            label="Art"
                                            items={['Leichter Kaffee', 'Starker Kaffe', 'Espresso', 'Starker Espresso']}
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
                                        />
                                        <DropdownColumn label="Bewertung" items={['1', '2', '3', '4', '5']} />
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
                                    <span>Geröstet in:</span> {kind}
                                </p>
                                <p>
                                    <span>Raging:</span> {rating}/5
                                </p>
                                <p className={LocalStyles.Description}>
                                    <span>Beschreibung:</span>
                                    <br />
                                    {!expanded && description.substring(0, 200) + ' ...'}
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
