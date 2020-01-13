import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { Row } from 'react-bootstrap';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { AttrDataType } from '../../helpers/types';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { addNewItem, deleteItem } from './AttrDataHelperFunctions';

export const CoffeeAttrDataWindow = () => {
    const { coffeeAttrData, closeAttrWindow } = useContext(CoffeeContext);

    if (!coffeeAttrData) return <p>Error, no coffee data loaded</p>;

    // Todo: warum fällt das nicht aus der API raus
    const attrData = [
        {
            id: 1,
            name: 'Röstarten',
            urlSubstring: 'coffeeAttrs/kinds',
            description: 'Kaffee Arten, zB Filter Kaffee oder Espresso',
            items: coffeeAttrData.kinds,
        },
        {
            id: 2,
            name: 'Herkünfte',
            urlSubstring: 'coffeeAttrs/origins',
            description: 'Kaffee herkunfts Länder',
            items: coffeeAttrData.origins,
        },
        {
            id: 3,
            name: 'Röstereien',
            urlSubstring: 'coffeeAttrs/roasteds',
            description: 'Kaffee Röstereien',
            items: coffeeAttrData.roasteds,
        },
        {
            id: 4,
            name: 'Bohnenart',
            urlSubstring: 'coffeeAttrs/species',
            description: 'Art der Bohne, zB Arabica oder Robusta',
            items: coffeeAttrData.specieses,
        },
        {
            id: 5,
            name: 'Prozess',
            urlSubstring: 'coffeeAttrs/processes',
            description: 'Verarbeitungsprozess, zB Washed oder Natural',
            items: coffeeAttrData.processes,
        },
        {
            id: 6,
            name: 'Brühmethoden',
            urlSubstring: 'coffeeAttrs/method',
            description: 'Brühmethoden, zB. V60, French Press oder AeroPress',
            items: coffeeAttrData.brewMethods,
        },
    ];

    return <AttrDataWindow close={closeAttrWindow} content={attrData} />;
};

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
            <div className={'AttrDataWindow'}>
                <Row>
                    <div className={'AttrList'}>
                        {/* <FontAwesomeIcon icon="mug-hot" size="3x" color="#8B572A" /> */}
                        <h2>Kaffee Daten</h2>
                        <ul>
                            {content.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => selectCategory(item.id)}
                                    className={classnames(item.id === selectedCategory.id && 'Active')}
                                >
                                    {item.name}
                                    <span> ({item.items.length})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={'AttrItemList'}>
                        <button className={'CloseButton'} onClick={() => close()}>
                            <FontAwesomeIcon icon="times" color="#929292" />
                        </button>
                        <span className={'ListHeader'}>
                            <h2>{selectedCategory.name}</h2>
                            {selectedCategory.description}
                        </span>
                        <ul>
                            {selectedCategory.items.map((item) => (
                                <li key={item.id}>
                                    {item.name}{' '}
                                    <button
                                        onClick={() => innerDeleteItem(item.id)}
                                        className={'ListDeleteButton'}
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
                                        className={'Input'}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button onClick={innerAddNewItem} className={'ListAddButton'}>
                                        <FontAwesomeIcon icon="plus" color="#929292" size="lg" />
                                    </button>
                                </Row>
                            </li>
                        </ul>
                        {error && <p className={'Error'}>Theres a error with the server, sorry!</p>}
                    </div>
                </Row>
            </div>
        </>
    );
};
