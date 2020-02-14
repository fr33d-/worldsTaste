import React, { FC, ReactNode } from 'react';
import { Navigationbar } from '../../components/Navigationbar';
import { Footer } from '../../components/Footer';
import classNames from 'classnames';

export type AppWindowProps = {
    loading?: boolean;
    sidebar: ReactNode;
    editState: boolean;
};

export const AppWindow: FC<AppWindowProps> = ({ loading = false, children, sidebar, editState }) => {
    return (
        <>
            <div className={'BackgroundHelper'} />
            <div className={classNames(editState && 'EditBackground')}>
                <Navigationbar />
                <div className={'Container'}>
                    {/* <MobileHeader icon="mug-hot" name="Blog of Coffee" /> */}
                    <div className="row">
                        {sidebar}
                        <div className={classNames(`col-12 col-lg-9`, 'PageContent')}>
                            {children}
                        </div>
                    </div>
                </div>
                <Footer year="2019" version="0.1" />
            </div>
        </>
    );
};
