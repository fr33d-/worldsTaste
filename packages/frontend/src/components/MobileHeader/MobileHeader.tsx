import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import LocalStyles from './MobileHeader.module.scss';

type MobileHeaderProps = {
    icon: IconProp;
    name: string;
};

export const MobileHeader = ({ icon, name }: MobileHeaderProps) => (
    <div className={classNames('row', LocalStyles.MobileHeader)}>
        <FontAwesomeIcon icon={icon} size="4x" color="#8B572A" />
        <h1>{name}</h1>
    </div>
);
