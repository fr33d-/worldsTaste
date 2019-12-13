import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { User } from '.';
import { SimplePasswordInput, SimpleTextInput } from '../../components/FormElements';
import { authURL, baseURL } from '../../data';
import LocalStyles from './User.module.scss';

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
