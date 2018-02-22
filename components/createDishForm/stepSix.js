import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

var allergies = [
    {name: 'Egg', id: "1", icon: 'egg.svg', value: false},
    {name: 'Fish', id: "2", icon: 'egg.svg', value: false},
    {name: 'Milk', id: "3", icon: 'egg.svg', value: false},
    {name: 'Peanut', id: "4", icon: 'egg.svg', value: false},
    {name: 'Tree-nuts', id: "5", icon: 'egg.svg', value: false},
    {name: 'Soy', id: "6", icon: 'egg.svg', value: false},
    {name: 'Shellfish', id: "7", icon: 'egg.svg', value: false},
    {name: 'Wheat', id: "8", icon: 'egg.svg', value: false}

];

@inject('store') @observer
export default class DishStepSix extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let tempState = allergies;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].value = value;
                allergies = tempState;
            }
        }
        
    }

    // action when user click skip button
    skip = (e) => {
        let data = {
            allergies: []
        }
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        
        let resultString = [];
        let result = [];
        let errorStack = [];

        for(let i = 0; i < allergies.length; i++) {
            if (allergies[i].value == true) {
                resultString.push(allergies[i].id);
            }
        }

        for(let i = 0; i < allergies.length; i++) {
            if (allergies[i].value == true) {
                result.push(allergies[i]);
            }
        }

        if (result.length == 0) {
            errorStack.push('Must choose at least option.');
            // have error
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            let data = {
                allergiesString: resultString.toString(),
                allergies: result
            }
                
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    // generate list input
    generateList = () => {
        var that = this;
        
        return allergies.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChange}/>
                    <label htmlFor={item.name} style={{ float: `left` }}>{item.name}</label>
                    <img style={{ float: `right` }} src={ `/static/icons/` + item.icon }/>
                </p>
            );
        })
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(null);
        this.props.setProgress(60);
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            display: grid;
                            grid-template-columns: 50% 50%;
                            position: fixed;
                            width: 90%;
                            bottom: 15px;
                            z-index: 5;
                            grid-column-gap: 2%;
                            left: 3%;
                        }
                        .title-description {
                            font-size: 11px;
                            color: #ccc;
                            width: 75%;
                            display: inline-block;
                        }
                        p {
                            margin: 5px 0px;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Major food allergies</h3>
                    <span className="title-description">Who is your favorite chef or books</span>
                    <form>
                        { this.generateList() }
                    </form>
                    <input style={{ marginBottom: '100px' }} type="text" placeholder="Others"/>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}