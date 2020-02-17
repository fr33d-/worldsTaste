import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    size?: 'small' | 'medium';
}>;

export const WTModal = ({ children, size = 'medium' }: Props) => {
    const modalRoot = document.getElementById('modal-root');
    const ModalContainer = document.createElement('div');

    useEffect(() => {
        if (modalRoot) {
            modalRoot.appendChild(ModalContainer);
        } else {
            console.log('no modal parent found');
        }
    });

    return ReactDOM.createPortal(
        <div className="wt-modal">
            <div className={'OverlayFrame'}>
                <div className="container">
                    <div className={classNames(size === 'small' ? "col-8 offset-2" : "col-12 col-md-10 offset-md-1")}>
                        <div className={'LayoutCard'}>{children}</div>
                    </div>
                </div>
            </div>
        </div>,
        ModalContainer
    );
};

export const ModalRoot = () => <div id="modal-root" />;
