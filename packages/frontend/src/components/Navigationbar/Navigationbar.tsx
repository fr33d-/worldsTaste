import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import LocalStyles from './Navigationbar.module.scss';
import { navigation } from '../../navigation';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

type NavbarProps = RouteComponentProps; // & {
//     items: NavigationItem[]
// };

class NavigationbarBase extends Component<NavbarProps> {
    public render() {
        // const { location: { pathname: path } } = this.props;
        const { pathname } = this.props.location;
        console.log(pathname);
        const path = pathname.split('/').filter(Boolean);
        return (
            <div className={LocalStyles.Container}>
                <div className={classNames('container')}>
                    <div className="row">
                        <div className={`col-12 ${LocalStyles.Navbar}`}>
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Logo)} onClick={this.goHome()}>
                                Logo
                            </div>
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Breadcrupm)}>
                                <ul>
                                    <li>
                                        Home
                                        <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg} />
                                    </li>
                                    {path.map((item, i) => {
                                        if ((path.length === i+1)) {
                                            return <li>{item}</li>;
                                        } else {
                                            return (
                                                <li>
                                                    {item}
                                                    <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg} />
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Burger)}>
                                <FontAwesomeIcon icon="bars" size="lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private readonly goHome = () => () => {
        this.props.history.push(`/`);
    };
}

export const Navigationbar = withRouter(NavigationbarBase);
