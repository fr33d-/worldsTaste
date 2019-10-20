import axios from 'axios';
import classNames from 'classnames';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { authURL, baseURL } from '../../data';
import userAvatar from '../../images/avatar-frederic.png';
import { green, white } from '../../style/colors';
import { AttrDataItemType } from '../FormComponents';
import { DropdownInput, PasswordInput, TextInput } from '../FormElements';
import { AttrField } from '../FormElements/AttrFields';
import { IconButton } from '../IconButton';
import { Navigationbar } from '../Navigationbar';
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

export const useJwt = () => {
    const jwtObj = sessionStorage.getItem('auth');

    if (jwtObj == null && typeof jwtObj !== 'string') {
        return;
    } else {
        const jwtJson = jwt.decode(jwtObj);

        if (
            jwtJson !== null &&
            typeof jwtJson !== 'string' &&
            jwtJson['userId'] !== null &&
            jwtJson['username'] !== null &&
            jwtJson['name'] !== null &&
            jwtJson['role'] !== null
        ) {
            return {
                id: jwtJson['userId'],
                username: jwtJson['username'],
                name: jwtJson['name'],
                role: jwtJson['role'],
            };
        }
    }
};

// export enum UserRole {
//     Admin,
//     User,
//     Guest
// }

export const UserRoles: AttrDataItemType[] = [
    { id: 0, name: 'Admin' },
    { id: 1, name: 'User' },
    { id: 2, name: 'Guest' },
];

type LoginWindwoProps = {
    setUserFromStr(): void;
};

export const LoginWindow = (props: LoginWindwoProps) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const login = () => {
        axios
            .post<string>(`${baseURL}${authURL}/login`, { username: mail, password })
            .then((response) => {
                console.log(response);
                sessionStorage.setItem('auth', response.data);

                setMsg('Logged in!');
                // location.reload();
                props.setUserFromStr();
            })
            .catch((error) => {
                console.log(error);
                if (error && error.response && error.response.status === 400) {
                    setMsg('You need to enter a valid Mail and a Password!');
                } else if (error && error.response &&  error.response.status === 401) {
                    setMsg('Wrong data or you dont exist!');
                } else {
                    setMsg('Sorry, soemething went wrong!');
                }
            });
    };

    return (
        <>
            <div className={`col-12 col-md-6 offset-md-3 ${LocalStyles.Login} `}>
                <h1>Login</h1>
                <div className={LocalStyles.LoginWindow}>
                    <div className={LocalStyles.Head}>
                        You are currently not logged in. If you wish to sign up please send me a mail.
                    </div>
                    <div className={LocalStyles.Form}>
                        <TextInput onChange={setMail} name="Mail" value={mail} />
                        <PasswordInput onChange={setPassword} name="Password" value={password} />
                    </div>
                    <div className={LocalStyles.ButtonSection}>
                        <Button className={LocalStyles.Login} onClick={login}>
                            Login
                        </Button>
                    </div>
                    <p className={LocalStyles.Error}>{msg}</p>
                </div>
            </div>
        </>
    );
};

// tslint:disable-next-line: max-func-body-length
export const User = () => {
    const [user, setUser] = useState<FullUser | undefined>();
    const [activeMenu, setActiveMenu] = useState(0);

    // Change Password
    const [oldPW, setOldPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [repNewPW, setRepNewPW] = useState('');
    const [savePWError, SetSavePWError] = useState(false);

    //New User Data
    const [newUserName, setNewUserName] = useState('');
    const [newUserMail, setNewUserMail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserRole, setNewUserRole] = useState(UserRoles[0]);

    const [createUserError, setCreateUserError] = useState(false);

    const createUser = () => {
        setCreateUserError(true);
    };

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
            console.log('user set!');
        }
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(setUserFromStr, []);

    const getDummyUser = () => {
        setUser({
            id: 1,
            name: 'Frederic Wollinger',
            username: 'frewol',
            email: 'fredericwollinger@gmail.com',
            image: 'avatar_frederic.png',
            created: 'sice 07.08.1989',
            role: 'admin',
        });
    };

    const saveNewPW = () => {
        SetSavePWError(true);
    };

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
                                            <li
                                                className={classNames(activeMenu === 3 && LocalStyles.active)}
                                                onClick={() => setActiveMenu(3)}
                                            >
                                                All users
                                            </li>
                                        </ul>
                                        <Button className={LocalStyles.TestButton} onClick={logout}>
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                                <div className={classNames('col-9', LocalStyles.Content)}>
                                    {activeMenu === 0 && (
                                        <>
                                            <h2>General</h2>
                                            <AttrField
                                                value={user.name}
                                                name="Name:"
                                                className={LocalStyles.AttrField}
                                            />
                                            <AttrField
                                                value={user.email}
                                                name="E-Mail:"
                                                className={LocalStyles.AttrField}
                                            />
                                            <AttrField
                                                value={user.created}
                                                name="Erstellt am:"
                                                className={LocalStyles.AttrField}
                                            />
                                            <AttrField
                                                value={user.role}
                                                name="Rolle:"
                                                className={LocalStyles.AttrField}
                                            />
                                        </>
                                    )}
                                    {activeMenu === 1 && (
                                        <>
                                            <h2>Your Data</h2>
                                            <h4>Posts</h4>
                                            <h4>Coffees</h4>
                                            <h4>Cigars</h4>
                                            <h4>Beers</h4>
                                        </>
                                    )}
                                    {activeMenu === 2 && (
                                        <>
                                            <h2>Change Password</h2>
                                            <TextInput name="Altes Passwort" value={oldPW} onChange={setOldPW} />
                                            <TextInput name="Neues Passwort" value={newPW} onChange={setNewPW} />
                                            <TextInput
                                                name="Neues Passwort wiederholen"
                                                value={repNewPW}
                                                onChange={setRepNewPW}
                                            />
                                            {/* <SaveButton withText={true} error={savePWError} save={saveNewPW} /> */}
                                            <IconButton
                                                icon={savePWError ? 'ban' : 'save'}
                                                name={savePWError ? 'Error while saving' : 'Save new Password'}
                                                color={white}
                                                onClick={saveNewPW}
                                                className={savePWError ? LocalStyles.RedFull : LocalStyles.GreenFull}
                                            />
                                        </>
                                    )}
                                    {activeMenu === 3 && (
                                        <>
                                            <h2>All users</h2>
                                            <ul>
                                                <li>Frederic Wollinger</li>
                                            </ul>
                                            <h2>Crate User</h2>
                                            <TextInput name="Name" value={newUserName} onChange={setNewUserName} />
                                            <TextInput name="E-Mail" value={newUserMail} onChange={setNewUserMail} />
                                            <TextInput
                                                name="Passwort"
                                                value={newUserPassword}
                                                onChange={setNewUserPassword}
                                            />
                                            <DropdownInput
                                                items={UserRoles}
                                                icon="leaf"
                                                iconColor={green}
                                                label="Rolle"
                                                selectedItem={newUserRole}
                                                onChange={setNewUserRole}
                                            />
                                            <IconButton
                                                icon={savePWError ? 'ban' : 'save'}
                                                name={savePWError ? 'Error while saving' : 'Save new User'}
                                                color={white}
                                                onClick={createUser}
                                                className={
                                                    createUserError ? LocalStyles.RedFull : LocalStyles.GreenFull
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {!user && (
                            <>
                                <LoginWindow setUserFromStr={setUserFromStr} />
                                <Button className={LocalStyles.TestButton} onClick={getDummyUser}>
                                    Get Test user
                                </Button>
                            </>
                        )}
                    </Row>
                </Container>
            </div>
        </>
    );
};
