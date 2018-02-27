import React from 'react';
import Link from 'next/link';
import Router from 'next/router'

import store from '../stores/store';
import { inject, observer } from 'mobx-react';

import validator from 'validator';
import axios from 'axios';
import md5 from 'md5';

@inject('store') @observer
export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      argree: false,
      stage: 'login'
    }

  }

  // action when user click register
  login = () => {
    let password = this.refs.password.value;
    let email = this.refs.email.value;
    let errorStack = [];

    if (validator.trim(password).length < 6) {
        errorStack.push("Password's character must be greater than 6");
        let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
        this.props.store.addNotification(notification);
    } else if (!validator.isEmail(validator.trim(email))) {
        errorStack.push('Invalid email address');
        let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
        this.props.store.addNotification(notification);
    }

    if (errorStack.length == 0) {
        // call axios api at here
        this.loginData(this);
    }
  }

  loginData = (self) => {
    let password = md5(self.refs.password.value);
    let email = self.refs.email.value;
    let errorStack = [];

    axios
    .post('http://13.250.107.234/api/login', {
      email: email,
      password: password,
    })
    .then(function(res){
      console.log(res);
      if(res.status === 200)
      {
        let token = res.data.token;
        let email = res.data.email;
        let userID = res.data.userID;

        //- save token to localstorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userID', userID);

        errorStack.push('Login success. Welcome to Blueplate !');
        let notification = { type: 'success', heading: 'Success!', content: errorStack, createdAt: Date.now() };
        self.props.store.addNotification(notification);
        setTimeout(()=> {
            Router.push('/become');
        }, 1300)
      }
    }).catch(error =>{
      if(error.response)
      {
        errorStack.push(error.response.data.msg);
        let notification = { type: 'success', heading: 'Error!', content: errorStack, createdAt: Date.now() };
        self.props.store.addNotification(notification);
      }
    });
  }

  // handleChange when click term/condition
  forgotPassword = () => {
    this.setState({
      stage: 'forgotPassword'
    })
  }

  // when user click sign in when at email validation screen
  backSignIn = () => {
    this.setState({
      stage: 'login'
    })
  }

    // componentDidMount = () => {
    //   //- checking token on localStorage and check if token is expired or not
    //   if(localStorage.getItem('userToken') !== null)
    //   {
    //     var token = localStorage.getItem('userToken');
    //     console.log(token);
    //     axios.post('http://13.250.107.234/api/check/token', {
    //       userToken: token
    //     })
    //     .then(function(res){
    //       console.log(res);
    //     })
    //     .catch(error=>{
    //       var data = error.response.data;
    //       if(data === 'expired')
    //       {
    //         console.log('token hết hạn');
    //         Router.push('/register');
    //       }
            
    //     });
    //   }

    // }

  // clear SessionStorage before test again
  componentDidMount = () => {
    sessionStorage.setItem('welcomeStage', 0);
  }

  render () {
    return (
        this.state.stage === 'login' ?
        (
            <div className="container">
            <h3>Sign In</h3>
            <input type="text" required ref="email" placeholder="email address" autoComplete="off"/>
            <input type="password" required ref="password" placeholder="password" autoComplete="off"/>
            <p style={{ margin: `25px 0px`, display: `inline-block`, width: `100%` }}>
                <a onClick={ this.forgotPassword } className="clickable">forgot password</a>
            </p>
            <div className="bottom-confirmation">
                <button className="btn" onClick={ this.login }>Next</button>
            </div>
            </div>
        ) :
        (
            <div className="container">
            <h3>Forget password</h3>
            <input type="text" required ref="email" placeholder="email"/>
            <p style={{ margin: `25px 0px`, display: `inline-block`, width: `100%` }}>
                Just member <a onClick={ this.backSignIn } className="clickable">sign in</a>
            </p>
            </div>
        )
    )
  }
}
