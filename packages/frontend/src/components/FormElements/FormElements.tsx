import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cloneDeep, get, set } from 'lodash';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { blue, grayDarker } from '../../styles/colors';
import LocalStyles from './FormElements.module.scss';
import { AttrDataItemType } from '../../helpers/types';

type textInputProps = {
    name: string;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const TextInput = ({ name, obj, propPath, setStateHandler }: textInputProps) => {
    return (
        <div className={LocalStyles.TextInput}>
            <span className={LocalStyles.Name}>{name}</span>
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
        <div className={LocalStyles.TextInput}>
            <span className={LocalStyles.Name}>{name}</span>
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
//         <div className={LocalStyles.TextInput}>
//             <span className={LocalStyles.Name}>{name}</span>
//             <input type="text" placeholder={name} value={get(obj, propPath)} onChange={handleChange} />
//         </div>
//     );
// };

export const PasswordInput = ({ name, obj, propPath, setStateHandler }: textInputProps) => (
    <div className={LocalStyles.TextInput}>
        <span className={LocalStyles.Name}>{name}</span>
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
    <div className={LocalStyles.TextInput}>
        <span className={LocalStyles.Name}>{name}</span>
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
        <div className={LocalStyles.TextInput}>
            <span className={LocalStyles.Name}>{name}</span>
            <input
                type="text"
                placeholder={name}
                value={get(obj, propPath)}
                onChange={onChange}
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
    selectedItem?: AttrDataItemType;
    onChange: Dispatch<SetStateAction<any>>;
    propPath: string | string[];
    obj: any;
};

export const DropdownInput = ({
    label,
    selectedItem,
    icon,
    iconColor,
    onChange,
    propPath,
    items,
    obj,
}: DropdownInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (obj) {
            console.log('old item and changed path', obj, propPath)
            onChange(cloneDeep(set(obj, propPath, items.filter(item => item.name === e.target.value)[0])));
            console.log('new item', obj)
        }
    };

    return (
        <div className={LocalStyles.DropdownInput}>
            <label>{label}</label>
            <div className={LocalStyles.select}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor} className={LocalStyles.Icon} size="sm" />}
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
//         <div className={LocalStyles.DropdownInput}>
//             <label>{label}</label>
//             <div className={LocalStyles.select}>
//                 {icon && <FontAwesomeIcon icon={icon} color={iconColor} className={LocalStyles.Icon} size="sm" />}
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
            <div className={LocalStyles.TextareaInput}>
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

export const DateInput = ({ label, obj, propPath, setStateHandler }: DateInputProps) => {
    return (
        <div className={LocalStyles.DateInput}>
            <label>{label}</label>
            <div className={LocalStyles.DateInputArea}>
                <FontAwesomeIcon icon="calendar" size="lg" color={blue} />
                <input
                    type="text"
                    placeholder={label}
                    // value={`${value.getDate()}.${value.getMonth()}.${value.getFullYear()} - ${value.getUTCHours()}:${value.getUTCMinutes()} Uhr`}

                    value={get(obj, propPath)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setStateHandler(cloneDeep(set(obj, propPath, e.target.value)))
                    }
                />
            </div>
        </div>
    );
};

type BoolInputProps = {
    label: string;
    // value: boolean;
    // onChange: Dispatch<SetStateAction<boolean>>;
    obj: any;
    propPath: string | Array<string>;
    setStateHandler: Dispatch<SetStateAction<any>>;
};

export const BoolInput = ({ label, obj, propPath, setStateHandler }: BoolInputProps) => (
    <>
        <label>Boolean</label>
        <div className={LocalStyles.BoolInput}>
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
