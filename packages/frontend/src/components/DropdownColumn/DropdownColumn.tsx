import React, { FormEvent } from 'react';
import { Col, Form, FormControlProps } from 'react-bootstrap';
import { AttrDataItemType } from '../AttrDataWindow';

type DropdownComponentProps = {
    label: string;
    items: AttrDataItemType[];
    onChange(event: FormEvent<Required<FormControlProps>>): void;
    selectedItem: AttrDataItemType;
};

export const DropdownColumn = ({ items, label, onChange, selectedItem }: DropdownComponentProps) => (
    <Col>
        <Form.Label>{label}</Form.Label>
        <Form.Group>
            <Form.Control as="select" onChange={onChange}>
                <option>unknown</option>
                {items.map((item, i) => {
                    if (item.name === selectedItem.name) {
                        return (
                            <option key={i} selected>
                                {item.name}
                            </option>
                        );
                    } else {
                        return <option key={i}>{item.name}</option>;
                    }
                })}
            </Form.Control>
        </Form.Group>
    </Col>
);
