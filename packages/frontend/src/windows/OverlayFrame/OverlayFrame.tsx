import React, { FC } from 'react';
import Styles from './OverlayFrame.module.scss';

const OverlayFrame: FC = ({ children }) => (
    <div className={Styles.OverlayFrame}>
        <div className="container">
            <div className="col-12 col-md-10 offset-md-1">
                {children}
            </div>
        </div>
    </div>
);

export default OverlayFrame;
