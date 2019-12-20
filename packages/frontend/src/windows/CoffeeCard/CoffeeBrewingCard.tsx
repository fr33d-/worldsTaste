import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { BoolInput, DateInput, DropdownInput, NumberInput, TextareaInput } from '../../components/FormElements';
import {
    ObjLikeSliderAttrField,
    ObjSingleSliderAttrField,
    ObjSliderAttrField,
} from '../../components/FormElements/AttrFields';
import { AdvancedSaveButton, DeleteButton } from '../../components/IconButton';
import { baseURL, coffeeURL } from '../../data';
import { AttrDataType, BrewingEntry } from '../../helpers/types';
import { black, blue, blueAccent, green, yellow } from '../../styles/colors';
import LocalStyles from './CoffeeBrewingCard.module.scss';

type CoffeeBrewingCardProps = {
    brewing: BrewingEntry;
    methods: AttrDataType[];
    deleteBrewing(brewing: BrewingEntry): void;
    saveBrewing(brewing: BrewingEntry): void;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeBrewingCard = ({ brewing, methods, saveBrewing, deleteBrewing }: CoffeeBrewingCardProps) => {
    const [formBrewing, setFormBrewing] = useState<BrewingEntry>(brewing);

    const [saveError, setSaveError] = useState(false);

    // const saveBrewing = () => {
    //     axios
    //         .put(`${baseURL}${coffeeURL}/${coffeeId}/brewings/${coffeeId}`, { ...formBrewing })
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    console.log('initial brewing')

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h4>
                        {formBrewing.brewDate ? (
                            <>
                                {formBrewing.method.name} am {formBrewing.brewDate.getDate()}.
                                {formBrewing.brewDate.getMonth()}.{formBrewing.brewDate.getFullYear()}
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
                <div className={classNames(LocalStyles.ButtonSection, 'col-12')}>
                    <DeleteButton onClick={() => deleteBrewing(formBrewing)} withText />
                    <AdvancedSaveButton save={() => saveBrewing(formBrewing)} error={saveError} changes={true} />
                </div>
            </div>
        </>
    );
};
