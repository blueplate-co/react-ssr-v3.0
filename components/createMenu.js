import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

import ProgressBar from '../components/progessBar';

// store all values get from multi-step
let fieldValues = {
    menuName: '',
    menuDescription: '',
    selectedDish: [],
    numberOfPeople: 0,
    cost: '',
    suggestedPrice: '',
    customPrice: '',
    prepareTime: '',
    days: '',
    hours: '',
    mins: '',
    allergies: [],
    allergiesString: '',
    dietaryString: '',
    dietary: [],
    tags: []
}

import MenuStepOne from '../components/createMenuForm/stepOne';
import MenuStepTwo from '../components/createMenuForm/stepTwo';
import MenuStepThree from '../components/createMenuForm/stepThree';
import MenuStepFour from '../components/createMenuForm/stepFour';
import MenuStepFive from '../components/createMenuForm/stepFive';
import MenuStepSix from '../components/createMenuForm/stepSix';
import MenuStepSeven from '../components/createMenuForm/stepSeven';
import MenuStepEight from '../components/createMenuForm/stepEight';
import MenuStepPreview from '../components/createMenuForm/stepPreview';

@inject('store') @observer
export default class CreateMenu extends React.Component {
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
            <div className="create_menu">
                <ProgressBar progress={this.state.progress} />
                <style jsx>{`
                    /* Landscape phones and dowsn */
                    @media (max-width: 480px) {
                    }
                `}</style>

            {(() => {
                switch (this.props.store.globalStep) {
                    case 1:
                        return <MenuStepOne fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 2:
                        return <MenuStepTwo fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 3:
                        return <MenuStepThree fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 4:
                        return <MenuStepFour fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 5:
                        return <MenuStepFive fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 6:
                        return <MenuStepSix fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 7:
                        return <MenuStepSeven fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 8:
                        return <MenuStepEight fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 9:
                        return <MenuStepPreview fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                }
            })()}
                
            </div>
        )
    }
}