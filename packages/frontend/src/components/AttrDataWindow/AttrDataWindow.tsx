import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component, FormEvent } from 'react';
import { Form, FormControlProps, Row } from 'react-bootstrap';
import LocalStyles from './AttrDataWindow.module.scss';
import axios from 'axios';

export type AttrDataItemType = {
    id: number;
    name: string;
};

export type AttrDataType = {
    id: number;
    name: string;
    urlSubstring: string;
    description: string;
    items: AttrDataItemType[];
};

export type AttrDataProps = {
    content: AttrDataType[];
    toggleFunktion(): void;
};

export type AttrDataState = {
    selectedCategory: AttrDataType;
    newItemName: string;
};

export class AttrDataWindow extends Component<AttrDataProps, AttrDataState> {
    public readonly state: AttrDataState = {
        selectedCategory: this.props.content[0],
        newItemName: '',
    };

    public selectCategory = (id: number) => {
        this.setState({
            selectedCategory: this.props.content.filter((item) => item.id === id)[0],
        });
    };

    public addNewItem = () => {
        const urlSubstring = this.state.selectedCategory.urlSubstring;
        axios
            .post(`http://localhost:4000/coffeeAttrs/${urlSubstring}`, { id: 0, name: this.state.newItemName })
            .then((response) => {
                console.log(response);
                const header = response.headers['location'];

                this.setState((oldState) => ({
                    selectedCategory: {
                        ...oldState.selectedCategory,
                        items: [
                            ...oldState.selectedCategory.items,
                            { id: Number(response.headers['location'].split('/').pop()), name: oldState.newItemName },
                        ],
                    },
                    newItemName: '',
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public deleteItem = (id: number) => {

        const urlSubstring = this.state.selectedCategory.urlSubstring;

        axios
        .delete(`http://localhost:4000/coffeeAttrs/${urlSubstring}/${id}`)
        .then((response) => {
            console.log(response);

            this.setState((oldState) => ({
                selectedCategory: {
                    ...oldState.selectedCategory,
                    items: oldState.selectedCategory.items.filter((item) => item.id !== id),
                },
            }));
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });

        this.setState((oldState) => ({
            selectedCategory: {
                ...oldState.selectedCategory,
                items: oldState.selectedCategory.items.filter((item) => item.id !== id),
            },
        }));
    };

    public handleItemNameChange = (event: FormEvent<Required<FormControlProps>>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ newItemName: value }));
    };

    public render() {
        const { selectedCategory, newItemName } = this.state;
        const { content, toggleFunktion } = this.props;

        return (
            <>
                <div className={LocalStyles.AttrDataBackground} />
                <div className={LocalStyles.AttrDataWindow}>
                    <Row>
                        <div className={LocalStyles.AttrList}>
                            <FontAwesomeIcon icon="mug-hot" size="3x" color="#8B572A" />
                            <h2>Kaffee Arten</h2>
                            <ul>
                                {content.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => this.selectCategory(item.id)}
                                        className={classnames(item.id === selectedCategory.id && LocalStyles.Active)}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={LocalStyles.AttrItemList}>
                            <button className={LocalStyles.CloseButton} onClick={toggleFunktion}>
                                <FontAwesomeIcon icon="times" color="#929292" />
                            </button>
                            <h2>{selectedCategory.description}</h2>
                            <ul>
                                {selectedCategory.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name}{' '}
                                        <button
                                            onClick={() => this.deleteItem(item.id)}
                                            className={LocalStyles.ListDeleteButton}
                                        >
                                            <FontAwesomeIcon icon="trash-alt" size="xs" color="#929292" />
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <Row>
                                        <Form.Control
                                            type="text"
                                            placeholder="New item"
                                            value={newItemName}
                                            onChange={this.handleItemNameChange}
                                            className={LocalStyles.Input}
                                        />
                                        <button onClick={this.addNewItem} className={LocalStyles.ListAddButton}>
                                            <FontAwesomeIcon icon="plus" color="#929292" size="lg" />
                                        </button>
                                    </Row>
                                </li>
                            </ul>
                        </div>
                    </Row>
                </div>
            </>
        );
    }
}
