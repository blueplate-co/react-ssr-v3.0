import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class ProfileStepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;

        // Get values via this.refs
        let data = {
            location: null,
            phoneNo: null
        }

        // location must not empty string
        if (validator.isEmpty(validator.trim(this.refs.location.value))) {
            error = true;
            alert('Must have location');
        } else {
            error = false
        }

        // phone number must not empty string and correct format
        if (validator.isEmpty(validator.trim(this.refs.phone.value))) {
            error = true;
            alert('Must have a phone number');
        } else if (!validator.isMobilePhone(validator.trim(this.refs.phone.value)), 'any'){
            error = true;
            alert('Must have correct phone number format');
        } else {
            error = false;
        }

        // no error found
        if (!error) {
            data = {
                location: this.refs.location.value,
                phoneNo: this.refs.phone.value
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
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
                    }
                `}</style>
                <div className="container">
                    <h3>Where</h3>
                    <input type="text" required ref="location" placeholder="location" defaultValue={ this.props.fieldValues.location }/>
                    <input type="tel" required ref="phone" placeholder="phone no." defaultValue={ this.props.fieldValues.phoneNo }/>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}