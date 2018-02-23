import React from 'react';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Layout from '../components/layout';
import Router from 'next/router';
import cnf from '../config';

import store from '../stores/store';
import { Provider } from 'mobx-react';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 5
        }
    }

    componentDidMount = () => {
        let that = this;
        let countdown = setInterval(()=>{
            that.setState({
                time: that.state.time - 1
            })
            if (this.state.time == 0) {
                clearInterval(countdown);
                Router.push('/');
            }
        }, 1000);
    }

    render = () => {
        return (
            <Provider store={store}>
                <Layout>
                    <style jsx>{`
                        /* Landscape phones and down */
                        @media (max-width: 480px) {
                            .container {
                                .description {
                                    text-align: justify;
                                    font-size: 14px;
                                }
                                .bottom-confirmation {
                                    position: fixed;
                                    width: 70%;
                                    bottom: 15px;
                                    z-index: 5;
                                    left: 15%;
                                }
                                .clock {
                                    display: inline-block;
                                    border: 2px solid ${cnf.color.graycolor};
                                    border-radius: 50%;
                                    margin: 20px 0px;
                                    font-size: 25px;
                                    color: ${cnf.color.graycolor};
                                    padding: 90px;
                                    text-align: center;
                                }
                            }
                        }
                    `}</style>
                    <Head title="Blueplate" />
                    <Navigation title="Blueplate"/>
                    <div className="container">
                        <h3>Validation messsage</h3>
                        <span className="clock">{ this.state.time }</span>
                        <span>Validation is nearly complate. Welcome to blueplate. Lets start…</span>
                    </div>
                    <Footer/>
                </Layout>
            </Provider>
        )
    }
}