import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Navigationbar } from '../../components/Navigationbar';
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
import { setUserFromSessionStorage, throwDataError, throwDataSucess } from './userHelperFunctions';

export const UserRoles: AttrDataItemType[] = [
    { id: 0, name: 'ADMIN' },
    { id: 1, name: 'USER' },
    { id: 2, name: 'GUEST' },
];

export const UserPage = () => {
    const [user, setUser] = useState<FullUser | undefined>();
    const [activeMenu, setActiveMenu] = useState(0);

    const innerSetUserFromSessionStorage = () => {
        setUserFromSessionStorage()
            .then((user) => {
                throwDataSucess('user set from sessio storeage');
                setUser(user);
            })
            .catch((error) => {
                throwDataError('cant set user from session strorage, your not logged in ', error);
            });
    };

    useEffect(() => {
        innerSetUserFromSessionStorage();
    }, []);

    const logout = () => {
        console.log('logout');
        sessionStorage.removeItem('auth');
        // location.reload();
        setUser(undefined);
    };

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
                                        <Button className={'TestButton'} onClick={logout}>
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
                        {!user && <LoginWindow setUser={innerSetUserFromSessionStorage} />}
                    </Row>
                </Container>
            </div>
        </>
    );
};
