import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Navigationbar } from '../../components/Navigationbar';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { AttrDataItemType, FullUser } from '../../helpers/types';
import userAvatar from '../../images/avatar-frederic.png';
import {
    LoginWindow,
    UserAdminWindow,
    UserChangePasswordWindow,
    UserCreateNewWindow,
    UserDataWindow,
    UserDetailWindow,
} from '../../windows/UserWindows/';
import { setUserFromSessionStorage } from './userHelperFunctions';
import { UserContext } from '../../Contexts/UserContext';

export const UserRoles: AttrDataItemType[] = [
    { id: 0, name: 'ADMIN' },
    { id: 1, name: 'USER' },
    { id: 2, name: 'GUEST' },
];

export const UserPage = () => {
    const [user, setUser] = useState<FullUser | undefined>(setUserFromSessionStorage());
    const [activeMenu, setActiveMenu] = useState(0);

    const { contextLogout } = useContext(UserContext);

    useEffect(() => {
        setUser(setUserFromSessionStorage());
    });

    return (
        <>
            <Navigationbar />
            <div className={'User'}>
                <Container>
                    <Row>
                        {user && (
                            <>
                                <div className={'backgroundHelper'} />
                                <div className="col-3">
                                    <div className={'Sidebar'}>
                                        <div className={'Image'} style={{ backgroundImage: `url(${userAvatar})` }} />
                                        <div className={'Name'}>{user.name}</div>
                                        <div className={'Subline'}>{user.created}</div>
                                        <ul>
                                            <li className={'ListHeader'}>General</li>
                                            <li
                                                className={classNames(activeMenu === 0 && 'active')}
                                                onClick={() => setActiveMenu(0)}
                                            >
                                                General
                                            </li>
                                            <li
                                                className={classNames(activeMenu === 1 && 'active')}
                                                onClick={() => setActiveMenu(1)}
                                            >
                                                Your Data
                                            </li>
                                            <li
                                                className={classNames(activeMenu === 2 && 'active')}
                                                onClick={() => setActiveMenu(2)}
                                            >
                                                Change Password
                                            </li>
                                            <li className={'ListHeader'}>Admin</li>
                                            <li className={classNames(activeMenu === 3 && 'active')}>
                                                <span onClick={() => setActiveMenu(3)}>All users</span>
                                            </li>
                                            <li className={classNames(activeMenu === 4 && 'active')}>
                                                <span onClick={() => setActiveMenu(4)}>Create new user</span>
                                            </li>
                                        </ul>
                                        <Button className={'LogoutButton'} onClick={contextLogout}>
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                                <div className={classNames('col-9', 'Content')}>
                                    {activeMenu === 0 && <UserDetailWindow user={user} />}
                                    {activeMenu === 1 && <UserDataWindow user={user} />}
                                    {activeMenu === 2 && <UserChangePasswordWindow user={user} />}
                                    {activeMenu === 3 && <UserAdminWindow user={user} />}
                                    {activeMenu === 4 && <UserCreateNewWindow user={user} />}
                                </div>
                            </>
                        )}
                        {!user && <LoginWindow />}
                    </Row>
                </Container>
            </div>
        </>
    );
};
