import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import cnf from '../../config';

import { inject, observer } from 'mobx-react';

// global variable for list check
let selectedData = [
    { id: 1, selected: false, name: 'Ice-cream', cost: 200, selling: 30 },
    { id: 2, selected: false, name: 'Beer', cost: 200, selling: 30 },
    { id: 3, selected: false, name: 'Hippo meat', cost: 100, selling: 300 },
    { id: 4, selected: false, name: 'Pizza', cost: 200, selling: 30 },
    { id: 5, selected: false, name: 'Dinosaur', cost: 570, selling: 730 },
    { id: 6, selected: false, name: 'Dragon', cost: 2000, selling: 3000 },
]

@inject('store') @observer
export default class MenuStepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        console.log(this.props.fieldValues);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        
        let result = [];
        let errorStack = [];

        for(let i = 0; i < selectedData.length; i++) {
            if (selectedData[i].selected == true) {
                result.push(selectedData[i])
            }
        }
        

        if (result.length == 0) {
            errorStack.push('Please choose at least one dish');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            return false;
        }

        let data = {
            selectedDish: result,
            selectedDish2: result.map(a=>a.id),
        }

        this.props.saveValues(data);
        this.props.nextStep();

    }

    // when user click change checkbox
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let tempState = selectedData;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].selected = value;
                selectedData = tempState;
            }
        }
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });
        this.props.setProgress(20);
    }

    render() {
        return (
            <div className="create_menu_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            position: fixed;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
                        }
                        .title-row {
                            display: grid;
                            grid-template-columns: 20% 35% 20% 25%;
                            font-size: 14px;
                            font-weight: bold;
                            padding-bottom: 10px;
                            border-bottom: 1px solid ${cnf.color.graycolor};
                            div {
                                &:first-child {
                                    text-align: left;
                                }
                                &:nth-child(2) {
                                    text-align: center;
                                }
                                &:nth-child(3) {
                                    text-align: center;
                                }
                                &:last-child {
                                    text-align: right;
                                }
                            }
                        }
                        .data-row {
                            display: grid;
                            grid-template-columns: 20% 35% 20% 25%;
                            font-size: 13px;
                            padding: 10px 0px;
                            border-bottom: 1px solid ${cnf.color.graycolor};
                            span {
                                &:first-child {
                                    text-align: left;
                                }
                                &:nth-child(2) {
                                    text-align: left;
                                    padding-top: 5px;
                                }
                                &:nth-child(3) {
                                    text-align: center;
                                    padding-top: 5px;
                                }
                                &:last-child {
                                    text-align: right;
                                    padding-top: 5px;
                                }
                            }
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Dish List</h3>
                    <div className="title-row">
                        <div>Select</div>
                        <div>Dish name</div>
                        <div>Cost</div>
                        <div>Selling</div>
                    </div>

                    {
                        selectedData.map((item, index) => (
                            <div key={index} className="data-row">
                                <span>
                                    <input type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChange}/>
                                    <label htmlFor={item.name} style={{ float: `left` }}></label>
                                </span>
                                <span>
                                    { item.name }
                                </span>
                                <span>
                                    $ { item.cost }
                                </span>
                                <span>
                                    $ { item.selling }
                                </span>
                            </div>
                    ))}

                    <div className="container bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}