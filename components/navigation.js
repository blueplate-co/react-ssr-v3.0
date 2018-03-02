import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';
import NProgress from 'nprogress';
import Router from 'next/router'
import cnf from '../config';

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
                    .navigation {
                        text-align: center;
                        padding: 10px;
                        border-bottom: 1px solid ${cnf.color.graycolor};
                        position: fixed;
                        top: 0px;
                        width: 100%;
                        background-color: #fff;
                        z-index: 2;
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
                `}</style>
                {

                    typeof this.props.store.backFunction == 'function' ?
                        <a onClick={ this.props.store.backFunction } className="goback">
                            <i className="fas fa-arrow-left"></i>
                        </a>
                    :
                    ''
                }
                <a className="title">
                    {/* <img src="/static/logo.svg" /> */}
                    <img src="http://13.250.50.89:3001/logo.svg"/>
                    <h1>{this.props.title}</h1>
                </a>
    
            </header>
        )
    }
}