import axios from 'axios';
import classNames from 'classnames';
import jwt from 'jsonwebtoken';
import React, { FC, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { baseURL, userURL } from '../../data';
import userAvatar from '../../images/avatar-frederic.png';
import { green, white } from '../../styles/colors';
import { AttrDataItemType } from '../../components/FormComponents';
import { DropdownInput, TextInput, SimpleTextInput } from '../../components/FormElements';
import { AttrField } from '../../components/FormElements/AttrFields';
import { IconButton } from '../../components/IconButton';
import { Navigationbar } from '../../components/Navigationbar';
import { LoginWindow } from './LoginWindwo';
import LocalStyles from './User.module.scss';
import { Toaster, Position } from "@blueprintjs/core";
import { createUser } from './userHelperFunctions';

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
    // created: string;
    role: string;
    password: string;
};

export const UserRoles: AttrDataItemType[] = [
    { id: 0, name: 'ADMIN' },
    { id: 1, name: 'USER' },
    { id: 2, name: 'GUEST' },
];

export const UserDetailWindow: FC<{ user: FullUser }> = ({ user }) => {
    return (
        <>
            <h2>General</h2>
            <AttrField value={user.name} name="Name:" className={LocalStyles.AttrField} />
            <AttrField value={user.email} name="E-Mail:" className={LocalStyles.AttrField} />
            <AttrField value={user.created} name="Erstellt am:" className={LocalStyles.AttrField} />
            <AttrField value={user.role} name="Rolle:" className={LocalStyles.AttrField} />
        </>
    );
};

export const UserDataWindow: FC<{ user: FullUser }> = ({ user }) => {
    return (
        <>
            <h2>Your Data</h2>
            <h4>Posts</h4>
            <h4>Coffees</h4>
            <h4>Cigars</h4>
            <h4>Beers</h4>
        </>
    );
};

export const UserAdminWindow: FC<{ user: FullUser }> = ({ user }) => {
    //New User Data

    const [saveingError, setSaveingError] = useState(false);
    const [listOfAllUsers, setListOfAllUsers] = useState<FullUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [newUserRole, setNewUserRole] = useState<AttrDataItemType>();

    const changeUser = () => {
        //Fire put request here
        const jwtObj = sessionStorage.getItem('auth');
        if (selectedUser) {
            axios
                .patch(`${baseURL}${userURL}/${selectedUser.id}`, selectedUser, { headers: { auth: jwtObj } })
                .then((response) => {
                    console.log('user updated');
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    setSaveingError(true);
                });
        }
    };

    const sendResetPasswordLink = () => {
        //do some magic here
    };

    useEffect(() => {
        const jwtObj = sessionStorage.getItem('auth');

        axios
            .get<FullUser[]>(`${baseURL}${userURL}/`, { headers: { auth: jwtObj } })
            .then((response) => {
                console.log('Got user list');
                setListOfAllUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user]);

    const userClicked = (userItem: User) => {
        setSelectedUser(userItem);
    };

    return (
        <>
            <h2>All users</h2>
            <ul>
                {listOfAllUsers.map((item) => (
                    <li onClick={() => userClicked(item)}>
                        <Link to={`/user/${item.id}`}>{item.username}</Link>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <>
                    <h2>Details</h2>
                    <TextInput name="Name" obj={selectedUser} propPath="name" setStateHandler={setSelectedUser} />
                    <TextInput name="User Name" obj={selectedUser} propPath="username" setStateHandler={setSelectedUser} />
                    <TextInput name="E-Mail" obj={selectedUser} propPath="email" setStateHandler={setSelectedUser}  />
                    <DropdownInput
                        items={UserRoles}
                        iconColor={green}
                        label="Rolle"
                        selectedItem={selectedUser}
                        onChange={setSelectedUser}
                        propPath="role"
                    />
                    <IconButton
                        icon={saveingError ? 'ban' : 'save'}
                        name={saveingError ? 'Error while saving' : 'Update User'}
                        color={white}
                        onClick={changeUser}
                        className={saveingError ? LocalStyles.RedFull : LocalStyles.GreenFull}
                    />
                    <IconButton
                        icon="envelope-open"
                        name="Send user password reset link"
                        color={white}
                        onClick={sendResetPasswordLink}
                        className={LocalStyles.GreenFull}
                    />
                </>
            )}
        </>
    );
};

export const UserCreateNewWindow: FC<{ user: FullUser }> = ({ user }) => {
    const [newUser, setNewUser] = useState<ExtendedUser>(
        {
            id: 0, 
            name: 'New User', 
            role: UserRoles[0].name, 
            username: 'newUser', 
            password: 'test', 
            email: 'test@test.de',
            image: '',
        })

    const innerCreateUser = () => {
        createUser(newUser).then((res) => {
            console.log('res', res);
            Toaster.create({
                position: Position.TOP_RIGHT,
            }).show({ message: 'user created', intent: 'success' });  
        }).catch((e) => {
            console.log('error', e);
            Toaster.create({
                position: Position.TOP_RIGHT,
            }).show({ message: 'can not create user', intent: 'danger' });
        });
    };

    return (
        <>
            <h2>Create User</h2>
            <p>All fields must me longer than 4 charecters</p>
            <TextInput name="Name" obj={newUser} propPath={['name']} setStateHandler={setNewUser} />
            <TextInput name="User name" obj={newUser} propPath={['username']} setStateHandler={setNewUser} />
            <TextInput name="E-Mail" obj={newUser} propPath={['email']} setStateHandler={setNewUser} />
            <TextInput name="Passwort" obj={newUser} propPath={['password']} setStateHandler={setNewUser}/>
            <DropdownInput
                items={UserRoles}
                icon="leaf"
                iconColor={green}
                label="Rolle"
                propPath={['userrole']} 
                onChange={setNewUser}
            />
            {/* Todo: Das sollte besser so ein magic save button sein */}
            <IconButton
                icon={'save'}
                name={'Save new User'}
                color={white}
                onClick={innerCreateUser}
                className={LocalStyles.GreenFull}
            />
        </>
    );
};

export const UserChangePasswordWindow: FC<{ user: FullUser }> = ({ user }) => {
    // Change Password
    const [oldPW, setOldPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [repNewPW, setRepNewPW] = useState('');
    const [savePWError, SetSavePWError] = useState(false);

    const saveNewPW = () => {
        SetSavePWError(true);
    };

    return (
        <>
            <h2>Change Password</h2>
            <SimpleTextInput name="Altes Passwort" value={oldPW} onChange={setOldPW} />
            <SimpleTextInput name="Neues Passwort" value={newPW} onChange={setNewPW} />
            <SimpleTextInput name="Neues Passwort wiederholen" value={repNewPW} onChange={setRepNewPW} />
            {/* <SaveButton withText={true} error={savePWError} save={saveNewPW} /> */}
            <IconButton
                icon={savePWError ? 'ban' : 'save'}
                name={savePWError ? 'Error while saving' : 'Save new Password'}
                color={white}
                onClick={saveNewPW}
                className={savePWError ? LocalStyles.RedFull : LocalStyles.GreenFull}
            />
        </>
    );
};

export const User = () => {
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
