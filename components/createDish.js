import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';
import ProgressBar from '../components/progessBar';

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
    days: null,
    hours: null,
    mins: null,
    allergiesString: [],
    allergies: [],
    dietaryString: [],
    dietary: [],
    tags: [],
    minimumOrder: null
}

import DishStepOne from '../components/createDishForm/stepOne';
import DishStepTwo from '../components/createDishForm/stepTwo';
import DishStepThree from '../components/createDishForm/stepThree';
import DishStepFour from '../components/createDishForm/stepFour';
import DishStepFive from '../components/createDishForm/stepFive';
import DishStepSix from '../components/createDishForm/stepSix';
import DishStepSeven from '../components/createDishForm/stepSeven';
import DishStepEight from '../components/createDishForm/stepEight';
import DishStepNine from '../components/createDishForm/stepNine';
import DishStepPreview from '../components/createDishForm/stepPreview';

@inject('store') @observer
export default class CreateDish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
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
        this.props.store.nextStep();
    }
        
    // Same as nextStep, but decrementing
    previousStep = () => {
        this.props.store.previousStep();
    }

    // set progress for progressbar
    setProgress = (number) => {
        this.setState({
            progress: number
        });
    }

    // increase progress number for progressbar
    increaseProgress = (number) => {
        this.setState({
            progress: this.state.progress + number
        });
    }

    // increase progress number for progressbar
    decreaseProgress = (number) => {
        this.setState({
            progress: this.state.progress - number
        });
    }

    render() {
        return (
            <div className="create_dish">
            <ProgressBar progress={this.state.progress  } />
                <style jsx>{`
                    /* Landscape phones and dowsn */
                    @media (max-width: 480px) {
                    }
                `}</style>

            {(() => {
                switch (this.props.store.globalStep) {
                    case 1:
                        return <DishStepOne fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 2:
                        return <DishStepTwo fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 3:
                        return <DishStepThree fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 4:
                        return <DishStepFour fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>     
                    case 5:
                        return <DishStepFive fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>  
                    case 6:
                        return <DishStepSix fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 7:
                        return <DishStepSeven fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 8:
                        return <DishStepEight fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 9:
                        return <DishStepNine fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 10:
                        return <DishStepPreview fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>    
                }
            })()}
                
            </div>
        )
    }
}