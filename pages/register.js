import React from 'react';
import Link from 'next/link';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

import validator from 'validator';
import axios from 'axios';

export default class Register extends React.Component {

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

    if (this.state.argree == false) {
      alert('You must argree terms and conditions / privacy policy before continue');
      return false;
    }

    if (validator.trim(username).length == 0) {
      alert('Username need to be provided');
      return false;
    } else if (validator.trim(password).length < 6) {
      alert('Your password length must be greater than 6 characters');
      return false;
    } else if (!validator.isEmail(validator.trim(email))) {
      alert('Your current email input is in wrong format. Please check again');
      return false;
    } else {
      console.log('all are ok');
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
    let password = self.refs.password.value;
    let email    = self.refs.email.value;
    
    //- encrypt password
    
    //- add to form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    //- register with the information
    //- server: 13.250.107.234
    axios
    .post('http://localhost:1337/api/register', formData)
    .then(function(res){  
      if(res.status === 201)
      {
        console.log(res);
        console.log('Register success...');
        //- display email validation notification
        self.setState({
          stage: 'emailValidation'
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
          alert(errorData.message);
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

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <style jsx>{`
              /* Landscape phones and down */
              @media (max-width: 480px) {
                  .container {
                    .description {
                      text-align: justify;
                      font-size: 14px;
                    }
                    .bottom-confirmation {
                      position: fixed;
                      width: 70%;
                      bottom: 15px;
                      z-index: 5;
                      left: 15%;
                  }
                  }
              }
          `}</style>
          <Head title="Blueplate" />
          <Navigation title="Blueplate"/>
          {
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
          }
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}
