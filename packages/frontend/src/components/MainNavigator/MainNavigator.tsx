import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component, CSSProperties } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MainMenuItem } from '../../data';
import { UsersRouteParams } from '../../Routes';
import arrowBlue from './arrowLeftBlue.svg';
import Background from './Background.svg';
import Line from './Line.svg';
import LocalStyles from './MainNavigator.module.scss';
import menuSmall from './menuSmall.svg';
import shape from './shape1.svg';
import shapeBlue from './shapeBlue.svg';
import tastes from './Tastes.svg';
import { string } from 'prop-types';

type MainNavigatorProps = {
    menu: MainMenuItem[];
} & RouteComponentProps<UsersRouteParams>;

type MainNavigatorState = {
    activeMenuItem?: MainMenuItem;
    animationClass: string;
};

class MainNavigatorBase extends Component<MainNavigatorProps, MainNavigatorState> {
    public readonly state: MainNavigatorState = {
        activeMenuItem: undefined,
        animationClass: '',
    };

    public clickMenuItem = (clickedItem: MainMenuItem) => () => {
        this.setState({
            animationClass: LocalStyles.FadeOut,
        });
        setTimeout(() => {
            this.setState({
                activeMenuItem: clickedItem,
                animationClass: LocalStyles.FadeIn,
            });
        }, 500);
    };

    public deselectMenuItem = () => () => {
        this.setState({
            activeMenuItem: undefined,
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

    public readonly topHeight = () => {
        let variable = 0;

        if (this.state.activeMenuItem !== undefined) {
            variable = this.props.menu.indexOf(this.state.activeMenuItem);
        }

        return this.state.activeMenuItem !== undefined
            ? {
                  top: `${variable * 65 - 430}px`,
              }
            : {
                  top: '-665px',
              };
    };

    public render() {
        const { activeMenuItem, animationClass } = this.state;
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
                    <div className={`col-7 ${LocalStyles.SubMenu}`}>
                        <img src={Background} className={LocalStyles.SubMenBackground} style={this.topHeight()} />
                        {activeMenuItem ? (
                            <>
                                <img src={shapeBlue} className={LocalStyles.Shape} />
                                <img
                                    src={arrowBlue}
                                    className={LocalStyles.BackArrow}
                                    onClick={this.deselectMenuItem()}
                                />
                                <img src={menuSmall} className={LocalStyles.SubMenuIcon} />

                                <div className={classNames(LocalStyles.AnimationDiv, animationClass)}>
                                    {activeMenuItem && !activeMenuItem.image && activeMenuItem.icon}
                                    {activeMenuItem && activeMenuItem.image && (
                                        <img src={activeMenuItem.image} className={classNames(LocalStyles.Icon)} />
                                    )}
                                    <div className={classNames(LocalStyles.Right)}>
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
                            </>
                        ) : (
                            <>
                                <img src={menuSmall} className={LocalStyles.SubMenuIcon} />
                                <img src={shapeBlue} className={LocalStyles.Shape} />
                                <div className={classNames(LocalStyles.Left, animationClass)}>
                                    <h1>A collection of good tasts</h1>
                                    <p>
                                        This is a small collection of something that we define as good tast. And bad.
                                        This data base helps us to keep track of what we tried, liked and not.
                                    </p>
                                </div>
                                <img src={tastes} className={classNames(LocalStyles.Icon, animationClass)} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export const MainNavigator = withRouter(MainNavigatorBase);
