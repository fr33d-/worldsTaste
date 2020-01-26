import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component, useState, Dispatch, SetStateAction } from 'react';
import { grayDarker, red, white, green } from '../../styles/colors';
import { Button } from 'react-bootstrap';

type FrameButtonProps = {
    name: string;
    icon: IconProp;
    color?: string;
    onClick?(): void;
    small?: boolean;
    className?: string;
};

export const FrameButton = ({ icon, name, onClick, color, small, className }: FrameButtonProps) => {
    return (
        <button className={classNames('FrameButton', className)} onClick={onClick} disabled={small}>
            <FontAwesomeIcon icon={icon} color={color} />
            {!small && name}
        </button>
    );
};

type SaveSectionProps = {
    // todo: all functions optional and async
    saveFunction(): Promise<void>;
    closeFunction(): void;
    deleteFunction(): Promise<void>;
    changes: boolean;
};

export enum ButtonState {
    min,
    norm,
    max,
    error,
    success,
}

//Todo: Error aus den funktionen und changes variable ...
export const SaveSection = ({
    closeFunction,
    deleteFunction,
    saveFunction,
    changes,
}: SaveSectionProps) => {
    const [saveState, setSaveState] = useState(ButtonState.norm);
    const [deleteState, setDeleteState] = useState(ButtonState.norm);
    const [cancleState, setCancleState] = useState(ButtonState.norm);

    const innerSaveFunction = async () => {
        if (saveState === ButtonState.success || !changes) {
            closeFunction();
        } else {
            try {
                await saveFunction();
                setSaveState(ButtonState.success);
            } catch (e) {
                setSaveState(ButtonState.error);
            }
        }
    };

    const innerCancleFunction = () => {
        if (changes) setCancleState(ButtonState.max);
        else closeFunction();
    };

    const innerDeleteFunction = async () => {
        if (changes) setDeleteState(ButtonState.max);
        else
            try {
                await deleteFunction();
                closeFunction();
            } catch (e) {
                setDeleteState(ButtonState.error);
            }
    };

    return (
        <>
            <AdvancedCancelButton setState={setCancleState} onClick={innerCancleFunction} state={cancleState} />
            <AdvancedDeleteButton onClick={innerDeleteFunction} setState={setDeleteState} state={deleteState} />
            <AdvancedSaveButton onClick={innerSaveFunction} setState={setSaveState} state={saveState} />
        </>
    );
};

type AdvancedButtonProps = {
    onClick?: () => void;
    state: ButtonState;
    setState: Dispatch<SetStateAction<ButtonState>>;
};

export const AdvancedCancelButton = ({ onClick, state, setState }: AdvancedButtonProps) => {
    return (
        <>
            <div
                className={classNames(
                    'BtnFrame',
                    'Gray',
                    state === ButtonState.max && 'Extended',
                    state === ButtonState.min && 'Minimized'
                )}
            >
                {state === ButtonState.min && (
                    <FrameButton name="Cancle" icon="times-circle" color={grayDarker} small={true} />
                )}
                {state === ButtonState.norm && (
                    <FrameButton name="Cancle" icon="times-circle" color={grayDarker} onClick={onClick} />
                )}
                {state === ButtonState.max && (
                    <>
                        <FrameButton
                            name="Continue editing"
                            icon="times-circle"
                            color={grayDarker}
                            onClick={() => setState(ButtonState.norm)}
                        />
                        <FrameButton
                            name="Cancel edit and delete changes"
                            icon="trash-alt"
                            color={red}
                            className="Red"
                            onClick={onClick}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export const AdvancedDeleteButton = ({ onClick, state, setState }: AdvancedButtonProps) => {
    return (
        <>
            <div
                className={classNames(
                    'BtnFrame',
                    'Red',
                    state === ButtonState.max && 'Extended',
                    state === ButtonState.min && 'Minimized'
                )}
            >
                {state === ButtonState.min && (
                    <FrameButton
                        name="Delete"
                        icon="trash-alt"
                        className="Red"
                        color={red}
                        onClick={onClick}
                        small={true}
                    />
                )}
                {state === ButtonState.norm && (
                    <FrameButton name="Delete" icon="trash-alt" className="Red" color={red} onClick={onClick} />
                )}
                {state === ButtonState.error && (
                    <>
                        <span>Error!</span>
                        <FrameButton name="Try again" icon="trash-alt" className="Red" color={red} onClick={onClick} />
                    </>
                )}
                {state === ButtonState.max && (
                    <>
                        <FrameButton
                            name="Continue editing"
                            icon="times-circle"
                            className="Gray"
                            color={grayDarker}
                            onClick={() => setState(ButtonState.norm)}
                        />
                        <FrameButton
                            name="Finaly delete entry"
                            icon="trash-alt"
                            className="Red"
                            color={red}
                            onClick={onClick}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export const AdvancedSaveButton = ({ onClick, state }: AdvancedButtonProps) => {
    return (
        <>
            <div
                className={classNames(
                    'BtnFrame',
                    'GreenFull',
                    state === ButtonState.max && 'Extended',
                    state === ButtonState.success && 'Extended',
                    state === ButtonState.error && 'Extended',
                    state === ButtonState.min && 'Minimized'
                )}
            >
                {state === ButtonState.min && (
                    <FrameButton
                        name="Save"
                        icon="save"
                        className="White"
                        color={white}
                        onClick={onClick}
                        small={true}
                    />
                )}
                {state === ButtonState.norm && (
                    <FrameButton name="Save" icon="save" className="White" color={white} onClick={onClick} />
                )}
                {state === ButtonState.error && (
                    <>
                        <span>Error!</span>
                        <FrameButton name="Try again" icon="save" className="White" color={white} onClick={onClick} />
                    </>
                )}
                {state === ButtonState.success && (
                    <>
                        <span>Entry saved!</span>
                        <FrameButton
                            name="Close"
                            icon="times-circle"
                            className="White"
                            color={white}
                            onClick={onClick}
                        />
                    </>
                )}
            </div>
        </>
    );
};
