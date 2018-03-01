import React from 'react';
import cnf from '../config';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    .lds-ellipsis {
                        display: inline-block;
                        position: relative;
                        width: 65px;
                        height: 21px;
                        div {
                            position: absolute;
                            top: 5px;
                            width: 11px;
                            height: 11px;
                            border-radius: 50%;
                            background: #fff;
                            animation-timing-function: cubic-bezier(0, 1, 1, 0);
                            &:nth-child(1) {
                                left: 6px;
                                animation: lds-ellipsis1 0.6s infinite;
                            }
                            &:nth-child(2) {
                                left: 6px;
                                animation: lds-ellipsis2 0.6s infinite;
                            }
                            &:nth-child(3) {
                                left: 26px;
                                animation: lds-ellipsis2 0.6s infinite;
                            }
                            :nth-child(4) {
                                left: 45px;
                                animation: lds-ellipsis3 0.6s infinite;
                            }
                        }
                    }
                    @keyframes lds-ellipsis1 {
                        0% {
                            transform: scale(0);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                    @keyframes lds-ellipsis3 {
                        0% {
                            transform: scale(1);
                        }
                        100% {
                            transform: scale(0);
                        }
                    }
                    @keyframes lds-ellipsis2 {
                        0% {
                            transform: translate(0, 0);
                        }
                        100% {
                            transform: translate(19px, 0);
                        }
                    }                      
                `}</style>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

}