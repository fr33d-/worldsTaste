import React, { Component } from 'react';
import { AttrDataType } from '../AttrDataWindow';
import { CigarEntry } from '../Cigars';
import { CigarCardDisplay } from './CigarCardDisplay';
import { CigarCardEdit } from './CigarCardEdit';

type CoffeeCardProps = {
    entry: CigarEntry;
    cigarsProducer: AttrDataType;
    cigarsOrigin: AttrDataType;
    cigarEinlage: AttrDataType;
    cigarUmblatt: AttrDataType;
    cigarDeckblatt: AttrDataType;
    cigarAnschnitt: AttrDataType;
    cigarAromarad: AttrDataType;
    saveFunction(post: CigarEntry): void;
    deleteFunction(id: number): void;
};

type CoffeeCardState = {
    edit: boolean;
    entry: CigarEntry;
};

export class CigarCard extends Component<CoffeeCardProps, CoffeeCardState> {
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
            <CigarCardEdit {...this.props} entry={entry} close={this.closeEditCard} />
        ) : (
            <CigarCardDisplay entry={entry} deleteFunction={deleteFunction} edit={this.editCard} />
        );
    }
}