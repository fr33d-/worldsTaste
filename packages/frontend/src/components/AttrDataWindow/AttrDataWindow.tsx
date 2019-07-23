import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { Form, FormControlProps, Row } from 'react-bootstrap';
import LocalStyles from './AttrDataWindow.module.scss';
import axios from 'axios';
import { AttrDataType } from '../FormComponents';

export type AttrDataProps = {
    content: AttrDataType[];
    toggleFunktion(): void;
};

export type AttrDataState = {
    selectedCategory: AttrDataType;
    newItemName: string;
    error: boolean;
};

export class AttrDataWindow extends Component<AttrDataProps, AttrDataState> {
    public readonly state: AttrDataState = {
        selectedCategory: this.props.content[0],
        newItemName: '',
        error: false,
    };

    public selectCategory = (id: number) => {
        this.setState({
            selectedCategory: this.props.content.filter((item) => item.id === id)[0],
        });
    };

    public addNewItem = () => {
        const urlSubstring = this.state.selectedCategory.urlSubstring;
        axios
            .post(`http://localhost:4000/${urlSubstring}`, { id: 0, name: this.state.newItemName })
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
                    error: false,
                }));
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: true });
            });
    };

    public deleteItem = (id: number) => {
        const urlSubstring = this.state.selectedCategory.urlSubstring;

        axios
            .delete(`http://localhost:4000/${urlSubstring}/${id}`)
            .then((response) => {
                console.log(response);

                this.setState((oldState) => ({
                    selectedCategory: {
                        ...oldState.selectedCategory,
                        items: oldState.selectedCategory.items.filter((item) => item.id !== id),
                        error: false,
                    },
                }));
            })
            .catch((error) => {
                // handle error
                console.log(error);
                this.setState({ error: true });
            });
    };

    public handleItemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        this.setState((state) => ({ newItemName: value }));
    };

    public handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.addNewItem();
        }
      }

    public render() {
        const { selectedCategory, newItemName, error } = this.state;
        const { content, toggleFunktion } = this.props;

        return (
            <>
                <div className={LocalStyles.AttrDataBackground} />
                <div className={LocalStyles.AttrDataWindow}>
                    <Row>
                        <div className={LocalStyles.AttrList}>
                            <FontAwesomeIcon icon="mug-hot" size="3x" color="#8B572A" />
                            <h2>Kaffee Daten</h2>
                            <ul>
                                {content.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => this.selectCategory(item.id)}
                                        className={classnames(item.id === selectedCategory.id && LocalStyles.Active)}
                                    >
                                        {item.name}
                                        <span> ({item.items.length})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={LocalStyles.AttrItemList}>
                            <button className={LocalStyles.CloseButton} onClick={toggleFunktion}>
                                <FontAwesomeIcon icon="times" color="#929292" />
                            </button>
                            <span className={LocalStyles.ListHeader}>
                                <h2>{selectedCategory.name}</h2>
                                {selectedCategory.description}
                            </span>
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
                                        <input
                                            type="text"
                                            placeholder="New item"
                                            value={newItemName}
                                            onChange={this.handleItemNameChange}
                                            className={LocalStyles.Input}
                                            onKeyPress={this.handleKeyPress}
                                        />
                                        <button onClick={this.addNewItem} className={LocalStyles.ListAddButton}>
                                            <FontAwesomeIcon icon="plus" color="#929292" size="lg" />
                                        </button>
                                    </Row>
                                </li>
                            </ul>
                            {error && <p className={LocalStyles.Error}>Theres a error with the server, sorry!</p>}
                        </div>
                    </Row>
                </div>
            </>
        );
    }
}
