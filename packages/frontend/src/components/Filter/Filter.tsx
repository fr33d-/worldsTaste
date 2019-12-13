import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { ChangeEvent, FC } from 'react';
import { FilterMenuType } from '../FormComponents';
import LocalStyles from './Filter.module.scss';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';

type FilterProps = {
    orderItems: FilterMenuType[];
    orderAction(event: ChangeEvent<HTMLSelectElement>): void;
};

export const Filter = ({ orderItems, orderAction }: FilterProps) => (
    <>
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
    </>
);

export const AddButton: FC<{ onClick(): void }> = ({ onClick }) => (
    <button className={classNames('add-button big', LocalStyles.Button)} onClick={onClick}>
        <FontAwesomeIcon icon="plus" />
    </button>
);

export const DataButton: FC<{ onClick(): void }> = ({ onClick }) => (
    <button className={classNames('add-button big', LocalStyles.Button)} onClick={onClick}>
        <FontAwesomeIcon icon="database" />
    </button>
);

export const IntroText: FC<{ header: string }> = ({ header, children }) => (
    <div className={GeneralStyles.Introtext}>
        <h2>{header}</h2>
        <p>{children}</p>
    </div>
);
