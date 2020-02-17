import React, { FC } from 'react';
import { AppWindow } from '../AppWindow';
import bgImage from './404_empty.svg';

export const NotFoundWindow: FC<{ message?: string }> = ({ message }) => {
    return (
        <div className={'NotFound'}>
            <img className='NotFoundImage' src={bgImage} alt='Sorry, nothing found' />
            {message ? <p>{message}</p> : <p>Sorry something went wrong. We cant find what your looking for</p>}
        </div>
    );
};

export const NotFoundPage = () => {
    return (
        <AppWindow editState={false} sidebar={<></>}>
            <NotFoundWindow />
        </AppWindow>
    );
};
