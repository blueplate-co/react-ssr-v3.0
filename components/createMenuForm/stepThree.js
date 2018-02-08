import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class MenuStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        // Get values via this.refs
        let data = {
            menuName: null
        }
        
        if (this.refs.menuName.value && this.refs.menuName.value.length > 0) {
            data = {
                menuName: this.refs.menuName.value
            }
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            alert('Please enter your menu name.')
        }

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
                    }
                `}</style>

                <div className="container">
                    <h3>Set for...</h3>
                    <input type="text" required ref="menuName" placeholder="Give your menu a name" defaultValue={ this.props.fieldValues.menuName }/>
                    <div className="container bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}