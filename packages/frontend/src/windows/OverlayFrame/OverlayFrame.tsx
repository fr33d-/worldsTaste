import React, { FC } from 'react';

const OverlayFrame: FC = ({ children }) => (
    <div className={'OverlayFrame'}>
        <div className="container">
            <div className="col-12 col-md-10 offset-md-1">
                {children}
            </div>
        </div>
    </div>
);

export default OverlayFrame;
