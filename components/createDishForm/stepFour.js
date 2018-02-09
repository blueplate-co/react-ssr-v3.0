
import Link from 'next/link';
import React from 'react';

import validator from 'validator';

import cnf from '../../config';
import layout from '../layout';


export default class DishStepFive extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);

        this.state = {
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        // make sure parseInt qty is valid
        try {
            let cost = this.refs.cost.value;
            let suggestedPrice = this.refs.suggestedPrice.value;
            let customPrice = this.refs.customPrice.value;

            if (validator.trim(cost).length > 0 && validator.trim(suggestedPrice).length > 0 && validator.trim(customPrice).length > 0) { // no store empty string value                   
                cost = parseInt(this.refs.cost.value);
                suggestedPrice = parseInt(this.refs.suggestedPrice.value);
                customPrice = parseInt(this.refs.customPrice.value);

                let data = {
                    cost: cost,
                    suggestedPrice: suggestedPrice,
                    customPrice: customPrice
                }
                this.props.saveValues(data);
                this.props.nextStep();
            } else {
                alert('Please complete dish cost before you continue');
                return false;
            }
        } catch (error) {
            alert(error);
            return false;
        }
    }

    //- action when user fill cost
    costFilling = ()=>{
        //- get value and send data back
        var current = this.refs.cost.value;
        var final = '';
        //- fill to the suggested price
        console.log(validator.isInt(current));
        if(current.charAt(0) != '$')
        {
            final = '$' + current;
            this.refs.cost.value = final;
        }
        //- suggested price
        // console.log(Math.round(parseFloat(current.substr(1)) * 2.6));
        if(current.charAt(0) == '$' && current.length > 1)
        {
            this.refs.suggestedPrice.value = '$' + Math.round(parseFloat(current.substr(1)) * 2.6);
        }else{
            this.refs.suggestedPrice.value = '';
        }
    }

    //- action when user fill cost
    suggestedFilling = ()=>{
        //- get value and send data back
        var current = this.refs.csuggestedPriceost.value;
        var final = '';
        //- fill to the suggested price
        console.log(validator.isInt(current));
        if(current.charAt(0) != '$')
        {
            final = '$' + current;
            this.refs.cost.value = final;
        }
    }

    //- remove $ sign onblur with contain just one $sign and nothing else
    removeDollarSign = ()=>{
        var current = this.refs.cost.value;
        if(current.charAt(0) == '$' && current.length == 1)
        {
            this.refs.cost.value = '';
        }
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    .row-data {
                        display: grid;
                        grid-template-columns: 25% 50% 25%;
                        font-weight: 400;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        margin-bottom: 10px;
                        border-bottom: 1px solid ${cnf.color.graycolor};
                        font-size: 12px;
                        .cost {
                            text-align: left;
                        }
                        .sugPrice {
                            text-align: center;
                        }
                        .custom {
                            text-align: right;
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
                    <h3>Price</h3>
                    <div className="row-data">
                        <div className="cost">Cost</div>
                        <div className="sugPrice">Suggested price</div>
                        <div className="custom">Custom</div>
                    </div>
                    <div style={{ display: 'inline-flex' }}>
                        <input ref="cost" onBlur={ this.removeDollarSign } onChange={ this.costFilling } style={{ width: '25%', marginRight: '3%', textAlign: 'left' }} type="text" placeholder="$0"/>
                        <input ref="suggestedPrice" style={{ width: '50%' , marginRight: '3%', textAlign: 'center' }} type="text" placeholder="$0"/>
                        <input ref="customPrice" style={{ width: '25%', textAlign: 'right' }} type="number" placeholder="$0"/>
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}