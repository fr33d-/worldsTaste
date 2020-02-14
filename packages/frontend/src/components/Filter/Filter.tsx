import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, SetStateAction, Dispatch, useState, useContext, useEffect } from 'react';
// import 'from' './Filter.module.scss';
// import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import { Link } from 'react-router-dom';
import { FilterMenuType } from '../../helpers/types';
import { WTModal } from '../Modal/Modal';
import { CoffeeAttrDataWindow } from '../../windows/AttrDataWindow';
import { CoffeeContext } from '../../Contexts/CoffeeContext';

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

export const DataAttrWindowButton = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setEditState } = useContext(CoffeeContext);

    useEffect(() => {
        setEditState(dialogOpen);
    }, [dialogOpen]);

    return (
        <>
            <button className={classNames('add-button big', 'WTButton')} onClick={() => setDialogOpen(true)}>
                <FontAwesomeIcon icon="database" />
            </button>
            {dialogOpen && (
                <WTModal>
                    <CoffeeAttrDataWindow closeDialog={() => setDialogOpen(false)} />
                </WTModal>
            )}
        </>
    );
};

export const IntroText: FC<{ header: string }> = ({ header, children }) => (
    <div className={'Introtext'}>
        <h2>{header}</h2>
        <p>{children}</p>
    </div>
);
