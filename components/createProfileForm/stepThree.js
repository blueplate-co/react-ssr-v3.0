import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import _ from 'lodash';


export default class ProfileStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;

        if (this.state.services.length == 0) {
            alert('Must choose at least one option');
            error = true;
        }

        // no error found
        if (!error) {
            let data = {
                services: this.state.services
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    // excute when user click on services option item
    toggleActive = (option) => {
        // if this option is already exist in services array
        if (_.indexOf(this.state.services, option) > -1) {
            let dummyService = this.state.services;
            let index = dummyService.indexOf(option); // get index of option item in array
            if (index > -1) {
                dummyService.splice(index, 1);
            }
            this.setState({
                services: dummyService
            })
        } else {
            // if this options is not already exist in services array, push it into service array
            let dummyService = this.state.services;
            dummyService.push(option);
            this.setState({
                services: dummyService
            })
        }
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            position: fixed;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
                        }
                        .option-list {
                            width: 100%;
                            display: grid;
                            grid-template-columns: 100%;
                            padding-bottom: 80px;
                            .option-item {
                                text-align: center;
                                margin: 10px 0px;
                                .option-icon {
                                    width: 65px;
                                    height: 65px;
                                    background-color: #ccc;
                                    margin: 0px auto;
                                    border-radius: 50%;
                                    &.active {
                                        background-color: #EFAC1F;
                                    }
                                }
                                .option-title {
                                    display: block;
                                    width: 100%;
                                    margin: 3px 0px;
                                    font-weight: bold;
                                    &.active {
                                        color: #EFAC1F;
                                    }
                                }
                                .option-description {
                                    display: block;
                                    width: 100%;
                                    margin: 5px 0px;
                                    font-size: 10px;
                                    color: #ccc;
                                    &.active {
                                        color: #EFAC1F;
                                    }
                                }
                            }
                        }
                    }
                `}</style>
                <div className="container">
                    <h3>Services</h3>
                    <div className="option-list">
                        <div className="option-item" onClick={() => {this.toggleActive('dine-in')} }>
                            <div className={(this.state.services.indexOf('dine-in') > -1) ? 'option-icon active' : 'option-icon'}></div>
                            <span className={(this.state.services.indexOf('dine-in') > -1) ? 'option-title active' : 'option-title'}>Dine-in</span>
                            <span className={(this.state.services.indexOf('dine-in') > -1) ? 'option-description active' : 'option-description'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        </div>
                        <div className="option-item" onClick={() => {this.toggleActive('pick up')} }>
                            <div className={(this.state.services.indexOf('pick up') > -1) ? 'option-icon active' : 'option-icon'}></div>
                            <span className={(this.state.services.indexOf('pick up') > -1) ? 'option-title active' : 'option-title'}>Pick up</span>
                            <span className={(this.state.services.indexOf('pick up') > -1) ? 'option-description active' : 'option-description'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        </div>
                        <div className="option-item" onClick={() => {this.toggleActive('delivery')} }>
                            <div className={(this.state.services.indexOf('delivery') > -1) ? 'option-icon active' : 'option-icon'}></div>
                            <span className={(this.state.services.indexOf('delivery') > -1) ? 'option-title active' : 'option-title'}>Delivery</span>
                            <span className={(this.state.services.indexOf('delivery') > -1) ? 'option-description active' : 'option-description'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        </div>
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}