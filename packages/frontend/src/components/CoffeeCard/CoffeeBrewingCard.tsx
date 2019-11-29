import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { baseURL, coffeeAttrURL, coffeeURL } from '../../data';
import Beans from '../../images/beans.svg';
import Cup from '../../images/cup-bw.svg';
import { black, blue, blueAccent, green, yellow } from '../../styles/colors';
import { AttrDataType, BrewingEntry, CoffeeEntry } from '../FormComponents';
import { BoolInput, DateInput, DropdownInput, NumberInput, TextareaInput } from '../FormElements';
import { LikeSliderAttrField, SingleSliderAttrField, SliderAttrField } from '../FormElements/AttrFields';
import { AdvancedSaveButton, DeleteButton } from '../IconButton';
import LocalStyles from './CoffeeBrewingCard.module.scss';
import { useParams, useHistory } from 'react-router';

type CoffeeBrewingCardProps = {
    entry: BrewingEntry;
    coffeeId: number;
    methods: AttrDataType[];
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeBrewingCard = (props: CoffeeBrewingCardProps) => {
    const [id, setId] = useState(props.entry.id);
    const [bitter, setBitter] = useState(props.entry.bitter);
    const [brewDate, setBrewDate] = useState(props.entry.brewDate);
    const [method, setMethod] = useState(props.entry.method);
    const [ownDescription, setOwnDescription] = useState(props.entry.ownDescription);
    const [rating, setRating] = useState(props.entry.rating);
    const [sour, setSour] = useState(props.entry.sour);
    const [strength, setStrength] = useState(props.entry.strength);
    const [taste, setTaste] = useState(props.entry.tasteKind);
    const [tasteKind, setTasteKind] = useState(props.entry.tasteKind);
    const [useforcalculation, setUseforcalculation] = useState(props.entry.useforcalculation);
    const [woody, setWoody] = useState(props.entry.woody);
    const [waterAmount, setWaterAmount] = useState(props.entry.waterAmount);
    const [coffeeAmount, setCoffeeAmount] = useState(props.entry.coffeeAmount);

    const [saveError, setSaveError] = useState(false);

    const deleteCard = () => {};

    const cancleEdit = () => {};

    const saveBrewing = () => {
        const requestObject: BrewingEntry = {
            id,
            bitter,
            brewDate,
            method,
            ownDescription,
            rating,
            sour,
            strength,
            taste,
            tasteKind,
            useforcalculation,
            woody,
            waterAmount,
            coffeeAmount,
        };

        console.log(requestObject);

        axios
            .put(`${baseURL}${coffeeURL}/${props.coffeeId}/brewings/${props.entry.id}`, { ...requestObject })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h4>
                        {method.name} am {brewDate.getDate()}.{brewDate.getMonth()}.{brewDate.getFullYear()}
                    </h4>
                </div>
                <div className="col-12 col-md-6">
                    <DropdownInput
                        items={props.methods}
                        label="Brühmethode"
                        onChange={setMethod}
                        selectedItem={method}
                        icon={'flask'}
                        iconColor={blue}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <DateInput label="Brühmethode" onChange={setBrewDate} value={brewDate} />
                </div>
                <div className="col-12 col-md-6">
                    <NumberInput onChange={setWaterAmount} name="Wassermänge:" unit="ml" value={waterAmount} />
                </div>
                <div className="col-12 col-md-6">
                    <NumberInput onChange={setCoffeeAmount} name="Kaffeemänge:" unit="g" value={coffeeAmount} />
                </div>
                <div className="col-12 col-md-6">
                    <LikeSliderAttrField maxValue={5} value={rating} onChange={setRating} name="Gesamtbewertung:" />
                </div>
                <div className="col-12 col-md-6">
                    <BoolInput
                        label="Für Berechnung verwenden:"
                        value={useforcalculation}
                        onChange={setUseforcalculation}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <SliderAttrField color={black} name="Stärke" value={strength} onChange={setStrength} />
                </div>
                <div className="col-12 col-md-6">
                    <SliderAttrField color={blue} name="Geschmack:" value={taste} onChange={setTaste} />
                </div>
                <div className="col-12 col-md-6">
                    <SingleSliderAttrField
                        color={blue}
                        name="Frucht/Schokolade:"
                        value={tasteKind}
                        onChange={setTasteKind}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <SliderAttrField color={yellow} name="Säure:" value={sour} onChange={setSour} />
                </div>
                <div className="col-12 col-md-6">
                    <SliderAttrField color={blueAccent} name="Bitter:" value={bitter} onChange={setBitter} />
                </div>
                <div className="col-12 col-md-6">
                    <SliderAttrField color={green} name="Erbsig:" value={woody} onChange={setWoody} />
                </div>
                <div className="col-12">
                    <TextareaInput label="Beschreibung" onChange={setOwnDescription} value={ownDescription} />
                </div>
            </div>
            <div className="row">
                <div className={classNames(LocalStyles.ButtonSection, 'col-12')}>
                    <DeleteButton onClick={deleteCard} withText />
                    <AdvancedSaveButton save={saveBrewing} error={saveError} changes={true} />
                </div>
            </div>
        </>
    );
};

type CoffeeBrewingWindowProps = {
    methods: AttrDataType[];
    basePath: string;
};

// tslint:disable-next-line: max-func-body-length
export const CoffeeBrewingWindow = ({ methods, basePath }: CoffeeBrewingWindowProps) => {
    

    const [selectedBrewing, setSelectedBrewing] = useState<BrewingEntry | undefined>();
    const [coffee, setCoffee] = useState<CoffeeEntry>();
    
    //Todo: get id from pageprops and get coffee from api, then set brewings 
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        axios
            .get(`${baseURL}${coffeeURL}/${id}`)
            .then((response) => {

                let res = response.data as BrewingEntry[];
                setCoffee(res);
            })
            .catch((error) => {
                console.log(error);
                // Todo: Toast
            });
    }, [id]);

    const goBack = () => {
        history.push(`${basePath}`)
    }

    const createBrewing = () => {
        let newBrewing: BrewingEntry = {
            id: 0,
            bitter: 0,
            brewDate: new Date(),
            method: methods[0],
            ownDescription: '',
            rating: 0,
            sour: 0,
            strength: 0,
            taste: 0,
            tasteKind: 0,
            useforcalculation: false,
            woody: 0,
            waterAmount: 0,
            coffeeAmount: 0,
        };

        axios
            .post(`${baseURL}${coffeeURL}/${id}/brewings/`, { ...newBrewing })
            .then((response) => {
                console.log(response);
                const location: string = response.headers['location'];
                const [newId] = location.split('/').slice(-1);
                newBrewing.id = Number(newId);

                if (brewings) {
                    setBrewings([newBrewing, ...brewings]);
                } else {
                    setBrewings([newBrewing]);
                }

                setSelectedBrewing(newBrewing);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (!coffee || !id || typeof id !== 'number') ? <p>Error loading coffee</p> : (
        <div className={LocalStyles.BrewingWindow}>
            <h6>{coffee.name}</h6>
            <div className="container">
                <div className="row">
                    <div className={classNames(LocalStyles.BrewList, 'col-4')}>
                        <h4>Brewings</h4>
                        <ul>
                            {coffee && coffee.brewings.length > 0 ? (
                                coffee.brewings.map((brewing) => (
                                    <li
                                        className={classNames(
                                            selectedBrewing && brewing.id === selectedBrewing.id && LocalStyles.Active
                                        )}
                                        onClick={() => setSelectedBrewing(brewing)}
                                    >
                                        {brewing.method.name} am {brewing.brewDate.getDate()}.
                                        {brewing.brewDate.getMonth()}.{brewing.brewDate.getFullYear()} -
                                        {brewing.brewDate.getUTCHours()}:{brewing.brewDate.getUTCMinutes()} Uhr
                                    </li>
                                ))
                            ) : (
                                <li className={LocalStyles.NoContent}>
                                    <img src={Cup} /> no brewings
                                </li>
                            )}
                        </ul>
                        <button onClick={createBrewing}>
                            <FontAwesomeIcon icon="plus" size="sm" />
                            Add brewing
                        </button>
                    </div>
                    <div className={classNames(LocalStyles.BrewingCard, 'col-8')}>
                        {selectedBrewing ? (
                            <CoffeeBrewingCard
                                entry={selectedBrewing}
                                key={selectedBrewing.id}
                                methods={methods}
                                coffeeId={id}
                            />
                        ) : (
                            <div className={LocalStyles.NoContent}>
                                <img src={Beans} />
                                nothing selected
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={LocalStyles.CloseButton}>
                <button onClick={props.close}>
                    <FontAwesomeIcon icon="times-circle" size="lg" />
                </button>
            </div>
        </div>
    );
};
