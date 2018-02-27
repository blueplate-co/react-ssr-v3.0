import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

import axios from 'axios';

@inject('store') @observer
export default class MenuStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionContent: '',
            descriptionLength: 0
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    // check length of textarea when user enter new value
    checkLength = () => {

        // get length of description
        let stringLength = this.refs.menuDescription.value.length;

        if (stringLength > 250) {
            let errorStack = [];
            errorStack.push('Max length has 250 characters');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            this.setState({
                descriptionContent: this.refs.menuDescription.value,
                descriptionLength: stringLength
            });
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        // Get values via this.refs
        let data = {
            menuName: null,
            menuDescription: null
        }

        // error stack store error
        let errorStack = [];
        
        if (this.refs.menuName.value && this.refs.menuName.value.length > 0) {
            
            data = {
                menuName: this.refs.menuName.value,
                menuDescription: this.state.descriptionContent
            }
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            errorStack.push('Please enter your menu name and description.');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        }
    }

    //- get dish list by create_chef_id
    getDishList = (self) => {
        var create_chef_id = localStorage.getItem('create_chef_id');
        axios.post('http://13.250.107.234/api/view/dishes', {
            create_chef_id: create_chef_id
        })
        .then(function(res){
            console.log(res);
            //- save to props
            let data = {
                dishList: res.data,
            }
    
            self.props.saveValues(data);
        })
        .catch(function(err){
            console.log(err);
        });
    }

    componentDidMount = () => {
        this.props.setProgress(10);
        this.props.store.setBackFunction(null);
        document.getElementsByTagName('input')[0].focus();

         //- get dish list
        //  this.getDishList(this);
    }

    render() {
        return (
            <div className="create_menu_step">
                <style jsx>{`
                    textarea {
                        width: 90%;
                        border: 1px solid #ccc;
                        margin-top: 20px;
                        outline: none;
                        padding: 10px;
                        font-size: 12px;
                    }
                    .text-length {
                        float: right;
                        font-size: 11px;
                    }
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            position: fixed;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Set menu</h3>
                    <input type="text" required ref="menuName" placeholder="Give your menu a name" defaultValue={ this.props.fieldValues.menuName }/>
                    <textarea 
                        onChange={this.checkLength}
                        ref="menuDescription"
                        rows="18"
                        placeholder="Also let foodie know more about your dishes” - hint ” How to make menu? - Where it come from? - Why you think it is nice? - Any special ingredient used?”"
                        value= { this.state.descriptionContent }
                    >
                    </textarea>
                    <span className="text-length">{this.state.descriptionLength} / 250</span>
                    <div className="container bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}