import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

// store all values get from multi-step
let fieldValues = {
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    phoneNo: '+xx xxx xxx xxxx',
    services: [],
    profileImages: null,
    cacheFile: null,
    dob: null,
    gender: null
}

import ProfileStepOne from '../components/createProfileForm/stepOne';
import ProfileStepTwo from '../components/createProfileForm/stepTwo';
import ProfileStepThree from '../components/createProfileForm/stepThree';
import ProfileStepFour from '../components/createProfileForm/stepFour';
import ProfileStepFive from '../components/createProfileForm/stepFive';

@inject('store') @observer
export default class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 5
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
                        return <ProfileStepOne fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 2:
                        return <ProfileStepTwo fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 3:
                        return <ProfileStepThree fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 4:
                        return <ProfileStepFour fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 5:
                        return <ProfileStepFive fieldValues={fieldValues} previousStep={this.previousStep} nextStep={this.nextStep} saveValues={this.saveValues}/>
                }
            })()}
                
            </div>
        )
    }
}