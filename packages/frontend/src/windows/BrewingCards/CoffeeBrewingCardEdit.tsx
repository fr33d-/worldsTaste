import classNames from 'classnames';
import { isEqual } from 'lodash';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { SaveSection } from '../../components/Buttons/AdvancedButtons';
import { BoolInput, DropdownInput, NumberInput, TextareaInput, WTDateInput } from '../../components/FormElements';
import {
    ObjLikeSliderAttrField,
    ObjSingleSliderAttrField,
    ObjSliderAttrField,
} from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { displayDate } from '../../helpers/helperFunctions';
import { BrewingEntry } from '../../helpers/types';
import { black, blue, blueAccent, green, yellow } from '../../styles/colors';

type CoffeeBrewingCardEditProps = {
    brewing: BrewingEntry;
    deleteBrewing(brewing: BrewingEntry): Promise<void>;
    saveBrewing(brewing: BrewingEntry): Promise<number>;
    extendedBaseUrl: string;
};

export const CoffeeBrewingCardEdit = ({
    brewing,
    deleteBrewing,
    saveBrewing,
    extendedBaseUrl,
}: CoffeeBrewingCardEditProps) => {
    const [formBrewing, setFormBrewing] = useState<BrewingEntry>(brewing);
    const { coffeeAttrData } = useContext(CoffeeContext);
    const history = useHistory();

    const closeEditMode = () => {
        history.push(`${extendedBaseUrl}/${brewing.id}`);
    };

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
                                {formBrewing.method} am {displayDate(formBrewing.brewDate)}
                            </>
                        ) : (
                            <>{formBrewing.method} am ERROR</>
                        )}
                    </h4>
                </div>
                <div className="col-12 col-md-6">
                    <DropdownInput
                        items={methods}
                        name="Brühmethode"
                        setValue={(val) => setFormBrewing((curBrew) => ({ ...curBrew, method: val }))}
                        value={formBrewing.method}
                        icon={'flask'}
                        iconColor={blue}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <WTDateInput
                        name="Datum"
                        value={formBrewing.brewDate}
                        setValue={(val) => setFormBrewing((curBrew) => ({ ...curBrew, brewDate: val }))}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NumberInput
                        name="Wassermänge:"
                        unit="ml"
                        value={formBrewing.waterAmount}
                        setValue={(val) => setFormBrewing((curBrew) => ({ ...curBrew, waterAmount: val }))}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NumberInput
                        name="Kaffeemänge:"
                        unit="g"
                        value={formBrewing.coffeeAmount}
                        setValue={(val) => setFormBrewing((curBrew) => ({ ...curBrew, coffeeAmount: val }))}
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
                        name="Für Berechnung verwenden:"
                        value={formBrewing.useforcalculation}
                        setValue={(val) => setFormBrewing((curBrew) => ({ ...curBrew, useforcalculation: val }))}
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
                        name="Beschreibung"
                        value={formBrewing.ownDescription}
                        setValue={(val) => setFormBrewing((curBrew) => ({ ...curBrew, ownDescription: val }))}
                    />
                </div>
            </div>
            <div className="row">
                <div className={classNames('ButtonSection col-12')}>
                    <SaveSection
                        changes={isEqual(formBrewing, brewing)}
                        closeFunction={async () => closeEditMode()}
                        saveFunction={async () => saveBrewing(formBrewing)}
                        deleteFunction={async () => deleteBrewing(formBrewing)}
                    />
                </div>
            </div>
        </>
    );
};
