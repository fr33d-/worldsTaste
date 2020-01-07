import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import GeneralStyles from './../../style/GeneralStyles.module.scss';
import LocalStyles from './AttrFields.module.scss';
import { red, gray, yellow, grayDark, grayDarker } from '../../styles/colors';
import { get, set, cloneDeep } from 'lodash';

type dateFormatProps = {
    date: Date;
};

export const DateFormat = ({ date }: dateFormatProps) => {
    return (
        <>
            {date.getDate()}.{date.getMonth()}.{date.getFullYear()} - {date.getUTCHours()}:{date.getUTCMinutes()} Uhr
        </>
    );
};

type SliderAttrFieldProps = {
    name?: string;
    value: number;
    icon?: IconProp;
    iconColor?: string;
    color: string;
    onChange(i: number): void;
};

export const SliderAttrField = ({ name, value, icon, onChange, iconColor, color }: SliderAttrFieldProps) => {
    const style = { backgroundColor: color };
    return (
        <>
            {name && <label>{name}</label>}
            <div className={LocalStyles.SliderAttrField}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} size="sm" />}
                <ul>
                    {[...Array(5)].map((_, i) => {
                        return i <= value ? (
                            <li onClick={() => onChange(i)} style={style} key={i} />
                        ) : (
                            <li onClick={() => onChange(i)} key={i} />
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

type ObjSliderAttrFieldProps = {
    name?: string;
    icon?: IconProp;
    iconColor?: string;
    color: string;
    obj: any; //number
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>; //number
};

export const ObjSliderAttrField = ({ name, icon, iconColor, color, obj, propPath, setStateHandler }: ObjSliderAttrFieldProps) => {
    const style = { backgroundColor: color };
    return (
        <>
            {name && <label>{name}</label>}
            <div className={LocalStyles.SliderAttrField}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} size="sm" />}
                <ul>
                    {[...Array(5)].map((_, i) => {
                        return i <= get(obj, propPath) ? (
                            <li onClick={() => setStateHandler(cloneDeep(set(obj, propPath, i)))} style={style} key={i} />
                        ) : (
                            <li onClick={() => setStateHandler(cloneDeep(set(obj, propPath, i)))} key={i} />
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export const SingleSliderAttrField = ({ name, value, icon, onChange, iconColor, color }: SliderAttrFieldProps) => {
    const style = { backgroundColor: `hsl(${value * 30}, 50%, 50%)` };
    return (
        <>
            {name && <label>{name}</label>}
            <div className={LocalStyles.SliderAttrField}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} size="sm" />}
                <ul>
                    {[...Array(5)].map((_, i) => {
                        return i === value ? (
                            <li onClick={() => onChange(i)} style={style} key={i} />
                        ) : (
                            <li onClick={() => onChange(i)} key={i} />
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export const ObjSingleSliderAttrField = ({ name, color, icon, iconColor, obj, propPath, setStateHandler }: ObjSliderAttrFieldProps) => {
    const value = get(obj, propPath);
    const style = { backgroundColor: `hsl(${value * 30}, 50%, 50%)` };
    const onChange = (i: number) => {
        setStateHandler(cloneDeep(set(obj, propPath, i)))
    }
    return (
        <>
            {name && <label>{name}</label>}
            <div className={LocalStyles.SliderAttrField}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} size="sm" />}
                <ul>
                    {[...Array(5)].map((_, i) => {
                        return i === value ? (
                            <li onClick={() => onChange(i)} style={style} key={i} />
                        ) : (
                            <li onClick={() => onChange(i)} key={i} />
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

type LikeSliderAttrFieldProps = {
    name?: string;
    value: number;
    maxValue: number;
    onChange: Dispatch<SetStateAction<number>>;
};

export const LikeSliderAttrField = ({ name, value, maxValue, onChange }: LikeSliderAttrFieldProps) => {
    const [stateValue, setStateValue] = useState(value);
    const hoverIcon = (i: number) => {
        setStateValue(i);
    };
    return (
        <>
            {name && <label className={LocalStyles.AttrFieldLabel}>{name}</label>}
            <div className={LocalStyles.LikeSliderAttrField}>
                <FontAwesomeIcon icon="heart" color={red} size="lg" />
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
};

type ObjLikeSliderAttrFieldProps = {
    name?: string;
    maxValue: number;
    obj: any; //number
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>; //number
};

export const ObjLikeSliderAttrField = ({
    name,
    maxValue,
    obj,
    propPath,
    setStateHandler,
}: ObjLikeSliderAttrFieldProps) => {
    const [stateValue, setStateValue] = useState(get(obj, propPath));
    const hoverIcon = (i: number) => {
        setStateValue(i);
    };
    return (
        <>
            {name && <label className={LocalStyles.AttrFieldLabel}>{name}</label>}
            <div className={LocalStyles.LikeSliderAttrField}>
                <FontAwesomeIcon icon="heart" color={red} size="lg" />
                <ul>
                    {[...Array(maxValue)].map((_, i) => (
                        <span onChange={() => setStateHandler(cloneDeep(set(obj, propPath, i)))} key={i}>
                            <FontAwesomeIcon icon="star" color={i <= stateValue ? yellow : grayDark} />
                            <div className={LocalStyles.Hover} onMouseEnter={() => hoverIcon(i)} />
                        </span>
                    ))}
                </ul>
            </div>
        </>
    );
};

type AttrFieldProps = {
    name: string;
    value: string;
    icon?: IconProp;
    color?: string;
    className?: string;
};

export const AttrField = ({ name, value, icon, color, className }: AttrFieldProps) => (
    <div className={classNames(className && className)}>
        <label className={LocalStyles.AttrFieldLabel}>{name}</label>
        <div className={LocalStyles.AttrField}>
            {icon && <FontAwesomeIcon icon={icon} color={color} size="sm" />}
            <span className={LocalStyles.Value}>{value}</span>
        </div>
    </div>
);

type AttrFieldSliderProps = {
    name: string;
    value: number;
    icon?: IconProp;
    color: string;
};

export const AttrFieldSlider = ({ name, value, icon, color }: AttrFieldSliderProps) => {
    const style = { backgroundColor: color };
    return (
        <>
            <label className={LocalStyles.AttrFieldLabel}>{name}</label>
            <div className={LocalStyles.AttrField}>
                {icon && <FontAwesomeIcon icon={icon} color={color} size="sm" />}
                {
                    <div className={LocalStyles.Iconlist}>
                        <ul>
                            {[...Array(5)].map((_, i) => {
                                return i <= value ? <li key={i} style={style} /> : <li key={i} />;
                            })}
                        </ul>
                    </div>
                }
            </div>
        </>
    );
};

type AttrFieldSliderSingleProps = {
    textLeft: string;
    textRight: string;
    value: number;
    icon?: IconProp;
    color: string;
};

export const AttrFieldSliderSingle = ({ textLeft, textRight, value, icon, color }: AttrFieldSliderSingleProps) => {
    const style = { backgroundColor: color };
    return (
        <>
            <label className={LocalStyles.AttrFieldLabel}>{textLeft}</label>
            <label className={LocalStyles.AttrFieldLabel}>{textRight}</label>
            <div className={LocalStyles.AttrField}>
                {icon && <FontAwesomeIcon icon={icon} color={color} size="sm" />}
                {
                    <div className={LocalStyles.Iconlist}>
                        <ul>
                            {[...Array(5)].map((_, i) => {
                                return i === value ? <li key={i} style={style} /> : <li key={i} />;
                            })}
                        </ul>
                    </div>
                }
            </div>
        </>
    );
};

type AttrFieldLikeList = {
    name: string;
    value: number;
};

export const AttrFieldLikeList = ({ name, value }: AttrFieldLikeList) => (
    <>
        <label className={LocalStyles.AttrFieldLabel}>{name}</label>
        <div className={LocalStyles.AttrField}>
            <FontAwesomeIcon icon="heart" color={red} size="sm" />
            {
                <div className={LocalStyles.Iconlist}>
                    <ul>
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon icon="star" color={i < value ? yellow : grayDark} size="sm" key={i} />
                        ))}
                    </ul>
                </div>
            }
        </div>
    </>
);

type AttrFieldDescriptionProps = {
    name: string;
    value: string;
};

export const AttrFieldDescription = ({ name, value }: AttrFieldDescriptionProps) => (
    <>
        <label className={LocalStyles.AttrFieldLabel}>{name}</label>
        <div className={LocalStyles.Description}>
            <p>
                <FontAwesomeIcon icon="bars" size="lg" color={grayDarker} />
                {value}
            </p>
        </div>
    </>
);
