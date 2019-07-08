import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MainMenuItem } from '../../data';
import { UsersRouteParams } from '../../Routes';
import LocalStyles from './MainNavigator.module.scss';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import shape from './shape1.svg';
import shapeBlue from './shapeBlue.svg';
import Line from './Line.svg';
import Background from './Background.svg';

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
        const { activeMenuItem } = this.state;
        const { menu } = this.props;

        return (
            <div className={classNames(LocalStyles.MainNavigator, 'container')}>
                <div className="row">
                    <div className={`col-5 ${LocalStyles.Menu}`}>
                        <div className={LocalStyles.Header}>
                            <span>Pleasure DB</span>
                            <img src={Line} />
                            <FontAwesomeIcon color="#fff" icon="search" />
                        </div>
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
                                    <span className={LocalStyles.icon}>
                                        <FontAwesomeIcon icon="chevron-right" size="xs" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <img src={shape} className={LocalStyles.Shape} />
                        <div className={LocalStyles.Footer}>A small collection of pleasures</div>
                    </div>

                    {activeMenuItem && (
                        <div
                            className={`col-7 ${LocalStyles.SubMenu}`}
                        >
                            <img src={Background} className={LocalStyles.SubMenBackground} />
                            {activeMenuItem && !activeMenuItem.image && activeMenuItem.icon}
                            {activeMenuItem && activeMenuItem.image && (
                                <img src={activeMenuItem.image} className={LocalStyles.Icon} />
                            )}
                            <div className={LocalStyles.Right}>
                                <h1>{activeMenuItem && activeMenuItem.label}</h1>
                                <ul>
                                    {activeMenuItem &&
                                        activeMenuItem.submenu.map((item, i) => (
                                            <li onClick={this.navigate(item)} key={i}>
                                                {item.name}
                                            </li>
                                        ))}
                                </ul>
                                <img src={shapeBlue} className={LocalStyles.Shape} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export const MainNavigator = withRouter(MainNavigatorBase);
