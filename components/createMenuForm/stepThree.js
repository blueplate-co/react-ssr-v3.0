import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import Slider from 'react-rangeslider';


export default class MenuStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reverseValue: 5
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        console.log(this.props.fieldValues);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        // Get values via this.refs
        let data = {
            numberOfPeople: null
        }
        
        if (this.state.reverseValue > 0) {
            data = {
                numberOfPeople: this.state.reverseValue
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            alert('Must at least 1 people')
        }

    }

    handleChange = (value) => {
        this.setState({
          reverseValue: value
        })
    }

    render() {
        const { reverseValue } = this.state
        return (
            <div className="create_menu_step">
                <style jsx>{`
                    .title {
                        display: inline-block;
                        text-align: left;
                        width: 100%;
                        font-size: 14px;
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
                    <h3>Set for...</h3>
                    <span className="title">Number of people</span>
                    <div className='slider-horizontal'>
                        <Slider
                            min={0}
                            max={20}
                            value={reverseValue}
                            orientation='horizontal'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="container bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}