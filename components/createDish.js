import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

// store all values get from multi-step
let fieldValues = {
    dishImagesSrc: null,
    cacheFile: null,
    dishName: null,
    dishDescription: null,
    ingredient: [],
    cost: null,
    suggestedPrice: null,
    customPrice: null,
    prepareTime: null,
    allergies: null,
    dietary: null
}

import DishStepOne from '../components/createDishForm/stepOne';
import DishStepTwo from '../components/createDishForm/stepTwo';
import DishStepThree from '../components/createDishForm/stepThree';
import DishStepFour from '../components/createDishForm/stepFour';
import DishStepFive from '../components/createDishForm/stepFive';
import DishStepSix from '../components/createDishForm/stepSix';
import DishStepSeven from '../components/createDishForm/stepSeven';

@inject('store') @observer
export default class CreateDish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 7
        };
    }

    // save all fields values get from step screen and assign into global multi-step data
    saveValues = (fields) => {
        return function() {
            // overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields)
        }()
    }
    
    // increase step
    nextStep = () => {
        this.setState({
            step : this.state.step + 1
        })
    }
      
    // Same as nextStep, but decrementing
    previousStep = () => {
        this.setState({
            step : this.state.step - 1
        })
    }

    render() {
        return (
            <div className="create_profile">
                <style jsx>{`
                    /* Landscape phones and dowsn */
                    @media (max-width: 480px) {
                    }
                `}</style>

            {(() => {
                switch (this.state.step) {
                    case 1:
                        return <DishStepOne fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 2:
                        return <DishStepTwo fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 3:
                        return <DishStepThree fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 4:
                        return <DishStepFour fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>     
                    case 5:
                        return <DishStepFive fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>  
                    case 6:
                        return <DishStepSix fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 7:
                        return <DishStepSeven fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>   
                }
            })()}
                
            </div>
        )
    }
}