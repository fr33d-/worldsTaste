import React, { FormEvent, ChangeEvent } from 'react';
import { Col, Form, FormControlProps } from 'react-bootstrap';
import { AttrDataItemType } from '../AttrDataWindow';
import LocalStyles from './DropdownColumn.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DropdownComponentProps = {
    label?: string;
    iconLabel?: IconProp;
    iconLabelColor?: string;
    items: AttrDataItemType[];
    onChange(event: ChangeEvent<HTMLSelectElement>): void;
    selectedItem: AttrDataItemType;
};

export const DropdownColumn = ({
    items,
    label,
    onChange,
    selectedItem,
    iconLabel,
    iconLabelColor,
}: DropdownComponentProps) => (
    <Col>
        {label && <label>{label}</label>}
        <div className={LocalStyles.select}>
            {iconLabel && (
                <FontAwesomeIcon icon={iconLabel} color={iconLabelColor} className={LocalStyles.Icon} size="lg" />
            )}
            <select onChange={onChange}>
                <option value="unknown">unknown</option>
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
    </Col>
);
