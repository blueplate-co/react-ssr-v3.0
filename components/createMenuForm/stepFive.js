import Link from 'next/link';
import React from 'react';

import validator from 'validator';

import cnf from '../../config';
import layout from '../layout';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class MenuStepFive extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);

        this.state = {
        }
    }

    //- action when user fill cost    
    dayFill = ()=>{
        //- get value and send data back
        var current = this.refs.days.value;
        this.refs.days.value = current + ' day(s)';
    }

    //- action when user fill cost
    hourFill = ()=>{
        //- get value and send data back
        var current = this.refs.hours.value;
        this.refs.hours.value = current + ' hour(s)';
    }

    //- action when user fill cost
    minFill = ()=>{
        //- get value and send data back
        var current = this.refs.mins.value;
        this.refs.mins.value = current + ' minute(s)';
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        let errorStack = [];

        // make sure parseInt qty is valid
        try {
            let days = this.refs.days.value.split(' ')[0];
            let hours = this.refs.hours.value.split(' ')[0];
            let mins = this.refs.mins.value.split(' ')[0];

            if (validator.trim(days).length > 0 && validator.trim(hours).length > 0 && validator.trim(mins).length > 0) { // no store empty string value                   
                days = parseInt(this.refs.days.value);
                hours = parseInt(this.refs.hours.value);
                mins = parseInt(this.refs.mins.value);

                // calculate what total time in mins to complete this dish
                let totalTime = (days * 24 * 60) + (hours * 60) + mins;
                totalTime = parseInt(totalTime);

                let data = {
                    prepareTime: totalTime,
                    days: days,
                    hours: hours,
                    mins: mins
                }
                this.props.saveValues(data);
                this.props.nextStep();
            } else {
                errorStack.push('Please complete preparation time before continue');
                let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);
                return false;
            }
        } catch (error) {
            errorStack.push(error);
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            return false;
        }
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });
        this.props.setProgress(50);
        document.getElementsByTagName('input')[0].focus();
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    .days {
                        font-size: 13px;
                        text-align: left;
                    }
                    .hours {
                        font-size: 13px;
                        text-align: center;
                    }
                    .mins {
                        font-size: 13px;
                        text-align: right;
                    }
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            position: fixed;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
                        }
                        i.fas {
                            float: right;
                            margin: 5px;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Preparation time</h3>
                    <div style={{ display: 'inline-flex' }}>
                        <input ref="days" className="days" onBlur={ this.dayFill } style={{ width: '25%', marginRight: '3%', textAlign: 'left' }} type="text" placeholder="days"/>
                        <input ref="hours" className="hours" onBlur={ this.hourFill } style={{ width: '40%' , marginRight: '3%', textAlign: 'center' }} type="text" placeholder="hours"/>
                        <input ref="mins" className="mins" onBlur={ this.minFill } style={{ width: '35%', textAlign: 'right' }} type="text" placeholder="mins"/>
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}