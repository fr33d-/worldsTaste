import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classnames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Row } from 'react-bootstrap';
import { baseURL } from '../../data';
import { AttrDataType } from '../../components/FormComponents';
import LocalStyles from './AttrDataWindow.module.scss';
import { addNewItem, deleteItem } from './AttrDataHelperFunctions';
import { async } from 'q';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';

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

    const selectCategory = (id: number) => {
        setSelectedCategory(content.filter((item) => item.id === id)[0]);
    };

    const innerAddNewItem = () => {
        if (newItemName) {
            addNewItem(selectedCategory.urlSubstring, newItemName)
                .then((id) => {
                    setSelectedCategory((cat) => ({
                        ...cat,
                        items: [...cat.items, { id: id, name: newItemName }],
                    }));
                    setNewItemName('');
                    setError(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                });
        }
    };

    const innerDeleteItem = (id: number) => {
        deleteItem(selectedCategory.urlSubstring, id)
            .then(() => {
                setSelectedCategory((cat) => ({ ...cat, items: cat.items.filter((item) => item.id !== id) }));
                setError(false);
                throwDataSucess('item deleted');
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                throwDataError('cand delete item', error);
            });
    };

    const handleItemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setNewItemName(value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            innerAddNewItem();
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
                                        onClick={() => innerDeleteItem(item.id)}
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
                                    <button onClick={innerAddNewItem} className={LocalStyles.ListAddButton}>
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
