
import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

import cnf from '../../config';
import layout from '../layout';

@inject('store') @observer
export default class DishStepNine extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);

        this.state = {}
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        try {
            let value = this.refs.value.value;
            let errorStack = [];
            
            if (validator.trim(value.toString()).length == 0) {
                errorStack.push('Please provide the number of order you want to receive from others');
                let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);
                return false;
            } else if (parseInt(value) == 0){
                errorStack.push('A dish need to be serviced to at least 1 person');
                let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);
                return false;
            }

            let data = {
                minimumOrder: value
            }
            
            this.props.saveValues(data);
            this.props.nextStep();

        } catch (error) {
            alert(error);
        }
    }

    handleEnter = (e) => {
        if (e.keyCode == 13) {
            this.saveAndContinue(e);
        }
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        this.props.setProgress(90);

        document.getElementsByTagName('input')[0].focus();
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    .row-data {
                        display: grid;
                        grid-template-columns: 100%;
                        font-weight: 400;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        margin-bottom: 10px;
                        font-size: 12px;
                        input {
                            font-size: 12px;
                            text-align: center
                        }
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

                <div className="container" onKeyDown={ this.handleEnter }>
                    <h3>Minimum order</h3>
                    <div className="row-data">
                        <input ref="value" type="number" defaultValue={this.props.fieldValues.minimumOrder} placeholder="number of orders from foodies" />
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}