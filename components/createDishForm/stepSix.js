import Link from 'next/link';
import React from 'react';
import axios from 'axios';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class DishStepSix extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            allergies: [
                {name: 'Egg', id: "1", icon: 'egg.svg', value: false},
                {name: 'Fish', id: "2", icon: 'fish.svg', value: false},
                {name: 'Milk', id: "3", icon: 'milk.svg', value: false},
                {name: 'Peanut', id: "4", icon: 'peanuts.svg', value: false},
                {name: 'Tree-nuts', id: "5", icon: 'tree_nuts.svg', value: false},
                {name: 'Soy', id: "6", icon: 'soy.svg', value: false},
                {name: 'Shellfish', id: "7", icon: 'CrustaceanShellfish.svg', value: false},
                {name: 'Wheat', id: "8", icon: 'gluten.svg', value: false}
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
        
        let resultString = [];
        let result = [];
        let errorStack = [];

        for(let i = 0; i < this.state.allergies.length; i++) {
            if (this.state.allergies[i].value == true) {
                resultString.push(this.state.allergies[i].id);
            }
        }

        for(let i = 0; i < this.state.allergies.length; i++) {
            if (this.state.allergies[i].value == true) {
                result.push(this.state.allergies[i]);
            }
        }

        for(let i = 0; i < this.state.new_allergies.length; i++) {
            if (this.state.new_allergies[i].value == true) {
                resultString.push(this.state.new_allergies[i].id);
            }
        }

        for(let i = 0; i < this.state.new_allergies.length; i++) {
            if (this.state.new_allergies[i].value == true) {
                result.push(this.state.new_allergies[i]);
            }
        }


        if (result.length == 0) {
            errorStack.push('Please provide at least one allergy');
            // have error
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            let data = {
                allergiesString: resultString.toString(),
                allergies: result,
                allergies2: result.map(a => a.id)
            }
                
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    // generate list input
    generateList = () => {
        var that = this;
        
        return this.state.allergies.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input checked={item.value}  type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChange}/>
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
            var that = this;

            if (validator.trim(value).length == 0) {
                errorStack.push('Must have new allergies');
                let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);
                this.refs.dietary.value = '';
                return true;
            }

            const data = new FormData();
            data.append('name', value);
            data.append('describe', value);

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            // call axios here
            axios.post('http://13.250.107.234/api/allergy/create', data, config)
            .then(function (response) {
                if(response.status === 201)
                {   
                    var allergies = {name: response.data.data.faName, id: response.data.data.id, icon: 'other.svg', value: true}
                    var dummyArray = that.state.new_allergies;
                    dummyArray.push(allergies);
                    that.setState({
                        new_allergies: dummyArray
                    })
                    that.refs.allergies.value = '';  
                }
            })
            .catch(error => {
                if(error.response)
                {
                    console.log(error.response);
                }
                
            });
        }
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(() => {
            this.props.store.globalStep--;
        });
        this.props.setProgress(60);

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
                        { this.generateListOther() }
                    </form>
                    <input style={{ marginBottom: '100px' }} onKeyDown={ this.addNew } ref="allergies" type="text" placeholder="Others"/>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline skip" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}