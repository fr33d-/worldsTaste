import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { green, red, grayDark, white, grayDarker } from '../../style/colors';
import { on } from 'cluster';
import classNames from 'classnames';
import LocalStyles from './IconButton.module.scss';

type IconButtonProps = Partial<{
    icon: IconProp;
    name: string;
    color: string;
    className: string;
    onClick(): void;
}>;

export const IconButton = ({ icon, name, color, onClick, className }: IconButtonProps = { color: '#000' }) => (
    <button onClick={onClick} className={classNames(className, LocalStyles.IconButton)}>
        {icon !== undefined && <FontAwesomeIcon icon={icon} color={color} />}
        {name}
    </button>
);

export const SaveButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="save"
        name={withText ? 'Save' : ''}
        color={white}
        onClick={onClick}
        className={LocalStyles.GreenFull}
    />
);

export const DeleteButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="trash-alt"
        name={withText ? 'Delete' : ''}
        color={red}
        onClick={onClick}
        className={LocalStyles.Red}
    />
);

export const CancelButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="times-circle"
        name={withText ? 'Cancel' : ''}
        color={grayDarker}
        onClick={onClick}
        className={LocalStyles.Gray}
    />
);

// const Foo = () => (
//     <>
//         <SaveButton />
//         <SaveButton withText />
//     </>
// );
