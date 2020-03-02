import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconButton } from "../../components/Buttons";
import { AttrField } from "../../components/FormElements/AttrFields";
import { UserContext } from "../../Contexts/UserContext";
import { ExtendedUser, FullUser } from "../../helpers/types";
import { UserRoles } from "../../pages/User";
import {
    changeUser,
    createUser,
    getUserList,
    newExtendedUser,
    throwDataError,
    throwDataSucess,
} from "../../pages/User/userHelperFunctions";
import { green, white } from "../../styles/colors";
import { TextInput, PasswordInput, AttrDataDropdownInput } from "../../components/FormElements/FormElements";

export const UserModal: FC<{ closeDialog(): void }> = ({ closeDialog }) => {
    const { user } = useContext(UserContext);
    console.log("User", user);
    return user ? <UserDetailModal closeDialog={closeDialog} /> : <LoginWindow closeDialog={closeDialog} />;
};

export const UserDetailModal: FC<{ closeDialog(): void }> = ({ closeDialog }) => {
    const { user, contextLogout } = useContext(UserContext);

    return !user ? (
        <p>you are not logged in </p>
    ) : (
        <>
            <div className={"LoginWindow"}>
                <div className={"Head Head__center"}>
                    <h1>{user.name}</h1>
                    <button onClick={closeDialog} className="icon-button CloseButton">
                        <FontAwesomeIcon icon={"times"} />
                    </button>
                </div>
                <div>
                    <p>Mail: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Username: {user.username}</p>
                </div>
                <div className={"ButtonSection"}>
                    <Link to="/user">
                        <Button className="color-button blue-full">Go to user page</Button>
                    </Link>
                    <Button className={"Login"} onClick={contextLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </>
    );
};

export const LoginWindow: FC<{ closeDialog(): void }> = ({ closeDialog }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const { contextLogin } = useContext(UserContext);

    const innerLogin = async () => {
        try {
            await contextLogin(username, password);
            setMsg(`Logged in! `);
            closeDialog();
        } catch (error) {
            if (error && error.response && error.response.status === 400) {
                setMsg("You need to enter a valid Mail and a Password!");
            } else if (error && error.response && error.response.status === 401) {
                setMsg("Wrong data or you dont exist!");
            } else {
                setMsg("Sorry, soemething went wrong!");
            }
            throw error;
        }
    };

    return (
        <>
            <div className={"LoginWindow"}>
                <div className={"Head Head__center"}>
                    <h1>Login</h1>
                    You are currently not logged in. If you wish to sign up please send me a mail.
                    <button onClick={closeDialog} className="icon-button CloseButton">
                        <FontAwesomeIcon icon={"times"} />
                    </button>
                </div>
                <div className={"Form"}>
                    <TextInput setValue={(val) => setUserName(val)} name="Username" value={username} />
                    <PasswordInput setValue={(val) => setPassword(val)} name="Password" value={password} />
                </div>
                <div className={"ButtonSection"}>
                    <Button className={"Login"} onClick={innerLogin}>
                        Login
                    </Button>
                </div>
                <p className={"Error"}>{msg}</p>
            </div>
        </>
    );
};

export const UserDetailWindow: FC<{ user: FullUser }> = ({ user }) => {
    return (
        <>
            <h2>General</h2>
            <AttrField value={user.name} name="Name:" className={"AttrField"} />
            <AttrField value={user.email} name="E-Mail:" className={"AttrField"} />
            <AttrField value={user.created} name="Erstellt am:" className={"AttrField"} />
            <AttrField value={user.role} name="Rolle:" className={"AttrField"} />
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
    const [saveingError, setSaveingError] = useState(false);
    const [listOfAllUsers, setListOfAllUsers] = useState<FullUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<FullUser>();

    const innerChangeUser = async () => {
        if (selectedUser) {
            try {
                await changeUser(selectedUser);
                setSaveingError(false);
            } catch (e) {
                setSaveingError(true);
                throw e;
            }
        }
    };

    const sendResetPasswordLink = () => {
        //do some magic here
    };

    const innerGetUserList = async () => {
        try {
            const data = await getUserList();
            setListOfAllUsers(data);
        } catch (e) {
            throw e;
        }
    };

    useEffect(() => {
        innerGetUserList();
    }, [user]);

    const userClicked = (userItem: FullUser) => {
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
                    <TextInput
                        name="Name"
                        value={selectedUser.name}
                        setValue={(val) => setSelectedUser((user) => (user ? { ...user, name: val } : user))}
                    />
                    <TextInput
                        name="User Name"
                        value={selectedUser.username}
                        setValue={(val) => setSelectedUser((user) => (user ? { ...user, username: val } : user))}
                    />
                    <TextInput
                        name="E-Mail"
                        value={selectedUser.name}
                        setValue={(val) => setSelectedUser((user) => (user ? { ...user, email: val } : user))}
                    />
                    <AttrDataDropdownInput
                        items={UserRoles}
                        iconColor={green}
                        label="Rolle"
                        selectedItem={selectedUser}
                        onChange={setSelectedUser}
                        propPath="role"
                        obj={selectedUser}
                    />
                    <IconButton
                        icon={saveingError ? "ban" : "save"}
                        name={saveingError ? "Error while saving" : "Update User"}
                        color={white}
                        onClick={innerChangeUser}
                        className={saveingError ? "RedFull" : "GreenFull"}
                    />
                    <IconButton
                        icon="envelope-open"
                        name="Send user password reset link"
                        color={white}
                        onClick={sendResetPasswordLink}
                        className={"GreenFull"}
                    />
                </>
            )}
        </>
    );
};

