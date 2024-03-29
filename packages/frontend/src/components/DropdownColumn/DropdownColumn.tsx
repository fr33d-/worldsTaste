import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";
import { Col } from "react-bootstrap";
// import LocalStyles from './DropdownColumn.module.scss';
import { AttrDataItemType } from "../../helpers/types";

type DropdownComponentProps = {
    label?: string;
    iconLabel?: IconProp;
    iconLabelColor?: string;
    items: AttrDataItemType[];
    selectedItem: AttrDataItemType;
    onChange(event: ChangeEvent<HTMLSelectElement>): void;
};

export const DropdownColumn = ({
    items,
    label,
    onChange,
    selectedItem,
    iconLabel,
    iconLabelColor,
}: DropdownComponentProps) => (
    <Col className="CustomDropdown">
        {label && <label>{label}</label>}
        <div className={"select"}>
            {iconLabel && <FontAwesomeIcon icon={iconLabel} color={iconLabelColor} size="lg" />}
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
