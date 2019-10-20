import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { blue, grayDarker } from '../../style/colors';
import { AttrDataItemType } from '../FormComponents';
import LocalStyles from './FormElements.module.scss';

type textInputProps = {
    name: string;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
};

export const TextInput = ({ name, onChange, value }: textInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return (
        <div className={LocalStyles.TextInput}>
            <span className={LocalStyles.Name}>{name}</span>
            <input type="text" placeholder={name} value={value} onChange={handleChange} />
        </div>
    );
};

export const PasswordInput = ({ name, onChange, value }: textInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return (
        <div className={LocalStyles.TextInput}>
            <span className={LocalStyles.Name}>{name}</span>
            <input type="password" placeholder={name} value={value} onChange={handleChange} />
        </div>
    );
};

type numberInputProps = {
    name: string;
    value: number;
    unit: string;
    onChange: Dispatch<SetStateAction<number>>;
};

export const NumberInput = ({ name, onChange, value, unit }: numberInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={LocalStyles.TextInput}>
            <span className={LocalStyles.Name}>{name}</span>
            <input
                type="text"
                placeholder={name}
                value={value}
                onChange={handleChange}
                className={LocalStyles.NumberInput}
            />
            <span className={LocalStyles.Unit}>{unit}</span>
        </div>
    );
};

type DropdownInputProps = {
    label: string;
    icon?: IconProp;
    iconColor?: string;
    items: AttrDataItemType[];
    selectedItem: AttrDataItemType;
    onChange: Dispatch<SetStateAction<AttrDataItemType>>;
};

export const DropdownInput = ({ items, label, selectedItem, icon, iconColor, onChange }: DropdownInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newItem = items.find(({ name }) => name === e.target.value);
        if (newItem !== undefined) {
            onChange(newItem);
        }
    };

    return (
        <div className={LocalStyles.DropdownInput}>
            <label>{label}</label>
            <div className={LocalStyles.select}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} className={LocalStyles.Icon} size="sm" />}
                <select onChange={handleChange}>
                    {items.map((item, i) => {
                        if (item.name === selectedItem.name) {
                            return (
                                <option key={i} value={item.name} selected>
                                    {item.name}
                                </option>
                            );
                        } else {
                            return (
                                <option key={i} value={item.name}>
                                    {item.name}
                                </option>
                            );
                        }
                    })}
                </select>
            </div>
        </div>
    );
};

type TextareaProps = {
    label: string;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
};

export const TextareaInput = ({ label, value, onChange }: TextareaProps) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <>
            <div className={LocalStyles.TextareaInput}>
                <FontAwesomeIcon icon="bars" size="lg" color={grayDarker} />
                <textarea placeholder={label} value={value} onChange={handleChange} className="formElement" />
            </div>
        </>
    );
};

type DateInputProps = {
    label: string;
    value: Date;
    onChange: Dispatch<React.SetStateAction<Date>>;
};

export const DateInput = ({ label, value, onChange }: DateInputProps) => {
    // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     onChange(e.target.value);
    // };

    return (
        <div className={LocalStyles.DateInput}>
            <label>{label}</label>
            <div className={LocalStyles.DateInputArea}>
                <FontAwesomeIcon icon="calendar" size="lg" color={blue} />
                <input
                    type="text"
                    placeholder={label}
                    value={`${value.getDate()}.${value.getMonth()}.${value.getFullYear()} - ${value.getUTCHours()}:${value.getUTCMinutes()} Uhr`}
                />
            </div>
        </div>
    );
};

type BoolInputProps = {
    label: string;
    value: boolean;
    onChange: Dispatch<SetStateAction<boolean>>;
};

export const BoolInput = ({ label, value, onChange }: BoolInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <>
            <label>Boolean</label>
            <div className={LocalStyles.BoolInput}>
                <label>{label}</label>
                {value && <input type="checkbox" name={label} value={label} checked onChange={handleChange} />}
                {!value && <input type="checkbox" name={label} value={label} onChange={handleChange} />}
            </div>
        </>
    );
};
