import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type MobileHeaderProps = {
    icon: IconProp;
    name: string;
};

export const MobileHeader = ({ icon, name }: MobileHeaderProps) => (
    <div className={'row MobileHeader'}>
        <FontAwesomeIcon icon={icon} size="4x" color="#8B572A" />
        <h1>{name}</h1>
    </div>
);
