import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import LocalStyles from './User.module.scss';

// type UserProps = {
//     year: string;
//     version: string;
// };

export type User = {
    id: number;
    name: string;
}

export const User = () => {

    const [user, setUser] = useState<User | undefined>();

    const login = () => {

    }

    return (
        <div className={LocalStyles.User}>
            <Container>
                <Row>
                    <div className="col-9">User:</div>
                    <div className="col-3">
                        <button onClick={login}>Login</button>
                    </div>
                    {user ? (
                        <div className="col-12">
                            User: {user.name}
                        </div>
                    ) : (
                        <div className="col-12">
                            no user
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
};
