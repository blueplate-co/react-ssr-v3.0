
import Link from 'next/link';
import React from 'react';

import validator from 'validator';

import cnf from '../../config';
import layout from '../layout';


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

            if (validator.trim(value.toString()).length == 0) {
                alert('Must enter value');
                return false;
            } else if (parseInt(value) == 0){
                alert('Must at least 1 dish');
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

                <div className="container">
                    <h3>Minimum order</h3>
                    <div className="row-data">
                        <input ref="value" type="number" placeholder="number of orders from foodies" />
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}