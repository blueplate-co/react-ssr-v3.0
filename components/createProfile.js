import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

import ProgressBar from '../components/progessBar';
import MapMarker from '../components/mapMarker';

// store all values get from multi-step
let fieldValues = {
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    lat: null,
    lng: null,
    phoneNo: '',
    services: [],
    profileImages: '',
    cacheFile: '',
    dob: '',
    gender: '',
    exp: [],
    yourself: '',
    reason: '',
    inspiration: '',
    allergies: [],
    dietary: []
}

import ProfileStepOne from '../components/createProfileForm/stepOne';
import ProfileStepTwo from '../components/createProfileForm/stepTwo';
import ProfileStepThree from '../components/createProfileForm/stepThree';
import ProfileStepFour from '../components/createProfileForm/stepFour';
import ProfileStepFive from '../components/createProfileForm/stepFive';
import ProfileStepSix from '../components/createProfileForm/stepSix';
import ProfileStepSeven from '../components/createProfileForm/stepSeven';
import ProfileStepEight from '../components/createProfileForm/stepEight';
import ProfileStepNine from '../components/createProfileForm/stepNine';
import ProfileStepTen from '../components/createProfileForm/stepTen';
import ProfileStepEleven from '../components/createProfileForm/stepEleven';
import ProfileStepPreview from '../components/createProfileForm/stepPreview';

@inject('store') @observer
export default class CreateProfile extends React.Component {
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

    // Go to specific step
    goToStep = (step) => {
        this.props.store.goToStep(step);
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

    // condition render map marker
    generateMap = () => {
        if (this.props.store.showMap) {
            return <MapMarker />;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="create_profile">
            <ProgressBar progress={this.state.progress  } />
            {/* generate map marker with condition */}
            { this.generateMap() }
            <style jsx>{` 
                /* Landscape phones and dowsn */
                @media (max-width: 480px) {
                }
            `}</style>

            {(() => {
                switch (this.props.store.globalStep) {
                    case 1:
                        return <ProfileStepOne fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 2:
                        return <ProfileStepTwo fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 3:
                        return <ProfileStepThree fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 4:
                        return <ProfileStepFour fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 5:
                        return <ProfileStepFive fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 6:
                        return <ProfileStepSix fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 7:
                        return <ProfileStepSeven fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 8:
                        return <ProfileStepEight fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 9:
                        return <ProfileStepNine fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 10:
                        return <ProfileStepTen fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 11:
                        return <ProfileStepEleven fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress}/>
                    case 12:
                        return <ProfileStepPreview fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues} setProgress={this.setProgress} goToStep={this.goToStep}/>    
                }
            })()}
                
            </div>
        )
    }
}