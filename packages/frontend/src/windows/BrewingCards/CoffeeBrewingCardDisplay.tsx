import React, { Dispatch, SetStateAction } from 'react';
import {
    NewAttrField,
    NewAttrFieldDescription,
    NewAttrFieldLikeList,
    NewAttrFieldSlider,
} from '../../components/FormElements/AttrFields';
import { IconButton } from '../../components/Buttons';
import { displayDate } from '../../helpers/helperFunctions';
import { BrewingEntry } from '../../helpers/types';
import { black, blue } from '../../styles/colors';

type CoffeeBrewingCardDisplayProps = {
    brewing: BrewingEntry;
    setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const CoffeeBrewingCardDisplay = ({ brewing, setEditMode }: CoffeeBrewingCardDisplayProps) => {
    return (
        <>
            <div className="row">
                <div className="col-9">
                    <h4>
                        {brewing.brewDate ? (
                            <>
                                {brewing.method.name} am {displayDate(brewing.brewDate)}
                            </>
                        ) : (
                            <>{brewing.method.name} am ERROR</>
                        )}
                    </h4>
                </div>
                <div className="col-3">
                    <IconButton name="Edit" onClick={() => setEditMode(true)} className="HoverBlue" icon="edit" />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrField
                        name="Brühmethode"
                        icon={'flask'}
                        propPath={['method', 'name']}
                        obj={brewing}
                        color={blue}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrField name="Datum" icon={'clock'} propPath={['brewDate']} obj={brewing} color={blue} />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrField
                        name="Wassermänge"
                        icon={'water'}
                        propPath={['waterAmount']}
                        obj={brewing}
                        color={blue}
                        unit="ml"
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrField
                        name="Kaffeemänge"
                        icon={'leaf'}
                        propPath={['coffeeAmount']}
                        obj={brewing}
                        color={blue}
                        unit="g"
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldLikeList name="Gesamtbewertung:" obj={brewing} propPath={['rating']} />
                </div>
                <div className="col-12 col-md-6">
                    {/* // Todo: make a boolean attr field */}
                    <NewAttrField
                        name="Für Berechnung verwenden"
                        propPath={['useforcalculation']}
                        obj={brewing}
                        unit="g"
                    />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldSlider color={black} name="Stärke" propPath={['strength']} obj={brewing} />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldSlider color={blue} name="Geschmack" propPath={['taste']} obj={brewing} />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldSlider color={blue} name="Frucht/Schokolade" propPath={['tasteKind']} obj={brewing} />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldSlider color={blue} name="Säure" propPath={['sour']} obj={brewing} />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldSlider color={blue} name="Bitter" propPath={['bitter']} obj={brewing} />
                </div>
                <div className="col-12 col-md-6">
                    <NewAttrFieldSlider color={blue} name="Erbsig" propPath={['woody']} obj={brewing} />
                </div>
                <div className="col-12">
                    <NewAttrFieldDescription name="Beschreibung" propPath={['ownDescription']} obj={brewing} />
                </div>
            </div>
        </>
    );
};
