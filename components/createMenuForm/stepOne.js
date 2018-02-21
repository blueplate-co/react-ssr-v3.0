import Link from 'next/link';
import React from 'react';

import validator from 'validator';


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
            alert('Length of description not greater than 250 charaters');
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
            menuName: null
        }
        
        if (this.refs.menuName.value && this.refs.menuName.value.length > 0) {
            data = {
                menuName: this.refs.menuName.value,
                menuDescription: this.state.descriptionContent
            }
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            alert('Please enter your menu name.')
        }

    }

    /**
     * Author: Tran Sy Bao
     * Created at: 21-02-2018
     */
    //- check token expiration
    componentDidMount = () => {
        //- checking token on localStorage and check if token is expired or not
        if(localStorage.getItem('userToken') !== null)
        {
            var token = localStorage.getItem('userToken');
            axios.post('http://localhost:1337/api/check/token', {
                userToken: token
            })
            .catch(error=>{
            var data = error.response.data;
            if(data === 'expired')
            {
                console.log('token hết hạn');
                Router.push('/');
            }

            });
        }

    }
    //==========================================

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