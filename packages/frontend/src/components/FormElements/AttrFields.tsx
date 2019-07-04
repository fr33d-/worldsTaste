import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './AttrFields.module.scss';
import { red, gray, yellow, grayDark } from '../../style/colors';

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

type LikeSliderAttrFieldProps = {
    value: number;
    maxValue: number;
    onChange: Dispatch<SetStateAction<number>>;
};

export const LikeSliderAttrField = ({ value, maxValue, onChange }: LikeSliderAttrFieldProps) => {
    const [stateValue, setStateValue] = useState(value);
    const hoverIcon = (i: number) => {
        setStateValue(i);
    }
    return (
        <>
        {name && <label>{name}</label>}
        <div className={LocalStyles.LikeSliderAttrField}>
            <FontAwesomeIcon icon="heart" color={red} size='lg' />
            <ul>
                {[...Array(maxValue)].map((_, i) => (
                    <span onClick={() => onChange(i)} key={i}>
                        <FontAwesomeIcon icon="star" color={i <= stateValue ? yellow : grayDark} />
                        <div className={LocalStyles.Hover} onMouseEnter={() => hoverIcon(i)} />
                    </span>
                ))}
            </ul>
        </div>
    </>
    );
}

type AttrFieldProps = {
    name: string;
    value: string;
    icon: IconProp;
    color: string;
};

export const AttrField = ({ name, value, icon, color }: AttrFieldProps) => (
    <div className={GeneralStyles.AttrField}>
        <p className={GeneralStyles.Name}>{name}</p>
        <div>
            <FontAwesomeIcon icon={icon} color={color} size="sm" />
            <span className={GeneralStyles.Value}>{value}</span>
        </div>
    </div>
);

type AttrFieldIconlistProps = {
    name: string;
    value: number;
    valueIcon: IconProp;
    valueIconColor: string;
    icon: IconProp;
    color: string;
};

export const AttrFieldIconlist = ({ name, valueIcon, value, valueIconColor, icon, color }: AttrFieldIconlistProps) => (
    <div className={GeneralStyles.AttrField}>
        <p className={GeneralStyles.Name}>{name}</p>
        <div>
            <FontAwesomeIcon icon={icon} color={color} size="sm" />
            {
                <div className={GeneralStyles.Iconlist}>
                    <ul>
                        {[...Array(value)].map(() => (
                            <li className={GeneralStyles.Active} />
                        ))}
                        {[...Array(5 - value)].map(() => (
                            <li />
                        ))}
                    </ul>
                </div>
            }
        </div>
    </div>
);
