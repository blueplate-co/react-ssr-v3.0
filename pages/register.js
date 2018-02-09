import React from 'react';
import Link from 'next/link';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

import validator from 'validator';

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
      alert('Must have user name');
      return false;
    } else if (validator.trim(password).length < 6) {
      alert('Must have password with length greater than 6 characters');
      return false;
    } else if (!validator.isEmail(validator.trim(email))) {
      alert('Invalid email address');
      return false;
    } else {
      this.setState({
        stage: 'emailValidation'
      })
    }

  }

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
                    <input type="text" required ref="username" placeholder="user name"/>
                    <input type="password" required ref="password" placeholder="password"/>
                    <input type="email" required ref="email" placeholder="email"/>
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
