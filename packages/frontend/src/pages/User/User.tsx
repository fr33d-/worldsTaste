import classNames from 'classnames';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { AttrDataItemType } from '../../components/FormComponents';
import { Navigationbar } from '../../components/Navigationbar';
import userAvatar from '../../images/avatar-frederic.png';
import {
    LoginWindow,
    UserAdminWindow,
    UserChangePasswordWindow,
    UserCreateNewWindow,
    UserDataWindow,
    UserDetailWindow,
} from '../../windows/UserWindows/';
import LocalStyles from './User.module.scss';

export type User = {
    id: number;
    name: string;
    username: string;
    role: string;
};

export type FullUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    image: string;
    created: string;
    role: string;
};

export type ExtendedUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    image: string;
    role: string;
    password: string;
};

export const UserRoles: AttrDataItemType[] = [
    { id: 0, name: 'ADMIN' },
    { id: 1, name: 'USER' },
    { id: 2, name: 'GUEST' },
];

export const UserPage = () => {
    const [user, setUser] = useState<FullUser | undefined>();
    const [activeMenu, setActiveMenu] = useState(0);

    const setUserFromStr = () => {
        const jwtObj = sessionStorage.getItem('auth');

        if (jwtObj == null) {
            return;
        }
        const data = jwt.decode(jwtObj);

        console.log(data);
        if (data != null && typeof data !== 'string') {
            setUser({
                id: data['userId'],
                username: data['username'],
                name: data['name'],
                email: data['email'],
                image: 'avatar_frederic.png',
                created: 'sice 07.08.1989',
                role: data['role'],
            });
            // console.log('user set!');
        }
    };

    useEffect(() => {
        setUserFromStr();
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
            <div className={LocalStyles.User}>
                <Container>
                    <Row>
                        {user && (
                            <>
                                <div className={'backgroundHelper'} />
                                <div className="col-3">
                                    <div className={LocalStyles.Sidebar}>
                                        <div
                                            className={LocalStyles.Image}
                                            style={{ backgroundImage: `url(${userAvatar})` }}
                                        />
                                        <div className={LocalStyles.Name}>{user.name}</div>
                                        <div className={LocalStyles.Subline}>{user.created}</div>
                                        <ul>
                                            <li className={LocalStyles.ListHeader}>General</li>
                                            <li
                                                className={classNames(activeMenu === 0 && LocalStyles.active)}
                                                onClick={() => setActiveMenu(0)}
                                            >
                                                General
                                            </li>
                                            <li
                                                className={classNames(activeMenu === 1 && LocalStyles.active)}
                                                onClick={() => setActiveMenu(1)}
                                            >
                                                Your Data
                                            </li>
                                            <li
                                                className={classNames(activeMenu === 2 && LocalStyles.active)}
                                                onClick={() => setActiveMenu(2)}
                                            >
                                                Change Password
                                            </li>
                                            <li className={LocalStyles.ListHeader}>Admin</li>
                                            <li className={classNames(activeMenu === 3 && LocalStyles.active)}>
                                                <span onClick={() => setActiveMenu(3)}>All users</span>
                                            </li>
                                            <li className={classNames(activeMenu === 4 && LocalStyles.active)}>
                                                <span onClick={() => setActiveMenu(4)}>Create new user</span>
                                            </li>
                                        </ul>
                                        <Button className={LocalStyles.TestButton} onClick={logout}>
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                                <div className={classNames('col-9', LocalStyles.Content)}>
                                    {activeMenu === 0 && <UserDetailWindow user={user} />}
                                    {activeMenu === 1 && <UserDataWindow user={user} />}
                                    {activeMenu === 2 && <UserChangePasswordWindow user={user} />}
                                    {activeMenu === 3 && <UserAdminWindow user={user} />}
                                    {activeMenu === 4 && <UserCreateNewWindow user={user} />}
                                </div>
                            </>
                        )}
                        {!user && <LoginWindow setUserFromStr={setUserFromStr} />}
                    </Row>
                </Container>
            </div>
        </>
    );
};
