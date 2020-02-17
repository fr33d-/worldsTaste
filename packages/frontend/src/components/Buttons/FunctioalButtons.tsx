import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { UserContext } from '../../Contexts/UserContext';
import { black, grayDark } from '../../styles/colors';
import { CoffeeAttrDataWindow } from '../../windows/AttrDataWindow';
import { UserModal } from '../../windows/UserWindows';
import { WTModal } from '../Modal/Modal';

export const DataAttrWindowButton = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setEditState } = useContext(CoffeeContext);

    useEffect(() => {
        setEditState(dialogOpen);
    }, [dialogOpen]);

    return (
        <>
            <button className={classNames('add-button big', 'WTButton')} onClick={() => setDialogOpen(true)}>
                <FontAwesomeIcon icon="database" />
            </button>
            {dialogOpen && (
                <WTModal>
                    <CoffeeAttrDataWindow closeDialog={() => setDialogOpen(false)} />
                </WTModal>
            )}
        </>
    );
};

export const UserLoginButton = () => {
    const { user } = useContext(UserContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <>
            <button className={'UserIcon'} onClick={() => setDialogOpen(true)}>
                <FontAwesomeIcon icon="user" color={user ? black : grayDark} />
            </button>
            {dialogOpen && (
                <WTModal size={'small'}>
                    <UserModal closeDialog={() => setDialogOpen(false)} />
                </WTModal>
            )}
        </>
    );
};
