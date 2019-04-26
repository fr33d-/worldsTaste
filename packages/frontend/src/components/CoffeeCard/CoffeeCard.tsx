import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import LocalStyles from './CoffeeCard.module.scss';

// import Styles from '../../index.module.scss';

export type Image = {
    name: string;
    url: string;
    alt?: string;
};

export type CoffeeEntry = {
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
};

type CoffeeCardState = {
    expanded: boolean;
    edit: boolean;
};

export class CoffeeCard extends Component<CoffeeCardProps, CoffeeCardState> {
    public readonly state: CoffeeCardState = {
        expanded: false,
        edit: this.props.entry.name === '',
    };

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
        console.log('toggled');
    };

    public editCard = () => {
        this.setState({ edit: true });
    };

    public saveCard = () => {
        //Todo: api call to save the card
        this.setState({ edit: false });
    };

    public render() {
        const { images, name, description, origin, rating, kind, roasted } = this.props.entry;
        const { expanded, edit } = this.state;

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
                        <button>
                            <FontAwesomeIcon icon="trash-alt" />
                        </button>
                        <button onClick={this.toggleCard}>
                            {!expanded && <FontAwesomeIcon icon="chevron-down" />}
                            {expanded && <FontAwesomeIcon icon="chevron-up" />}
                        </button>
                    </div>
                    <div className={LocalStyles.CoffeeCardImageSection}>
                    {edit && <Button variant="outline-secondary"><FontAwesomeIcon icon="upload" /></Button>}
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
                                                <Form.Control placeholder="Name" value={name} />
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Herkunft</Form.Label>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Control as="select">
                                                    <option>Hawaii</option>
                                                    <option>Mexico</option>
                                                    <option>Puerto Rico</option>
                                                    <option>Guatemala</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Label>Art</Form.Label>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Control as="select">
                                                    <option>Leichter Kaffe</option>
                                                    <option>Starker Kaffe</option>
                                                    <option>Espresso</option>
                                                    <option>Starker Espresso</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Rösterei</Form.Label>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Control as="select">
                                                    <option>Roesstrommel - Nuremberg</option>
                                                    <option>Vits - Munich</option>
                                                    <option>Gang und Gaebe - Munich</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Label>Bewertung</Form.Label>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Control as="select">
                                                    <option>1/5</option>
                                                    <option>2/5</option>
                                                    <option>3/5</option>
                                                    <option>4/5</option>
                                                    <option>5/5</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Beschreibung</Form.Label>
                                            <Form.Control as="textarea" rows="6" value={description} />
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
