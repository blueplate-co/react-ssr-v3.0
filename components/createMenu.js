import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

// store all values get from multi-step
let fieldValues = {
    menuName: null,
    selectedDish: []
}

import MenuStepOne from '../components/createMenuForm/stepOne';
import MenuStepTwo from '../components/createMenuForm/stepTwo';
import MenuStepThree from '../components/createMenuForm/stepThree';

@inject('store') @observer
export default class CreateMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 3
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

    componentWillUpdate() {
        if (this.props.state == 10) {
            console.log(fieldValues);
        }
        
    }

    render() {
        return (
            <div className="create_menu">
                <style jsx>{`
                    /* Landscape phones and dowsn */
                    @media (max-width: 480px) {
                    }
                `}</style>

            {(() => {
                switch (this.state.step) {
                    case 1:
                        return <MenuStepOne fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 2:
                        return <MenuStepTwo fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                    case 3:
                        return <MenuStepThree fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues}/>
                }
            })()}
                
            </div>
        )
    }
}