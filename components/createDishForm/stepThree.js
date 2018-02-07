import Link from 'next/link';
import React from 'react';

import validator from 'validator';

import cnf from '../../config';


export default class DishStepThree extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.addIngredient = this.addIngredient.bind(this);

        this.state = {
            ingredient: [
                {name: '', qty: 0, unit: ''}
            ]
        }
    }

    // action when user add exp skills
    addIngredient = (e) => {
        let dummyArray = this.state.ingredient;
        dummyArray.push({name: '', qty: 0, unit: ''});
        this.setState({
            addIngredient: dummyArray
        })
    }

    // handlechange when user input 

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        let result = [];

        this.state.ingredient.map((item, index) => {
            let tempName = document.getElementsByClassName('ingredient-name')[index].value;
            let tempQty = document.getElementsByClassName('ingredient-qty')[index].value;
            let tempUnit = document.getElementsByClassName('ingredient-unit')[index].value;
            // make sure parseFloat qty is valid
            try {
                if (validator.trim(tempName).length > 0 && validator.trim(tempQty).length > 0 && validator.trim(tempUnit).length > 0) { // no store empty string value
                    var tempIngredient = {name: tempName, qty: parseFloat(tempQty), unit: tempUnit}
                    result.push(tempIngredient);  
                    let data = {
                        ingredient: result,
                    }
                    this.props.saveValues(data);
                    this.props.nextStep();
                } else {
                    alert('Please complete ingredient before you add these');
                    return false;
                }
            } catch (error) {
                alert(error);
                return false;
            }
        });
    }

    // generate list input
    generateList = () => {
        var that = this;
        
        return this.state.ingredient.map((item, index) => {
            return (
                <div key={index} style={{ display: 'inline-flex' }}>
                    <input className="ingredient-name" style={{ width: '60%', marginRight: '3%' }} type="text" placeholder="ingredient"/>
                    <input className="ingredient-qty" style={{ width: '20%' , marginRight: '3%', textAlign: 'center' }} type="number" placeholder="0"/>
                    <input className="ingredient-unit" style={{ width: '20%' }} type="text" placeholder=""/>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    .row-data {
                        display: grid;
                        grid-template-columns: 60% 20% 20%;
                        font-weight: 400;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        margin-bottom: 10px;
                        border-bottom: 1px solid ${cnf.color.graycolor};
                        .ingredient {
                            text-align: left;
                        }
                        .qty, .unit {
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
                    <h3>Ingredients</h3>
                    <div className="row-data">
                        <div className="ingredient">Ingredients</div>
                        <div className="qty">Qty.</div>
                        <div className="unit">Unit</div>
                    </div>
                    { this.generateList() }
                    <i className="fas fa-plus" onClick={this.addIngredient}></i>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}