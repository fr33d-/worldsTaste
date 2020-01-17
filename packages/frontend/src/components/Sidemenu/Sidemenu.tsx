import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { FilterMenuType } from '../../helpers/types';

export type SidemenuProps = {
    filter: FilterMenuType[];
    image: string;
    filterName?: string;
    filterAttr?: string;
    setFilterName: Dispatch<SetStateAction<string | undefined>>;
    setFilterAttr: Dispatch<SetStateAction<string | undefined>>;
};

export type SidemenuState = {
    openFilter: number;
};

export const Sidemenu = ({ filter, image, filterAttr, filterName, setFilterAttr, setFilterName }: SidemenuProps) => (
    <div className={`col-3`}>
        <div className={'Sidemenu'}>
            <div className={'IconHeader'}>
                <img src={image} alt="header" />
            </div>
            <ul className={'MenuList'}>
                {filter.length === 0 ? (
                    <li key={'noContent'}>nothing here</li>
                ) : (
                    filter.map((filterItem, i) => (
                        <>
                            <li
                                key={i}
                                onClick={() => setFilterName(filterItem.name)}
                                className={classNames(filterName === filterItem.name && 'active')}
                            >
                                {filterItem.name}
                                <ul key={`${filterItem.name}_${i}`} className={`${'MenuSubList'}`}>
                                    {filterItem.items.map((item) => (
                                        <li
                                            key={item}
                                            onClick={() => setFilterAttr(item)}
                                            className={classNames(item === filterAttr && 'Active')}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </>
                    ))
                )}
            </ul>
        </div>
    </div>
);
