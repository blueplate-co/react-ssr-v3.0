import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class ProfileStepFive extends React.Component {
    constructor(props) {
        super(props);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;

        // Get values via this.refs
        let data = {
            profileImages: null
        }

        if (!this.state.imgSrc || this.state.imgSrc.length < 0) {
            error = true;
            alert('Must set avatar');
        }

        // no error found
        if (!error) {
            data = {
                profileImagesSrc: this.state.imgSrc,
                cacheFile: this.state.cachefile
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
                    <h3>About you</h3>
                    <input type="text" required ref="firstName" placeholder="date of birth" />
                    <input type="text" required ref="lastName" placeholder="gender" />
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}