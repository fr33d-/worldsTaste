import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cloneDeep, get, set } from 'lodash';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { blue, grayDarker } from '../../styles/colors';
// import LocalStyles from './FormElements.module.scss';
import { AttrDataItemType } from '../../helpers/types';
import { DateInput } from "@blueprintjs/datetime";

type textInputProps = {
    name: string;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const TextInput = ({ name, obj, propPath, setStateHandler }: textInputProps) => {
    return (
        <div className={'TextInput'}>
            <span className={'Name'}>{name}</span>
            <input
                type="text"
                placeholder={name}
                value={get(obj, propPath)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setStateHandler(cloneDeep(set(obj, propPath, e.target.value)))
                }
            />
        </div>
    );
};

type SimpleInputProps = {
    name: string;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
};

export const SimpleTextInput = ({ name, onChange, value }: SimpleInputProps) => {
    return (
        <div className={'TextInput'}>
            <span className={'Name'}>{name}</span>
            <input
                type="text"
                placeholder={name}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
        </div>
    );
};

// type newTextInputProps = {
//     name: string;
//     obj: any;
//     propPath: string | string[];
//     onChange: Dispatch<SetStateAction<any>>;
// };

// export const NewTextInput = ({ name, onChange, obj, propPath }: newTextInputProps) => {
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         onChange(cloneDeep(set(obj, propPath, e.target.value)));
//     };

//     return (
//         <div className={'TextInput'}>
//             <span className={'Name'}>{name}</span>
//             <input type="text" placeholder={name} value={get(obj, propPath)} onChange={handleChange} />
//         </div>
//     );
// };

export const PasswordInput = ({ name, obj, propPath, setStateHandler }: textInputProps) => (
    <div className={'TextInput'}>
        <span className={'Name'}>{name}</span>
        <input
            type="password"
            placeholder={name}
            value={get(obj, propPath)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStateHandler(cloneDeep(set(obj, propPath, e.target.value)))
            }
        />
    </div>
);

export const SimplePasswordInput = ({ name, onChange, value }: SimpleInputProps) => (
    <div className={'TextInput'}>
        <span className={'Name'}>{name}</span>
        <input
            type="password"
            placeholder={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
    </div>
);

type numberInputProps = {
    name: string;
    unit: string;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const NumberInput = ({ name, unit, obj, propPath, setStateHandler }: numberInputProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Todo: if e is number oder sonderzeichen
        setStateHandler(cloneDeep(set(obj, propPath, e.target.value)));
    };

    return (
        <div className={'TextInput'}>
            <span className={'Name'}>{name}</span>
            <input
                type="text"
                placeholder={name}
                value={get(obj, propPath)}
                onChange={onChange}
                className={'NumberInput'}
            />
            <span className={'Unit'}>{unit}</span>
        </div>
    );
};

type StringDropdownInputProps = {
    label: string;
    icon?: IconProp;
    iconColor?: string;
    items: string[];
    selectedItem?: string;
    onChange: Dispatch<SetStateAction<any>>;
    propPath: string | string[];
    obj: any;
};

export const StringDropdownInput = ({
    label,
    selectedItem,
    icon,
    iconColor,
    onChange,
    propPath,
    items,
    obj,
}: StringDropdownInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (obj) {
            console.log('old item and changed path', obj, propPath)
            onChange(cloneDeep(set(obj, propPath, items.filter(item => item === e.target.value)[0])));
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
                        if (selectedItem && item === selectedItem) {
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
};

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
// type DropdownInputProps = {
//     label: string;
//     icon?: IconProp;
//     iconColor?: string;
//     items: AttrDataItemType[];
//     selectedItem: AttrDataItemType;
//     onChange: Dispatch<SetStateAction<AttrDataItemType>>;
// };

// export const DropdownInput = ({ items, label, selectedItem, icon, iconColor, onChange }: DropdownInputProps) => {
//     const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//         const newItem = items.find(({ name }) => name === e.target.value);
//         if (newItem !== undefined) {
//             onChange(newItem);
//         }
//     };

//     return (
//         <div className={'DropdownInput'}>
//             <label>{label}</label>
//             <div className={'select'}>
//                 {icon && <FontAwesomeIcon icon={icon} color={iconColor} className={'Icon'} size="sm" />}
//                 <select onChange={handleChange}>
//                     {items.map((item, i) => {
//                         if (item.name === selectedItem.name) {
//                             return (
//                                 <option key={i} value={item.name} selected>
//                                     {item.name}
//                                 </option>
//                             );
//                         } else {
//                             return (
//                                 <option key={i} value={item.name}>
//                                     {item.name}
//                                 </option>
//                             );
//                         }
//                     })}
//                 </select>
//             </div>
//         </div>
//     );
// };

type TextareaProps = {
    label: string;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const TextareaInput = ({ label, obj, propPath, setStateHandler }: TextareaProps) => {
    return (
        <>
            <div className={'TextareaInput'}>
                <FontAwesomeIcon icon="bars" size="lg" color={grayDarker} />
                <textarea
                    placeholder={label}
                    value={get(obj, propPath)}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setStateHandler(cloneDeep(set(obj, propPath, e.target.value)))
                    }
                    className="formElement"
                />
            </div>
        </>
    );
};

type DateInputProps = {
    label: string;
    // value: Date;
    // onChange: Dispatch<React.SetStateAction<Date>>;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const WTDateInput = ({ label, obj, propPath, setStateHandler }: DateInputProps) => {
    const date: Date = get(obj, propPath);
    const setDate = (date: Date) => {
        setStateHandler(cloneDeep(set(obj, propPath, date)))
    }

    return (
        <div className={'DateInput'}>
            <label>{label}</label>
            <div className={'DateInputArea'}>
                <FontAwesomeIcon icon="calendar" size="lg" color={blue} />
                <DateInput
                    formatDate={date => date.toLocaleString()}
                    onChange={setDate}
                    parseDate={str => new Date(str)}
                    placeholder={"DD/MM/YYYY"}
                    value={date}
                    timePrecision={"minute"}
                />
            </div>
        </div>
    );
};

type BoolInputProps = {
    label: string;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const BoolInput = ({ label, obj, propPath, setStateHandler }: BoolInputProps) => (
    <>
        <label>Boolean</label>
        <div className={'BoolInput'}>
            <label>{label}</label>
            <input
                type="checkbox"
                name={label}
                value={label}
                checked={get(obj, propPath)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setStateHandler(cloneDeep(set(obj, propPath, e.target.value)))
                }
            />
        </div>
    </>
);
