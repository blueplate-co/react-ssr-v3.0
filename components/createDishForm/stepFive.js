
import Link from 'next/link';
import React from 'react';

import validator from 'validator';

import cnf from '../../config';
import layout from '../layout';


export default class DishStepFive extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);

        this.state = {
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        // make sure parseInt qty is valid
        try {
            let days = this.refs.days.value;
            let hours = this.refs.hours.value;
            let mins = this.refs.mins.value;

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
                console.log(data);
                this.props.saveValues(data);
                this.props.nextStep();
            } else {
                alert('Please complete dish cost before you continue');
                return false;
            }
        } catch (error) {
            alert(error);
            return false;
        }
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
                        <input ref="days" className="days" style={{ width: '25%', marginRight: '3%', textAlign: 'left' }} type="number" placeholder="days"/>
                        <input ref="hours" className="hours" style={{ width: '50%' , marginRight: '3%', textAlign: 'center' }} type="number" placeholder="hours"/>
                        <input ref="mins" className="mins" style={{ width: '25%', textAlign: 'right' }} type="number" placeholder="mins"/>
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}