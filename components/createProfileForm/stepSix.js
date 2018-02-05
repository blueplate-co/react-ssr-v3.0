import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class ProfileStepSix extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.skip = this.skip.bind(this);
        this.addExp = this.addExp.bind(this);

        this.state = {
            exp: [
                {name: 'certification', value: ''},
                {name: 'school', value: ''}
            ]
        }
    }

    // action when user add exp skills
    addExp = (e) => {
        let dummyArray = this.state.exp;
        dummyArray.push({name: 'experiences', value: ''});
        this.setState({
            exp: dummyArray
        })
    }

    // action when user click skip button
    skip = (e) => {
        let data = {
            exp: []
        }
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();
        let result = [];

        this.state.exp.map((item, index) => {
            let tempValue = document.getElementsByTagName('input')[index].value;
            if (validator.trim(tempValue).length > 0) { // no store empty string value
                result.push(tempValue);
            }
        });
        
        console.log(result);
        
        let data = {
            exp: result,
        }
        
        this.props.saveValues(data);
        this.props.nextStep();
    }

    // generate list input
    generateList = () => {
        var that = this;
        
        return this.state.exp.map((item, index) => {
            return <input ref={'input' + index} key={index} type="text" placeholder={item.name}/>;
        })
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
                        i.fas {
                            float: right;
                            margin: 5px;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Cooking Experience</h3>
                    { this.generateList() }
                    <i className="fas fa-plus" onClick={this.addExp}></i>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.skip }>Skip</button>
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}