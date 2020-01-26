import React, { useState } from 'react';
import { BrewingEntry } from '../../helpers/types';
import { CoffeeBrewingCardDisplay } from './CoffeeBrewingCardDisplay';
import { CoffeeBrewingCardEdit } from './CoffeeBrewingCardEdit';

type CoffeeBrewingCardProps = {
    brewing: BrewingEntry;
    deleteBrewing(brewing: BrewingEntry): Promise<void>;
    saveBrewing(brewing: BrewingEntry): Promise<void>;
};

export const CoffeeBrewingCard = ({ brewing, saveBrewing, deleteBrewing }: CoffeeBrewingCardProps) => {
    const [editModeActive, setEditModeActive] = useState(false);

    return editModeActive ? (
        <CoffeeBrewingCardEdit
            brewing={brewing}
            deleteBrewing={deleteBrewing}
            saveBrewing={saveBrewing}
            setEditMode={setEditModeActive}
        />
    ) : (
        <CoffeeBrewingCardDisplay brewing={brewing} setEditMode={setEditModeActive} />
    );
};
