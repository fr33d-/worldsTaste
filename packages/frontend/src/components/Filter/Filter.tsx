import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { FilterMenuType } from '../../helpers/types';

type SearchProps = {
    searchString?: string;
    setSearchString: Dispatch<SetStateAction<string | undefined>>;
};

export const Search = ({ searchString, setSearchString }: SearchProps) => (
    <div className={'WTSearch'}>
        <input
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.currentTarget.value)}
        />
    </div>
);

type FilterProps = {
    orderItems: FilterMenuType[];
    orderString?: string;
    setOrderString: Dispatch<SetStateAction<string | undefined>>;
};

export const Filter = ({ orderItems, orderString, setOrderString }: FilterProps) => (
    <>
        <div className={'WTSelect'}>
            <select onChange={(e) => setOrderString(e.currentTarget.value)}>
                <option value="" disabled defaultValue={''}>
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
    <button className={classNames('add-button big', 'WTButton')} onClick={onClick}>
        <FontAwesomeIcon icon="plus" />
    </button>
);

export const AddLinkButton: FC<{ link: string }> = ({ link }) => (
    <Link to={link}>
        <button className={classNames('add-button big', 'WTButton')}>
            <FontAwesomeIcon icon="plus" />
        </button>
    </Link>
);

export const AddButtonLink: FC<{ link: string }> = ({ link }) => (
    <Link to={link}>
        <button className={classNames('add-button big', 'WTButton')}>
            <FontAwesomeIcon icon="plus" />
        </button>
    </Link>
);

export const DataButton: FC<{ onClick(): void }> = ({ onClick }) => (
    <button className={classNames('add-button big', 'WTButton')} onClick={onClick}>
        <FontAwesomeIcon icon="database" />
    </button>
);

export const IntroText: FC<{ header: string }> = ({ header, children }) => (
    <div className={'Introtext'}>
        <h2>{header}</h2>
        <p>{children}</p>
    </div>
);
