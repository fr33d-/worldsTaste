import React, { Component, useState } from 'react';
import { AttrDataItemType } from '../AttrDataWindow';
import { CoffeeCardDisplay } from './CoffeeCardDisplay';
import { CoffeeCardEdit } from './CoffeeCardEdit';

export type Image = {
    name: string;
    url: string;
    alt?: string;
    file: File;
};

export type CoffeeEntry = {
    id: number;
    images?: Image[];
    name: string;
    description: string;
    origin: AttrDataItemType;
    rating: number;
    kind: AttrDataItemType;
    roasted: AttrDataItemType;
};

export type CoffeeKind = {
    id: number;
    name: string;
};

export type CoffeeRoasted = {
    id: number;
    name: string;
};

export type CoffeeOrigin = {
    id: number;
    name: string;
};

type CoffeeCardProps = {
    entry: CoffeeEntry;
    kinds: CoffeeKind[];
    origins: CoffeeOrigin[];
    roasteds: CoffeeRoasted[];
    saveFunction(post: CoffeeEntry): void;
    deleteFunction(id: number): void;
};

type CoffeeCardState = {
    edit: boolean;
    entry: CoffeeEntry;
};

export class CoffeeCard extends Component<CoffeeCardProps, CoffeeCardState> {
    public readonly state: CoffeeCardState = {
        edit: this.props.entry.name === '',
        entry: this.props.entry,
    };

    public editCard = () => {
        this.setState({ edit: true });
    };

    public closeEditCard = () => {
        this.setState({ edit: false });
    };

    public render() {
        const { edit, entry } = this.state;
        const { deleteFunction } = this.props;

        return !edit ? (
            <CoffeeCardEdit {...this.props} entry={entry} close={this.closeEditCard} />
        ) : (
            <CoffeeCardDisplay entry={entry} deleteFunction={deleteFunction} edit={this.editCard} />
        );
    }
}

//Cool new stuff with hooks
// const NewCoffeeCard = (props: CoffeeCardProps) => {
//     const [edit, setEdit] = useState(props.entry.name === '');

//     const { entry, deleteFunction } = props;

//     return edit ? (
//         <CoffeeCardEdit {...props} close={() => setEdit(false)} />
//     ) : (
//         <CoffeeCardDisplay entry={entry} deleteFunction={deleteFunction} edit={() => setEdit(true)} />
//     );
// };
