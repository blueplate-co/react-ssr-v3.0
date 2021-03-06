import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


@inject('store') @observer
export default class ProfileStepFive extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.skip = this.skip.bind(this);

        this.state = {
            dob: ''
        }
    }

    // action when user click skip button
    skip = (e) => {
        let data = {
            dob: '',
            gender: ''
        }
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let errorStack = [];

        // Get values via this.refs
        let data = {
            dob: null,
            gender: null
        }

        // no need to validate date type input, bacause it can't be overwrite value from that form input
        if (_.indexOf(['male', 'female', 'other'], this.refs.gender.value) == -1) {
            errorStack.push('Invalid value from gender. Please try again');
        }

        if (this.state.dob.length == 0) {
            errorStack.push('Must choose your date of birth');
        }

        // no error found
        if (errorStack.length == 0) {
            data = {
                dob: this.state.dob,
                gender: this.refs.gender.value
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            // have error
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        }
    }

    // handle change when datetime picker change value
    handleChange = (date) => {
        this.setState({
            dob: date
        });
    }

    // handle action when user press Enter
    handleEnter = (e) => {
        if (e.keyCode == 13) { // only excute when press Enter key
            // trigger run saveAndContinue function
            this.saveAndContinue(e);
        }
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        this.props.setProgress(55);
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            display: grid;
                            grid-template-columns: 50% 50%;
                            position: fixed;
                            width: 90%;
                            bottom: 15px;
                            z-index: 5;
                            grid-column-gap: 2%;
                            left: 3%;
                        }
                    }
                `}</style>

                <div className="container" onKeyDown = { this.handleEnter }>
                    <h3>About you</h3>
                    <DatePicker
                        selected={this.state.dob}
                        onChange={this.handleChange}
                        placeholderText="date of birth"
                        autoFocus={true}
                    />
                    <select ref="gender">
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}