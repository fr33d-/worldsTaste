import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, useContext, useState, FC } from 'react';
import { Row } from 'react-bootstrap';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { AttrDataType } from '../../helpers/types';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { addNewItem, deleteItem } from './AttrDataHelperFunctions';

// export const CoffeeAttrDataWindow: FC<{closeDialog(): void}> = ({closeDialog}) => {
//     const { coffeeStores} = useContext(CoffeeContext);
//     if (!coffeeStores) return <p>Error, no coffee data loaded</p>;

//     const attrData: AttrDataType[] = [
//         {
//             id: 1,
//             name: 'Röstereien',
//             urlSubstring: 'coffeesStores',
//             description: 'Läden oder Röstereien weltweit',
//             items: coffeeStores,
//         },
//     ];

//     return <AttrDataWindow close={closeDialog} content={attrData} />;
// };

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

    const selectCategory = (id: number) => {
        setSelectedCategory(content.filter((item) => item.id === id)[0]);
    };

    const innerAddNewItem = async () => {
        if (newItemName) {
            try {
                const id = await addNewItem(selectedCategory.urlSubstring, newItemName);
                setSelectedCategory((cat) => ({
                    ...cat,
                    items: [...cat.items, { id: id, name: newItemName }],
                }));
                setNewItemName('');
            } catch (e) {
                throwDataError('Cant add item', e);
            }
        }
    };

    const innerDeleteItem = async (id: number) => {
        try {
            await deleteItem(selectedCategory.urlSubstring, id);
            setSelectedCategory((cat) => ({ ...cat, items: cat.items.filter((item) => item.id !== id) }));
            throwDataSucess('item deleted');
        } catch (e) {
            throwDataError('cand delete item', e);
        }
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
                        <h2>Zusätzliche Daten</h2>
                        <ul>
                            {content.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => selectCategory(item.id)}
                                    className={classnames(item.id === selectedCategory.id && 'Active')}
                                >
                                    {item.name}
                                    <span> ({item.items && item.items.length})</span>
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
                            {selectedCategory.items &&
                                selectedCategory.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name}{' '}
                                        <button onClick={() => innerDeleteItem(item.id)} className={'ListDeleteButton'}>
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
                    </div>
                </Row>
            </div>
        </>
    );
};
