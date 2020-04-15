import React, { FC } from 'react';
import { AppWindow } from '../AppWindow';
import bgImage from './404_empty.svg';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export const NotFoundWindow: FC<{ message?: string }> = ({ message }) => {
    return (
        <div className={'NotFound'}>
            <img className="NotFound--Image" src={bgImage} alt="Sorry, nothing found" />
            <div className="NotFound--Message">
                {message ? <p>{message}</p> : <p>Sorry something went wrong. We cant find what your looking for</p>}
            </div>
        </div>
    );
};

export const NotFoundPage: FC<{ message?: string }> = ({ message, children }) => {
    return (
        <AppWindow editState={false} sidebar={<></>}>
            <NotFoundWindow message={message} />
            {children}
            <Link to="/">
                <Button className="color-button blue-full">Go Home</Button>
            </Link>
        </AppWindow>
    );
};
