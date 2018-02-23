import React from 'react';
import validator from 'validator';
import axios from 'axios';
import md5 from 'md5';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            argree: false,
            stage: 'register'
        }
    }

    // action when user click register
    register = () => {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let email = this.refs.email.value;
        let errorStack = []; // array store all error messages

        // seperate check term/condition first
        if (this.state.argree == false) {
            errorStack.push('You must argree terms and conditions / privacy policy before continue');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            return false;
        }

        if (validator.trim(username).length == 0) {
            errorStack.push('Username need to be provided');
        } else if (validator.trim(password).length < 6) {
            errorStack.push('Your password length must be greater than 6 characters');
        } else if (!validator.isEmail(validator.trim(email))) {
            errorStack.push('Your current email input is in wrong format. Please check again');
        }

        if (errorStack.length > 0) {
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        } else {
            //- insert data
            this.registerData(this);
        }

    }

    /**
     * Author: baots
     * Created at: 8:00 AM
     * Modified at: 3:23 PM
     */
    registerData = (self) => {
        //- some variables
        let username = self.refs.username.value;
        let password = md5(self.refs.password.value);
        let email    = self.refs.email.value;
        let errorStack = [];
        let that = this;
        
        //- add to form data
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);

        //- register with the information
        //- server: 13.250.107.234
        axios
        .post('http://13.250.107.234/api/register', formData)
        .then(function(res){  
        if(res.status === 201)
        {   
            //- display email validation notification
            self.setState({
                stage: 'emailValidation'
            },() => {
                errorStack.push('Register successful!');
                let notification = { type: 'success', heading: 'Sucessful!', content: errorStack, createdAt: Date.now() };
                that.props.store.addNotification(notification);
            })

        }
        
        })
        .catch(error => {
            //- if exist error.response
            if(error.response)
            {
                //- catch error message
                if(error.response.status === 500 && error.response.data.error === true)
                {
                    var errorData = error.response.data;
                    errorStack.push(errorData.message);
                    let notification = { type: 'error', heading: 'Critical error!', content: errorStack, createdAt: Date.now() };
                    that.props.store.addNotification(notification);
                }
            }
        
        });
        
    }
    //-----------------------------

    // handleChange when click term/condition
    handleInputChange = () => {
        this.setState({
            argree: !this.state.argree
        })
    }

    componentDidMount = () => {
        document.getElementsByTagName('input')[0].focus();
    }


    render = () => {
        return (
            this.state.stage === 'register' ?
            (
                <div className="container">
                    <h3>Join us</h3>
                    <input type="email" required ref="email" placeholder="Email"/>
                    <input type="text" required ref="username" placeholder="Username"/>
                    <input type="password" required ref="password" placeholder="Password"/>
                    <p style={{ margin: `25px 0px`, display: `inline-block`, width: `100%` }}>
                        <input type="checkbox" name="term" id="term" onChange={this.handleInputChange}/>
                        <label htmlFor="term" style={{ float: 'left', height: 'auto', textAlign: 'left', fontSize: '13px' }}>I have read and agreed the terms and conditions / privacy policy</label>
                    </p>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.register }>Next</button>
                    </div>
                </div>
            ) :
            (
                <div className="container">
                    <h3>Email Validation</h3>
                    <p className="description">Thanks for signing up! A verification email has been sent to your email address. Please verify your account by clicking the link in the email.</p>
                    <p className="">Haven't received our verification email yet? <a className="clickable">Click here to resend.</a></p>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.register }>Next</button>
                    </div>
                </div>
            )
        )
    }
}