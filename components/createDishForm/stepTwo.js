import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

import validator from 'validator';

@inject('store') @observer
export default class DishStepTwo extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.checkLength = this.checkLength.bind(this);

        this.state = {
            descriptionContent: '',
            descriptionLength: 0,
            errorStack: []
        }
    }

    // check length of textarea when user enter new value
    checkLength = () => {

        // get length of description
        let stringLength = this.refs.dishDescription.value.length;
        let errorStack = [];

        if (stringLength > 250) {
            errorStack.push('Length of description not greater than <b>250</b> charaters');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            this.setState({
                descriptionContent: this.refs.dishDescription.value,
                descriptionLength: stringLength
            });
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        // Get values via this.refs
        let data = {
            dishName: null,
            dishDescription: null
        }

        // error stack
        let errorStack = [];

        // dish name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.dishName.value))) {
            errorStack.push('Must have dish name');
        }

        // last name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.dishDescription.value))) {
            errorStack.push('Must have dish description');
        }

        // no error found
        if (errorStack.length == 0) {
            data = {
                dishName: validator.escape(this.refs.dishName.value),
                dishDescription: validator.escape(this.refs.dishDescription.value)
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            // error found, display notification
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        }
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        this.props.setProgress(20);

        this.refs.dishName.focus();
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    textarea {
                        width: 90%;
                        border: 1px solid #ccc;
                        margin-top: 20px;
                        outline: none;
                        padding: 10px;
                        font-size: 12px;
                    }
                    .text-length {
                        float: right;
                        font-size: 11px;
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
                    }
                `}</style>
                <div className="container">
                    <h3>Dish Detail</h3>
                    <input type="text" required ref="dishName" placeholder="dish name" defaultValue={ this.props.fieldValues.firstName }/>
                    <textarea 
                        onChange={this.checkLength}
                        ref="dishDescription"
                        rows="18"
                        placeholder="Also let foodie know more about your dishes” - hint ” How to make dishes? - Where it come from? - Why you think it is nice? - Any special ingredient used?”"
                        value= { this.state.descriptionContent }
                    >
                    </textarea>
                    <span className="text-length">{this.state.descriptionLength} / 250</span>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}