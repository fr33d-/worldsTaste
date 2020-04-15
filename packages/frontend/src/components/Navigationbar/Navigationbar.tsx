import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { black, grayDark } from '../../styles/colors';
import { setUserFromSessionStorage } from '../../pages/User/userHelperFunctions';
// import { useJwt } from '../../windows/UserWindows/UserHelperFunctions';
import logoSmall from './../../images/wt-logo-small.svg';
import logoBig from './../../images/wt-logo-big.svg';
import { UserLoginButton } from '../Buttons/FunctioalButtons';

type NavbarProps = {
    light?: boolean;
    big?: boolean;
};

export const Navigationbar = ({ light, big }: NavbarProps) => {
    const { pathname } = useLocation();
    const path = pathname.split('/').filter(Boolean);

    const user = setUserFromSessionStorage();

    return (
        <div className={classNames('NavigationContainer', light && 'light')}>
            <div className={classNames('container', light && 'NavigationContainerLight')}>
                <div className="row">
                    <div className={classNames('col-12', 'Navbar', big && 'big')}>
                        <div className={'Logo'}>
                            <Link to="/">
                                <img src={big ? logoBig : logoSmall} alt="Worls taste" />
                            </Link>
                        </div>

                        <div className={'Breadcrupm'}>
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

                        <div className={'Burger'}>
                            <UserLoginButton />
                            <FontAwesomeIcon icon="bars" size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
