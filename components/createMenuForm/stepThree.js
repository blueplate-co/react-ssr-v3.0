import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import Slider from 'react-rangeslider';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class MenuStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reverseValue: 1
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
        let errorStack = [];
        
        if (this.state.reverseValue > 0) {
            data = {
                numberOfPeople: this.state.reverseValue
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            errorStack.push('Menu need to be serviced at lease 1 person. Please try again');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        }
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });
        this.props.setProgress(20);
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