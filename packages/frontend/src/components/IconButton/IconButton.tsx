import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import { grayDarker, red, white } from '../../styles/colors';
import LocalStyles from './IconButton.module.scss';

type IconButtonProps = Partial<{
    icon: IconProp;
    name: string;
    color: string;
    className: string;
    onClick(): void;
}>;

export const IconButton = ({ icon, name, color, onClick, className }: IconButtonProps = { color: '#000' }) => (
    <button onClick={onClick} className={classNames(className, LocalStyles.IconButton)}>
        {icon !== undefined && <FontAwesomeIcon icon={icon} color={color} />}
        {name}
    </button>
);

type SaveButtonProps = {
    withText?: boolean;
    error: boolean;
    save?(): void;
};

export const SaveButton = (props: SaveButtonProps) => (
    <IconButton
        icon={props.error ? 'ban' : 'save'}
        name={props.withText ? (props.error ? 'Error' : 'Save') : ''}
        color={white}
        onClick={props.save}
        className={props.error ? LocalStyles.RedFull : LocalStyles.GreenFull}
    />
);

export const DeleteButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="trash-alt"
        name={withText ? 'Delete' : ''}
        color={red}
        onClick={onClick}
        className={LocalStyles.Red}
    />
);

export const CancelButton = ({ withText, onClick }: { withText?: boolean; onClick?(): void }) => (
    <IconButton
        icon="times-circle"
        name={withText ? 'Cancel' : ''}
        color={grayDarker}
        onClick={onClick}
        className={LocalStyles.Gray}
    />
);

type AdvancedButtonState = {
    extended: boolean;
};

type AdvancedButtonProps = {
    onClick(): void;
    changes: boolean;
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
                <div className={classNames(LocalStyles.BtnFrame, LocalStyles.Gray, extended && LocalStyles.Extended)}>
                    {!extended ? (
                        changes ? (
                            <button className={LocalStyles.FrameButton} onClick={this.toggleExtendButton}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                Cancel
                            </button>
                        ) : (
                            <button className={LocalStyles.FrameButton} onClick={onClick}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                Cancel
                            </button>
                        )
                    ) : (
                        <>
                            <button className={LocalStyles.FrameButton} onClick={this.toggleExtendButton}>
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                <span>continue editing</span>
                            </button>
                            <button className={LocalStyles.FrameButton} onClick={onClick}>
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
                <div className={classNames(LocalStyles.BtnFrame, LocalStyles.Red, extended && LocalStyles.Extended)}>
                    {!extended ? (
                        <button
                            className={classNames(LocalStyles.FrameButton, LocalStyles.Red)}
                            onClick={this.toggleExtendButton}
                        >
                            <FontAwesomeIcon icon="trash-alt" color={red} />
                            Delete
                        </button>
                    ) : (
                        <>
                            <button
                                className={classNames(LocalStyles.FrameButton, LocalStyles.Gray)}
                                onClick={this.toggleExtendButton}
                            >
                                <FontAwesomeIcon icon="times-circle" color={grayDarker} />
                                <span>continue editing</span>
                            </button>
                            <button className={classNames(LocalStyles.FrameButton, LocalStyles.Red)} onClick={onClick}>
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
    error: boolean;
    changes: boolean;
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

    public componentWillMount() {
        // this.props.save();
    }

    public render() {
        const { extended } = this.state;
        const { close, save, error, changes } = this.props;
        return (
            <>
                <div
                    className={classNames(
                        LocalStyles.BtnFrame,
                        LocalStyles.GreenFull,
                        extended && LocalStyles.Extended
                    )}
                >
                    {!extended || (changes && !error) ? (
                        <button
                            className={classNames(LocalStyles.FrameButton, LocalStyles.White)}
                            onClick={this.saveCardButton}
                        >
                            <FontAwesomeIcon icon="save" color={white} />
                            Save
                        </button>
                    ) : error ? (
                        <>
                            <span>Error!</span>
                            <button className={classNames(LocalStyles.FrameButton, LocalStyles.White)} onClick={save}>
                                <FontAwesomeIcon icon="save" color={white} />
                                <span>try again</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <span>card saved!</span>
                            {close && (
                                <button
                                    className={classNames(LocalStyles.FrameButton, LocalStyles.White)}
                                    onClick={close}
                                >
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
