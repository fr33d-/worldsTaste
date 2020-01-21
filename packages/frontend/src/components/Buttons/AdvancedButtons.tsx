import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import { grayDarker, red, white, green } from '../../styles/colors';

type FrameButtonProps = {
    name: string;
    icon: IconProp;
    color?: string;
    onClick(): void;
};

export const FrameButton = ({ icon, name, onClick, color }: FrameButtonProps) => {
    return (
        <button className={'FrameButton'} onClick={onClick}>
            <FontAwesomeIcon icon={icon} color={color} />
            {name}
        </button>
    );
};

type SaveSectionProps = {
    saveFunction(): void;
    closeFunction(): void;
    deleteFunction(): void;
    elementName: string;
};

//Todo: Error aus den funktionen und changes variable ...
export const SaveSection = ({ elementName, closeFunction, deleteFunction, saveFunction }: SaveSectionProps) => {
    return (
        <>
            <FrameButton name="cancle" icon="times-circle" color={grayDarker} onClick={closeFunction} />
            <FrameButton name="delete" icon="trash-alt" color={red} onClick={deleteFunction} />
            <FrameButton name="save" icon="save" color={green} onClick={saveFunction} />
        </>
    );
};

type AdvancedButtonState = {
    extended: boolean;
};

type AdvancedButtonProps = {
    onClick(): void;
    changes?: boolean;
};

export class AdvancedCancelButton extends Component<AdvancedButtonProps, AdvancedButtonState> {
    public readonly state: AdvancedButtonState = {
        extended: false,
    };

    public toggleExtendButton = () => {
        this.setState((oldstate) => ({ extended: !oldstate.extended }));
    };

    render() {
        const { extended } = this.state;
        const { onClick, changes } = this.props;
        return (
            <>
                <div className={classNames('BtnFrame', 'Gray', extended && 'Extended')}>
                    {!extended ? (
                        changes ? (
                            <button className={'FrameButton'} onClick={this.toggleExtendButton}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                Cancel
                            </button>
                        ) : (
                            <button className={'FrameButton'} onClick={onClick}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                Cancel
                            </button>
                        )
                    ) : (
                        <>
                            <button className={'FrameButton'} onClick={this.toggleExtendButton}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                <span>continue editing</span>
                            </button>
                            <button className={'FrameButton'} onClick={onClick}>
                                <FontAwesomeIcon icon="trash-alt" color={grayDarker} />
                                <span>Cancel edit and delete changes</span>
                            </button>
                        </>
                    )}
                </div>
            </>
        );
    }
}

export class AdvancedDeleteButton extends Component<AdvancedButtonProps, AdvancedButtonState> {
    public readonly state: AdvancedButtonState = {
        extended: false,
    };

    public toggleExtendButton = () => {
        this.setState((oldstate) => ({ extended: !oldstate.extended }));
    };

    render() {
        const { extended } = this.state;
        const { onClick, changes } = this.props;
        return (
            <>
                <div className={classNames('BtnFrame', 'Red', extended && 'Extended')}>
                    {!extended ? (
                        <button className={classNames('FrameButton', 'Red')} onClick={this.toggleExtendButton}>
                            <FontAwesomeIcon icon="trash-alt" color={red} />
                            Delete
                        </button>
                    ) : (
                        <>
                            <button className={classNames('FrameButton', 'Gray')} onClick={this.toggleExtendButton}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                <span>continue editing</span>
                            </button>
                            <button className={classNames('FrameButton', 'Red')} onClick={onClick}>
                                <FontAwesomeIcon icon="trash-alt" color={red} />
                                <span>delete Coffee Card</span>
                            </button>
                        </>
                    )}
                </div>
            </>
        );
    }
}

type AdvancedSaveButtonState = {
    extended: boolean;
};

type AdvancedSaveButtonProps = {
    error?: boolean;
    changes?: boolean;
    save(): void;
    close?(): void;
};

export class AdvancedSaveButton extends Component<AdvancedSaveButtonProps, AdvancedSaveButtonState> {
    public readonly state: AdvancedSaveButtonState = {
        extended: false,
    };

    public saveCardButton = () => {
        this.props.save();
        this.setState((oldstate) => ({ extended: !oldstate.extended }));
    };

    public render() {
        const { extended } = this.state;
        const { close, save, error, changes } = this.props;
        return (
            <>
                <div className={classNames('BtnFrame', 'GreenFull', extended && 'Extended')}>
                    {!extended || (changes && !error) ? (
                        <button className={classNames('FrameButton', 'White')} onClick={this.saveCardButton}>
                            <FontAwesomeIcon icon="save" color={white} />
                            Save
                        </button>
                    ) : error ? (
                        <>
                            <span>Error!</span>
                            <button className={classNames('FrameButton', 'White')} onClick={save}>
                                <FontAwesomeIcon icon="save" color={white} />
                                <span>try again</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <span>card saved!</span>
                            {close && (
                                <button className={classNames('FrameButton', 'White')} onClick={close}>
                                    <FontAwesomeIcon icon="times-circle" color={white} />
                                    <span>close</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }
}
