import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class ProfileStepSeven extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
    }

    // action when user click skip button
    skip = (e) => {
        let data = {
            yourSelf: null
        }
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        let errorStack = [];

        if (validator.trim(this.refs.content.value).length == 0) {
            errorStack.push('Must have content');
            // have error
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else { // no error
            let data = {
                yourself: validator.escape(this.refs.content.value)
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        this.refs.content.focus();

        this.props.setProgress(70);
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
                        .title-description {
                            font-size: 11px;
                            color: #ccc;
                            width: 75%;
                            display: inline-block;
                        }
                        textarea {
                            width: 100%;
                            border: 1px solid #ccc;
                            margin-top: 20px;
                            outline: none;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Yourself</h3>
                    <span className="title-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span>
                    <textarea ref="content" rows="20" cols="50"></textarea>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}