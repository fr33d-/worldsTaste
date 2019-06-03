import { Props as FontAwesomeProps } from "@fortawesome/react-fontawesome";
import React, { Component, ReactElement } from 'react';
import LocalStyles from './Sidemenu.module.scss';

export class SideMenuItem {
    id: number = 0;
    name: string = 'Name';
}

export type SidemenuProps = {
    content: SideMenuItem[];
    header: string;
    filter: string;
    icon: ReactElement<FontAwesomeProps>;
};

export class Sidemenu extends Component<SidemenuProps> {
    public componentDidMount() {
        this.setState({});
    }

    public render() {
        const { content, header, filter, icon } = this.props;

        return (
            <div className={`${LocalStyles.Background} col-3`}>
            <div className={LocalStyles.Sidemenu}>
            {icon}
            <h1>{header}</h1>
                <h2>{filter}</h2>
                <div className={LocalStyles.MenuList}>
                    <ul>
                        {content.length === 0 ? (
                            <li>nothing here</li>
                        ) : (
                            content.map((entry, i) => (
                                <li key={i}>
                                    {entry.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </ div>
            </div>
        );
    }
}
