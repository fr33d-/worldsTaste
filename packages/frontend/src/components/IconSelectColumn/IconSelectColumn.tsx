import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { grayDark } from '../../styles/colors';

type IconSelectComponentProps = {
    label?: string;
    labelIcon: IconProp;
    labelIconColor: string;
    selectIcon: IconProp;
    selectIconColor: string;
    numberOfValues: number;
    value: number;
    onChange(value: number): void;
};

export const IconSelectColumn = ({
    labelIcon,
    labelIconColor,
    numberOfValues,
    onChange,
    selectIcon,
    selectIconColor,
    value,
    label,
}: IconSelectComponentProps) => {
    const [selectedValue, setSelectedValue] = useState(value);

    return (
        <div className={'FormElement'}>
            {label && <label>{label}</label>}
            <div className={'IconSelect'}>
                <FontAwesomeIcon icon={labelIcon} color={labelIconColor} size="lg" className={'LabelIcon'} />
                <div className={'IconList'}>
                    {[...Array(selectedValue)].map((_, i) => (
                        <span onClick={() => onChange(i + 1)} key={i}>
                            <FontAwesomeIcon icon={selectIcon} color={selectIconColor} />
                            <div className={'Hover'} onMouseEnter={() => setSelectedValue(i + 1)}></div>
                        </span>
                    ))}
                    {[...Array(numberOfValues - selectedValue)].map((_, i) => {
                        const val = selectedValue + i + 1;
                        return (
                            <span onClick={() => onChange(val)} key={val}>
                                <FontAwesomeIcon icon={selectIcon} color={grayDark} />
                                <div className={'Hover'} onMouseEnter={() => setSelectedValue(val)}></div>
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
