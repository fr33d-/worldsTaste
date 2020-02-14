import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = PropsWithChildren<{}>;

export const WTModal = ({ children }: Props) => {
    const modalRoot = document.getElementById('modal-root');
    const ModalContainer = document.createElement('div');

    useEffect(() => {
        if (modalRoot) {
            modalRoot.appendChild(ModalContainer);
        } else {
            console.log('no modal parent found');
        }
    });

    return ReactDOM.createPortal(<div className="wt-modal">{children}</div>, ModalContainer);
};

export const ModalRoot = () => <div id="modal-root" />;
