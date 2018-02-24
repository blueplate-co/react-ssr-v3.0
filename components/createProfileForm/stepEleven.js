import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

var dietary = [
    {name: 'Diabary', icon: 'highProtein.svg', value: false},
    {name: 'Gluten-free', icon: 'highProtein.svg', value: false},
    {name: 'High protein', icon: 'highProtein.svg', value: false},
    {name: 'Lactose-free', icon: 'highProtein.svg', value: false},
    {name: 'Low sodium', icon: 'highProtein.svg', value: false},
    {name: 'Low-Carbs', icon: 'highProtein.svg', value: false},
    {name: 'Nut free', icon: 'highProtein.svg', value: false},
    {name: 'Paleo', icon: 'highProtein.svg', value: false},
    {name: 'Pescetatrian', icon: 'highProtein.svg', value: false},
    {name: 'Vegan', icon: 'highProtein.svg', value: false},
    {name: 'Vegetarian', icon: 'highProtein.svg', value: false}

];

@inject('store') @observer
export default class ProfileStepEleven extends React.Component {
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

        let tempState = dietary;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].value = value;
                dietary = tempState;
            }
        }
        
    }

    // action when user click skip button
    skip = (e) => {
        let data = {
            dietary: []
        }
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        
        let result = [];
        let errorStack = [];

        for(let i = 0; i < dietary.length; i++) {
            if (dietary[i].value == true) {
                result.push(dietary[i])
            }
        }

        if (result.length == 0) {
            errorStack.push('Must choose at least option.');
            // have error
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            let data = {
                dietary: result,
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    // generate list input
    generateList = () => {
        var that = this;
        
        return dietary.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input type="checkbox" defaultChecked={item.value} name={item.name} id={item.name} onChange={this.handleInputChange}/>
                    <label htmlFor={item.name} style={{ float: `left` }}>{item.name}</label>
                    <img style={{ float: `right` }} src={ `/static/icons/` + item.icon }/>
                </p>
            );
        })
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        document.getElementsByTagName('input')[document.getElementsByTagName("input").length - 1].focus();

        this.props.setProgress(95);

        // set default value for back function
        if (this.props.fieldValues.dietary.length > 0){
            for (let i = 0; i < this.props.fieldValues.dietary.length; i++) {
                for(let j = 0; j < dietary.length; j++) {
                    if (dietary[j].name == this.props.fieldValues.dietary[i].name) {
                        dietary[j].value = true;
                    }
                }
            }
        }
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
                        input[type="text"] {
                            margin-bottom: 80px;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Dietary preference</h3>
                    <span className="title-description">Who is your favorite chef or books</span>
                    <form>
                        { this.generateList() }
                    </form>
                    <input type="text" placeholder="Others" style={{ marginBottom: '100px' }}/>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}