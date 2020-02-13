import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = PropsWithChildren<{}>;

export const WTModal = ({ children }: Props) => {
    const modalRoot = document.getElementById('modal-root');
    const ModalContainer = document.createElement('div');

    useEffect(() => {
        modalRoot && modalRoot.appendChild(ModalContainer);
    });

    return ReactDOM.createPortal(<div className="wt-modal">{children}</div>, ModalContainer);
};

export const ModalRoot = () => <div className="modal-root" />;
