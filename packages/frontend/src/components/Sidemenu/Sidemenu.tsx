import { Props as FontAwesomeProps } from '@fortawesome/react-fontawesome';
import React, { Component, ReactElement, useLayoutEffect } from 'react';
import LocalStyles from './Sidemenu.module.scss';
import { Col, Form, Image } from 'react-bootstrap';
import { AttrDataItemType, AttrDataType } from '../AttrDataWindow';
import Chemex from '../../images/Chemex.svg';

// export type SidebarMenuItem = {
//     name: string;
//     content: AttrDataItemType[];
// };

export type SidemenuProps = {
    filter: AttrDataType[];
    // header: string;
    // icon?: ReactElement<FontAwesomeProps>;
    image: string;
};

export type SidemenuState = {
    activeFilter: number;
};

export class Sidemenu extends Component<SidemenuProps, SidemenuState> {
    public readonly state: SidemenuState = {
        activeFilter: 0,
    };

    public expand = (key: number) => () => {
        console.log(key);

        this.setState({
            activeFilter: key,
        });
    };

    public render() {
        const { image, filter } = this.props;
        const { activeFilter } = this.state;

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
                                        className={`${i === activeFilter && LocalStyles.active}`}
                                    >
                                        {filterItem.name}
                                        <ul key={i} className={`${LocalStyles.MenuSubList}`}>
                                            {filterItem.items.map((menuItem, i) => (
                                                <li key={menuItem.name}>{menuItem.name}</li>
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
