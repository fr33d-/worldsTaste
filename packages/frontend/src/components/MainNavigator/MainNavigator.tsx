import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MainMenuItem } from '../../data';
import { UsersRouteParams } from '../../Routes';
import LocalStyles from './MainNavigator.module.scss';

type MainNavigatorProps = {
    menu: MainMenuItem[];
} & RouteComponentProps<UsersRouteParams>;

type MainNavigatorState = {
    activeMenuItem?: MainMenuItem;
};

class MainNavigatorBase extends Component<MainNavigatorProps, MainNavigatorState> {
    public readonly state: MainNavigatorState = {
        activeMenuItem: undefined,
    };

    public clickMenuItem = (clickedItem: MainMenuItem) => () => {
        this.setState({
            activeMenuItem: clickedItem,
        });
    };

    public navigate = (menuItem: MainMenuItem) => () => {
        console.log(
            `link clicked: ${this.state.activeMenuItem !== undefined && this.state.activeMenuItem.link} / ${
                menuItem.link
            }`
        );
        if (this.state.activeMenuItem) {
            this.props.history.push(this.state.activeMenuItem.link + menuItem.link);
        }
    };

    public render() {
        // Todo: make this work
        const { activeMenuItem } = this.state;
        const { menu } = this.props;

        return (
            <div className={LocalStyles.MainNavigator}>
                <div className="container">
                    <div className={LocalStyles.BackgroundHelper} />
                    <div className="row">
                        <div
                            className={`offset-1 ${LocalStyles.Background} ${activeMenuItem &&
                                activeMenuItem.submenu.length > 0 &&
                                LocalStyles.ActiveMenu}`}
                        >
                            <div className="row">
                                <div className={`col-12 ${LocalStyles.Teaser} ${LocalStyles.MainNavigator}`}>
                                    <p>
                                        Komische Website, die eigentlich nur eine technische Demo und ein wenig spieler
                                        ist!
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`col ${LocalStyles.Menu} ${LocalStyles.MainNavigator}`}>
                                    <ul>
                                        {menu.map((item, i) => (
                                            <li
                                                onClick={this.clickMenuItem(item)}
                                                className={`${activeMenuItem &&
                                                    item.link === activeMenuItem.link &&
                                                    LocalStyles.Active}`}
                                                key={i}
                                            >
                                                {item.name}
                                                <FontAwesomeIcon icon="chevron-right" size="sm" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div
                                    className={`col ${LocalStyles.SubMenu}
                                    ${LocalStyles.MainNavigator}
                                    ${activeMenuItem &&
                                        activeMenuItem.submenu.length > 0 &&
                                        LocalStyles.ActiveSubMenu}`}
                                >
                                    {activeMenuItem && activeMenuItem.icon}
                                    <h1>{activeMenuItem && activeMenuItem.label}</h1>
                                    <ul>
                                        {activeMenuItem &&
                                            activeMenuItem.submenu.map((item, i) => (
                                                <li onClick={this.navigate(item)} key={i}>
                                                    {item.name}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}

export const MainNavigator = withRouter(MainNavigatorBase);
