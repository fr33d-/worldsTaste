import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { black, grayDark } from '../../styles/colors';
import LocalStyles from './Navigationbar.module.scss';
import { useJwt } from '../../windows/UserWindows/UserHelperFunctions';

type NavbarProps = {
    light?: boolean;
};

export const Navigationbar = ({ light }: NavbarProps) => {
    const { pathname } = useLocation();
    const path = pathname.split('/').filter(Boolean);

    const user = useJwt();

    return (
        <div className={LocalStyles.Container}>
            <div className={classNames('container', light && LocalStyles.ContainerLight)}>
                <div className="row">
                    <div className={classNames('col-12', LocalStyles.Navbar)}>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Breadcrupm)}>
                            <ul>
                                <li key={'chevron-right'}>
                                    Home
                                    <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg}  />
                                </li>
                                {path.map((item, i) => {
                                    if (path.length === i + 1) {
                                        return <li key={`${item}_${i}`}>{item}</li>;
                                    } else {
                                        return (
                                            <li key={`${item}_${i}`}>
                                                {item}
                                                <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg} />
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Burger)}>
                            <Link to="/user">
                                <button className={LocalStyles.User}>
                                    <FontAwesomeIcon icon="user" color={user ? black : grayDark} />
                                </button>
                            </Link>
                            <FontAwesomeIcon icon="bars" size="lg" />
                        </div>
                        <Link to="/">
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Logo)}>Logo</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
