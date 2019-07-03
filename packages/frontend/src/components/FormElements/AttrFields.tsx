import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import LocalStyles from './AttrFields.module.scss';

type SliderAttrFieldProps = {
    name?: string;
    value: number;
    maxValue: number;
    icon?: IconProp;
    iconColor?: string;
    color?: string;
    onChange(i: number): void;
};

export const SliderAttrField = ({ name, value, maxValue, icon, onChange, iconColor }: SliderAttrFieldProps) => (
    <>
        {name && <label>{name}</label>}
        <div className={LocalStyles.SliderAttrField}>
        {icon && <FontAwesomeIcon icon={icon} color={iconColor} size="sm" />}
            <ul>
                {[...Array(maxValue)].map((_, i) => (
                    <li onClick={() => onChange(i)} className={classNames(i <= value && LocalStyles.Active)} key={i} />
                ))}
            </ul>
        </div>
    </>
);
