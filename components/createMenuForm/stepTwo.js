import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import cnf from '../../config';

import { inject, observer } from 'mobx-react';
import axios from 'axios';
let selectedData = [];

@inject('store') @observer
export default class MenuStepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dishList: []
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.getDishList = this.getDishList.bind(this);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        
        let result = [];
        let errorStack = [];
        for(let i = 0; i < this.state.dishList.length; i++) {
            if (this.state.dishList[i].selected == true) {
                result.push(this.state.dishList[i])
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

    //- get dish list by create_chef_id
    getDishList = () => {
        let that = this;
        var create_chef_id = localStorage.getItem('create_chef_id');
        axios.post('http://13.250.107.234/api/view/dishes', {
            create_chef_id: create_chef_id
        })
        .then(function(res){
            selectedData = res.data;
            selectedData[0].selected = false;
            that.setState({
                dishList: selectedData
            },() => {
                if (that.props.fieldValues.selectedDish.length > 0) {
                    // set default value for back function.
                    if (that.props.fieldValues.selectedDish.length > 0){
                        for (let i = 0; i < that.props.fieldValues.selectedDish.length; i++) {
                            for(let j = 0; j < that.state.dishList.length; j++) {
                                if (that.state.dishList[j].name == that.props.fieldValues.selectedDish[i].name) {
                                    let dummyState = that.state.dishList;
                                    dummyState[j].selected = true;
                                    that.setState({
                                        dishList: dummyState 
                                    },() => {
                                        console.log(that.state.dishList);
                                    })
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(function(err){
            console.log(err);
        });
    }

    // when user click change checkbox
    handleInputChange(event, name, self) {
        let tempState = self.state.dishList;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].dName == name) {
                tempState[i].selected = !tempState[i].selected;
                self.setState({
                    dishList: tempState
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });
        this.props.setProgress(20);
        this.getDishList();

    }

    render() {
        var selectedData = this.state.dishList;
        return (
            <div className="create_menu_step">
                <style jsx>{`
                    /* Landscape phones and down */
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
                    @media (min-width: 1024px) {
                        .bottom-confirmation {
                            position: relative;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
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
                        this.state.dishList.map((item, index) => (
                            <div key={index} className="data-row">
                                <span>
                                    <input defaultChecked={item.selected} type="checkbox" name={item.dName} id={item.dName} onChange={() => this.handleInputChange(event, item.dName, this)}/>
                                    <label htmlFor={item.dName} style={{ float: `left` }}></label>
                                </span>
                                <span>
                                    { item.dName }
                                </span>
                                <span>
                                    $ { item.dCost }
                                </span>
                                <span>
                                    $ { item.dSuggestedPrice }
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