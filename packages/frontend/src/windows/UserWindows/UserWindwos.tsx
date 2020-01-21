import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DropdownInput, SimplePasswordInput, SimpleTextInput, TextInput } from '../../components/FormElements';
import { AttrField } from '../../components/FormElements/AttrFields';
import { IconButton } from '../../components/Buttons';
import { AttrDataItemType, ExtendedUser, FullUser, User } from '../../helpers/types';
import { UserRoles } from '../../pages/User';
import {
    changeUser,
    createUser,
    getUserList,
    newExtendedUser,
    throwDataError,
    throwDataSucess,
} from '../../pages/User/userHelperFunctions';
import { green, white } from '../../styles/colors';
import { login } from './UserHelperFunctions';


export const LoginWindow = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const innerLogin = () => {
        login(username, password)
            .then((res) => {
                setMsg('Logged in!');
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
            <div className={`col-12 col-md-6 offset-md-3 ${'Login'} `}>
                <h1>Login</h1>
                <div className={'LoginWindow'}>
                    <div className={'Head'}>
                        You are currently not logged in. If you wish to sign up please send me a mail.
                    </div>
                    <div className={'Form'}>
                        <SimpleTextInput onChange={setUserName} name="Username" value={username} />
                        <SimplePasswordInput onChange={setPassword} name="Password" value={password} />
                    </div>
                    <div className={'ButtonSection'}>
                        <Button className={'Login'} onClick={innerLogin}>
                            Login
                        </Button>
                    </div>
                    <p className={'Error'}>{msg}</p>
                </div>
            </div>
        </>
    );
};

export const UserDetailWindow: FC<{ user: FullUser }> = ({ user }) => {
    return (
        <>
            <h2>General</h2>
            <AttrField value={user.name} name="Name:" className={'AttrField'} />
            <AttrField value={user.email} name="E-Mail:" className={'AttrField'} />
            <AttrField value={user.created} name="Erstellt am:" className={'AttrField'} />
            <AttrField value={user.role} name="Rolle:" className={'AttrField'} />
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
                        obj={selectedUser}
                    />
                    <IconButton
                        icon={saveingError ? 'ban' : 'save'}
                        name={saveingError ? 'Error while saving' : 'Update User'}
                        color={white}
                        onClick={innerChangeUser}
                        className={saveingError ? 'RedFull' : 'GreenFull'}
                    />
                    <IconButton
                        icon="envelope-open"
                        name="Send user password reset link"
                        color={white}
                        onClick={sendResetPasswordLink}
                        className={'GreenFull'}
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
                throwDataSucess('user created');
            })
            .catch((e) => {
                throwDataError('can not create user', e);
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
                obj={newUser}
            />
            {/* Todo: Das sollte besser so ein magic save button sein */}
            <IconButton
                icon={'save'}
                name={'Save new User'}
                color={white}
                onClick={innerCreateUser}
                className={'GreenFull'}
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
                className={savePWError ? 'RedFull' : 'GreenFull'}
            />
        </>
    );
};
