import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { black, grayDark } from '../../styles/colors';
import { setUserFromSessionStorage } from '../../pages/User/userHelperFunctions';
// import { useJwt } from '../../windows/UserWindows/UserHelperFunctions';

type NavbarProps = {
    light?: boolean;
};

export const Navigationbar = ({ light }: NavbarProps) => {
    const { pathname } = useLocation();
    const path = pathname.split('/').filter(Boolean);

    const user = setUserFromSessionStorage();

    return (
        <div className={'NavigationContainer'}>
            <div className={classNames('container', light && 'NavigationContainerLight')}>
                <div className="row">
                    <div className={classNames('col-12', 'Navbar')}>
                        <div className={classnames('Navbar', 'Breadcrupm')}>
                            <ul>
                                <li key={'chevron-right'}>
                                    Home
                                    <FontAwesomeIcon icon="chevron-right" className={'svg'} />
                                </li>
                                {path.map((item, i) => {
                                    if (path.length === i + 1) {
                                        return <li key={`${item}_${i}`}>{item}</li>;
                                    } else {
                                        return (
                                            <li key={`${item}_${i}`}>
                                                {item}
                                                <FontAwesomeIcon icon="chevron-right" className={'svg'} />
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <div className={classnames('Navbar', 'Burger')}>
                            <Link to="/user">
                                <button className={'UserIcon'}>
                                    <FontAwesomeIcon icon="user" color={user ? black : grayDark} />
                                </button>
                            </Link>
                            <FontAwesomeIcon icon="bars" size="lg" />
                        </div>
                        <Link to="/">
                            <div className={classnames('Navbar', 'Logo')}>Logo</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
