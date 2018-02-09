import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    // go back to the previous page
    goBack = (e) => {
        e.preventDefault()
        window.history.go(-1);
        return false;
    };

    render() {
        return (
            <header className="navigation">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .navigation {
                            text-align: center;
                            padding: 10px;
                            border-bottom: 1px solid #ccc;
                            h1 {
                                font-size: 12px;
                            }
                            .goback {
                                position: absolute;
                                padding: 5px;
                                font-size: 20px;
                                left: 10px;
                                top: 10px;
                            }
                            .title {
                                display: inline-flex;
                                img {
                                    margin: 5px;
                                }
                                h1 {
                                    font-size: 20px;
                                    margin: 5px 0px 0px 10px;
                                }
                            }
                        }
                    }
                `}</style>

                {/* <a onClick={this.goBack} className="goback">
                    <i className="fas fa-arrow-left"></i>
                </a> */}
                <a className="title">
                    <img src="/static/logo.svg" />
                    <h1>{this.props.title}</h1>
                </a>
    
            </header>
        )
    }
}