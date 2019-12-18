import React, { Component, useState, Dispatch, SetStateAction } from 'react';
import LocalStyles from './Sidemenu.module.scss';
import classNames from 'classnames';
import { FilterMenuType } from '../../helpers/types';

export type SidemenuProps = {
    filter: FilterMenuType[];
    image: string;
    filterName?: string;
    filterAttr?: string;
    setFilterName: Dispatch<SetStateAction<string | undefined>>
    setFilterAttr: Dispatch<SetStateAction<string | undefined>>
};

export type SidemenuState = {
    openFilter: number;
};

export const Sidemenu = ({ filter, image, filterAttr, filterName, setFilterAttr, setFilterName }: SidemenuProps) => (
        <div className={`col-3`}>
            <div className={LocalStyles.Sidemenu}>
                <div className={LocalStyles.IconHeader}>
                    <img src={image} />
                </div>
                <ul className={LocalStyles.MenuList}>
                    {filter.length === 0 ? (
                        <li key={'noContent'}>nothing here</li>
                    ) : (
                        filter.map((filterItem, i) => (
                            <>
                                <li
                                    key={i}
                                    onClick={() => setFilterName(filterItem.name)}
                                    className={classNames(filterName === filterItem.name && LocalStyles.active)}
                                >
                                    {filterItem.name}
                                    <ul key={`${filterItem.name}_${i}`} className={`${LocalStyles.MenuSubList}`}>
                                        {filterItem.items.map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => setFilterAttr(item)}
                                                className={classNames(item === filterAttr && LocalStyles.Active)}
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