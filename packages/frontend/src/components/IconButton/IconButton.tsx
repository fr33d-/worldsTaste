import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type IconButtonProps = Partial<{
    icon: IconProp;
    name: string;
    color: string;
    className: string;
    onClick(): void;
}>;

export const IconButton = ({ icon, name, color, onClick, className }: IconButtonProps = { color: '#000' }) => (
    <button onClick={onClick} className={className}>
        {icon !== undefined && <FontAwesomeIcon icon={icon} color={color} />}
        {name}
    </button>
);

export const SaveButton = ({ withText }: { withText?: boolean }) =>
    <IconButton icon="save" name={withText ? 'Save' : ''} color="#64B10A" />;

// const Foo = () => (
//     <>
//         <SaveButton />
//         <SaveButton withText />
//     </>
// );