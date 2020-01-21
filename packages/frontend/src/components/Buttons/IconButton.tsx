import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { grayDarker, red, white } from '../../styles/colors';

type IconButtonProps = Partial<{
    icon: IconProp;
    name: string;
    color: string;
    className: string;
    onClick(): void;
}>;

export const IconButton = ({ icon, name, color, onClick, className }: IconButtonProps = { color: '#000' }) => (
    <button onClick={onClick} className={classNames(className, 'IconButton')}>
        {icon !== undefined && <FontAwesomeIcon icon={icon} color={color} />}
        {name}
    </button>
);

export const SmallIconButton = ({
    onClick,
    color,
    icon,
    name,
}: {
    onClick(): void;
    color: string;
    icon: IconProp;
    name: string;
}) => {
    <button onClick={onClick} className={classNames('color-button', color)}>
        <FontAwesomeIcon icon={icon} />
        {name}
    </button>;
};

type SaveButtonProps = {
    withText?: boolean;
    error: boolean;
    save(): void;
};

export const SaveButton = (props: SaveButtonProps) => (
    <IconButton
        icon={props.error ? 'ban' : 'save'}
        name={props.withText ? (props.error ? 'Error' : 'Save') : ''}
        color={white}
        onClick={props.save}
        className={props.error ? 'RedFull' : 'GreenFull'}
    />
);

export const DeleteButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="trash-alt"
        name={withText ? 'Delete' : ''}
        color={red}
        onClick={onClick}
        className={'Red'}
    />
);

export const CancelButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="times-circle"
        name={withText ? 'Cancel' : ''}
        color={grayDarker}
        onClick={onClick}
        className={'Gray'}
    />
);
