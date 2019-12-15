import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { black, grayDark } from '../../styles/colors';
import { useJwt } from '../../windows/UserWindows/UserWindwos';
import LocalStyles from './Navigationbar.module.scss';

type NavbarProps = RouteComponentProps & {
    // items: NavigationItem[];
    light?: boolean;
};

export const NavigationbarBase = ({ location, light, history }: NavbarProps) => {
    // const { location: { pathname: path } } = this.props;
    const { pathname } = location;
    const path = pathname.split('/').filter(Boolean);

    const gotoUser = () => {
        history.push('/user');
    };

    const goHome = () => () => {
        history.push(`/`);
    };

    const user = useJwt();

    return (
        <div className={LocalStyles.Container}>
            <div className={classNames('container', light && LocalStyles.ContainerLight)}>
                <div className="row">
                    <div className={classNames('col-12', LocalStyles.Navbar)}>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Breadcrupm)}>
                            <ul>
                                <li>
                                    Home
                                    <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg} />
                                </li>
                                {path.map((item, i) => {
                                    if (path.length === i + 1) {
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
                            <button className={LocalStyles.User} onClick={gotoUser}>
                                {user && <FontAwesomeIcon icon="user" color={black} />}
                                {!user && <FontAwesomeIcon icon="user" color={grayDark} />}
                            </button>
                            <FontAwesomeIcon icon="bars" size="lg" />
                        </div>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Logo)} onClick={() => goHome()}>
                            Logo
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Navigationbar = withRouter(NavigationbarBase);
