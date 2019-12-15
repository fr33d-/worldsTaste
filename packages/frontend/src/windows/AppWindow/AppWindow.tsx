import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Styles from './AppWindow.module.scss';
import { Navigationbar } from '../../components/Navigationbar';
import { Footer } from '../../components/Footer';
import GeneralStyles from './../../styles/GeneralStyles.module.scss';
import classNames from 'classnames';
import { Sidemenu } from '../../components/Sidemenu';


export type AppWindowProps = {
    loading?: boolean;
    sidebar: ReactNode;
    editState: boolean;
};

export const AppWindow: FC<AppWindowProps> = ({ loading = false, children, sidebar, editState }) => {
    return (
        <>
            <div className={Styles.BackgroundHelper} />
            <div className={classNames((editState) && Styles.EditBackground)}>
                <Navigationbar />
                <div className={Styles.Container}>
                    {/* <MobileHeader icon="mug-hot" name="Blog of Coffee" /> */}
                    <div className="row">
                        {sidebar}
                        <div className={classNames(`col-12 col-lg-9`, Styles.PageContent)}>
                            {children}
                        </div>
                    </div>
                </div>
                <Footer year="2019" version="0.1" />
            </div>
        </>
    );
};
