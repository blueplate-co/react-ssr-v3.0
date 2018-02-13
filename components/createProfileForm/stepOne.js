import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

import validator from 'validator';

@inject('store') @observer
export default class ProfileStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.state = {
            dirtyFirstName: false,
            dirtyLastName: false,
            dirtyEmail: false
        }
    }

    // handle action when user press Enter
    handleEnter = (e) => {
        if (e.keyCode == 13) { // only excute when press Enter key
            // trigger run saveAndContinue function
            this.saveAndContinue(e);
        }
    }

    // handler key change when press key
    handleKeyChange = (inputName) => {
        
        switch (inputName) {
            case 'firstName':
                if (this.refs.firstName.value !== this.props.fieldValues.firstName)
                    this.setState({
                        dirtyFirstName: true
                    })
                    break;
            case 'lastName':
                if (this.refs.lastName.value !== this.props.fieldValues.lastName)
                    this.setState({
                        dirtyLastName: true
                    })
                    break;
            case 'email':
                if (this.refs.email.value !== this.props.fieldValues.email)
                    this.setState({
                        dirtyEmail: true
                    })
                    break;
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {

        e.preventDefault();

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
            errorStack.push('Must have first name. ');
        }

        // last name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.lastName.value))) {
            errorStack.push('Must have last name. ');
        }

        // email must not empty string and correct format
        if (validator.isEmpty(validator.trim(this.refs.email.value))) {
            errorStack.push('Must have email address. ');
        } else if (!validator.isEmail(validator.trim(this.refs.email.value))){
            errorStack.push('Must have correct email format. ');
        }

        // no error found
        if (errorStack.length == 0) {
            // make sure check HTML entities before apply value to data variables
            data = {
                firstName: validator.escape(this.refs.firstName.value),
                lastName: validator.escape(this.refs.lastName.value),
                email: validator.escape(this.refs.email.value),
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
            this.props.increaseProgress(10);
        } else {
            var notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };

            // handle to avoid spam notification. If that notification is in notification array. Dont add into array
            if (this.props.store.notification.length > 0) {
                if (this.props.store.notification[0].content !== notification.content) {
                    this.props.store.addNotification(notification);
                }
            } else {
                this.props.store.addNotification(notification);
            }
        }
    }

    componentDidMount () {
        this.refs.firstName.focus();
        this.props.store.setBackFunction(null);  
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
                <div className="container" onKeyDown={ this.handleEnter }>
                    <h3>Profile</h3>
                    <input className={ this.state.dirtyFirstName ? 'dirty' : '' } type="text" onChange={ () => this.handleKeyChange('firstName') } onBlur={ () => { this.setState({ dirtyFirstName: false }) } } ref="firstName" placeholder="first name" defaultValue={ this.props.fieldValues.firstName }/>
                    <input className={ this.state.dirtyLastName ? 'dirty' : '' } type="text" onChange={ () => this.handleKeyChange('lastName') } onBlur={ () => { this.setState({ dirtyLastName: false }) } } ref="lastName" placeholder="last name" defaultValue={ this.props.fieldValues.lastName }/>
                    <input className={ this.state.dirtyEmail ? 'dirty' : '' } type="email" onChange={ () => this.handleKeyChange('email') } onBlur={ () => { this.setState({ dirtyEmail: false }) } } ref="email" placeholder="email" defaultValue={ this.props.fieldValues.email }/>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}