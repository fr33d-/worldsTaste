import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useState, FC, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { SimplePasswordInput, SimpleTextInput, DropdownInput, TextInput } from '../../components/FormElements';
import { authURL, baseURL } from '../../data';
import LocalStyles from './User.module.scss';
import { User, ExtendedUser, FullUser, UserRoles } from '../../pages/User';
import { IconButton } from '../../components/IconButton';
import { createUser, throDataSucess, newExtendedUser, throDataError, getUserList, changeUser } from '../../pages/User/userHelperFunctions';
import { green, white } from '../../styles/colors';
import { Link } from 'react-router-dom';
import { AttrDataItemType } from '../../components/FormComponents';
import { AttrField } from '../../components/FormElements/AttrFields';

export const useJwt = (): User | undefined => {
    const jwtObj = sessionStorage.getItem('auth');

    if (jwtObj == null && typeof jwtObj !== 'string') {
        return;
    } else {
        const jwtJson = jwt.decode(jwtObj);
        // console.log(jwtJson);

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

type LoginWindwoProps = {
    setUserFromStr(): void;
};

export const LoginWindow = (props: LoginWindwoProps) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const login = () => {
        axios
            .post<string>(`${baseURL}${authURL}/login`, { username, password })
            .then((response) => {
                // console.log(response);
                sessionStorage.setItem('auth', response.data);

                setMsg('Logged in!');
                // location.reload();
                props.setUserFromStr();
            })
            .catch((error) => {
                console.log(error);
                if (error && error.response && error.response.status === 400) {
                    setMsg('You need to enter a valid Mail and a Password!');
                } else if (error && error.response && error.response.status === 401) {
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
                        <SimpleTextInput onChange={setUserName} name="Username" value={username} />
                        <SimplePasswordInput onChange={setPassword} name="Password" value={password} />
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
    // Todo: why we dont use this?
    const [newUserRole, setNewUserRole] = useState<AttrDataItemType>();

    const innerChangeUser = () => {
        if (selectedUser) {
            changeUser(selectedUser)
                .then((res) => {
                    console.log('user updated');
                    console.log(res);
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

    const innerGetUserList = () => {
        getUserList()
            .then((data) => {
                setListOfAllUsers(data);
            })
            .catch((error) => {
                console.log(error);
                // Todo: throw toast here
            });
    };

    useEffect(() => {
        innerGetUserList();
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
                    <TextInput
                        name="User Name"
                        obj={selectedUser}
                        propPath="username"
                        setStateHandler={setSelectedUser}
                    />
                    <TextInput name="E-Mail" obj={selectedUser} propPath="email" setStateHandler={setSelectedUser} />
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
                        onClick={innerChangeUser}
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

export const UserCreateNewWindow: FC<{ user: FullUser }> = () => {
    const [newUser, setNewUser] = useState<ExtendedUser>(newExtendedUser);

    const innerCreateUser = () => {
        createUser(newUser)
            .then((res) => {
                throDataSucess('user created');
            })
            .catch((e) => {
                throDataError('can not create user', e);
            });
    };

    return (
        <>
            <h2>Create User</h2>
            <p>All fields must me longer than 4 charecters</p>
            <TextInput name="Name" obj={newUser} propPath={['name']} setStateHandler={setNewUser} />
            <TextInput name="User name" obj={newUser} propPath={['username']} setStateHandler={setNewUser} />
            <TextInput name="E-Mail" obj={newUser} propPath={['email']} setStateHandler={setNewUser} />
            <TextInput name="Passwort" obj={newUser} propPath={['password']} setStateHandler={setNewUser} />
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
