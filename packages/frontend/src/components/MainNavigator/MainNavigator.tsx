import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MainMenuItem } from '../../data';
// import arrowBlue from './arrowLeftBlue.svg';
import { ArrowLeft } from './ArrowLeft';
import { Shape } from './Shape';
import Background from './Background.svg';
import Line from './Line.svg';
// import 'from' './MainNavigator.module.scss';
import menuSmall from './menuSmall.svg';
import shape from './shape1.svg';
import shapeBlue from './shapeBlue.svg';
import tastes from './Tastes.svg';

type MainNavigatorProps = {
    menu: MainMenuItem[];
} & RouteComponentProps;

type MainNavigatorState = {
    activeMenuItem?: MainMenuItem;
    animationClass: string;
    backgroundColor: string;
};

class MainNavigatorBase extends Component<MainNavigatorProps, MainNavigatorState> {
    public readonly state: MainNavigatorState = {
        activeMenuItem: undefined,
        animationClass: '',
        backgroundColor: '#495F99',
    };

    public clickMenuItem = (clickedItem: MainMenuItem) => () => {
        if (this.state.activeMenuItem !== undefined && this.state.activeMenuItem.color !== undefined) {
            this.setState({ backgroundColor: this.state.activeMenuItem.color });
        } else {
            this.setState({});
        }

        this.setState({
            animationClass: 'FadeOut',
        });
        setTimeout(() => {
            if (clickedItem.color !== undefined) {
                this.setState({
                    animationClass: 'FadeIn',
                    backgroundColor: clickedItem.color,
                    activeMenuItem: clickedItem,
                });
            } else {
                this.setState({
                    activeMenuItem: clickedItem,
                    animationClass: 'FadeIn',
                    backgroundColor: '#495F99',
                });
            }
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

    public readonly animationColor = () => {
        return this.state.activeMenuItem !== undefined
            ? {
                  backgroundColor: this.state.activeMenuItem.color,
              }
            : {
                  backgroundColor: '#495F99',
              };
    };

    public render() {
        const { activeMenuItem, animationClass, backgroundColor } = this.state;
        const { menu } = this.props;

        return (
            <div className={classNames('MainNavigator', 'container')} style={this.animationColor()}>
                <div className="row">
                    <div className={`col-5 ${'Menu'}`}>
                        <div className={'Header'}>
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
                                        'Active'}`}
                                    key={i}
                                >
                                    {item.name}
                                    <span className={'icon'}>
                                        <FontAwesomeIcon icon="chevron-right" size="xs" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <img src={shape} className={'Shape'} />
                        <div className={'Footer'}>A small collection of pleasures</div>
                    </div>
                    <div className={`col-7 ${'SubMenu'}`}>
                        <img src={Background} className={'SubMenBackground'} style={this.topHeight()} />
                        {activeMenuItem ? (
                            <>
                                <Shape color={backgroundColor} className={'Shape'} />
                                <ArrowLeft
                                    color={backgroundColor}
                                    className={'BackArrow'}
                                    onClick={this.deselectMenuItem()}
                                />
                                <img src={menuSmall} className={'SubMenuIcon'} />

                                <div className={classNames('AnimationDiv', animationClass)}>
                                    {activeMenuItem && !activeMenuItem.image && activeMenuItem.icon}
                                    {activeMenuItem && activeMenuItem.image && (
                                        <img src={activeMenuItem.image} className={classNames('Icon')} />
                                    )}
                                    <div className={classNames('Right')}>
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
                                <img src={menuSmall} className={'SubMenuIcon'} />
                                <img src={shapeBlue} className={'Shape'} />
                                <div className={classNames('Left', animationClass)}>
                                    <h1>A collection of good tasts</h1>
                                    <p>
                                        This is a small collection of something that we define as good tast. And bad.
                                        This data base helps us to keep track of what we tried, liked and not.
                                    </p>
                                </div>
                                <img src={tastes} className={classNames('Icon', animationClass)} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export const MainNavigator = withRouter(MainNavigatorBase);