export const UserCreateNewWindow: FC<{ user: FullUser }> = () => {
    const [newUser, setNewUser] = useState<ExtendedUser>(newExtendedUser);

    const innerCreateUser = async () => {
        try {
            await createUser(newUser);
            throwDataSucess("user created");
        } catch (e) {
            throwDataError("can not create user", e);
            throw e;
        }
    };

    return (
        <>
            <h2>Create User</h2>
            <p>All fields must me longer than 4 charecters</p>
            <TextInput
                name="Name"
                value={newUser.name}
                setValue={(val) => setNewUser((user) => (user ? { ...user, name: val } : user))}
            />
            <TextInput
                name="User name"
                value={newUser.username}
                setValue={(val) => setNewUser((user) => (user ? { ...user, username: val } : user))}
            />
            <TextInput
                name="E-Mail"
                value={newUser.email}
                setValue={(val) => setNewUser((user) => (user ? { ...user, email: val } : user))}
            />
            <TextInput
                name="Passwort"
                value={newUser.password}
                setValue={(val) => setNewUser((user) => (user ? { ...user, password: val } : user))}
            />
            <AttrDataDropdownInput
                items={UserRoles}
                icon="leaf"
                iconColor={green}
                label="Rolle"
                propPath={["userrole"]}
                onChange={setNewUser}
                obj={newUser}
            />
            {/* Todo: Das sollte besser so ein magic save button sein */}
            <IconButton
                icon={"save"}
                name={"Save new User"}
                color={white}
                onClick={innerCreateUser}
                className={"GreenFull"}
            />
        </>
    );
};

export const UserChangePasswordWindow: FC<{ user: FullUser }> = ({ user }) => {
    // Change Password
    const [oldPW, setOldPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [repNewPW, setRepNewPW] = useState("");
    const [savePWError, SetSavePWError] = useState(false);

    const saveNewPW = () => {
        SetSavePWError(true);
    };

    return (
        <>
            <h2>Change Password</h2>
            <TextInput name="Altes Passwort" value={oldPW} setValue={setOldPW} />
            <TextInput name="Neues Passwort" value={newPW} setValue={setNewPW} />
            <TextInput name="Neues Passwort wiederholen" value={repNewPW} setValue={setRepNewPW} />
            {/* <SaveButton withText={true} error={savePWError} save={saveNewPW} /> */}
            <IconButton
                icon={savePWError ? "ban" : "save"}
                name={savePWError ? "Error while saving" : "Save new Password"}
                color={white}
                onClick={saveNewPW}
                className={savePWError ? "RedFull" : "GreenFull"}
            />
        </>
    );
};
