import LocalStyles from './FormElements.module.scss';
import React, { FormEvent, ChangeEvent } from 'react';
import { Col, Form, FormControlProps } from 'react-bootstrap';
import { AttrDataItemType, AttrDataType } from '../AttrDataWindow';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type textInputProps = {
    name: string;
    value: string | number;
    unit?: string;
    onChange(): void;
};

export const TextInput = ({ name, onChange, value, unit }: textInputProps) => (
    <div className={LocalStyles.TextInput}>
        <span className={LocalStyles.Name}>{name}</span>
        <input type="text" placeholder={name} value={value} onChange={onChange} />
        {unit && <span className={LocalStyles.Unit}>{unit}</span>}
    </div>
);

type DropdownInputProps = {
    label: string;
    icon?: IconProp;
    iconColor?: string;
    items: AttrDataType;
    onChange(event: ChangeEvent<HTMLSelectElement>): void;
    selectedItem: AttrDataItemType;
};

export const DropdownInput = ({
    items,
    label,
    onChange,
    selectedItem,
    icon,
    iconColor,
}: DropdownInputProps) => (
    <div className={LocalStyles.DropdownInput}>
        <label>{label}</label>
        <div className={LocalStyles.select}>
            {icon && (
                <FontAwesomeIcon icon={icon} color={iconColor} className={LocalStyles.Icon} size="sm" />
            )}
            <select onChange={onChange}>
                <option value="unknown">unknown</option>
                {items.items.map((item, i) => {
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