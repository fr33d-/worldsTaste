import { DateInput } from '@blueprintjs/datetime';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { blue, grayDarker } from '../../styles/colors';
import { AttrDataItemType } from '../../helpers/types';
import { cloneDeep, set } from 'lodash';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    name: string;
    className?: string;
}>;

export const WTInput = ({ name, children, className }: Props) => {
    return (
        <div className={classNames('TextInput', className)}>
            <span className={'Name'}>{name}</span>
            {children}
        </div>
    );
};

type InputProps = {
    name: string;
    value: string;
    setValue(val: string): void;
};

export const TextInput = ({ name, setValue, value }: InputProps) => {
    return (
        <WTInput name={name}>
            <input
                type="text"
                placeholder={name}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
        </WTInput>
    );
};

export const PasswordInput = ({ name, setValue, value }: InputProps) => (
    <WTInput name={name}>
        <input
            type="password"
            placeholder={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
    </WTInput>
);

type NumberInputProps = {
    name: string;
    unit: string;
    value: number;
    setValue(val: number): void;
};

export const NumberInput = ({ name, unit, setValue, value }: NumberInputProps) => (
    <WTInput name={name}>
            <input
                type="text"
                placeholder={name}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}
                className={'NumberInput'}
            />
            <span className={'Unit'}>{unit}</span>
        </WTInput>
    );

type DropdownInputProps = {
    name: string;
    icon?: IconProp;
    iconColor?: string;
    items: string[];
    value?: string;
    setValue(val: string): void;
};

export const DropdownInput = ({
    name,
    value,
    icon,
    iconColor,
    items,
    setValue
}: DropdownInputProps) =>  (
        <div className={'DropdownInput'}>
            <label>{name}</label>
            <div className={'select'}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} className={'Icon'} size="sm" />}
                <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)} >
                    {items.map((item, i) => {
                        if (value && item === value) {
                            return (
                                <option key={i} value={item} selected>
                                    {item}
                                </option>
                            );
                        } else {
                            return (
                                <option key={i} value={item}>
                                    {item}
                                </option>
                            );
                        }
                    })}
                </select>
            </div>
        </div>
    );

export const TextareaInput = ({ name, setValue, value }: InputProps) => (
            <WTInput name={name} className='TextareaInput'>
                <FontAwesomeIcon icon="bars" size="lg" color={grayDarker} />
                <textarea
                    placeholder={name}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
                    className="formElement"
                />
            </WTInput>
    );

type DateInputProps = {
        name: string;
        value: Date;
        setValue(selectedDate: Date, isUserChange: boolean): void;
    };

export const WTDateInput = ({ name, setValue, value }: DateInputProps) =>  (
    <WTInput name={name}>
            <div className={'DateInputArea'}>
                <FontAwesomeIcon icon="calendar" size="lg" color={blue} />
                <DateInput
                    formatDate={(date) => date.toLocaleString()}
                    onChange={setValue}
                    parseDate={(str) => new Date(str)}
                    placeholder={'DD/MM/YYYY'}
                    value={value}
                    timePrecision={'minute'}
                />
            </div>
        </WTInput>
    );

type BoolInputProps = {
    name: string;
    value: boolean;
    setValue(val: boolean): void;
};

export const BoolInput = ({ name, setValue, value }: BoolInputProps) => (
    <>
        <label>Boolean</label>
        <div className={'BoolInput'}>
            <label>{name}</label>
            <input
                type="checkbox"
                name={name}
                value={name}
                checked={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value ? true : false)}
            />
        </div>
    </>
);


type AttrDataDropdownInputProps = {
    label: string;
    icon?: IconProp;
    iconColor?: string;
    items: AttrDataItemType[];
    selectedItem?: AttrDataItemType;
    onChange: Dispatch<SetStateAction<any>>;
    propPath: string | string[];
    obj: any;
};

export const AttrDataDropdownInput = ({
    label,
    selectedItem,
    icon,
    iconColor,
    onChange,
    propPath,
    items,
    obj,
}: AttrDataDropdownInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (obj) {
            console.log('old item and changed path', obj, propPath)
            onChange(cloneDeep(set(obj, propPath, items.filter(item => item.name === e.target.value)[0])));
            console.log('new item', obj)
        }
    };

    return (
        <div className={'DropdownInput'}>
            <label>{label}</label>
            <div className={'select'}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} className={'Icon'} size="sm" />}
                <select onChange={handleChange}>
                    {items.map((item, i) => {
                        if (selectedItem && item.name === selectedItem.name) {
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
