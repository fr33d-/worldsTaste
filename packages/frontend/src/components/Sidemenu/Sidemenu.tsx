import React, { Component } from 'react';
import LocalStyles from './Sidemenu.module.scss';
import classNames from 'classnames';
import { FilterMenuType } from '../../helpers/types';

export type SidemenuProps = {
    filter: FilterMenuType[];
    image: string;
    activeFilter?: string;
    filterAction(filterName: string, filterAttr: string): void;
};

export type SidemenuState = {
    openFilter: number;
};

export class Sidemenu extends Component<SidemenuProps, SidemenuState> {
    public readonly state: SidemenuState = {
        openFilter: 0,
    };

    public expand = (key: number) => () => {
        console.log(key);

        this.setState({
            openFilter: key,
        });
    };

    public render() {
        const { image, filter, filterAction, activeFilter } = this.props;
        const { openFilter } = this.state;

        return (
            <div className={`col-3`}>
                <div className={LocalStyles.Sidemenu}>
                    <div className={LocalStyles.IconHeader}>
                        <img src={image} />
                    </div>
                    <ul className={LocalStyles.MenuList}>
                        {filter.length === 0 ? (
                            <li>nothing here</li>
                        ) : (
                            filter.map((filterItem, i) => (
                                <>
                                    <li
                                        key={i}
                                        onClick={this.expand(i)}
                                        className={`${i === openFilter && LocalStyles.active}`}
                                    >
                                        {filterItem.name}
                                        <ul key={i} className={`${LocalStyles.MenuSubList}`}>
                                            {filterItem.items.map((item, i) => (
                                                <li
                                                    key={item}
                                                    onClick={() => filterAction(filterItem.name, item)}
                                                    className={classNames(item === activeFilter && LocalStyles.Active)}
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
    }
}
