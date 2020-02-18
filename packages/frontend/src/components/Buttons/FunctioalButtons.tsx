import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { AttrDataType } from '../../helpers/types';
import { black, grayDark } from '../../styles/colors';
import { AttrDataWindow } from '../../windows/AttrDataWindow';
import { UserModal } from '../../windows/UserWindows';
import { WTModal } from '../Modal/Modal';

//Todo: Maybe we can abstract this buttons with component composition

export const DataAttrWindowButton: FC<{setEditState: Dispatch<SetStateAction<boolean>>; attrData: AttrDataType[]}> = ({setEditState, attrData}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

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
                    {/* <CoffeeAttrDataWindow closeDialog={() => setDialogOpen(false)} /> */}
                    <AttrDataWindow close={() => setDialogOpen(false)} content={attrData} />
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
