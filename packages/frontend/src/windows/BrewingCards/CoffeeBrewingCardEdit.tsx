import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SaveSection } from '../../components/Buttons/AdvancedButtons';
import { BoolInput, DateInput, DropdownInput, NumberInput, TextareaInput } from '../../components/FormElements';
import {
    ObjLikeSliderAttrField,
    ObjSingleSliderAttrField,
    ObjSliderAttrField,
} from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { displayDate } from '../../helpers/helperFunctions';
import { BrewingEntry } from '../../helpers/types';
import { black, blue, blueAccent, green, yellow } from '../../styles/colors';
import { isEqual } from 'lodash';

type CoffeeBrewingCardEditProps = {
    brewing: BrewingEntry;
    deleteBrewing(brewing: BrewingEntry): Promise<void>;
    saveBrewing(brewing: BrewingEntry): Promise<void>;
    setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const CoffeeBrewingCardEdit = ({
    brewing,
    deleteBrewing,
    saveBrewing,
    setEditMode,
}: CoffeeBrewingCardEditProps) => {
    const [formBrewing, setFormBrewing] = useState<BrewingEntry>(brewing);
    const { coffeeAttrData } = useContext(CoffeeContext);

    const methods = coffeeAttrData && coffeeAttrData.brewMethods;
    return !methods ? (
        <>No methods!</>
    ) : (
        <>
            <div className="row">
                <div className="col-12">
                    <h4>
                        {formBrewing.brewDate ? (
                            <>
                                {formBrewing.method.name} am {displayDate(formBrewing.brewDate)}
                            </>
                        ) : (
                            <>{formBrewing.method.name} am ERROR</>
                        )}
                    </h4>
                </div>
                <div className="col-12 col-md-6">
                    <DropdownInput
                        items={methods}
                        label="Brühmethode"
                        onChange={setFormBrewing}
                        selectedItem={formBrewing.method}
                        icon={'flask'}
                        iconColor={blue}
                        propPath={['method']}
                        obj={formBrewing}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <DateInput
                        label="Datum"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['brewDate']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NumberInput
                        name="Wassermänge:"
                        unit="ml"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['waterAmount']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NumberInput
                        name="Kaffeemänge:"
                        unit="g"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['coffeeAmount']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <ObjLikeSliderAttrField
                        maxValue={5}
                        name="Gesamtbewertung:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['rating']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <BoolInput
                        label="Für Berechnung verwenden:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['useforcalculation']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <ObjSliderAttrField
                        color={black}
                        name="Stärke"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['strength']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <ObjSliderAttrField
                        color={blue}
                        name="Geschmack:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['taste']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <ObjSingleSliderAttrField
                        color={blue}
                        name="Frucht/Schokolade:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['tasteKind']}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <ObjSliderAttrField
                        color={yellow}
                        name="Säure:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['sour']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <ObjSliderAttrField
                        color={blueAccent}
                        name="Bitter:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['bitter']}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <ObjSliderAttrField
                        color={green}
                        name="Erbsig:"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['woody']}
                    />
                </div>
                <div className="col-12">
                    <TextareaInput
                        label="Beschreibung"
                        obj={formBrewing}
                        setStateHandler={setFormBrewing}
                        propPath={['ownDescription']}
                    />
                </div>
            </div>
            <div className="row">
                <div className={classNames('ButtonSection col-12')}>
                    <SaveSection
                        changes={isEqual(formBrewing, brewing)}
                        closeFunction={() => setEditMode(false)}
                        saveFunction={() => saveBrewing(formBrewing)}
                        deleteFunction={() => deleteBrewing(formBrewing)}
                    />
                    {/* <DeleteButton onClick={() => deleteBrewing(formBrewing)} withText />
                    <AdvancedSaveButton
                        save={() => saveBrewing(formBrewing)}
                        changes={true}
                        close={() => setEditMode(false)}
                    /> */}
                </div>
            </div>
        </>
    );
};
