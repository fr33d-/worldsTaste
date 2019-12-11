import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component, ChangeEvent, KeyboardEvent, useState } from 'react';
import { Form, FormControlProps, Row } from 'react-bootstrap';
import LocalStyles from './AttrDataWindow.module.scss';
import axios from 'axios';
import { AttrDataType } from '../FormComponents';

export type AttrDataProps = {
    content: AttrDataType[];
    close(): void;
};

export type AttrDataState = {
    selectedCategory: AttrDataType;
    newItemName: string;
    error: boolean;
};

export const AttrDataWindow = ({ close, content }: AttrDataProps) => {
    const [selectedCategory, setSelectedCategory] = useState<AttrDataType>(content[0]);
    const [newItemName, setNewItemName] = useState<string>();
    const [error, setError] = useState<boolean>(false);

    // public readonly state: AttrDataState = {
    //     selectedCategory: this.props.content[0],
    //     newItemName: '',
    //     error: false,
    // };

    const selectCategory = (id: number) => {
        setSelectedCategory(content.filter((item) => item.id === id)[0]);
    };

    const addNewItem = () => {
        const urlSubstring = selectedCategory.urlSubstring;
        axios
            .post(`http://localhost:4000/${urlSubstring}`, { id: 0, name: newItemName })
            .then((response) => {
                console.log(response);
                const header = response.headers['location'];

                // this.setState((oldState) => ({
                //     selectedCategory: {
                //         ...oldState.selectedCategory,
                //         items: [
                //             ...oldState.selectedCategory.items,
                //             { id: Number(response.headers['location'].split('/').pop()), name: oldState.newItemName },
                //         ],
                //     },
                //     newItemName: '',
                //     error: false,
                // }));
                setSelectedCategory((cat) => (
                    { ...cat, 

                        items: [
                            ...cat.items, 
                            { id: Number(response.headers['location'].split('/').pop()), name: newItemName ? newItemName : 'new Item Name' },
                        ]
                    }));
                setNewItemName('');
                setError(false);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    };

    const deleteItem = (id: number) => {
        const urlSubstring = selectedCategory.urlSubstring;

        axios
            .delete(`http://localhost:4000/${urlSubstring}/${id}`)
            .then((response) => {
                console.log(response);

                // this.setState((oldState) => ({
                //     selectedCategory: {
                //         ...oldState.selectedCategory,
                //         items: oldState.selectedCategory.items.filter((item) => item.id !== id),
                //         error: false,
                //     },
                // }));

                setSelectedCategory((cat) => ({ ...cat, items: cat.items.filter((item) => item.id !== id) }));
                setError(false);
            })
            .catch((error) => {
                // handle error
                console.log(error);
                setError(true);
            });
    };

    const handleItemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setNewItemName(value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewItem();
        }
    };

    return (
        <>
            <div className={LocalStyles.AttrDataWindow}>
                <Row>
                    <div className={LocalStyles.AttrList}>
                        {/* <FontAwesomeIcon icon="mug-hot" size="3x" color="#8B572A" /> */}
                        <h2>Kaffee Daten</h2>
                        <ul>
                            {content.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => selectCategory(item.id)}
                                    className={classnames(item.id === selectedCategory.id && LocalStyles.Active)}
                                >
                                    {item.name}
                                    <span> ({item.items.length})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={LocalStyles.AttrItemList}>
                        <button className={LocalStyles.CloseButton} onClick={() => close()}>
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
                                        onClick={() => deleteItem(item.id)}
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
                                        onChange={handleItemNameChange}
                                        className={LocalStyles.Input}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button onClick={addNewItem} className={LocalStyles.ListAddButton}>
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
};
