import Link from 'next/link';
import React from 'react';
import axios from 'axios';

import validator from 'validator';

import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class MenuStepSeven extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            dietary: [
                {name: 'Diabary', id: '1', icon: 'Diabetic.svg', value: false},
                {name: 'Gluten-free', id: '2', icon: 'Gluten-free.svg', value: false},
                {name: 'High protein', id: '3', icon: 'HighProtein.svg', value: false},
                {name: 'Lactose-free', id: '4', icon: 'Lactose-free.svg', value: false},
                {name: 'Low sodium', id: '5', icon: 'Low sodium.svg', value: false},
                {name: 'Low-Carbs', id: '6', icon: 'Low-Carb.svg', value: false},
                {name: 'Nut free', id: '7', icon: 'Nut free.svg', value: false},
                {name: 'Paleo',  id: '8', icon: 'Paleo.svg', value: false},
                {name: 'Pescetarian', id: '9', icon: 'Pescetarian.svg', value: false},
                {name: 'Vegan', id: '10', icon: 'Vegan.svg', value: false},
                {name: 'Vegetarian', id: '11', icon: 'Vegetarian.svg', value: false}
            ],
            new_dietary: []
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let tempState = this.state.dietary;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].value = value;
                this.setState({
                    dietary: tempState
                })
            }
        }
    }

    handleInputChangeOther(event, self) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let tempState = self.state.new_dietary;
        for (let i = 0; i < tempState.length; i++) {
            if (tempState[i].name == name) {
                tempState[i].value = value;
                this.setState({
                    new_dietary: tempState
                })
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
        
        let resultString = [];
        let result = [];
        let errorStack = [];

        for(let i = 0; i < this.state.dietary.length; i++) {
            if (this.state.dietary[i].value == true) {
                resultString.push(this.state.dietary[i].id);
            }
        }

        for(let i = 0; i < this.state.dietary.length; i++) {
            if (this.state.dietary[i].value == true) {
                result.push(this.state.dietary[i]);
            }
        }

        for(let i = 0; i < this.state.new_dietary.length; i++) {
            if (this.state.new_dietary[i].value == true) {
                resultString.push(this.state.new_dietary[i].id);
            }
        }

        for(let i = 0; i < this.state.new_dietary.length; i++) {
            if (this.state.new_dietary[i].value == true) {
                result.push(this.state.new_dietary[i]);
            }
        }

        if(result.length == 0) {
            errorStack.push('Please complete dietary before you add these.');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            let data = {
                dietaryString: resultString.toString(),
                dietary: result,
                dietaries: result.map(a => a.id)
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    // generate list input
    generateList = () => {
        var that = this;
        
        return this.state.dietary.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChange}/>
                    <label htmlFor={item.name} style={{ float: `left` }}>{item.name}</label>
                    <img style={{ float: `right` }} src={ `/static/icons/dietary/` + item.icon }/>
                </p>
            );
        })
    }

    // generate list input
    generateListOther = () => {
        let that = this;
        return this.state.new_dietary.map((item, index) => {
            return (
                <p key={index} style={{ margin: `7px 0px`, display: `inline-block`, width: `100%` }}>
                    <input defaultChecked={item.value} type="checkbox" name={item.name} id={item.name} onChange={this.handleInputChangeOther(event,this)}/>
                    <label htmlFor={item.name} style={{ float: `left` }}>{item.name}</label>
                    <img style={{ float: `right` }} src={ `/static/icons/dietary/` + item.icon }/>
                </p>
            );
        })
    }

    // add new dietary
    addNew = (e) => {
        if (e.keyCode == 13) {
            let value = this.refs.dietary.value;
            let errorStack = [];
            var that = this;

            if (validator.trim(value).length == 0) {
                errorStack.push('Must have new dietary');
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
            axios.post('http://13.250.107.234/api/dietary/create', data, config)
            .then(function (response) {
                if(response.status === 201)
                {   
                    var dietary = {name: response.data.data.dName, id: response.data.data.id, icon: 'other.svg', value: true}
                    var dummyArray = that.state.new_dietary;
                    dummyArray.push(dietary);
                    that.setState({
                        new_dietary: dummyArray
                    })
                    that.refs.dietary.value = '';  
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
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });
        this.props.setProgress(70);
        document.getElementsByTagName('input')[document.getElementsByTagName("input").length - 1].focus();

        // set default value for back function
        if (this.props.fieldValues.dietary.length > 0){
            for (let i = 0; i < this.props.fieldValues.dietary.length; i++) {
                for(let j = 0; j < this.state.dietary.length; j++) {
                    if (this.state.dietary[j].name == this.props.fieldValues.dietary[i].name) {
                        this.state.dietary[j].value = true;
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
                        { this.generateListOther() }
                    </form>
                    <input style={{ marginBottom: '100px' }} ref="dietary" onKeyDown={ this.addNew }  type="text" placeholder="Others"/>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}