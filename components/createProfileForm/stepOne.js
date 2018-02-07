import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class ProfileStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;
        // error stack for display
        let errorStack = []

        // Get values via this.refs
        let data = {
            firstName: '',
            lastName: '',
            email: ''
        }

        // first name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.firstName.value))) {
            error = true;
            errorStack.push('Must have first name');
        } else {
            error = false
        }

        // last name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.lastName.value))) {
            error = true;
            errorStack.push('Must have last name');
        } else {
            error = false
        }

        // email must not empty string and correct format
        if (validator.isEmpty(validator.trim(this.refs.email.value))) {
            error = true;
            errorStack.push('Must have email address');
        } else if (!validator.isEmail(validator.trim(this.refs.email.value))){
            error = true;
            errorStack.push('Must have correct email format');
        } else {
            error = false;
        }

        // no error found
        if (!error) {
            data = {
                firstName: this.refs.firstName.value,
                lastName: this.refs.lastName.value,
                email: this.refs.email.value,
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            alert(errorStack.join("\n"));
        }
    }

    componentDidMount () {
        this.refs.firstName.focus();
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
                    <h3>Profile</h3>
                    <input type="text" required ref="firstName" placeholder="first name" defaultValue={ this.props.fieldValues.firstName }/>
                    <input type="text" required ref="lastName" placeholder="last name" defaultValue={ this.props.fieldValues.lastName }/>
                    <input type="email" required ref="email" placeholder="email" defaultValue={ this.props.fieldValues.email }/>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}