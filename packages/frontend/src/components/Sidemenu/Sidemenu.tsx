import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import LocalStyles from './Sidemenu.module.scss';

export class SideMenuItem {
    id: number = 0;
    name: string = 'Name';
    count: number = 0;
}

export type SidemenuProps = {
    content: SideMenuItem[];
    header: string;
};

export class Sidemenu extends Component<SidemenuProps> {
    public componentDidMount() {
        this.setState({});
    }

    public render() {
        const { content, header } = this.props;

        return (
            <>
                <h2>{header}</h2>
                <div className={LocalStyles.MenuList}>
                    <ul>
                        {content.length === 0 ? (
                            <li>nothing here</li>
                        ) : (
                            content.map((entry, i) => (
                                <li key={i}>
                                    {entry.name} <span>{entry.count}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </>
        );
    }
}
