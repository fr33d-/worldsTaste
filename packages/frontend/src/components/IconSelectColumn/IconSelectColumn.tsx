import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, Component } from 'react';
import { Col, FormControlProps } from 'react-bootstrap';
import { grayDark } from '../../style/colors';
import LocalStyles from './IconSelectColumn.module.scss';

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

type IconSelectComponentState = {
    selecteValue: number;
};

export class IconSelectColumn extends Component<IconSelectComponentProps, IconSelectComponentState> {
    public readonly state: IconSelectComponentState = {
        selecteValue: this.props.value,
    };

    public hoverIcon = (i: number) => {
        this.setState({ selecteValue: i });
    };

    public render() {
        const {
            label,
            labelIcon,
            labelIconColor,
            selectIcon,
            selectIconColor,
            numberOfValues,
            value,
            onChange,
        } = this.props;

        const { selecteValue } = this.state;

        return (
            <div className={LocalStyles.FormElement}>
                {label && <label>{label}</label>}
                <div className={LocalStyles.IconSelect}>
                    <FontAwesomeIcon
                        icon={labelIcon}
                        color={labelIconColor}
                        size="lg"
                        className={LocalStyles.LabelIcon}
                    />
                    <div className={LocalStyles.IconList}>
                    {[...Array(selecteValue)].map((_, i) => (
                        <span onClick={() => onChange(i + 1)} key={i}>
                            <FontAwesomeIcon
                                icon={selectIcon}
                                color={selectIconColor}
                            />
                            <div
                                className={LocalStyles.Hover}
                                onMouseEnter={() => this.hoverIcon(i + 1)}
                            >
                            </div>
                        </span>
                    ))}
                    {[...Array(numberOfValues - selecteValue)].map((_, i) => {
                        const val = selecteValue + i + 1;
                        return (
                            <span onClick={() => onChange(val)} key={val}>
                                <FontAwesomeIcon
                                    icon={selectIcon}
                                    color={grayDark}
                                />
                                <div
                                    className={LocalStyles.Hover}
                                    onMouseEnter={() => this.hoverIcon(val)}
                                >
                                </div>
                            </span>
                        );
                    })}
                    </div>
                </div>
            </div>
        );
    }
}
