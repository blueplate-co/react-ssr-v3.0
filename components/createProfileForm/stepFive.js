import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class ProfileStepFive extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
    }

    // action when user click skip button
    skip = (e) => {
        let data = {
            dob: null,
            gender: null
        }
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;

        // Get values via this.refs
        let data = {
            dob: null,
            gender: null
        }

        // no need to validate date type input, bacause it can't be overwrite value from that form input
        if (_.indexOf(['male', 'female', 'other'], this.refs.gender.value) == -1) {
            alert('Invalid value from gender. Please try again');
            error = true;
        }

        // no error found
        if (!error) {
            data = {
                dob: this.refs.dob.value,
                gender: this.refs.gender.value
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

                <div className="container">
                    <h3>About you</h3>
                    <input type="date" required ref="dob" placeholder="date of birth" />
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