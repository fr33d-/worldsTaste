import React, { Component } from 'react';

type arrowLeftProps = {
    color: string;
    className: string;
    onClick(): void;
};

export const ArrowLeft = (props: arrowLeftProps) => {
    return (
        <div className={props.className} onClick={props.onClick}>
            <svg width="25px" height="21px" viewBox="0 0 25 21" version="1.1" >
            {/*  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> */}
                <title>Group 2</title>
                <desc>Created with Sketch.</desc>
                <g id="arrow" transform="translate(-624.000000, -206.000000)" fill={props.color} fillRule="nonzero">
                    <g id="Group" transform="translate(165.000000, 181.000000)">
                        <g id="Coffee-Cigars-Restau-+-Group-2-+-Latest-Regions-Rosta-+-Group-Copy-2-Mask">
                            <g
                                id="Group-2"
                                transform="translate(471.111176, 35.500000) scale(-1, 1) translate(-471.111176, -35.500000) translate(458.611176, 25.500000)"
                            >
                                <path
                                    d="M1.21212121,11.2109126 C0.542685152,11.2109126 -1.42108547e-14,10.6682274 -1.42108547e-14,9.99879139 C-1.42108547e-14,9.32935533 0.542685152,8.78667018 1.21212121,8.78667018 L23.3729243,8.78667018 C24.4571388,8.78667018 24.9959652,10.1012475 24.2236579,10.8622091 L15.3059814,19.6488793 C14.8291289,20.1187265 14.0616772,20.1130476 13.5918301,19.6361951 C13.1219829,19.1593427 13.1276618,18.391891 13.6045142,17.9220438 L20.4157062,11.2109126 L1.21212121,11.2109126 Z"
                                    id="Path"
                                />
                                <path
                                    d="M1.21212121,8.78667038 C0.542685152,8.78667038 2.13162821e-13,9.32935554 2.13162821e-13,9.9987916 C2.13162821e-13,10.6682277 0.542685152,11.2109128 1.21212121,11.2109128 L23.3729243,11.2109128 C24.4571388,11.2109128 24.9959652,9.89633547 24.2236579,9.13537385 L15.3059814,0.348703679 C14.8291289,-0.121143508 14.0616772,-0.115464618 13.5918301,0.361387834 C13.1219829,0.838240285 13.1276618,1.60569198 13.6045142,2.07553916 L20.4157062,8.78667038 L1.21212121,8.78667038 Z"
                                    id="Path"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};
