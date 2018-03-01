import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class ProfileStepTen extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNew = this.addNew.bind(this);

        this.state = {
            allergies: [
                {name: 'Egg', icon: 'egg.svg', value: false},
                {name: 'Fish', icon: 'fish.svg', value: false},
                {name: 'Milk', icon: 'milk.svg', value: false},
                {name: 'Peanut', icon: 'peanuts.svg', value: false},
                {name: 'Tree-nuts', icon: 'tree_nuts.svg', value: false},
                {name: 'Soy', icon: 'soy.svg', value: false},
                {name: 'Shellfish', icon: 'CrustaceanShellfish.svg', value: false},
                {name: 'Wheat', icon: 'gluten.svg', value: false}
            ],
            new_allergies: []
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let tempState = this.state.allergies;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].value = value;
                this.setState({
                    allergies: tempState
                })
            }
        } 
    }

    handleInputChangeOther(event, self) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let tempState = self.state.new_allergies;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].value = value;
                this.setState({
                    new_allergies: tempState
                })
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
        
        let result = [];
        let errorStack = [];

        for(let i = 0; i < this.state.allergies.length; i++) {
            if (this.state.allergies[i].value == true) {
                result.push(this.state.allergies[i])
            }
        }

        for(let i = 0; i < this.state.new_allergies.length; i++) {
            if (this.state.new_allergies[i].value == true) {
                result.push(this.state.new_allergies[i])
            }
        }

        // if (result.length == 0) {
        //     errorStack.push('Please choose at least 1 allergy.');
        //     // have error
        //     let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
        //     this.props.store.addNotification(notification);
        // } else {
        //     let data = {
        //         allergies: result
        //     }
                 
        //     this.props.saveValues(data);
        //     this.props.nextStep();
        // }

        let data = {
            allergies: result
        }
             
        this.props.saveValues(data);
        this.props.nextStep();


    }

    // generate list input
    generateList = () => {
        let that = this;
        
        return this.state.allergies.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input checked={item.value} type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChange}/>
                    <label htmlFor={item.name} style={{ float: `left` }}>{item.name}</label>
                    <img style={{ float: `right` }} src={ `/static/icons/allergies/` + item.icon }/>
                </p>
            );
        })
    }

    // generate list input
    generateListOther = () => {
        let that = this;
        return this.state.new_allergies.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input checked={item.value} type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChangeOther(event,this)}/>
                    <label htmlFor={item.name} style={{ float: `left` }}>{item.name}</label>
                    <img style={{ float: `right` }} src={ `/static/icons/allergies/` + item.icon }/>
                </p>
            );
        })
    }

    // add new allergies
    addNew = (e) => {
        if (e.keyCode == 13) {
            let value = this.refs.allergies.value;
            let errorStack = [];
            if (validator.trim(value).length == 0) {
                errorStack.push('Must have new allergies');
                let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);
                this.refs.allergies.value = '';
                return true;
            }
            let allergies = { name: value, icon: 'other.svg', value: true };
            let dummyArray = this.state.new_allergies;
            dummyArray.push(allergies);
            this.setState({
                new_allergies: dummyArray
            })
            this.refs.allergies.value = '';
        }
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        document.getElementsByTagName('input')[document.getElementsByTagName("input").length - 1].focus();

        this.props.setProgress(85);

        // set default value for back function
        if (this.props.fieldValues.allergies.length > 0){
            for (let i = 0; i < this.props.fieldValues.allergies.length; i++) {
                for(let j = 0; j < this.state.allergies.length; j++) {
                    if (this.state.allergies[j].name == this.props.fieldValues.allergies[i].name) {
                        let dummyArray = this.state.allergies;
                        dummyArray[j].value = true;
                        this.setState({
                            allergies: dummyArray
                        })
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
                            grid-template-columns: 100%;
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
                        { this.generateListOther() }
                    </form>
                    <input type="text" placeholder="Others" ref="allergies" onKeyDown={ this.addNew } style={{ marginBottom: '100px' }}/>
                </div>
                <div className="container bottom-confirmation">
                    {/* <button className="btn inline" onClick={ this.skip }>Skip</button> */}
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>
                
            </div>
        )
    }
}