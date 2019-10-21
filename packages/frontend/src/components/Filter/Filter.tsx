import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import { FilterMenuType } from '../FormComponents';
import LocalStyles from './Filter.module.scss';
import { useJwt } from '../User/LoginWindwo';

type FilterProps = {
    orderItems: FilterMenuType[];
    orderAction(event: ChangeEvent<HTMLSelectElement>): void;
    dataAction(): void;
    addAction(): void;
};

export const Filter = ({ orderItems, orderAction, dataAction, addAction }: FilterProps) => {
    const user = useJwt();
    return (
        <div className={LocalStyles.Filter}>
            <div className={LocalStyles.Search}>
                <input type="text" placeholder="Search" />
            </div>
            <div className={LocalStyles.Select}>
                <select onChange={orderAction}>
                    <option value="unknown" disabled selected>
                        Order by
                    </option>
                    {orderItems.map((item, i) => (
                        <option key={i} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className={classNames('add-button big', LocalStyles.Button)} onClick={dataAction}>
                <FontAwesomeIcon icon="database" />
            </button>
            {user && (
                <button className={classNames('add-button big', LocalStyles.Button)} onClick={addAction}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            )}
        </div>
    );
};
